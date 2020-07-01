<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <Card>
            <Row
                    v-show="openSearch"
                    @keydown.enter.native="handleSearch"
            >
                <div style="display: flex;justify-content: space-between;">
                    <Form>
                
                    </Form>
                    <Form
                            ref="searchForm"
                            :model="searchForm"
                            inline
                            :label-width="70"
                    >
                        <Form-item
                                label="预算年度"
                                prop="sex"
                        >
                            <Select
                                    v-model="searchForm.year"
                                    placeholder="预算年度"
                                    clearable
                                    style="width: 200px"
                            >
                                <Option value="0">2020</Option>
                                <Option value="1">2019</Option>
                                <Option value="2">2020</Option>
                            </Select>
                        </Form-item>
                        <Form-item
                                style="margin-left:-35px;"
                                class="br"
                        >
                            <Button
                                    @click="handleSearch"
                                    type="primary"
                                    icon="ios-search"
                            >搜索
                            </Button>
                            <Button @click="handleReset">重置</Button>
                            <Button icon="md-refresh">刷新</Button>
                        </Form-item>
                    </Form>
                </div>
            </Row>
            <!--      <Row class="operation">
                    <Button
                      @click="add"
                      type="primary"
                      icon="md-add"
                    >添加</Button>
                    <Button
                      @click="delAll"
                      icon="md-trash"
                    >批量删除</Button>
                    <Button
                      type="dashed"
                      @click="openSearch=!openSearch"
                    >{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
                   &lt;!&ndash; <Button
                      type="dashed"
                      @click="openTip=!openTip"
                    >{{openTip ? "关闭提示" : "开启提示"}}</Button>&ndash;&gt;
                  </Row>-->
            <Row v-show="openTip">
                <Alert show-icon>
                    已选择
                    <span class="select-count">{{selectCount}}</span> 项
                    <a
                            class="select-clear"
                            @click="clearSelectAll"
                    >清空</a>
                </Alert>
            </Row>
            <Row>
                <Table
                        row-key="ID"
                        :loading="loading"
                        border
                        :columns="columns"
                        :data="data"
                        sortable="custom"
                        ref="table"
                >
                </Table>
            </Row>
        </Card>

        <Modal
                v-model="modalExportAll"
                title="确认导出"
                :loading="loadingExport"
                @on-ok="exportAll"
        >
            <p>您确认要导出全部 {{total}} 条数据？</p>
        </Modal>

        <check-password
                ref="checkPass"
                @on-success="resetPass"
        />
    </div>
</template>

<script>
    import {
        getUserListData,
        enableUser,
        disableUser,
        deleteUser,
        getAllUserData,
        resetUserPass
    } from "@/api/index";
    import util from "@/libs/util.js";
    import departmentChoose from "../my-components/xboot/department-choose";
    import checkPassword from "@/views/my-components/xboot/check-password";

    const data = [
        {
        "ID": "1001",
        "PAY_ITEM_CODE": "1001",
        "PAY_ITEM_NAME": "人员经费",
        "IS_LEAF": "0",
        "PAY_ITEM_TYPE": "1",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "BUDGET_AMOUNT": 4010,
        "INDEX_STATUS": "3",
        "PROJECT_ID": "",
        "IS_MANAGE_DEPT_DECLARE": "1",
        "APPROVAL_RESULT": "0",
        "IS_PROJECT": "0",
        "PAY_BUDGET_AMOUNT": 4010,
        "NO_ALLOW_EDIT": "1",
        "IS_EDIT": "1",
        "IS_MANAGE": "1",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
        "children": [{
            "ID": "100101",
            "PAY_ITEM_CODE": "100101",
            "PAY_ITEM_NAME": "工资福利支出",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1001",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 80682472,
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "children": [{
                "ID": "10010101",
                "PAY_ITEM_CODE": "10010101",
                "PAY_ITEM_NAME": "全国工资",
                "IS_LEAF": "0",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100101",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 3020656,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": [{
                    "ID": "0000000000000000000000000000002017112018592940300ftbmp0qe3ol",
                    "PAY_ITEM_CODE": "1001010101",
                    "PAY_ITEM_NAME": "岗位工资",
                    "IS_LEAF": "1",
                    "PAY_ITEM_TYPE": "1",
                    "PAY_ITEM_DESC": null,
                    "BUDGET_DECLARE_WAY": null,
                    "PARENT_ID": "10010101",
                    "PAY_BUDGET_AMOUNT": 1000000,
                    "APPROVAL_RESULT": "0",
                    "IS_PROJECT": "0",
                    "IS_MANAGE_DEPT_DECLARE": "1",
                    "INDEX_REDUCE_WAY": "1",
                    "INDEX_STATUS": "2",
                    "NO_ALLOW_EDIT": "0",
                    "IS_EDIT": "1",
                    "IS_MANAGE": "1",
                    "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                    "children": []
                }, {
                    "ID": "00000000000000000000000000000020171120185929438d37f3nffntr6h",
                    "PAY_ITEM_CODE": "1001010102",
                    "PAY_ITEM_NAME": "薪级工资",
                    "IS_LEAF": "1",
                    "PAY_ITEM_TYPE": "1",
                    "PAY_ITEM_DESC": null,
                    "BUDGET_DECLARE_WAY": null,
                    "PARENT_ID": "10010101",
                    "PAY_BUDGET_AMOUNT": 2020656,
                    "APPROVAL_RESULT": "0",
                    "IS_PROJECT": "0",
                    "IS_MANAGE_DEPT_DECLARE": "1",
                    "INDEX_REDUCE_WAY": "1",
                    "INDEX_STATUS": "3",
                    "NO_ALLOW_EDIT": "0",
                    "IS_EDIT": "1",
                    "IS_MANAGE": "1",
                    "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                    "children": []
                }]
            }, {
                "ID": "10010102",
                "PAY_ITEM_CODE": "10010102",
                "PAY_ITEM_NAME": "基础性绩效工资",
                "IS_LEAF": "0",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100101",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 11719430,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": [{
                    "ID": "000000000000000000000000000000201711201859295131s5i8b5msj9rm",
                    "PAY_ITEM_CODE": "1001010201",
                    "PAY_ITEM_NAME": "特区津贴",
                    "IS_LEAF": "1",
                    "PAY_ITEM_TYPE": "1",
                    "PAY_ITEM_DESC": null,
                    "BUDGET_DECLARE_WAY": null,
                    "PARENT_ID": "10010102",
                    "PAY_BUDGET_AMOUNT": 2782191,
                    "APPROVAL_RESULT": "0",
                    "IS_PROJECT": "0",
                    "IS_MANAGE_DEPT_DECLARE": "1",
                    "INDEX_REDUCE_WAY": "1",
                    "INDEX_STATUS": "3",
                    "NO_ALLOW_EDIT": "0",
                    "IS_EDIT": "1",
                    "IS_MANAGE": "1",
                    "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                    "children": []
                }, {
                    "ID": "00000000000000000000000000000020171120185929553e03fv4neqak5i",
                    "PAY_ITEM_CODE": "1001010202",
                    "PAY_ITEM_NAME": "基础津贴",
                    "IS_LEAF": "1",
                    "PAY_ITEM_TYPE": "1",
                    "PAY_ITEM_DESC": null,
                    "BUDGET_DECLARE_WAY": null,
                    "PARENT_ID": "10010102",
                    "PAY_BUDGET_AMOUNT": 8937239,
                    "APPROVAL_RESULT": "0",
                    "IS_PROJECT": "0",
                    "IS_MANAGE_DEPT_DECLARE": "1",
                    "INDEX_REDUCE_WAY": "1",
                    "INDEX_STATUS": "3",
                    "NO_ALLOW_EDIT": "0",
                    "IS_EDIT": "1",
                    "IS_MANAGE": "1",
                    "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                    "children": []
                }]
            }, {
                "ID": "00000000000000000000000000000020171120185929593fm4co5hdn006n",
                "PAY_ITEM_CODE": "10010103",
                "PAY_ITEM_NAME": "特殊岗位津贴",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100101",
                "PAY_BUDGET_AMOUNT": 3788512,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185929641ij37h8rv9t86k",
                "PAY_ITEM_CODE": "10010104",
                "PAY_ITEM_NAME": "社会保险缴费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100101",
                "PAY_BUDGET_AMOUNT": 7409598,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859297294vphbau04o70k",
                "PAY_ITEM_CODE": "10010106",
                "PAY_ITEM_NAME": "奖励性绩效工资",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100101",
                "PAY_BUDGET_AMOUNT": 23518659,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859297856bvsfip0n4ebi",
                "PAY_ITEM_CODE": "10010107",
                "PAY_ITEM_NAME": "其他工资福利支出",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100101",
                "PAY_BUDGET_AMOUNT": 31225617,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }]
        }, {
            "ID": "100102",
            "PAY_ITEM_CODE": "100102",
            "PAY_ITEM_NAME": "对个人和家庭补助",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1001",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 10710098,
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "children": [{
                "ID": "00000000000000000000000000000020171120185929895pfte3slftmlth",
                "PAY_ITEM_CODE": "10010201",
                "PAY_ITEM_NAME": "离休费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 10101,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "4",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859299361hb9065vsd5lk",
                "PAY_ITEM_CODE": "10010202",
                "PAY_ITEM_NAME": "退休费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859299893lt5nc7kp17bi",
                "PAY_ITEM_CODE": "10010203",
                "PAY_ITEM_NAME": "退职(役)费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 1574610,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930029j53vm9nlmscti",
                "PAY_ITEM_CODE": "10010204",
                "PAY_ITEM_NAME": "抚恤金",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930074ct0f32rtw2qto",
                "PAY_ITEM_CODE": "10010205",
                "PAY_ITEM_NAME": "生活补助",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 6600,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930111cfwdh2l68th8h",
                "PAY_ITEM_CODE": "10010206",
                "PAY_ITEM_NAME": "救济费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859301591uu3wi1c7e8tk",
                "PAY_ITEM_CODE": "10010207",
                "PAY_ITEM_NAME": "助学金",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859301938ufko3juvcchm",
                "PAY_ITEM_CODE": "10010208",
                "PAY_ITEM_NAME": "奖励金",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859302341m4l95l28b9qi",
                "PAY_ITEM_CODE": "10010209",
                "PAY_ITEM_NAME": "生产补贴",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930269vl58csrq8v14l",
                "PAY_ITEM_CODE": "10010210",
                "PAY_ITEM_NAME": "住房公积金",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 3896521,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930313evhoscf6570uo",
                "PAY_ITEM_CODE": "10010211",
                "PAY_ITEM_NAME": "提租补贴",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930348hb6cjs6cn60kn",
                "PAY_ITEM_CODE": "10010212",
                "PAY_ITEM_NAME": "购房补贴",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 4240060,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930392e15h7dpl1jnso",
                "PAY_ITEM_CODE": "10010213",
                "PAY_ITEM_NAME": "独生子女补助",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 7986,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930427ww5k2si3s0vrn",
                "PAY_ITEM_CODE": "10010214",
                "PAY_ITEM_NAME": "计划生育奖",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 974220,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930467wh2eb7vfhv59i",
                "PAY_ITEM_CODE": "10010215",
                "PAY_ITEM_NAME": "医疗费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859305017tws19d6wulqo",
                "PAY_ITEM_CODE": "10010216",
                "PAY_ITEM_NAME": "家属统筹医疗",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930644o5wh3lhi4ni8m",
                "PAY_ITEM_CODE": "10010217",
                "PAY_ITEM_NAME": "患者困难补助",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "0000000000000000000000000000002017112018593075999m37dfs9il5k",
                "PAY_ITEM_CODE": "10010218",
                "PAY_ITEM_NAME": "探亲路费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185930830j9nwqptm5anrm",
                "PAY_ITEM_CODE": "10010219",
                "PAY_ITEM_NAME": "其他对个人和家庭补助",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                "children": []
            }, {
                "ID": "10010231",
                "PAY_ITEM_CODE": "10010231",
                "PAY_ITEM_NAME": "员工补贴",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100102",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183918329shwh56d7wl9bj",
                "children": []
            }]
        }]
    }
    
    
    ];
    export default {
        name: "user-manage",
        components: {
            departmentChoose,
            checkPassword
        },
        data() {
            return {
                height: 510,
                showUser: false,
                showType: "0",
                loading: true,
                openSearch: true,
                openTip: false,
                operationLoading: false,
                loadingExport: true,
                modalExportAll: false,
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                selectCount: 0,
                selectList: [],
                dataDep: [],
                searchKey: "",
                searchForm: {
                    id: "",
                    year: '0',
                    username: "",
                    departmentId: "",
                    mobile: "",
                    email: "",
                    sex: "",
                    type: "",
                    status: "",
                    pageNumber: 1,
                    pageSize: 15,
                    sort: "createTime",
                    order: "desc",
                    startDate: "",
                    endDate: ""
                },
                form: {},
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    },
                    {
                        title: "支出预算事项",
                        key: "PAY_ITEM_NAME",
                        minWidth: 125,
                        tree: true
                    },
                    {
                        title: "归口管理部门",
                        key: "PAY_ITEM_NAME",
                        width: 180,
                        render: (h, params) => {
                            let re = "";
                            if (params.row.PAY_ITEM_TYPE == 1) {
                                re = "秘书处";
                            }
                            return h("div", re);
                        },
                    },
                    {
                        title: "控制数额",
                        key: "BUDGET_AMOUNT",
                        minWidth: 140
                    },
                    {
                        title: "2019年预算值",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "2019年执行值",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "2019年执行率",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "预算申报总额",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    }
                ],
                exportColumns: [
                    {
                        title: "用户名",
                        key: "username"
                    },
                    {
                        title: "头像",
                        key: "avatar"
                    },
                    {
                        title: "所属部门ID",
                        key: "departmentId"
                    },
                    {
                        title: "所属部门",
                        key: "departmentTitle"
                    },
                    {
                        title: "手机",
                        key: "mobile"
                    },
                    {
                        title: "邮箱",
                        key: "email"
                    },
                    {
                        title: "性别",
                        key: "sex"
                    },
                    {
                        title: "用户类型",
                        key: "type"
                    },
                    {
                        title: "状态",
                        key: "status"
                    },
                    {
                        title: "删除标志",
                        key: "delFlag"
                    },
                    {
                        title: "创建时间",
                        key: "createTime"
                    },
                    {
                        title: "更新时间",
                        key: "updateTime"
                    }
                ],
                data: [],
                historyData: [],
                exportData: [],
                total: 0,
                dictSex: this.$store.state.dict.sex
            };
        },
        methods: {
            init() {
                // util.arrayToTree(data, {id: 'ID', pid: 'PARENT_ID'})
                this.getUserList();
            },
            handleSelectDepTree(v) {
                this.form.departmentId = v;
            },
            handleSelectDep(v) {
                this.searchForm.departmentId = v;
            },
            selectDateRange(v) {
                if (v) {
                    this.searchForm.startDate = v[0];
                    this.searchForm.endDate = v[1];
                }
            },
            getUserList() {
                // 多条件搜索用户列表
                this.loading = true;
                getUserListData(this.searchForm).then(res => {
                    this.loading = false;
                    this.data = data;
                    this.total = this.data.length;
                });
            },
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getUserList();
            },
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.selectDate = null;
                this.searchForm.startDate = "";
                this.searchForm.endDate = "";
                this.selectDep = [];
                this.searchForm.departmentId = "";
                // 重新加载数据
                this.getUserList();
            },
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == "normal") {
                    this.searchForm.order = "";
                }
                this.getUserList();
            },
            getRoleList() {
                getAllRoleList().then(res => {
                    if (res.success) {
                        this.roleList = res.result;
                    }
                });
            },
            handleDropdown(name) {
                if (name == "refresh") {
                    this.getUserList();
                } else if (name == "reset") {
                    if (this.selectCount <= 0) {
                        this.$Message.warning("您还未选择要重置密码的用户");
                        return;
                    }
                    this.$refs.checkPass.show();
                } else if (name == "exportData") {
                    if (this.selectCount <= 0) {
                        this.$Message.warning("您还未选择要导出的数据");
                        return;
                    }
                    this.$Modal.confirm({
                        title: "确认导出",
                        content: "您确认要导出所选 " + this.selectCount + " 条数据?",
                        onOk: () => {
                            this.$refs.exportTable.exportCsv({
                                filename: "用户数据"
                            });
                        }
                    });
                } else if (name == "exportAll") {
                    this.modalExportAll = true;
                } else if (name == "importData") {
                    this.$Modal.info({
                        title: "请获取完整版",
                        content: "支付链接: http://xpay.exrick.cn/pay?xboot"
                    });
                }
            },
            exportAll() {
                getAllUserData().then(res => {
                    this.modalExportAll = false;
                    if (res.success) {
                        this.exportData = res.result;
                        setTimeout(() => {
                            this.$refs.exportTable.exportCsv({
                                filename: "用户全部数据"
                            });
                        }, 1000);
                    }
                });
            },
            resetPass() {
                this.$Modal.confirm({
                    title: "确认重置",
                    content:
                        "您确认要重置所选的 " +
                        this.selectCount +
                        " 条用户数据密码为【123456】?",
                    loading: true,
                    onOk: () => {
                        let ids = "";
                        this.selectList.forEach(function (e) {
                            ids += e.id + ",";
                        });
                        ids = ids.substring(0, ids.length - 1);
                        resetUserPass({ids: ids}).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("操作成功");
                                this.clearSelectAll();
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            showDetail(v) {
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.form = data;
                this.showType = "0";
                this.showUser = true;
            },
            add() {
                this.showType = "2";
                this.showUser = true;
            },
            edit(v) {
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.form = data;
                this.showType = "1";
                this.showUser = true;
            },
            enable(v) {
                this.$Modal.confirm({
                    title: "确认启用",
                    content: "您确认要启用用户 " + v.username + " ?",
                    loading: true,
                    onOk: () => {
                        enableUser(v.id).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("操作成功");
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            disable(v) {
                this.$Modal.confirm({
                    title: "确认禁用",
                    content: "您确认要禁用用户 " + v.username + " ?",
                    loading: true,
                    onOk: () => {
                        disableUser(v.id).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("操作成功");
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            remove(v) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除用户 " + v.username + " ?",
                    loading: true,
                    onOk: () => {
                        deleteUser({ids: v.id}).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("删除成功");
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            showSelect(e) {
                this.exportData = e;
                this.selectList = e;
                this.selectCount = e.length;
            },
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning("您还未选择要删除的数据");
                    return;
                }
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
                    loading: true,
                    onOk: () => {
                        let ids = "";
                        this.selectList.forEach(function (e) {
                            ids += e.id + ",";
                        });
                        ids = ids.substring(0, ids.length - 1);
                        deleteUser({ids: ids}).then(res => {
                            this.$Modal.remove();
                            if (res.success) {
                                this.$Message.success("删除成功");
                                this.clearSelectAll();
                                this.getUserList();
                            }
                        });
                    }
                });
            },
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.clearSelectAll();
                let _start = (v - 1) * this.searchForm.pageSize;
                let _end = v * this.searchForm.pageSize;
                this.data = this.historyData.slice(_start, _end);
            },
            changePageSize(v) {
                this.searchForm.pageSize = v;
                let _start = (this.searchForm.pageNumber - 1) * v;
                let _end = this.searchForm.pageNumber * v;
                this.data = this.historyData.slice(_start, _end);
            },
        },
        mounted() {
            // 计算高度
            this.height = Number(document.documentElement.clientHeight - 230);
            this.init();
        }
    };
</script>
