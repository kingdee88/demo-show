<style lang="less">
    @import "../../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <Card>
            <Row
                    v-show="openSearch"
                    @keydown.enter.native="handleSearch"
            >
                <div style="display: flex;justify-content: space-between;">
                    <Button @click="add" type="primary" icon="md-add" style="">新增</Button>
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
                                    v-model="searchForm.sex"
                                    placeholder="预算年度"
                                    clearable
                                    style="width: 200px"
                            >
                                <Option value="0">2018</Option>
                                <Option value="1">2019</Option>
                                <Option value="2">2020</Option>
                            </Select>
                        </Form-item>
                        <Form-item
                                label="目标类别"
                                prop="sex"
                        >
                            <Select
                                    v-model="searchForm.type"
                                    placeholder="请选择"
                                    clearable
                                    style="width: 200px"
                            >
                                <Option value="1">基本经费</Option>
                                <Option value="2">业务经费</Option>
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
                        height="600"
                        show-summary
                        :loading="loading"
                        border
                        :columns="columns"
                        :data="data"
                        sortable="custom"
                        @on-sort-change="changeSort"
                        @on-selection-change="showSelect"
                        ref="table"
                >
                    <template slot-scope="{ row, index }" slot="kzs">
                        <Input
                                :value="row.CONTROL_AMOUNT"
                                :clearable="false"
                                :disabled=" false"
                                @on-change="event => onChangeInput(event, index, 'CONTROL_AMOUNT')"
                                placeholder="请输入"/>
                    </template>
                </Table>
                <Table
                        :columns="exportColumns"
                        :data="exportData"
                        ref="exportTable"
                        style="display:none"
                >
                </Table>
            </Row>
            <Row
                    type="flex"
                    justify="end"
                    class="page"
            >
                <Page
                        :current="searchForm.pageNumber"
                        :total="total"
                        :page-size="searchForm.pageSize"
                        @on-change="changePage"
                        @on-page-size-change="changePageSize"
                        :page-size-opts="[10,20,50]"
                        size="small"
                        show-total
                        show-elevator
                        show-sizer
                ></Page>
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
        <addEdit
                :data="form"
                :type="showType"
                v-model="showUser"
                @on-submit="getUserList"
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
    import departmentChoose from "../../my-components/xboot/department-choose";
    import checkPassword from "@/views/my-components/xboot/check-password";
    import addEdit from "./addEdit.vue";

    const data = [
        {
            "ID": "00000000000000000000000000000020200601122239430803v18t0av3hk",
            "PAY_ITEM_CODE": "1001010101",
            "PAY_ITEM_NAME": "岗位工资",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 14000.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394249605fn865o7ml",
            "PAY_ITEM_CODE": "1001010102",
            "PAY_ITEM_NAME": "薪级工资",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239511705mkwbc3f5co",
            "PAY_ITEM_CODE": "1001010201",
            "PAY_ITEM_NAME": "特区津贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239515445jmrdip15ii",
            "PAY_ITEM_CODE": "1001010202",
            "PAY_ITEM_NAME": "基础津贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239565123pcc7dvjqho",
            "PAY_ITEM_CODE": "10010103",
            "PAY_ITEM_NAME": "特殊岗位津贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239569483r4jd09092o",
            "PAY_ITEM_CODE": "10010104",
            "PAY_ITEM_NAME": "社会保险缴费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239562626p02hfclcsn",
            "PAY_ITEM_CODE": "10010106",
            "PAY_ITEM_NAME": "奖励性绩效工资",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239572554wskj0hq1nn",
            "PAY_ITEM_CODE": "10010107",
            "PAY_ITEM_NAME": "其他工资福利支出",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239294002rn2a0mwu5o",
            "PAY_ITEM_CODE": "10010201",
            "PAY_ITEM_NAME": "离休费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239272582rw3au5ocpi",
            "PAY_ITEM_CODE": "10010202",
            "PAY_ITEM_NAME": "退休费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239275821os4jhddusj",
            "PAY_ITEM_CODE": "10010203",
            "PAY_ITEM_NAME": "退职(役)费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239264765cjt998li1o",
            "PAY_ITEM_CODE": "10010204",
            "PAY_ITEM_NAME": "抚恤金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239269385qj682lnmmj",
            "PAY_ITEM_CODE": "10010205",
            "PAY_ITEM_NAME": "生活补助",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239311330b0loqip5ah",
            "PAY_ITEM_CODE": "10010206",
            "PAY_ITEM_NAME": "救济费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239314259csw8aelleo",
            "PAY_ITEM_CODE": "10010207",
            "PAY_ITEM_NAME": "助学金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239302524o88r6p6i3k",
            "PAY_ITEM_CODE": "10010208",
            "PAY_ITEM_NAME": "奖励金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239308411frbroqhsdo",
            "PAY_ITEM_CODE": "10010209",
            "PAY_ITEM_NAME": "生产补贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239623098c6m1bt8hsi",
            "PAY_ITEM_CODE": "10010210",
            "PAY_ITEM_NAME": "住房公积金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239614852ksb47atdum",
            "PAY_ITEM_CODE": "10010211",
            "PAY_ITEM_NAME": "提租补贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239618859l8wfh690wo",
            "PAY_ITEM_CODE": "10010212",
            "PAY_ITEM_NAME": "购房补贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239608385esfv8d8v0o",
            "PAY_ITEM_CODE": "10010213",
            "PAY_ITEM_NAME": "独生子女补助",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222396117002sahc4hoan",
            "PAY_ITEM_CODE": "10010214",
            "PAY_ITEM_NAME": "计划生育奖",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239601934u1w67u69do",
            "PAY_ITEM_CODE": "10010215",
            "PAY_ITEM_NAME": "医疗费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239605209vottrne6nn",
            "PAY_ITEM_CODE": "10010216",
            "PAY_ITEM_NAME": "家属统筹医疗",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239631565p20r80lbnl",
            "PAY_ITEM_CODE": "10010217",
            "PAY_ITEM_NAME": "患者困难补助",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239634822cq9i30wa5m",
            "PAY_ITEM_CODE": "10010218",
            "PAY_ITEM_NAME": "探亲路费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239627746ibnaw8lknl",
            "PAY_ITEM_CODE": "10010219",
            "PAY_ITEM_NAME": "其他对个人和家庭补助",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239503706q1kpwssuol",
            "PAY_ITEM_CODE": "10010231",
            "PAY_ITEM_NAME": "员工补贴",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183918329shwh56d7wl9bj",
            "MANAGE_DEPT_NAME": "口腔科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2018RATE_DIB": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239452085h38hkvjtkn",
            "PAY_ITEM_CODE": "10020101",
            "PAY_ITEM_NAME": "血费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 71610.0,
            "2018PLAN": 142.88,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 71610.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239437040jdcbnu31ti",
            "PAY_ITEM_CODE": "10020102",
            "PAY_ITEM_NAME": "氧气费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 14419.0,
            "2018PLAN": 6.42,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 14419.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394415408e28shjdmk",
            "PAY_ITEM_CODE": "10020103",
            "PAY_ITEM_NAME": "放射材料",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239444943f81mdcl3tk",
            "PAY_ITEM_CODE": "10020104",
            "PAY_ITEM_NAME": "化验材料",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 184970.6,
            "2018PLAN": 82.35,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 184970.6
        },
        {
            "ID": "00000000000000000000000000000020200601122239448098upbe2i8efk",
            "PAY_ITEM_CODE": "10020105",
            "PAY_ITEM_NAME": "口腔材料",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 1210882.96,
            "2018PLAN": 539.09,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 1210882.96
        },
        {
            "ID": "00000000000000000000000000000020200601122239456989awdf4q60wk",
            "PAY_ITEM_CODE": "10020106",
            "PAY_ITEM_NAME": "疫苗",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391959267e4u34eljqso",
            "MANAGE_DEPT_NAME": "防保科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239460437ciiliiqb4h",
            "PAY_ITEM_CODE": "10020109",
            "PAY_ITEM_NAME": "其他卫生材料",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 1025646.95,
            "2018PLAN": 456.63,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 1025646.95
        },
        {
            "ID": "00000000000000000000000000000020200601122239396386dold12mj2j",
            "PAY_ITEM_CODE": "10020201",
            "PAY_ITEM_NAME": "办公用品",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239399252j0kbar5hfi",
            "PAY_ITEM_CODE": "10020202",
            "PAY_ITEM_NAME": "低值易耗品",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394342426je2rp0t4o",
            "PAY_ITEM_CODE": "10020299",
            "PAY_ITEM_NAME": "其他材料",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239316086m06bcctmuo",
            "PAY_ITEM_CODE": "10020301",
            "PAY_ITEM_NAME": "西药",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 1.558141905E7,
            "2018PLAN": 6936.85,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 1.558141905E7
        },
        {
            "ID": "00000000000000000000000000000020200601122239319935ao6c5pjj7i",
            "PAY_ITEM_CODE": "10020302",
            "PAY_ITEM_NAME": "中成药",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239322946w25mkuc61i",
            "PAY_ITEM_CODE": "10020303",
            "PAY_ITEM_NAME": "中草药",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "MANAGE_DEPT_NAME": "药剂科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 730193.15,
            "2018PLAN": 325.08,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 100.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 730193.15
        },
        {
            "ID": "00000000000000000000000000000020200601122239575979chklsn4qum",
            "PAY_ITEM_CODE": "10020401",
            "PAY_ITEM_NAME": "通用资产",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239578987007qnvqf7k",
            "PAY_ITEM_CODE": "10020402",
            "PAY_ITEM_NAME": "专用设备",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "MANAGE_DEPT_NAME": "普通外科病区",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 155.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239598040tvebkvd4wh",
            "PAY_ITEM_CODE": "10020403",
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239416391o2slfjn7hm",
            "PAY_ITEM_CODE": "1003",
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 1.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239518101f82f65t6tn",
            "PAY_ITEM_CODE": "100701",
            "PAY_ITEM_NAME": "办公费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239463718ejwqvkqj3i",
            "PAY_ITEM_CODE": "100702",
            "PAY_ITEM_NAME": "印刷费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394669764hupv7auun",
            "PAY_ITEM_CODE": "100703",
            "PAY_ITEM_NAME": "咨询费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394702856kalmcvhro",
            "PAY_ITEM_CODE": "100704",
            "PAY_ITEM_NAME": "手续费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394736852svukjfenk",
            "PAY_ITEM_CODE": "100705",
            "PAY_ITEM_NAME": "设备购置",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 201500.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239476020upqwq67iul",
            "PAY_ITEM_CODE": "100706",
            "PAY_ITEM_NAME": "电费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239496520ihqasjsf5m",
            "PAY_ITEM_CODE": "100707",
            "PAY_ITEM_NAME": "邮电费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2017PLAN": 0.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239507747rm7ufndqcl",
            "PAY_ITEM_CODE": "100709",
            "PAY_ITEM_NAME": "物业管理费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239390413c6i3lmbshm",
            "PAY_ITEM_CODE": "100711",
            "PAY_ITEM_NAME": "差旅费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239393390417a24fobi",
            "PAY_ITEM_CODE": "100712",
            "PAY_ITEM_NAME": "因公出国(境)费用",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002020060112223937303045cvcuqjim",
            "PAY_ITEM_CODE": "100713",
            "PAY_ITEM_NAME": "维修（护）费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222393772198hmk816fqi",
            "PAY_ITEM_CODE": "100714",
            "PAY_ITEM_NAME": "租赁费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239380070skneurl43i",
            "PAY_ITEM_CODE": "100715",
            "PAY_ITEM_NAME": "会议费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239384362iheosienam",
            "PAY_ITEM_CODE": "100716",
            "PAY_ITEM_NAME": "培训费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 2.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239387326eoi434q9ak",
            "PAY_ITEM_CODE": "100717",
            "PAY_ITEM_NAME": "公务接待费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394079101fiutt4mwm",
            "PAY_ITEM_CODE": "100725",
            "PAY_ITEM_NAME": "专用燃料费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239410758dtdbcbqu0l",
            "PAY_ITEM_CODE": "100726",
            "PAY_ITEM_NAME": "劳务费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239335452okeo4d2qto",
            "PAY_ITEM_CODE": "10072701",
            "PAY_ITEM_NAME": "消毒费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
            "MANAGE_DEPT_NAME": "护理部",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239332506dctfn8jhcm",
            "PAY_ITEM_CODE": "10072702",
            "PAY_ITEM_NAME": "洗涤费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239329328i8cu9r4owo",
            "PAY_ITEM_CODE": "10072703",
            "PAY_ITEM_NAME": "污水处理费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239325178c7stv5bssj",
            "PAY_ITEM_CODE": "10072704",
            "PAY_ITEM_NAME": "医废处理费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
            "MANAGE_DEPT_NAME": "护理部",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239351805l2tj656okk",
            "PAY_ITEM_CODE": "10072705",
            "PAY_ITEM_NAME": "卫生及消杀费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
            "MANAGE_DEPT_NAME": "护理部",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239348709crw50f2pol",
            "PAY_ITEM_CODE": "10072706",
            "PAY_ITEM_NAME": "软件及维护费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222393448592wkcw2sbqh",
            "PAY_ITEM_CODE": "10072707",
            "PAY_ITEM_NAME": "物业服务费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239341403mwqpn3e45l",
            "PAY_ITEM_CODE": "10072708",
            "PAY_ITEM_NAME": "检验费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222393577931h7b2f3v3j",
            "PAY_ITEM_CODE": "10072709",
            "PAY_ITEM_NAME": "计量仪器",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "0000000000000000000000000000002020060112223953317060n39d7p9o",
            "PAY_ITEM_CODE": "10072710",
            "PAY_ITEM_NAME": "医疗鉴定费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239523237b8w8cbpshh",
            "PAY_ITEM_CODE": "10072711",
            "PAY_ITEM_NAME": "医用X射线机检测费",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239552290nq04sf2reo",
            "PAY_ITEM_CODE": "10072712",
            "PAY_ITEM_NAME": "新生儿筛查",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239526466bbk9j2j7vn",
            "PAY_ITEM_CODE": "10072799",
            "PAY_ITEM_NAME": "其他委托业务费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239413560vt245lkh3o",
            "PAY_ITEM_CODE": "100728",
            "PAY_ITEM_NAME": "工会经费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 222.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239419317wol8nsd81h",
            "PAY_ITEM_CODE": "100729",
            "PAY_ITEM_NAME": "福利费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002020060112223929951528srs0pnmm",
            "PAY_ITEM_CODE": "100731",
            "PAY_ITEM_NAME": "公务用车运行维护费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239305555m9po0lii0j",
            "PAY_ITEM_CODE": "100732",
            "PAY_ITEM_NAME": "业务用车运行维护费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002020060112223929178465rp151toi",
            "PAY_ITEM_CODE": "100739",
            "PAY_ITEM_NAME": "其他交通工具运行维护",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222395592463171raa0rj",
            "PAY_ITEM_CODE": "10079901",
            "PAY_ITEM_NAME": "诉讼费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239555647oa2b375hho",
            "PAY_ITEM_CODE": "10079902",
            "PAY_ITEM_NAME": "律师费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239548870o99r80u1bm",
            "PAY_ITEM_CODE": "10079903",
            "PAY_ITEM_NAME": "提取坏帐准备",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 1.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239545566m3ulk6atqh",
            "PAY_ITEM_CODE": "10079904",
            "PAY_ITEM_NAME": "工作餐费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919339ufm1j2p711cdm",
            "MANAGE_DEPT_NAME": "人事科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239541782b7nvasfv7m",
            "PAY_ITEM_CODE": "10079905",
            "PAY_ITEM_NAME": "宣传费",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839192592wlbtsav9mwkm",
            "MANAGE_DEPT_NAME": "党办",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002020060112223953707312br5vphbk",
            "PAY_ITEM_CODE": "10079906",
            "PAY_ITEM_NAME": "健康教育费",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "MANAGE_DEPT_NAME": "科教科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239530335kdhc2mjeao",
            "PAY_ITEM_CODE": "10079909",
            "PAY_ITEM_NAME": "医疗纠纷补助",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239595069v0dhm5a99j",
            "PAY_ITEM_CODE": "10079910",
            "PAY_ITEM_NAME": "科研费",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "MANAGE_DEPT_NAME": "科教科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239338381e3e8fcctco",
            "PAY_ITEM_CODE": "1007991101",
            "PAY_ITEM_NAME": "中山医合作费",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "MANAGE_DEPT_NAME": "科教科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222393548164k9qab3v9k",
            "PAY_ITEM_CODE": "1007991109",
            "PAY_ITEM_NAME": "其他教学费",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "MANAGE_DEPT_NAME": "科教科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239589655easv433jjo",
            "PAY_ITEM_CODE": "10079912",
            "PAY_ITEM_NAME": "专项经费支出",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "MANAGE_DEPT_NAME": "科教科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002020060112223958645530ia0bnebm",
            "PAY_ITEM_CODE": "10079913",
            "PAY_ITEM_NAME": "招牌制作费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "MANAGE_DEPT_NAME": "总务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239582366554flshvlj",
            "PAY_ITEM_CODE": "10079914",
            "PAY_ITEM_NAME": "专项业务费",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239592819ml8i29v7nm",
            "PAY_ITEM_CODE": "10079999",
            "PAY_ITEM_NAME": "其他费用",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239366533c0i4mloelh",
            "PAY_ITEM_CODE": "104001",
            "PAY_ITEM_NAME": "罚款支出",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 1.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222393693966thvr46kjm",
            "PAY_ITEM_CODE": "104002",
            "PAY_ITEM_NAME": "赞助支出",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239360568p2lt1e9mmj",
            "PAY_ITEM_CODE": "104003",
            "PAY_ITEM_NAME": "财产物资盘亏支出",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239363629ibddvkci1j",
            "PAY_ITEM_CODE": "104004",
            "PAY_ITEM_NAME": "捐赠支出",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2017PLAN": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2017RATE_DIB": 0.0,
            "2018RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394211148jqw78poum",
            "PAY_ITEM_CODE": "104005",
            "PAY_ITEM_NAME": "医保违规扣款",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "MANAGE_DEPT_NAME": "医务科",
            "CONTROL_AMOUNT": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239427897qhk3nhrqal",
            "PAY_ITEM_CODE": "104006",
            "PAY_ITEM_NAME": "医管局科研经费支出",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "MANAGE_DEPT_NAME": "财务科",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2018RATE_DIB": 0.0
        },
        {
            "ID": "00000000000000000000000000000020200601122239402218l2blherewm",
            "PAY_ITEM_CODE": "104090",
            "PAY_ITEM_NAME": "特别贡献奖金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0,
            "2019RATE_DIB": 0.0,
            "2018PLAN": 0.0,
            "2019PLAN": 0.0,
            "2018ACTUAL": 0.0,
            "2019ACTUAL": 0.0,
            "2018RATE_DIB": 0.0
        },
        {
            "ID": "000000000000000000000000000000202006011222394041222p2vb77kjk",
            "PAY_ITEM_CODE": "104091",
            "PAY_ITEM_NAME": "青年基金",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "MANAGE_DEPT_NAME": "秘书处",
            "CONTROL_AMOUNT": 0.0
        }];
    export default {
        name: "user-manage",
        components: {
            departmentChoose,
            checkPassword,
            addEdit
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
                    nickname: "",
                    username: "",
                    departmentId: "",
                    mobile: "",
                    email: "",
                    sex: "",
                    type: "",
                    status: "",
                    pageNumber: 1,
                    pageSize: 200,
                    sort: "createTime",
                    order: "desc",
                    startDate: "",
                    endDate: ""
                },
                form: {},
                columns: [
                    {
                        title: "预算事项名称",
                        key: "PAY_ITEM_NAME",
                        minWidth: 125
                    },
                    {
                        title: "归口部门",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "控制数（元）",
                        key: "CONTROL_AMOUNT",
                        minWidth: 125,
                        slot: 'kzs'
                    },
                    {
                        title: "2019预算数（元）",
                        key: "2017PLAN",
                        minWidth: 125
                    },
                    {
                        title: "2019执行数（元）",
                        key: "2017ACTUAL",
                        minWidth: 160
                    },
                    {
                        title: "2019执行率（%）",
                        key: "2017RATE_DIB",
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
            onChangeInput(event, index, key) {
                const newInputValue = {
                    [key]: event.target.value
                }
                Vue.set(this.data, index, Object.assign({}, {...this.data[index]}, newInputValue))

            },
            init() {
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
                    this.historyData = data;
                    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    if (this.historyData.length < this.searchForm.pageSize) {
                        this.data = this.historyData;
                    } else {
                        this.data = this.historyData.slice(0, this.searchForm.pageSize);
                    }
                    this.total = this.historyData.length;
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
