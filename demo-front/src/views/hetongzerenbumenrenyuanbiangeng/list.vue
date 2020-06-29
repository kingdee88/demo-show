<style lang="less">
    @import "../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <add v-if="currView=='add'" @close="currView='index'" @submited="submited"/>
        <edit v-if="currView=='edit'" @close="currView='index'" @submited="submited" :data="formData"/>
        <audit v-if="currView=='audit'" @close="currView='index'" @submited="submited"/>
        <change v-if="currView=='change'" @close="currView='index'" @submited="submited"/>
        <Card v-show="currView=='index'">
            <Row class="operation">
                <Button @click="add" type="primary" icon="md-add">新增</Button>
                <Button @click="getDataList" icon="md-refresh">刷新</Button>
            </Row>
            <Row v-show="openTip">
                <Alert show-icon>
                    已选择
                    <span class="select-count">{{selectCount}}</span> 项
                    <a class="select-clear" @click="clearSelectAll">清空</a>
                </Alert>
            </Row>
            <Row
                    v-show="openSearch"
                    @keydown.enter.native="handleSearch"
            >

                <Form
                        ref="searchForm"
                        :model="searchForm"
                        inline
                        :label-width="86"
                >
                    <Form-item
                            label="合同编号"
                            prop="nickname"
                    >
                        <Input
                                type="text"
                                v-model="searchForm.nickname"
                                clearable
                                placeholder="合同编号"
                                style="width: 200px"
                        />
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
                        <a
                                class="drop-down"
                                @click="dropDown"
                        >
                            {{dropDownContent}}
                            <Icon :type="dropDownIcon"></Icon>
                        </a>
                    </Form-item>
                </Form>
            </Row>
            <Row>
                <Table
                        :loading="loading"
                        border
                        :columns="columns"
                        :data="data"
                        ref="table"
                        sortable="custom"
                        @on-sort-change="changeSort"
                        @on-selection-change="changeSelect"
                ></Table>
            </Row>
            <Row type="flex" justify="end" class="page">
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
            <addEdit
                :data="form"
                :type="showType"
                v-model="showUser"
                @on-submit="getUserList"
        />
    </div>
</template>

