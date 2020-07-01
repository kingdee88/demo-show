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
                            label="项目名称"
                            prop="mobile"
                    >
                        <Input
                                type="text"
                                v-model="searchForm.mobile"
                                clearable
                                placeholder=""
                                style="width: 200px"
                        />
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
                            <Option value="">请选择</Option>
                            <Option value="1">收入类</Option>
                            <Option value="2">支出类</Option>
                            <Option value="3">工作量类</Option>
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
                        :loading="loading"
                        border
                        :columns="columns"
                        :data="data"
                        sortable="custom"
                        @on-sort-change="changeSort"
                        @on-selection-change="showSelect"
                        ref="table"
                >
                    <template slot-scope="{ row, index }" slot="mbz">
                        <Input
                                :value="row.PLAN_VALUE"
                                :clearable="false"
                                :disabled=" false"
                                placeholder="请输入"/>
                    </template>
                    <template slot-scope="{ row, index }" slot="qtb">
                        <Input
                                :value="row.mbz"
                                :clearable="false"
                                :disabled=" true"
                                placeholder="请输入"/>
                    </template>
                    <template slot-scope="{ row, index }" slot="desc">
                        <Input
                                :value="row.desc"
                                :clearable="false"
                                :disabled="false"
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

    const data =  [
        {
        "ID": "00000000000000000000000000000020171123101720029ti78qmsv8w2ji",
        "BUDGET_YEAR": 2020,
        "PLAN_VALUE": 9.11,
        "TARGET_DESC": null,
        "TARGET_CODE": "001",
        "TARGET_NAME": "医疗收入增长率",
        "DISPLAY_UNIT": "10%",
        "TARGET_TYPE": "1",
        "CALC_FORMULA": null,
        "2017PLAN": 14.0,
        "2017RATE_DIB": 0.0,
        "2017ACTUAL": 0.0
    },
        {
            "ID": "00000000000000000000000000000020171123101720039dei45id5i2oej",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 200.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "004",
            "TARGET_NAME": "实际开放床位",
            "DISPLAY_UNIT": "张",
            "TARGET_TYPE": "1",
            "CALC_FORMULA": null,
            "2017PLAN": 5555.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720049qajp9aufclacj",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 65.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "005",
            "TARGET_NAME": "床位使用率",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "1",
            "CALC_FORMULA": "",
            "2017PLAN": 21.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720049kh1wm55q2d70l",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 601.34,
            "TARGET_DESC": null,
            "TARGET_CODE": "006",
            "TARGET_NAME": "平均床日费",
            "DISPLAY_UNIT": "元",
            "TARGET_TYPE": "1",
            "CALC_FORMULA": "",
            "2017PLAN": 345.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720059q8vu4dd9d25fj",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 31.2,
            "TARGET_DESC": null,
            "TARGET_CODE": "009",
            "TARGET_NAME": "医疗服务收入占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "1",
            "CALC_FORMULA": "",
            "2017PLAN": 31.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720059l6sp8uidq8m4m",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 294180.98,
            "TARGET_DESC": null,
            "TARGET_CODE": "010",
            "TARGET_NAME": "人均收入",
            "DISPLAY_UNIT": "元",
            "TARGET_TYPE": "1",
            "CALC_FORMULA": "",
            "2017PLAN": 341.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720059ctqadr2o03a2h",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 29418.78,
            "TARGET_DESC": null,
            "TARGET_CODE": "011",
            "TARGET_NAME": "医疗总成本",
            "DISPLAY_UNIT": "元",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": null,
            "2017PLAN": 2.3123123E7,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720059n133fv12jj4oh",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 0.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "012",
            "TARGET_NAME": "财政补贴",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720070b8t7wr15de14n",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 993.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "013",
            "TARGET_NAME": "人均办公经费",
            "DISPLAY_UNIT": "元",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 2444.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720070f14761ik6or5l",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 15.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "014",
            "TARGET_NAME": "材料费占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 31.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720070c26b9v4mfrcpj",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 29.1,
            "TARGET_DESC": null,
            "TARGET_CODE": "015",
            "TARGET_NAME": "药品费占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 30.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000201711231017200806jm0mnrvtri7k",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 8.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "016",
            "TARGET_NAME": "购置设备占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 26.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "000000000000000000000000000000201711231017200801hr1lcjtvniti",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 13.4,
            "TARGET_DESC": null,
            "TARGET_CODE": "017",
            "TARGET_NAME": "其他费用占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 21.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171123101720090r5avi3sk7635h",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 34.5,
            "TARGET_DESC": null,
            "TARGET_CODE": "018",
            "TARGET_NAME": "人员经费占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "",
            "2017PLAN": 41.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002017121318472536113oldi37awv7h",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 28.6,
            "TARGET_DESC": null,
            "TARGET_CODE": "101",
            "TARGET_NAME": "药占比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "3",
            "CALC_FORMULA": null,
            "2017PLAN": 25.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171213184725363bpi4bqw7fcwfk",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 4229.7,
            "TARGET_DESC": null,
            "TARGET_CODE": "102",
            "TARGET_NAME": "住院均次费用",
            "DISPLAY_UNIT": "元",
            "TARGET_TYPE": "3",
            "CALC_FORMULA": null,
            "2017PLAN": 342.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171213184725366s4n60e9v3sfbi",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 6800.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "103",
            "TARGET_NAME": "住院工作量",
            "DISPLAY_UNIT": "次",
            "TARGET_TYPE": "3",
            "CALC_FORMULA": null,
            "2017PLAN": 651000.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171213184725369bd1rs12664ajm",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 8.2,
            "TARGET_DESC": null,
            "TARGET_CODE": "104",
            "TARGET_NAME": "计划耗材比",
            "DISPLAY_UNIT": "%",
            "TARGET_TYPE": "3",
            "CALC_FORMULA": null,
            "2017PLAN": 16.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "00000000000000000000000000000020171213184725372f5rcjen6s0ukn",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 310.25,
            "TARGET_DESC": null,
            "TARGET_CODE": "105",
            "TARGET_NAME": "门诊均次费用",
            "DISPLAY_UNIT": "元",
            "TARGET_TYPE": "3",
            "CALC_FORMULA": null,
            "2017PLAN": 430.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "0000000000000000000000000000002017121318472538203clr3d0ttufi",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": 210000.0,
            "TARGET_DESC": null,
            "TARGET_CODE": "106",
            "TARGET_NAME": "门诊工作量",
            "DISPLAY_UNIT": "次",
            "TARGET_TYPE": "3",
            "CALC_FORMULA": null,
            "2017PLAN": 65000.0,
            "2017RATE_DIB": 0.0,
            "2017ACTUAL": 0.0
        },
        {
            "ID": "111",
            "BUDGET_YEAR": 2020,
            "PLAN_VALUE": null,
            "TARGET_DESC": null,
            "TARGET_CODE": "111",
            "TARGET_NAME": "材料费",
            "DISPLAY_UNIT": "1",
            "TARGET_TYPE": "2",
            "CALC_FORMULA": "{\"TEXT\":[\"医疗总成本\",\"*\",\"材料费占比\"],\"VALUE\":[\"TARGET_011_TARGET\",\"*\",\"TARGET_014_TARGET\"]}"
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
                        title: "预算年度",
                        key: "BUDGET_YEAR",
                        minWidth: 125
                    },
                    {
                        title: "目标编码",
                        key: "TARGET_CODE",
                        minWidth: 125
                    },
                    {
                        title: "目标名称",
                        key: "TARGET_NAME",
                        minWidth: 140
                    },
                    {
                        title: "单位",
                        key: "DISPLAY_UNIT",
                        minWidth: 125
                    },
                    {
                        title: "2019预算值",
                        key: "2017PLAN",
                        minWidth: 125
                    },
                    {
                        title: "2019执行值",
                        key: "TARGET_DESC",
                        minWidth: 160
                    },
                    {
                        title: "2019执行率",
                        key: "TARGET_DESCE",
                        minWidth: 125
                    },
                    {
                        title: "2020目标值",
                        key: "PLAN_VALUE",
                        minWidth: 125,
                        slot: 'mbz'
                    },
                    {
                        title: "去年执行同比",
                        key: "username",
                        minWidth: 125,
                        slot: 'qtb'
                    },
                    {
                        title: "目标说明",
                        slot: 'desc',
                        minWidth: 225,
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
