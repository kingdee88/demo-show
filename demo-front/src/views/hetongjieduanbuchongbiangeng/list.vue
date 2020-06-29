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
                            label="合同名称"
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
                            label="合同分类"
                            prop="email"
                    >
                        <Input
                                type="text"
                                v-model="searchForm.email"
                                clearable
                                placeholder=""
                                style="width: 200px"
                        />
                    </Form-item>
                    <Form-item
                            label="审批状态"
                            prop="sex"
                    >
                        <Select
                                v-model="searchForm.sex"
                                placeholder="审批状态"
                                clearable
                                style="width: 200px"
                        >
                            <Option value="">请选择</Option>
                            <Option value="0">草稿</Option>
                            <Option value="1">待审批</Option>
                            <Option value="2">已审批</Option>
                            <Option value="3">已驳回</Option>
                            <Option value="4">已终止</Option>
                        </Select>
                    </Form-item>
                    <span v-if="drop">
                        <Form-item
                                label="申请部门"
                                prop="username"
                        >
              <Input
                      type="text"
                      v-model="searchForm.username"
                      clearable
                      placeholder=""
                      style="width: 200px"
              />
            </Form-item>
            <Form-item
                    label="申请人"
                    prop="username"
            >
              <Input
                      type="text"
                      v-model="searchForm.username"
                      clearable
                      placeholder=""
                      style="width: 200px"
              />
            </Form-item>
                         <Form-item
                                 label="申请日期"
                                 prop="username"
                         >
                        <DatePicker
                                style="width: 200px"
                                v-model="searchForm.date"
                                type="daterange"
                                format="yyyy-MM-dd"
                                clearable
                                placeholder="选择时间"
                        ></DatePicker>
                         </Form-item>
                        <Form-item
                                label="申请日期"
                                prop="username"
                        >
                            <DatePicker
                                    style="width: 200px"
                                    v-model="searchForm.dateEnd"
                                    type="daterange"
                                    format="yyyy-MM-dd"
                                    clearable
                                    placeholder="选择时间"
                            ></DatePicker>
                        </Form-item>
                        <Form-item
                                label="签约方名称"
                                prop="username"
                        >
              <Input
                      type="text"
                      v-model="searchForm.username"
                      clearable
                      placeholder=""
                      style="width: 200px"
              />
            </Form-item>
                        </span>
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
    </div>
</template>

