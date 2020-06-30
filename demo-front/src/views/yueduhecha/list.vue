<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <audit v-if="currView=='audit'" @close="currView='index'" :data="formData" @submited="submited"/>
        <detail v-if="currView=='detail'" @close="currView='index'" :data="formData" @submited="submited1"/>
        <Card v-show="currView=='index'">
            <Row>
                <Tabs value="6" @on-click="handleChange">
                    <TabPane label="一月份(已核查)" name="1"></TabPane>
                    <TabPane label="二月份(已核查)" name="2"></TabPane>
                    <TabPane label="三月份(已核查)" name="3"></TabPane>
                    <TabPane label="四月份(已核查)" name="4"></TabPane>
                    <TabPane label="五月份(已核查)" name="5"></TabPane>
                    <TabPane label="六月份(待核查)" name="6"></TabPane>
                </Tabs>
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
    import audit from "./audit.vue";
    import detail from "./detail.vue";

    const data = [];
    export default {
        name: "user-manage",
        components: {
            audit,
            detail
        },
        data() {
            return {
                tabName: '1',
                height: 510,
                showUser: false,
                showType: "0",
                loading: false,
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
                formData: {},
                currView: 'index',
                columns: [
                    {
                        title: "车牌号",
                        key: "a",
                        minWidth: 125
                    },
                    {
                        title: "月初里程(公里)",
                        key: "b",
                        width: 180
                    },
                    {
                        title: "月末里程(公里)",
                        key: "c",
                        width: 180
                    },
                    {
                        title: "行驶里程(公里)",
                        key: "d",
                        minWidth: 140
                    },
                    {
                        title: "加油次数",
                        key: "e",
                        minWidth: 125
                    },
                    {
                        title: "加油量合计(升)",
                        key: "f",
                        minWidth: 125
                    },
                    {
                        title: "平均油耗(升/百公里)",
                        key: "g",
                        width: 180
                    },
                    {
                        title: "操作",
                        key: "h",
                        minWidth: 125,
                        render: (h, params) => {
                            return h("div", [
                                params.row.h === 1 ? h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            icon: "md-eye"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.view(params.row);
                                            }
                                        }
                                    },
                                    "查看"
                                ) : h(
                                    "Button",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small",
                                            icon: "ios-create-outline"
                                        },
                                        on: {
                                            click: () => {
                                                this.audit(params.row);
                                            }
                                        }
                                    },
                                    "核查"
                                )
                            ]);
                        }
                    },
                ],
                data: [],
                mockData: [
                    {
                        data: [{
                            a: '琼AA2765B',
                            b: 34567,
                            c: 37098,
                            d: 2531,
                            e: 4,
                            f: 242.97,
                            g: 9.4,
                            h: 1
                        }]
                    },
                    {
                        data: [{
                            a: '琼AA2765B',
                            b: 37098,
                            c: 39776,
                            d: 2678,
                            e: 4,
                            f: 242.97,
                            g: 9.8,
                            h: 1
                        }]
                    },
                    {
                        data: [{
                            a: '琼AA2765B',
                            b: 39776,
                            c: 42983,
                            d: 3207,
                            e: 4,
                            f: 242.97,
                            g: 9.2,
                            h: 1
                        }]
                    },
                    {
                        data: [{
                            a: '琼AA2765B',
                            b: 42983,
                            c: 45848,
                            d: 2865,
                            e: 4,
                            f: 242.97,
                            g: 9.9,
                            h: 1
                        }]
                    },
                    {
                        data: [{
                            a: '琼AA2765B',
                            b: 45848,
                            c: 49035,
                            d: 3187,
                            e: 4,
                            f: 242.97,
                            g: 9.7,
                            h: 1
                        }]
                    },
                    {
                        data: [{
                            a: '琼AA2765B',
                            b: 49035,
                            c: 51322,
                            d: 2287,
                            e: 4,
                            f: 242.97,
                            g: 9.6,
                            h: 1
                        },{
                            a: '琼AA10F33',
                            b: '',
                            c: '',
                            d: '',
                            e: '',
                            f: '',
                            g: '',
                            h: 2
                        }]
                    }
                ]
            };
        },
        methods: {
            init() {
                this.getUserList();
            },
            handleChange (name) {
                this.data = this.mockData[name - 1]['data'];
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
               this.data = this.mockData[5]['data'];
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
            audit (v) {
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.formData = data;
                this.currView = 'audit'
            },
            view (v) {
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.formData = data;
                this.currView = 'detail';
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
