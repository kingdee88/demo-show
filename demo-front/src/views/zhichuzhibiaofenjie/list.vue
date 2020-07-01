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
                        <Form-item class="br" label="">
                            <Button icon="md-cloud-download" type="primary">导入</Button>
                            <Button @click="delAll" icon="md-trash">批量分解</Button>
                            <Button  icon="md-refresh">刷新</Button>
                        </Form-item>
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
    }, {
        "ID": "1002",
        "PAY_ITEM_CODE": "1002",
        "PAY_ITEM_NAME": "购置商品支出",
        "IS_LEAF": "0",
        "PAY_ITEM_TYPE": "1",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "NO_ALLOW_EDIT": "0",
        "PAY_BUDGET_AMOUNT": 9776828,
        "IS_EDIT": "1",
        "IS_MANAGE": "0",
        "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
        "children": [{
            "ID": "100201",
            "PAY_ITEM_CODE": "100201",
            "PAY_ITEM_NAME": "卫生材料费",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1002",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 6376213,
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "children": [{
                "ID": "10020101",
                "PAY_ITEM_CODE": "10020101",
                "PAY_ITEM_NAME": "血费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "10020102",
                "PAY_ITEM_CODE": "10020102",
                "PAY_ITEM_NAME": "氧气费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }, {
                "ID": "10020103",
                "PAY_ITEM_CODE": "10020103",
                "PAY_ITEM_NAME": "放射材料",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }, {
                "ID": "10020104",
                "PAY_ITEM_CODE": "10020104",
                "PAY_ITEM_NAME": "化验材料",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }, {
                "ID": "10020105",
                "PAY_ITEM_CODE": "10020105",
                "PAY_ITEM_NAME": "口腔材料",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185931163hqneuvooerbkj",
                "PAY_ITEM_CODE": "10020106",
                "PAY_ITEM_NAME": "疫苗",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "PAY_BUDGET_AMOUNT": 6376213,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391959267e4u34eljqso",
                "children": []
            }, {
                "ID": "10020109",
                "PAY_ITEM_CODE": "10020109",
                "PAY_ITEM_NAME": "其他卫生材料",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100201",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }]
        }, {
            "ID": "100202",
            "PAY_ITEM_CODE": "100202",
            "PAY_ITEM_NAME": "日常办公用品费",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1002",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 3400415,
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": null,
            "children": [{
                "ID": "0000000000000000000000000000002017112018593128256td2kfwn2l4j",
                "PAY_ITEM_CODE": "10020201",
                "PAY_ITEM_NAME": "办公用品",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100202",
                "PAY_BUDGET_AMOUNT": 841860,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185931323nla3hi7h45e5h",
                "PAY_ITEM_CODE": "10020202",
                "PAY_ITEM_NAME": "低值易耗品",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100202",
                "PAY_BUDGET_AMOUNT": 2558555,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859313574p1rt6ie22bno",
                "PAY_ITEM_CODE": "10020299",
                "PAY_ITEM_NAME": "其他材料",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100202",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }]
        }, {
            "ID": "100203",
            "PAY_ITEM_CODE": "100203",
            "PAY_ITEM_NAME": "药品费",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1002",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 200,
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "children": [{
                "ID": "10020301",
                "PAY_ITEM_CODE": "10020301",
                "PAY_ITEM_NAME": "西药",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100203",
                "BUDGET_AMOUNT": 200,
                "INDEX_STATUS": "3",
                "PROJECT_ID": "",
                "IS_MANAGE_DEPT_DECLARE": "0",
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "PAY_BUDGET_AMOUNT": 200,
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }, {
                "ID": "10020302",
                "PAY_ITEM_CODE": "10020302",
                "PAY_ITEM_NAME": "中成药",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100203",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }, {
                "ID": "10020303",
                "PAY_ITEM_CODE": "10020303",
                "PAY_ITEM_NAME": "中草药",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100203",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
                "children": []
            }]
        }, {
            "ID": "100204",
            "PAY_ITEM_CODE": "100204",
            "PAY_ITEM_NAME": "固定资产购置费",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1002",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 0,
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": null,
            "children": [{
                "ID": "10020401",
                "PAY_ITEM_CODE": "10020401",
                "PAY_ITEM_NAME": "通用资产",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100204",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "10020402",
                "PAY_ITEM_CODE": "10020402",
                "PAY_ITEM_NAME": "专用设备",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100204",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                "children": []
            }, {
                "ID": "10020403",
                "PAY_ITEM_CODE": "10020403",
                "PAY_ITEM_NAME": "提取医疗风险基金",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100204",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
                "children": []
            }]
        }]
    }, {
        "ID": "0000000000000000000000000000002017112018593169792o2n10911uvk",
        "PAY_ITEM_CODE": "1003",
        "PAY_ITEM_NAME": "提取医疗风险基金",
        "IS_LEAF": "1",
        "PAY_ITEM_TYPE": "1",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "PAY_BUDGET_AMOUNT": 6214,
        "APPROVAL_RESULT": "0",
        "IS_PROJECT": "0",
        "IS_MANAGE_DEPT_DECLARE": "1",
        "INDEX_REDUCE_WAY": "1",
        "INDEX_STATUS": "3",
        "NO_ALLOW_EDIT": "0",
        "IS_EDIT": "1",
        "IS_MANAGE": "1",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
        "children": []
    }, {
        "ID": "1007",
        "PAY_ITEM_CODE": "1007",
        "PAY_ITEM_NAME": "管理费用",
        "IS_LEAF": "0",
        "PAY_ITEM_TYPE": "1",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "BUDGET_AMOUNT": 567890,
        "INDEX_STATUS": "3",
        "PROJECT_ID": "",
        "IS_MANAGE_DEPT_DECLARE": "1",
        "APPROVAL_RESULT": "0",
        "IS_PROJECT": "0",
        "PAY_BUDGET_AMOUNT": 567890,
        "NO_ALLOW_EDIT": "1",
        "IS_EDIT": "1",
        "IS_MANAGE": "1",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
        "children": [{
            "ID": "000000000000000000000000000000201711201859318466v02ihnoiwtsl",
            "PAY_ITEM_CODE": "100701",
            "PAY_ITEM_NAME": "办公费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 567303,
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
            "ID": "000000000000000000000000000000201711201859318889uho93mj6s4vn",
            "PAY_ITEM_CODE": "100702",
            "PAY_ITEM_NAME": "印刷费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 158678,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185931929ljdc081ojob7k",
            "PAY_ITEM_CODE": "100703",
            "PAY_ITEM_NAME": "咨询费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
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
            "ID": "0000000000000000000000000000002017112018593197454dnjb5wdqbjo",
            "PAY_ITEM_CODE": "100704",
            "PAY_ITEM_NAME": "手续费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 15213,
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
            "ID": "00000000000000000000000000000020171120185932048q7a3n8ohs7pah",
            "PAY_ITEM_CODE": "100705",
            "PAY_ITEM_NAME": "设备购置",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 253765,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185932088jqaph8cuevhpm",
            "PAY_ITEM_CODE": "100706",
            "PAY_ITEM_NAME": "电费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 671832,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185932130kvlvb65l0cpjn",
            "PAY_ITEM_CODE": "100707",
            "PAY_ITEM_NAME": "邮电费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 409187,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "children": []
        }, {
            "ID": "000000000000000000000000000000201711201859321752ae1qmflfbn7n",
            "PAY_ITEM_CODE": "100709",
            "PAY_ITEM_NAME": "物业管理费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 2313765,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "000000000000000000000000000000201711201859322206f3col565ko7i",
            "PAY_ITEM_CODE": "100711",
            "PAY_ITEM_NAME": "差旅费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 23641,
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
            "ID": "00000000000000000000000000000020171120185932271r7tmfwtfubnvh",
            "PAY_ITEM_CODE": "100712",
            "PAY_ITEM_NAME": "因公出国(境)费用",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
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
            "ID": "00000000000000000000000000000020171120185932311sf9cn32rcltwm",
            "PAY_ITEM_CODE": "100713",
            "PAY_ITEM_NAME": "维修（护）费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 1188392,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185932345hq1pf0co1undm",
            "PAY_ITEM_CODE": "100714",
            "PAY_ITEM_NAME": "租赁费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 767721,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185932436935lp2uqp3r3k",
            "PAY_ITEM_CODE": "100715",
            "PAY_ITEM_NAME": "会议费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
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
            "ID": "100716",
            "PAY_ITEM_CODE": "100716",
            "PAY_ITEM_NAME": "培训费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "BUDGET_AMOUNT": 1000000,
            "INDEX_STATUS": "3",
            "PROJECT_ID": "",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "PAY_BUDGET_AMOUNT": 1000000,
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "children": []
        }, {
            "ID": "000000000000000000000000000000201711201859325280fneljh1lf49m",
            "PAY_ITEM_CODE": "100717",
            "PAY_ITEM_NAME": "公务接待费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
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
            "ID": "00000000000000000000000000000020171120185932570wpjl478ejmv0j",
            "PAY_ITEM_CODE": "100725",
            "PAY_ITEM_NAME": "专用燃料费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 0,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "100726",
            "PAY_ITEM_CODE": "100726",
            "PAY_ITEM_NAME": "劳务费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "BUDGET_AMOUNT": 123456789,
            "INDEX_STATUS": "3",
            "PROJECT_ID": "",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "PAY_BUDGET_AMOUNT": 123456789,
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "children": []
        }, {
            "ID": "100727",
            "PAY_ITEM_CODE": "100727",
            "PAY_ITEM_NAME": "委托业务费",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 833244,
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": null,
            "children": [{
                "ID": "00000000000000000000000000000020171120185932694hu2j1lq0skjvn",
                "PAY_ITEM_CODE": "10072701",
                "PAY_ITEM_NAME": "消毒费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185932735tmq3u0n6fowin",
                "PAY_ITEM_CODE": "10072702",
                "PAY_ITEM_NAME": "洗涤费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 231081,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185932776d174n2j75eu3l",
                "PAY_ITEM_CODE": "10072703",
                "PAY_ITEM_NAME": "污水处理费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 58334,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185932819mnhcv6v4f0t3l",
                "PAY_ITEM_CODE": "10072704",
                "PAY_ITEM_NAME": "医废处理费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 103631,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185932860jwh6pm7o1992h",
                "PAY_ITEM_CODE": "10072705",
                "PAY_ITEM_NAME": "卫生及消杀费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 2640,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
                "children": []
            }, {
                "ID": "0000000000000000000000000000002017112018593290246eol24l1705k",
                "PAY_ITEM_CODE": "10072706",
                "PAY_ITEM_NAME": "软件及维护费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 415558,
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
                "ID": "00000000000000000000000000000020171120185932943aj3aje8e98rah",
                "PAY_ITEM_CODE": "10072707",
                "PAY_ITEM_NAME": "物业服务费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 22000,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "10072708",
                "PAY_ITEM_CODE": "10072708",
                "PAY_ITEM_NAME": "检验费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "10072709",
                "PAY_ITEM_CODE": "10072709",
                "PAY_ITEM_NAME": "计量仪器",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "10072710",
                "PAY_ITEM_CODE": "10072710",
                "PAY_ITEM_NAME": "医疗鉴定费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "10072711",
                "PAY_ITEM_CODE": "10072711",
                "PAY_ITEM_NAME": "医用X射线机检测费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "10072712",
                "PAY_ITEM_CODE": "10072712",
                "PAY_ITEM_NAME": "新生儿筛查",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859332269njplmqc5ek4m",
                "PAY_ITEM_CODE": "10072799",
                "PAY_ITEM_NAME": "其他委托业务费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100727",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }]
        }, {
            "ID": "000000000000000000000000000000201711201859332618n38nfq83wvsk",
            "PAY_ITEM_CODE": "100728",
            "PAY_ITEM_NAME": "工会经费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 1525273,
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
            "ID": "00000000000000000000000000000020171120185933300roffu4iesdcvi",
            "PAY_ITEM_CODE": "100729",
            "PAY_ITEM_NAME": "福利费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 3049,
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
            "ID": "000000000000000000000000000000201711201859333353o1jb6lpt7k7o",
            "PAY_ITEM_CODE": "100731",
            "PAY_ITEM_NAME": "公务用车运行维护费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 1000000,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185933398es12qiu4j6meo",
            "PAY_ITEM_CODE": "100732",
            "PAY_ITEM_NAME": "业务用车运行维护费",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 168632,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185933443n4w11qat25puh",
            "PAY_ITEM_CODE": "100739",
            "PAY_ITEM_NAME": "其他交通工具运行维护",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "PAY_BUDGET_AMOUNT": 0,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "children": []
        }, {
            "ID": "100799",
            "PAY_ITEM_CODE": "100799",
            "PAY_ITEM_NAME": "其他",
            "IS_LEAF": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1007",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 2785078,
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": null,
            "children": [{
                "ID": "000000000000000000000000000000201711201859335172rss6e7n2mjdo",
                "PAY_ITEM_CODE": "10079901",
                "PAY_ITEM_NAME": "诉讼费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
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
                "ID": "0000000000000000000000000000002017112018593355702au1l8h9crjj",
                "PAY_ITEM_CODE": "10079902",
                "PAY_ITEM_NAME": "律师费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "PAY_BUDGET_AMOUNT": 38500,
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
                "ID": "00000000000000000000000000000020171120185933591k2eoohr6s28bk",
                "PAY_ITEM_CODE": "10079903",
                "PAY_ITEM_NAME": "提取坏帐准备",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "PAY_BUDGET_AMOUNT": 0,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
                "children": []
            }, {
                "ID": "10079904",
                "PAY_ITEM_CODE": "10079904",
                "PAY_ITEM_NAME": "工作餐费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919339ufm1j2p711cdm",
                "children": []
            }, {
                "ID": "10079905",
                "PAY_ITEM_CODE": "10079905",
                "PAY_ITEM_NAME": "宣传费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839192592wlbtsav9mwkm",
                "children": []
            }, {
                "ID": "10079906",
                "PAY_ITEM_CODE": "10079906",
                "PAY_ITEM_NAME": "健康教育费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
                "children": []
            }, {
                "ID": "10079909",
                "PAY_ITEM_CODE": "10079909",
                "PAY_ITEM_NAME": "医疗纠纷补助",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
                "children": []
            }, {
                "ID": "10079910",
                "PAY_ITEM_CODE": "10079910",
                "PAY_ITEM_NAME": "科研费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
                "children": []
            }, {
                "ID": "10079911",
                "PAY_ITEM_CODE": "10079911",
                "PAY_ITEM_NAME": "教学费",
                "IS_LEAF": "0",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "0",
                "MANAGE_DEPT_ID": null,
                "children": [{
                    "ID": "1007991101",
                    "PAY_ITEM_CODE": "1007991101",
                    "PAY_ITEM_NAME": "中山医合作费",
                    "IS_LEAF": "1",
                    "PAY_ITEM_TYPE": "1",
                    "PAY_ITEM_DESC": null,
                    "BUDGET_DECLARE_WAY": null,
                    "PARENT_ID": "10079911",
                    "NO_ALLOW_EDIT": "0",
                    "PAY_BUDGET_AMOUNT": 0,
                    "IS_EDIT": "1",
                    "IS_MANAGE": "1",
                    "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
                    "children": []
                }, {
                    "ID": "1007991109",
                    "PAY_ITEM_CODE": "1007991109",
                    "PAY_ITEM_NAME": "其他教学费",
                    "IS_LEAF": "1",
                    "PAY_ITEM_TYPE": "1",
                    "PAY_ITEM_DESC": null,
                    "BUDGET_DECLARE_WAY": null,
                    "PARENT_ID": "10079911",
                    "NO_ALLOW_EDIT": "0",
                    "PAY_BUDGET_AMOUNT": 0,
                    "IS_EDIT": "1",
                    "IS_MANAGE": "1",
                    "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
                    "children": []
                }]
            }, {
                "ID": "10079912",
                "PAY_ITEM_CODE": "10079912",
                "PAY_ITEM_NAME": "专项经费支出",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "NO_ALLOW_EDIT": "0",
                "PAY_BUDGET_AMOUNT": 0,
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
                "children": []
            }, {
                "ID": "00000000000000000000000000000020171120185933999l1cbo91ueab2j",
                "PAY_ITEM_CODE": "10079913",
                "PAY_ITEM_NAME": "招牌制作费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "PAY_BUDGET_AMOUNT": 61477,
                "APPROVAL_RESULT": "0",
                "IS_PROJECT": "0",
                "IS_MANAGE_DEPT_DECLARE": "1",
                "INDEX_REDUCE_WAY": "1",
                "INDEX_STATUS": "3",
                "NO_ALLOW_EDIT": "0",
                "IS_EDIT": "1",
                "IS_MANAGE": "1",
                "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                "children": []
            }, {
                "ID": "000000000000000000000000000000201711201859340448rl4a7qtvbwaj",
                "PAY_ITEM_CODE": "10079914",
                "PAY_ITEM_NAME": "专项业务费",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
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
                "ID": "00000000000000000000000000000020171120185934083t6jcquf9irn9k",
                "PAY_ITEM_CODE": "10079999",
                "PAY_ITEM_NAME": "其他费用",
                "IS_LEAF": "1",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "100799",
                "PAY_BUDGET_AMOUNT": 2685101,
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
        }]
    }, {
        "ID": "1040",
        "PAY_ITEM_CODE": "1040",
        "PAY_ITEM_NAME": "其他支出",
        "IS_LEAF": "0",
        "PAY_ITEM_TYPE": "1",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "BUDGET_AMOUNT": 30102,
        "INDEX_STATUS": "3",
        "PROJECT_ID": "",
        "IS_MANAGE_DEPT_DECLARE": null,
        "APPROVAL_RESULT": "0",
        "IS_PROJECT": "0",
        "PAY_BUDGET_AMOUNT": 30102,
        "NO_ALLOW_EDIT": "1",
        "IS_EDIT": "1",
        "IS_MANAGE": "0",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
        "children": [{
            "ID": "00000000000000000000000000000020171120185936839njqv4qhs0seck",
            "PAY_ITEM_CODE": "104001",
            "PAY_ITEM_NAME": "罚款支出",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "PAY_BUDGET_AMOUNT": 0,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185936872c6ohqk8c00s3l",
            "PAY_ITEM_CODE": "104002",
            "PAY_ITEM_NAME": "赞助支出",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "PAY_BUDGET_AMOUNT": 0,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185936997opf7qhk4bm33h",
            "PAY_ITEM_CODE": "104003",
            "PAY_ITEM_NAME": "财产物资盘亏支出",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "PAY_BUDGET_AMOUNT": 0,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171120185937042hs2nob64awr0k",
            "PAY_ITEM_CODE": "104004",
            "PAY_ITEM_NAME": "捐赠支出",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "PAY_BUDGET_AMOUNT": 0,
            "APPROVAL_RESULT": "0",
            "IS_PROJECT": "0",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "NO_ALLOW_EDIT": "0",
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "children": []
        }, {
            "ID": "104005",
            "PAY_ITEM_CODE": "104005",
            "PAY_ITEM_NAME": "医保违规扣款",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 0,
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "children": []
        }, {
            "ID": "104006",
            "PAY_ITEM_CODE": "104006",
            "PAY_ITEM_NAME": "医管局科研经费支出",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 0,
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "children": []
        }, {
            "ID": "104090",
            "PAY_ITEM_CODE": "104090",
            "PAY_ITEM_NAME": "特别贡献奖金",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 0,
            "IS_EDIT": "1",
            "IS_MANAGE": "1",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "children": []
        }, {
            "ID": "104091",
            "PAY_ITEM_CODE": "104091",
            "PAY_ITEM_NAME": "青年基金",
            "IS_LEAF": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_ITEM_DESC": null,
            "BUDGET_DECLARE_WAY": null,
            "PARENT_ID": "1040",
            "NO_ALLOW_EDIT": "0",
            "PAY_BUDGET_AMOUNT": 0,
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "children": []
        }]
    }, {
        "ID": "0011",
        "PAY_ITEM_CODE": "0011",
        "PAY_ITEM_NAME": "910活动",
        "IS_LEAF": "1",
        "PAY_ITEM_TYPE": "0",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "BUDGET_AMOUNT": 20000,
        "INDEX_STATUS": "3",
        "PROJECT_ID": "",
        "IS_MANAGE_DEPT_DECLARE": "0",
        "APPROVAL_RESULT": "0",
        "IS_PROJECT": "0",
        "PAY_BUDGET_AMOUNT": 20000,
        "NO_ALLOW_EDIT": "0",
        "IS_EDIT": "1",
        "IS_MANAGE": "0",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
        "children": []
    }, {
        "ID": "0012",
        "PAY_ITEM_CODE": "0012",
        "PAY_ITEM_NAME": "科研经费",
        "IS_LEAF": "1",
        "PAY_ITEM_TYPE": "0",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "NO_ALLOW_EDIT": "0",
        "PAY_BUDGET_AMOUNT": 0,
        "IS_EDIT": "1",
        "IS_MANAGE": "0",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
        "children": []
    }, {
        "IS_LEAF": "0",
        "PAY_ITEM_CODE": "1",
        "PAY_ITEM_NAME": "项目分类",
        "IS_MANAGE": "0",
        "MANAGE_DEPT_ID": "",
        "ID": "PROJECT_0001",
        "IS_EDIT": "0",
        "PAY_BUDGET_AMOUNT": 1235211,
        "PARENT_ID": "0",
        "children": [{
            "ID": "000000000000000000000000000000201711221753197017nw6u5rwwidon",
            "PAY_ITEM_NAME": "环磷酰胺对系统性红斑狼疮浆细胞样树突状细胞的影响",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 70000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171122175319712vocrdv2l3ci9i",
            "PAY_ITEM_NAME": "基于灰度关联分析法的医疗安全风险评估模式研究",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 20000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171122175319718jwck14r8vlkph",
            "PAY_ITEM_NAME": "基于肿瘤-宿主界面炎性微环境探讨复方苦参注射液的抗癌机制",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 50000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "000000000000000000000000000000201711221753197285hu3qd89oh9po",
            "PAY_ITEM_NAME": "基于全成本核算管理的社区卫生服务绩效管理机制的研究",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 40000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171130092316710fqfma8wjuhrah",
            "PAY_ITEM_NAME": "社区老年人生命质量及健康素养干预的研究",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 100000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020171130092612438qlkb67u2u49lj",
            "PAY_ITEM_NAME": "应用Pender健康促进模式对社区糖尿病的健康管理研究",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 20000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020180627175326430n56lc4rfrwmjm",
            "PAY_ITEM_NAME": "测试01",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 100000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020180702162535477ktfue6fviwboo",
            "PAY_ITEM_NAME": "测试02",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 20000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020180702163212496kvp0nlr0vuvmj",
            "PAY_ITEM_NAME": "测试03",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 3000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020181123090407145164d5ijcctu6n",
            "PAY_ITEM_NAME": "2018医管局科研经费",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 700000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "000000000000000000000000000000201811272221063220426woo15mksl",
            "PAY_ITEM_NAME": "业务工作经费",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 400,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020190215174537268685squ17j16rn",
            "PAY_ITEM_NAME": "污水处理池",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 1000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020190213165340124989c5pdq4s0hi",
            "PAY_ITEM_NAME": "test",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 111,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020190329160236839938sqefjh7anm",
            "PAY_ITEM_NAME": "专用设备购置项目",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 110000,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "0000000000000000000000000000002018091419352036565788bn8fd5dj",
            "PAY_ITEM_NAME": "test当当当当当当当",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 100,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }, {
            "ID": "00000000000000000000000000000020191112165937028700ms4pw9t60i",
            "PAY_ITEM_NAME": "xx项目",
            "PAY_ITEM_CODE": "1",
            "PAY_BUDGET_AMOUNT": 600,
            "APPROVAL_RESULT": "2",
            "IS_PROJECT": "1",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "INDEX_REDUCE_WAY": "1",
            "INDEX_STATUS": "3",
            "IS_LEAF": "1",
            "PARENT_ID": "PROJECT_0001",
            "IS_EDIT": "1",
            "IS_MANAGE": "0",
            "MANAGE_DEPT_ID": "",
            "children": []
        }]
    }];
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
                        title: "预算指标名称",
                        key: "PAY_ITEM_NAME",
                        minWidth: 125,
                        tree: true
                    },
                    {
                        title: "是否项目指标",
                        key: "PAY_ITEM_NAME",
                        width: 180,
                        render: (h, params) => {
                            let re = "";
                            if (params.row.PAY_ITEM_TYPE == 1) {
                                re = "否";
                            }
                            return h("div", re);
                        },
                    },
                    {
                        title: "预算批复金额(元)",
                        key: "BUDGET_AMOUNT",
                        minWidth: 140
                    },
                    {
                        title: "归口代编",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "状态",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125,
                        render: (h, params) => {
                            let re = "";
                            if (params.row.INDEX_STATUS == 3) {
                                re = "结账";
                            }
                            return h("div", re);
                        }
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