<script>
    import add from "./add.vue";
    import edit from "./edit.vue";
    import audit from "./audit";
    import change from "./change";
    export default {
        name: "single-window",
        components: {
            add,
            edit,
            audit,
            change
        },
        data() {
            return {
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
                        key: "CONTRACT_NO",
                        sortable: true
                    },
                    {
                        title: "合同名称",
                        key: "LINK_MAN",
                        sortable: false
                    },
                    {
                        title: "合同性质",
                        key: "INDEX_NAME",
                        sortable: false
                    },
                    {
                        title: "合同类型",
                        key: "TIME_CREATE",
                        sortable: true,
                        width: 200,
                        sortType: "desc"
                    },
                    {
                        title: "申请人",
                        key: "APPLY_AMOUNT",
                        sortable: false
                    },
                    {
                        title: "申请部门",
                        key: "APPLY_DEPT_NAME",
                        sortable: false
                    },
                          {
                        title: "申请日期",
                        key: "REASON_DIGEST",
                        sortable: false
                    },
                     {
                        title: "原合同金额",
                        key: "REASON_DIGEST",
                        sortable: false
                    },
                    {
                        title: "合同金额",
                        key: "REASON_DIGEST",
                        sortable: false
                    },
                    {
                        title: "审批状态",
                        key: "REASON_DIGEST",
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
                        "CONTRACT_NO": "HT-00000175",
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "1111",
                        "APPLY_DATE": "2020-06-24 11:26:52",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "PUR_ORDER_ID": null,
                        "INDEX_ID": null,
                        "PAY_ITEM_CODE": null,
                        "INDEX_NAME": null,
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
                        "LINK_MAN": "磊王",
                        "BANK_NAME": "枯干",
                        "BANK_ACCOUNT": "123456789",
                        "AUDIT_ID": "00000000000000000000000000000020200624112810660291bkob3sauik",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "3",
                        "PROCESS_ACTIVE_NAME": "普通任务",
                        "PROCESS_EXC_NAME": "kwj",
                        "CATEGORY_NAME": "设备采购"
                    },
                    {
                        "ID": "0000000000000000000000000000002020061115524253219566torip7nh",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2019,
                        "CATEGORY_CODE": "0001",
                        "CONTRACT_NATURE": "1",
                        "CONTRACT_TYPE": "1",
                        "CONTRACT_NO": "HT-00000174",
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "123",
                        "APPLY_DATE": "2020-06-11 15:52:43",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
                        "APPLY_USER_ID": "00000000000000000000000000000020200611110333648335u5mvbtqp8j",
                        "PUR_ORDER_ID": "",
                        "INDEX_ID": "",
                        "PAY_ITEM_CODE": "",
                        "INDEX_NAME": "",
                        "CONTRACT_AMOUNT": 12345.0,
                        "PAY_AMOUNT": 10000.0,
                        "GUARANTEE_AMOUNT": 0.0,
                        "GUARANTEE_PERIOD": "",
                        "CONTRACT_COPIES": 3,
                        "CONTRACT_DESC": "",
                        "CONTRACT_DOC_ID": "00000000000000000000000000000020200611155051393044a3mu89m9qn",
                        "PROCESS_ID": "0000000000000000000000000000002020061115524303809431tt1anudo",
                        "APPROVAL_DATE": "2020-06-11 15:56:45",
                        "APPROVAL_RESULT": "2",
                        "RECORD_DATE": "2020-06-11 15:59:14",
                        "RECORD_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
                        "RECORD_USER_ID": "00000000000000000000000000000020200611110333648335u5mvbtqp8j",
                        "RECORD_DOC_ID": "000000000000000000000000000000202006111558344752032fhke8wiko",
                        "SIGNATORY": "kwj",
                        "SIGNING_DATE": "2020-06-01 00:00:00",
                        "BEGIN_DATE": "2020-06-01 00:00:00",
                        "END_DATE": "2020-07-02 00:00:00",
                        "STAMP_TAX_AMOUNT": 0.0,
                        "RECORD_PROCESS_ID": "00000000000000000000000000000020200611155849983626wuqm1i0s3i",
                        "RECORD_APPROVAL_DATE": "2020-06-11 16:00:27",
                        "RECORD_APPROVAL_RESULT": "2",
                        "CLOSE_DATE": null,
                        "CLOSE_TYPE": null,
                        "CLOSE_DESC": null,
                        "EVAL_SCORE": 0.0,
                        "ARCHIVE_DATE": null,
                        "ARCHIVE_POSITION": null,
                        "ARCHIVE_NO": null,
                        "DELE_ID": "",
                        "ARCHIVE_USER_ID": null,
                        "PUR_WAY": "",
                        "IS_FORM_CONTRACT": "0",
                        "IS_INDEMNITY": "0",
                        "INDEX_TYPE": "",
                        "PERFORMANCE_BOND": 0.0,
                        "IS_CONTRACT_PROVISION": "0",
                        "PROVISION_BEGIN_DATE": null,
                        "PROVISION_END_DATE": null,
                        "STAMP_TAX_ITEM": "",
                        "IS_FORM_FORENSIC": "0",
                        "IS_MAJOR_CONTRACT": "0",
                        "BUILD_PROJECT_ID": "",
                        "PROJECT_TYPE": null,
                        "IS_LAB_SAFETY": null,
                        "IS_OPEN_CONTRACT": "0",
                        "CON_EXECUTE_USER_ID": "00000000000000000000000000000020200611110333648335u5mvbtqp8j",
                        "CON_EXECUTE_DEPT_ID": "00000000000000000000000000000020171120183919207nenuanrpjih7n",
                        "CONTRACT_TENDERING": "0",
                        "IS_AUDIT": "0",
                        "IDENTIFICATION_NUMBER": "",
                        "SIGNATORY_PARTY": "王建",
                        "SIGN_DATE_PARTY": "2020-06-01 00:00:00",
                        "PARTY_TYPE": "1",
                        "PARTY_NAME": "DIB",
                        "LINK_PHONE": "1234567890",
                        "LINK_MAN": "DIB",
                        "BANK_NAME": "招商银行",
                        "BANK_ACCOUNT": "1234567888888",
                        "AUDIT_ID": "00000000000000000000000000000020200611155644198511a30prbkbsl",
                        "APPLY_USER_NAME": "王艺霏",
                        "APPLY_DEPT_NAME": "院办公室",
                        "PROCESS_STATE": "4",
                        "PROCESS_ACTIVE_NAME": null,
                        "PROCESS_EXC_NAME": "",
                        "CATEGORY_NAME": "设备采购"
                    },
                    {
                        "ID": "000000000000000000000000000000202005250923528287160f0qiqaj8o",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "CATEGORY_CODE": null,
                        "CONTRACT_NATURE": "1",
                        "CONTRACT_TYPE": "1",
                        "CONTRACT_NO": null,
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "TTtt",
                        "APPLY_DATE": "2020-05-25 09:23:53",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
                        "APPLY_USER_ID": "00000000000000000000000000000020191108093831527835rk71aa07ki",
                        "PUR_ORDER_ID": null,
                        "INDEX_ID": null,
                        "PAY_ITEM_CODE": null,
                        "INDEX_NAME": null,
                        "CONTRACT_AMOUNT": 0.0,
                        "PAY_AMOUNT": 0.0,
                        "GUARANTEE_AMOUNT": 0.0,
                        "GUARANTEE_PERIOD": null,
                        "CONTRACT_COPIES": null,
                        "CONTRACT_DESC": null,
                        "CONTRACT_DOC_ID": "00000000000000000000000000000020200525092338472765elhjs16l7k",
                        "PROCESS_ID": null,
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "0",
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
                        "PARTY_NAME": null,
                        "LINK_PHONE": null,
                        "LINK_MAN": null,
                        "BANK_NAME": null,
                        "BANK_ACCOUNT": null,
                        "AUDIT_ID": null,
                        "APPLY_USER_NAME": "夏天",
                        "APPLY_DEPT_NAME": "演示医院"
                    },
                    {
                        "ID": "00000000000000000000000000000020200513095011090664ne2p3bsu7h",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "CATEGORY_CODE": "0003",
                        "CONTRACT_NATURE": "1",
                        "CONTRACT_TYPE": "1",
                        "CONTRACT_NO": "HT-00000172",
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "测试合同001",
                        "APPLY_DATE": "2020-05-13 09:50:11",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                        "APPLY_USER_ID": "000000000000000000000000000000202005121720362651241im4os1uwo",
                        "PUR_ORDER_ID": "",
                        "INDEX_ID": "",
                        "PAY_ITEM_CODE": "",
                        "INDEX_NAME": "",
                        "CONTRACT_AMOUNT": 10000.0,
                        "PAY_AMOUNT": 0.0,
                        "GUARANTEE_AMOUNT": 0.0,
                        "GUARANTEE_PERIOD": "",
                        "CONTRACT_COPIES": 5,
                        "CONTRACT_DESC": "",
                        "CONTRACT_DOC_ID": "00000000000000000000000000000020200513094956358275otmio145ek",
                        "PROCESS_ID": "000000000000000000000000000000202005130950113867657m31r55wbl",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "4",
                        "RECORD_DATE": null,
                        "RECORD_DEPT_ID": null,
                        "RECORD_USER_ID": null,
                        "RECORD_DOC_ID": null,
                        "SIGNATORY": "",
                        "SIGNING_DATE": null,
                        "BEGIN_DATE": null,
                        "END_DATE": null,
                        "STAMP_TAX_AMOUNT": 0.0,
                        "RECORD_PROCESS_ID": "",
                        "RECORD_APPROVAL_DATE": null,
                        "RECORD_APPROVAL_RESULT": "",
                        "CLOSE_DATE": null,
                        "CLOSE_TYPE": null,
                        "CLOSE_DESC": null,
                        "EVAL_SCORE": 0.0,
                        "ARCHIVE_DATE": null,
                        "ARCHIVE_POSITION": null,
                        "ARCHIVE_NO": null,
                        "DELE_ID": null,
                        "ARCHIVE_USER_ID": null,
                        "PUR_WAY": "",
                        "IS_FORM_CONTRACT": "0",
                        "IS_INDEMNITY": null,
                        "INDEX_TYPE": "",
                        "PERFORMANCE_BOND": 0.0,
                        "IS_CONTRACT_PROVISION": null,
                        "PROVISION_BEGIN_DATE": null,
                        "PROVISION_END_DATE": null,
                        "STAMP_TAX_ITEM": "",
                        "IS_FORM_FORENSIC": "0",
                        "IS_MAJOR_CONTRACT": "0",
                        "BUILD_PROJECT_ID": "",
                        "PROJECT_TYPE": null,
                        "IS_LAB_SAFETY": null,
                        "IS_OPEN_CONTRACT": "0",
                        "CON_EXECUTE_USER_ID": "",
                        "CON_EXECUTE_DEPT_ID": "",
                        "CONTRACT_TENDERING": "0",
                        "IS_AUDIT": "0",
                        "IDENTIFICATION_NUMBER": "",
                        "SIGNATORY_PARTY": null,
                        "SIGN_DATE_PARTY": null,
                        "PARTY_TYPE": "1",
                        "PARTY_NAME": null,
                        "LINK_PHONE": null,
                        "LINK_MAN": null,
                        "BANK_NAME": null,
                        "BANK_ACCOUNT": null,
                        "AUDIT_ID": null,
                        "APPLY_USER_NAME": "杨娜",
                        "APPLY_DEPT_NAME": "总务科",
                        "PROCESS_STATE": "5",
                        "PROCESS_ACTIVE_NAME": null,
                        "PROCESS_EXC_NAME": "",
                        "CATEGORY_NAME": "服务合同"
                    },
                    {
                        "ID": "00000000000000000000000000000020200512182548192223896a9cjb7n",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "CATEGORY_CODE": "1001",
                        "CONTRACT_NATURE": "2",
                        "CONTRACT_TYPE": "1",
                        "CONTRACT_NO": "HT-00000171",
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "场地租赁合同",
                        "APPLY_DATE": "2020-05-12 18:25:48",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                        "APPLY_USER_ID": "000000000000000000000000000000202005121720362651241im4os1uwo",
                        "PUR_ORDER_ID": null,
                        "INDEX_ID": null,
                        "PAY_ITEM_CODE": null,
                        "INDEX_NAME": null,
                        "CONTRACT_AMOUNT": 20000.0,
                        "PAY_AMOUNT": 0.0,
                        "GUARANTEE_AMOUNT": 0.0,
                        "GUARANTEE_PERIOD": null,
                        "CONTRACT_COPIES": 4,
                        "CONTRACT_DESC": null,
                        "CONTRACT_DOC_ID": "00000000000000000000000000000020200512182522969998ms4ka8cw3n",
                        "PROCESS_ID": "0000000000000000000000000000002020051218254847863878snemf1mn",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "1",
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
                        "PARTY_NAME": null,
                        "LINK_PHONE": null,
                        "LINK_MAN": null,
                        "BANK_NAME": null,
                        "BANK_ACCOUNT": null,
                        "AUDIT_ID": null,
                        "APPLY_USER_NAME": "杨娜",
                        "APPLY_DEPT_NAME": "总务科",
                        "PROCESS_STATE": "1",
                        "PROCESS_ACTIVE_NAME": "项目负责人审核",
                        "PROCESS_EXC_NAME": "kwj",
                        "CATEGORY_NAME": "租赁合同"
                    },
                    {
                        "ID": "00000000000000000000000000000020200512180545761308wou7n7wtin",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "CATEGORY_CODE": "0003",
                        "CONTRACT_NATURE": "1",
                        "CONTRACT_TYPE": "1",
                        "CONTRACT_NO": "HT-00000170",
                        "ORIGINAL_CONTRACT_NO": null,
                        "CONTRACT_NAME": "单位5月系统维护",
                        "APPLY_DATE": "2020-05-12 18:05:46",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
                        "APPLY_USER_ID": "000000000000000000000000000000202005121720362651241im4os1uwo",
                        "PUR_ORDER_ID": "",
                        "INDEX_ID": "",
                        "PAY_ITEM_CODE": "",
                        "INDEX_NAME": "",
                        "CONTRACT_AMOUNT": 30000.0,
                        "PAY_AMOUNT": 0.0,
                        "GUARANTEE_AMOUNT": 0.0,
                        "GUARANTEE_PERIOD": "",
                        "CONTRACT_COPIES": 6,
                        "CONTRACT_DESC": "",
                        "CONTRACT_DOC_ID": "00000000000000000000000000000020200512180722791208vu5is36eeh",
                        "PROCESS_ID": "00000000000000000000000000000020200512180821638928pec41ic39j",
                        "APPROVAL_DATE": "2020-05-12 18:10:19",
                        "APPROVAL_RESULT": "2",
                        "RECORD_DATE": "2020-05-12 18:47:55",
                        "RECORD_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
                        "RECORD_USER_ID": "000000000000000000000000000000202005121720362651241im4os1uwo",
                        "RECORD_DOC_ID": "000000000000000000000000000000202005121831175022146wmfv3f5vm",
                        "SIGNATORY": "test",
                        "SIGNING_DATE": "2020-05-18 00:00:00",
                        "BEGIN_DATE": "2020-05-18 00:00:00",
                        "END_DATE": "2020-06-17 00:00:00",
                        "STAMP_TAX_AMOUNT": 0.0,
                        "RECORD_PROCESS_ID": "00000000000000000000000000000020200512183239676031jfoj17tmfh",
                        "RECORD_APPROVAL_DATE": "2020-05-12 18:49:01",
                        "RECORD_APPROVAL_RESULT": "2",
                        "CLOSE_DATE": "2020-05-12 19:09:33",
                        "CLOSE_TYPE": "2",
                        "CLOSE_DESC": null,
                        "EVAL_SCORE": 0.0,
                        "ARCHIVE_DATE": "2020-05-12 00:00:00",
                        "ARCHIVE_POSITION": "档案室",
                        "ARCHIVE_NO": null,
                        "DELE_ID": "",
                        "ARCHIVE_USER_ID": "000000000000000000000000000000202005121720362651241im4os1uwo",
                        "PUR_WAY": "",
                        "IS_FORM_CONTRACT": "0",
                        "IS_INDEMNITY": "0",
                        "INDEX_TYPE": "",
                        "PERFORMANCE_BOND": 0.0,
                        "IS_CONTRACT_PROVISION": "0",
                        "PROVISION_BEGIN_DATE": null,
                        "PROVISION_END_DATE": null,
                        "STAMP_TAX_ITEM": "",
                        "IS_FORM_FORENSIC": "0",
                        "IS_MAJOR_CONTRACT": "0",
                        "BUILD_PROJECT_ID": "",
                        "PROJECT_TYPE": null,
                        "IS_LAB_SAFETY": null,
                        "IS_OPEN_CONTRACT": "0",
                        "CON_EXECUTE_USER_ID": "000000000000000000000000000000202005121720362651241im4os1uwo",
                        "CON_EXECUTE_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
                        "CONTRACT_TENDERING": "0",
                        "IS_AUDIT": "0",
                        "IDENTIFICATION_NUMBER": "",
                        "SIGNATORY_PARTY": "xm",
                        "SIGN_DATE_PARTY": "2020-05-18 00:00:00",
                        "PARTY_TYPE": "1",
                        "PARTY_NAME": "设备供应商",
                        "LINK_PHONE": "12871577890",
                        "LINK_MAN": "xm",
                        "BANK_NAME": "中国银行",
                        "BANK_ACCOUNT": "456709876543234567",
                        "AUDIT_ID": "00000000000000000000000000000020200512181017121894viowhb4vnk",
                        "APPLY_USER_NAME": "杨娜",
                        "APPLY_DEPT_NAME": "演示医院",
                        "PROCESS_STATE": "4",
                        "PROCESS_ACTIVE_NAME": null,
                        "PROCESS_EXC_NAME": "",
                        "CATEGORY_NAME": "服务合同"
                    }]
                this.total = this.data.length;
                this.loading = false;
            },
            add() {
                this.currView = "add";
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
