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
                            <Button icon="md-cloud-download" type="primary">Excel导入</Button>
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

    const data = [{
        a: '财务科',
        b: '00107',
        c: '日用品',
        d:'纸巾',
        e: '',
        f: '',
        g: '2',
        h: '20.00',
        i: 10,
        j: '200.00',
        k: '货物-物资'
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
                        title: "预算部门",
                        key: "a",
                        minWidth: 125
                    },
                    {
                        title: "采购品目编码",
                        key: "b",
                        width: 180
                    },
                    {
                        title: "采购品目名称",
                        key: "c",
                        minWidth: 140
                    },
                    {
                        title: "明细名称",
                        key: "d",
                        minWidth: 125
                    },
                    {
                        title: "规格型号",
                        key: "e",
                        minWidth: 125
                    },
                    {
                        title: "资产编码",
                        key: "f",
                        width: 160
                    },
                    {
                        title: "开支月份",
                        key: "g",
                        width: 160
                    },
                    {
                        title: "预算单价",
                        key: "h",
                        width: 160
                    },
                    {
                        title: "预算数量",
                        key: "i",
                        width: 160
                    },
                    {
                        title: "预算金额",
                        key: "j",
                        minWidth: 125
                    },
                    {
                        title: "采购类别",
                        key: "k",
                        minWidth: 125
                    },
                    {
                        title: "操作",
                        key: "username",
                        fixed: 'right',
                        minWidth: 200,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            icon: "ios-create-outline"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row);
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small",
                                            icon: "md-trash"
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    },
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
