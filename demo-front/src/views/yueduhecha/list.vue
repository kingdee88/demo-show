<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <Card>
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

    const data = [{
        "ID": "1002",
        "PAY_ITEM_CODE": "1002",
        "PAY_ITEM_NAME": "购置商品支出",
        "IS_LEAF": "0",
        "PAY_ITEM_TYPE": "1",
        "PAY_ITEM_DESC": null,
        "BUDGET_DECLARE_WAY": null,
        "PARENT_ID": "0",
        "BUDGET_DEPT_NAME": "普通外科病区",
        "BUDGET_AMOUNT": 507.04,
        "2020PLAN": 790751.39,
        "2020ACTUAL": 790751.39,
        "2020RATE_DIB": 100,
        "children": [
            {
                "ID": "100201",
                "PAY_ITEM_CODE": "100201",
                "PAY_ITEM_NAME": "卫生材料费",
                "IS_LEAF": "0",
                "PAY_ITEM_TYPE": "1",
                "PAY_ITEM_DESC": null,
                "BUDGET_DECLARE_WAY": null,
                "PARENT_ID": "1002",
                "BUDGET_DEPT_NAME": "普通外科病区",
                "BUDGET_AMOUNT": 21.41,
                "2020PLAN": 48083.4,
                "2020ACTUAL": 48083.4,
                "2020RATE_DIB": 100,
                "children": [
                    {
                        "ID": "00000000000000000000000000000020180725090352221dd3e7qwj82dom",
                        "PAY_ITEM_CODE": "10020101",
                        "PAY_ITEM_NAME": "血费",
                        "IS_LEAF": "1",
                        "PAY_ITEM_TYPE": "1",
                        "PAY_ITEM_DESC": null,
                        "BUDGET_DECLARE_WAY": null,
                        "PARENT_ID": "100201",
                        "BUDGET_TYPE": "1",
                        "BUDGET_DEPT_ID": "0000000000000000000000000000002020112018391787987fwp711ns2ih",
                        "BUDGET_AMOUNT": 9.41,
                        "CALCULATION_DESC": "",
                        "APPROVAL_STEP": "2",
                        "APPROVAL_RESULT": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002020112018391936430v441u3suton",
                        "PAY_DETAIL": "1",
                        "BUDGET_DETAIL": "B",
                        "IS_MANAGE_DEPT_DECLARE": "0",
                        "IS_PUR_PAY": "0",
                        "PARENT_PAY_ITEM_CODE": "",
                        "BUDGET_DEPT_NAME": "普通外科病区",
                        "MANAGE_DEPT_NAME": "医务科",
                        "2020PLAN": 21132,
                        "2020RATE_DIB": 100,
                        "2020ACTUAL": 21132,

                    }, {
                        "ID": "00000000000000000000000000000020180725090352160pv2w5j6pwv76n",
                        "PAY_ITEM_CODE": "10020102",
                        "PAY_ITEM_NAME": "氧气费",
                        "IS_LEAF": "1",
                        "PAY_ITEM_TYPE": "1",
                        "PAY_ITEM_DESC": null,
                        "BUDGET_DECLARE_WAY": null,
                        "PARENT_ID": "100201",
                        "BUDGET_TYPE": "1",
                        "BUDGET_DEPT_ID": "0000000000000000000000000000002020112018391787987fwp711ns2ih",
                        "BUDGET_AMOUNT": 0,
                        "CALCULATION_DESC": "",
                        "APPROVAL_STEP": "2",
                        "APPROVAL_RESULT": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002020112018391910786q36pk20w60n",
                        "PAY_DETAIL": "1",
                        "BUDGET_DETAIL": "1",
                        "IS_MANAGE_DEPT_DECLARE": "0",
                        "IS_PUR_PAY": "0",
                        "PARENT_PAY_ITEM_CODE": "",
                        "BUDGET_DEPT_NAME": "普通外科病区",
                        "MANAGE_DEPT_NAME": "药剂科",
                        "2020PLAN": 0,
                        "2020ACTUAL": 0,

                    }, {
                        "ID": "00000000000000000000000000000020180725090352167c02m0s2h9k4um",
                        "PAY_ITEM_CODE": "10020103",
                        "PAY_ITEM_NAME": "放射材料",
                        "IS_LEAF": "1",
                        "PAY_ITEM_TYPE": "1",
                        "PAY_ITEM_DESC": null,
                        "BUDGET_DECLARE_WAY": null,
                        "PARENT_ID": "100201",
                        "BUDGET_TYPE": "1",
                        "BUDGET_DEPT_ID": "0000000000000000000000000000002020112018391787987fwp711ns2ih",
                        "BUDGET_AMOUNT": 0,
                        "CALCULATION_DESC": "",
                        "APPROVAL_STEP": "2",
                        "APPROVAL_RESULT": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002020112018391910786q36pk20w60n",
                        "PAY_DETAIL": "1",
                        "BUDGET_DETAIL": "1",
                        "IS_MANAGE_DEPT_DECLARE": "0",
                        "IS_PUR_PAY": "0",
                        "PARENT_PAY_ITEM_CODE": "",
                        "BUDGET_DEPT_NAME": "普通外科病区",
                        "MANAGE_DEPT_NAME": "药剂科",
                        "2020PLAN": 0,
                        "2020ACTUAL": 0,

                    }, {
                        "ID": "000000000000000000000000000000201807250903521881uprevvocf8sh",
                        "PAY_ITEM_CODE": "10020104",
                        "PAY_ITEM_NAME": "化验材料",
                        "IS_LEAF": "1",
                        "PAY_ITEM_TYPE": "1",
                        "PAY_ITEM_DESC": null,
                        "BUDGET_DECLARE_WAY": null,
                        "PARENT_ID": "100201",
                        "BUDGET_TYPE": "1",
                        "BUDGET_DEPT_ID": "0000000000000000000000000000002020112018391787987fwp711ns2ih",
                        "BUDGET_AMOUNT": 0,
                        "CALCULATION_DESC": "",
                        "APPROVAL_STEP": "2",
                        "APPROVAL_RESULT": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002020112018391910786q36pk20w60n",
                        "PAY_DETAIL": "1",
                        "BUDGET_DETAIL": "1",
                        "IS_MANAGE_DEPT_DECLARE": "0",
                        "IS_PUR_PAY": "0",
                        "PARENT_PAY_ITEM_CODE": "",
                        "BUDGET_DEPT_NAME": "普通外科病区",
                        "MANAGE_DEPT_NAME": "药剂科",
                        "2020PLAN": 0,
                        "2020ACTUAL": 0,

                    }, {
                        "ID": "00000000000000000000000000000020180725090352208sofal3oh3i2ul",
                        "PAY_ITEM_CODE": "10020105",
                        "PAY_ITEM_NAME": "口腔材料",
                        "IS_LEAF": "1",
                        "PAY_ITEM_TYPE": "1",
                        "PAY_ITEM_DESC": null,
                        "BUDGET_DECLARE_WAY": null,
                        "PARENT_ID": "100201",
                        "BUDGET_TYPE": "1",
                        "BUDGET_DEPT_ID": "0000000000000000000000000000002020112018391787987fwp711ns2ih",
                        "BUDGET_AMOUNT": 0,
                        "CALCULATION_DESC": "",
                        "APPROVAL_STEP": "2",
                        "APPROVAL_RESULT": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002020112018391910786q36pk20w60n",
                        "PAY_DETAIL": "1",
                        "BUDGET_DETAIL": "1",
                        "IS_MANAGE_DEPT_DECLARE": "0",
                        "IS_PUR_PAY": "0",
                        "PARENT_PAY_ITEM_CODE": "",
                        "BUDGET_DEPT_NAME": "普通外科病区",
                        "MANAGE_DEPT_NAME": "药剂科",
                        "2020PLAN": 0,
                        "2020ACTUAL": 0,

                    }, {
                        "ID": "00000000000000000000000000000020180725090352235qim0tmf5lnjbm",
                        "PAY_ITEM_CODE": "10020109",
                        "PAY_ITEM_NAME": "其他卫生材料",
                        "IS_LEAF": "1",
                        "PAY_ITEM_TYPE": "1",
                        "PAY_ITEM_DESC": null,
                        "BUDGET_DECLARE_WAY": null,
                        "PARENT_ID": "100201",
                        "BUDGET_TYPE": "1",
                        "BUDGET_DEPT_ID": "0000000000000000000000000000002020112018391787987fwp711ns2ih",
                        "BUDGET_AMOUNT": 12,
                        "CALCULATION_DESC": "",
                        "APPROVAL_STEP": "2",
                        "APPROVAL_RESULT": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002020112018391910786q36pk20w60n",
                        "PAY_DETAIL": "1",
                        "BUDGET_DETAIL": "1",
                        "IS_MANAGE_DEPT_DECLARE": "0",
                        "IS_PUR_PAY": "0",
                        "PARENT_PAY_ITEM_CODE": "",
                        "BUDGET_DEPT_NAME": "普通外科病区",
                        "MANAGE_DEPT_NAME": "药剂科",
                        "2020PLAN": 26951.4,
                        "2020RATE_DIB": 100,
                        "2020ACTUAL": 26951.4,

                    }]
            }]
    }];
    export default {
        name: "user-manage",
        components: {
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
                form: {},
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    },
                    {
                        title: "编制部门",
                        key: "BUDGET_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "支出预算事项",
                        key: "PAY_ITEM_NAME",
                        width: 180,
                        tree: true
                    },
                    {
                        title: "归口代编",
                        key: "PAY_ITEM_CODE",
                        minWidth: 140
                    },
                    {
                        title: "归口管理部门",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 125
                    },
                    {
                        title: "事项定义",
                        key: "PARENT_PAY_ITEM_COD",
                        minWidth: 125
                    },
                    {
                        title: "控制数额（元）",
                        key: "TARGET_DESCE",
                        width: 160
                    },
                    {
                        title: "2020预算值（元）",
                        key: "2020PLAN",
                        width: 160
                    },
                    {
                        title: "2020执行值（元）",
                        key: "2020ACTUAL",
                        width: 160
                    },
                    {
                        title: "2020执行率（%）",
                        key: "2020RATE_DIB",
                        width: 160
                    },
                    {
                        title: "预算额（元）",
                        key: "username",
                        minWidth: 125
                    },
                    {
                        title: "附件",
                        key: "username",
                        minWidth: 125
                    },
                ],
                data: []
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