<script>
    import addEdit from "./addEdit.vue";
    import edit from "./edit.vue";
    import audit from "./audit";
    import change from "./change";
    export default {
        name: "single-window",
        components: {
            addEdit,
            edit,
            audit,
            change
        },
        data() {
            return {
                showUser: false,
                showType: "0",
                form: {},
                openTip: false, // 显示提示
                openSearch: true,
                drop: false,
                dropDownContent: "展开查询",
                dropDownIcon: "ios-arrow-down",
                formData: {},
                currView: "index",
                loading: true, // 表单加载状态
                searchForm: {
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    sort: "createTime", // 默认排序字段
                    order: "desc" // 默认排序方式
                },
                selectList: [], // 多选数据
                selectCount: 0, // 多选计数
                columns: [
                    // 表头
                    // {
                    //     type: "selection",
                    //     width: 60,
                    //     align: "center"
                    // },
                    // {
                    //     type: "index",
                    //     width: 60,
                    //     align: "center"
                    // },
                    {
                        title: "合同编号",
                        key: "CONTRACT_NAME",
                        sortable: true
                    },
                    {
                        title: "原部门",
                        key: "CONTRACT_NO",
                        sortable: true
                    },
                    {
                        title: "原负责人",
                        key: "LINK_MAN",
                        sortable: false
                    },
                    {
                        title: "现部门",
                        key: "INDEX_NAME",
                        sortable: false
                    },
                    {
                        title: "现责任人",
                        key: "TIME_CREATE",
                        width: 200,
                        sortType: "desc"
                    },
                    {
                        title: "操作人",
                        key: "REASON_DIGEST",
                        sortable: false
                    },
                    {
                        title: "操作时间",
                        key: "APPLY_AMOUNT",
                        sortable: false
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 200,
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
                    }
                ],
                data: [], // 表单数据
                total: 0 // 表单数据总数
            };
        },
        methods: {
            init() {
                this.getDataList();
            },
            handleSelectDep (v) {
                this.searchForm.departmentId = v;
            },
            dropDown () {
                if (this.drop) {
                    this.dropDownContent = "展开查询";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            handleSearch () {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                // this.getUserList();
            },
            handleReset () {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.selectDate = null;
                this.searchForm.startDate = "";
                this.searchForm.endDate = "";
                this.selectDep = [];
                this.searchForm.departmentId = "";
            },
            submited() {
                this.currView = "index";
                this.getDataList();
            },
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.getDataList();
                this.clearSelectAll();
            },
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getDataList();
            },
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == "normal") {
                    this.searchForm.order = "";
                }
                this.getDataList();
            },
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            changeSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            getDataList() {
                this.loading = true;

                this.data =  [
                    {
                        "ID": "00000000000000000000000000000020200624112651569288meovrqo76j",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "CATEGORY_CODE": "0001",
                        "CONTRACT_NATURE": "1",
                        "CONTRACT_TYPE": "1",
                        "CONTRACT_NO": "财务科",
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "1111",
                        "APPLY_DATE": "2020-06-24 11:26:52",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "PUR_ORDER_ID": null,
                        "INDEX_ID": null,
                        "PAY_ITEM_CODE": null,
                        "INDEX_NAME": "院办公室",
                        "CONTRACT_AMOUNT": 1111.0,
                        "PAY_AMOUNT": 0.0,
                        "GUARANTEE_AMOUNT": 0.0,
                        "GUARANTEE_PERIOD": null,
                        "CONTRACT_COPIES": 2,
                        "CONTRACT_DESC": null,
                        "CONTRACT_DOC_ID": "000000000000000000000000000000202006241126241489880lshf483il",
                        "PROCESS_ID": "00000000000000000000000000000020200624112651851140al1vfhiv3o",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "RECORD_DATE": null,
                        "RECORD_DEPT_ID": null,
                        "RECORD_USER_ID": null,
                        "RECORD_DOC_ID": null,
                        "SIGNATORY": null,
                        "SIGNING_DATE": null,
                        "BEGIN_DATE": null,
                        "END_DATE": null,
                        "STAMP_TAX_AMOUNT": 0.0,
                        "RECORD_PROCESS_ID": null,
                        "RECORD_APPROVAL_DATE": null,
                        "RECORD_APPROVAL_RESULT": null,
                        "CLOSE_DATE": null,
                        "CLOSE_TYPE": null,
                        "CLOSE_DESC": null,
                        "EVAL_SCORE": 0.0,
                        "ARCHIVE_DATE": null,
                        "ARCHIVE_POSITION": null,
                        "ARCHIVE_NO": null,
                        "DELE_ID": null,
                        "ARCHIVE_USER_ID": null,
                        "PUR_WAY": null,
                        "IS_FORM_CONTRACT": "0",
                        "IS_INDEMNITY": null,
                        "INDEX_TYPE": null,
                        "PERFORMANCE_BOND": 0.0,
                        "IS_CONTRACT_PROVISION": null,
                        "PROVISION_BEGIN_DATE": null,
                        "PROVISION_END_DATE": null,
                        "STAMP_TAX_ITEM": null,
                        "IS_FORM_FORENSIC": "0",
                        "IS_MAJOR_CONTRACT": "0",
                        "BUILD_PROJECT_ID": null,
                        "PROJECT_TYPE": null,
                        "IS_LAB_SAFETY": null,
                        "IS_OPEN_CONTRACT": "0",
                        "CON_EXECUTE_USER_ID": null,
                        "CON_EXECUTE_DEPT_ID": null,
                        "CONTRACT_TENDERING": "0",
                        "IS_AUDIT": "0",
                        "IDENTIFICATION_NUMBER": null,
                        "SIGNATORY_PARTY": null,
                        "SIGN_DATE_PARTY": null,
                        "PARTY_TYPE": "1",
                        "PARTY_NAME": "磊有",
                        "LINK_PHONE": "1234567899",
                        "LINK_MAN": "王磊",
                        "BANK_NAME": "枯干",
                        "BANK_ACCOUNT": "123456789",
                        "AUDIT_ID": "00000000000000000000000000000020200624112810660291bkob3sauik",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "3",
                        "PROCESS_ACTIVE_NAME": "普通任务",
                        "PROCESS_EXC_NAME": "kwj",
                        "CATEGORY_NAME": "设备采购"
                    }]
                this.total = this.data.length;
                this.loading = false;
            },
            add() {
                this.showType = "2";
                this.showUser = true;
            },
            audit() {
                this.currView = "audit";
            },
            change () {
                this.currView = "change";
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
                this.formData = data;
                this.currView = "edit";
            },
            remove(v) {
                this.$Modal.confirm({
                    title: "确认删除",
                    // 记得确认修改此处
                    content: "您确认要删除 " + v.APPLY_FORM_NO + " ?",
                    loading: true,
                    onOk: () => {
                        // 删除
                        // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
                        //   this.$Modal.remove();
                        //   if (res.success) {
                        //     this.$Message.success("操作成功");
                        //     this.getDataList();
                        //   }
                        // });
                        // 模拟请求成功
                        this.$Message.success("操作成功");
                        this.$Modal.remove();
                        this.getDataList();
                    }
                });
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
                        this.selectList.forEach(function(e) {
                            ids += e.id + ",";
                        });
                        ids = ids.substring(0, ids.length - 1);
                        // 批量删除
                        // this.deleteRequest("请求地址，如/deleteByIds/" + ids).then(res => {
                        //   this.$Modal.remove();
                        //   if (res.success) {
                        //     this.$Message.success("操作成功");
                        //     this.clearSelectAll();
                        //     this.getDataList();
                        //   }
                        // });
                        // 模拟请求成功
                        this.$Message.success("操作成功");
                        this.$Modal.remove();
                        this.clearSelectAll();
                        this.getDataList();
                    }
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
