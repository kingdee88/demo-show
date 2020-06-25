<style lang="less">
    @import "../../../styles/table-common.less";
</style>
<template>
    <div class="search">
        <add v-if="currView=='add'" @close="currView='index'" @submited="submited"/>
        <edit v-if="currView=='edit'" @close="currView='index'" @submited="submited" :data="formData"/>
        <audit v-if="currView=='audit'" @close="currView='index'" @submited="submited"/>
        <change v-if="currView=='change'" @close="currView='index'" @submited="submited"/>
        <Card v-show="currView=='index'">
            <Row class="operation">
                <Button @click="add" type="primary" icon="md-add">事前申请</Button>
                <Button @click="audit" type="primary" icon="ios-checkbox-outline">事前申请审核</Button>
                <Button @click="change" type="primary" icon="ios-list-box-outline">我的事前申请变更</Button>
                <!--                <Button @click="delAll" icon="md-trash">批量删除</Button>-->
                <Button @click="getDataList" icon="md-refresh">刷新</Button>
                <!--                <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>-->
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
                        :label-width="70"
                >
                    <Form-item
                            label="申请单号"
                            prop="nickname"
                    >
                        <Input
                                type="text"
                                v-model="searchForm.nickname"
                                clearable
                                placeholder="请输入用户名"
                                style="width: 200px"
                        />
                    </Form-item>

                    <Form-item
                            label="预算指标"
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
                            label="支出事项"
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
                    <span v-if="drop">
            <Form-item
                    label="事由摘要"
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
                   label="性别"
                   prop="sex"
           >
              <Select
                      v-model="searchForm.sex"
                      placeholder="申请类型"
                      clearable
                      style="width: 200px"
              >
                  <Option value="">-请选择-</Option>
                      <Option value="1">一般经费</Option>
                      <Option value="2">差旅费</Option>
                      <Option value="3">国内接待费</Option>
                      <Option value="4">会议费</Option>
                      <Option value="5">培训费</Option>
                      <Option value="6">出国费</Option>
                      <Option value="10">劳务费</Option>
                      <Option value="13">外宾接待费</Option>
              </Select>
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
                                      label="审核状态"
                                      prop="sex"
                              >
              <Select
                      v-model="searchForm.sex"
                      placeholder="审核状态"
                      clearable
                      style="width: 200px"
              >
                  <Option value="">-请选择-</Option>
                      <Option value="0">草稿</Option>
                      <Option value="1">待审批</Option>
                      <Option value="2">已审批</Option>
                      <Option value="3">已驳回</Option>
                      <Option value="4">已终止</Option>
              </Select>
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
                    </Form-item>

                    <Form-item
                            style="margin-left:-35px;"
                            class="br"
                    >
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
                        title: "申请单号",
                        key: "APPLY_FORM_NO",
                        sortable: true
                    },
                    {
                        title: "预算指标",
                        key: "ITEM_PAY_ITEM_NAME",
                        sortable: true
                    },
                    {
                        title: "指标来源",
                        key: "name",
                        sortable: false,
                        render: (h, params) => {
                            return h("div", ['年初预算'])}
                    },
                    {
                        title: "支出事项",
                        key: "INDEX_NAME",
                        sortable: false
                    },
                    {
                        title: "申请时间",
                        key: "TIME_CREATE",
                        sortable: true,
                        width: 200,
                        sortType: "desc"
                    },
                    {
                        title: "事由摘要",
                        key: "REASON_DIGEST",
                        sortable: false
                    },
                    {
                        title: "申请金额",
                        key: "APPLY_AMOUNT",
                        sortable: false
                    },
                    {
                        title: "申请部门",
                        key: "APPLY_DEPT_NAME",
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

                this.data = [{
                    "ID": "000000000000000000000000000000202005182003051658531v8n1u5kbo",
                    "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                    "USER_CREATE_NAME": "kwj",
                    "TIME_CREATE": "2020-05-18 20:03:05",
                    "USER_UPDATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                    "USER_UPDATE_NAME": "kwj",
                    "TIME_UPDATE": "2020-06-09 17:43:30",
                    "ORG_CREATE_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                    "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                    "BUDGET_YEAR": 2018,
                    "APPLY_DATE": "2020-05-18 20:03:05",
                    "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                    "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                    "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                    "AGENT_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                    "FORM_TYPE": "1",
                    "APPLY_REASON": null,
                    "INDEX_ID": "000000000000000000000000000000201711301720339756hhnimoba2nnl",
                    "APPLY_AMOUNT": 10.0,
                    "PAY_STANDARD": -1.0,
                    "IS_ABOVE_STANDARD": "0",
                    "APPROVAL_DATE": null,
                    "APPROVAL_RESULT": "3",
                    "EXPENSE_AMOUNT": 0.0,
                    "CLOSE_DATE": null,
                    "APPLY_FORM_NO": "SQSQ-000260",
                    "PROCESS_ID": "00000000000000000000000000000020200518200305486657boloqrbe8o",
                    "PAY_ITEM_CODE": "10010103",
                    "APPEND_AMOUNT": 0.0,
                    "BUSI_FORM_NO": null,
                    "INDEX_NAME": "特殊岗位津贴",
                    "IS_OVER_BUDGET": "0",
                    "INDEX_TYPE": "1",
                    "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                    "TAX_TYPE": "0",
                    "REASON_DIGEST": "特殊岗位津特殊岗位津特殊岗位津",
                    "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                    "ATTEND_ACOUNT": null,
                    "ARRANGE_TIME": null,
                    "MOBILE": null,
                    "IS_CHANGE": null,
                    "CHANGE_APPLY_ID": null,
                    "OLD_APPLY_ID": null,
                    "CHANGE_REASON": null,
                    "SERVICE_FEE_TYPE": "0",
                    "IS_LOAN": null,
                    "FUND_SOURCE": null,
                    "SETTLE_CODE": null,
                    "ITEM_PAY_ITEM_NAME": "特殊岗位津贴",
                    "PAY_STANDARD_ID": null,
                    "APPROVAL_TYPE": "2",
                    "AGENT_USER_NAME": "kwj",
                    "APPLY_USER_NAME": "kwj",
                    "APPLY_DEPT_NAME": "普通外科病区",
                    "PROCESS_STATE": "6",
                    "PROCESS_ACTIVE_NAME": "任务",
                    "PROCESS_EXC_NAME": "kwj"
                },
                    {
                        "ID": "000000000000000000000000000000201811271817482837888ur1nwhplj",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2018-11-28 08:17:48",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:50",
                        "ORG_CREATE_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2018-11-28 08:17:59",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "FORM_TYPE": "1",
                        "APPLY_REASON": "1",
                        "INDEX_ID": "00000000000000000000000000000020171130172033900ph3nae4jwl1in",
                        "APPLY_AMOUNT": 1010101.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": "2018-11-28 08:45:43",
                        "APPROVAL_RESULT": "2",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000228",
                        "PROCESS_ID": "000000000000000000000000000000201811271817494514316avh0htrhl",
                        "PAY_ITEM_CODE": "1001010101",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "岗位工资",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "1",
                        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "1",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": 0,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": "0",
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "岗位工资",
                        "PAY_STANDARD_ID": null,
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "院办",
                        "PROCESS_STATE": "4",
                        "PROCESS_ACTIVE_NAME": null,
                        "PROCESS_EXC_NAME": ""
                    },
                    {
                        "ID": "00000000000000000000000000000020190929150225005853swr8w9i8qn",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2019-09-30 04:02:25",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:48",
                        "ORG_CREATE_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2019-09-30 04:02:25",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "FORM_TYPE": "1",
                        "APPLY_REASON": null,
                        "INDEX_ID": "00000000000000000000000000000020181217114449300340ted101lajh",
                        "APPLY_AMOUNT": 89.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000251",
                        "PROCESS_ID": "00000000000000000000000000000020190929150225169383j4llia79fl",
                        "PAY_ITEM_CODE": "1001010101",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "人员经费",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "1",
                        "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "哦哦哦哦哦哦哦",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": null,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": null,
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "岗位工资",
                        "PAY_STANDARD_ID": null,
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "6",
                        "PROCESS_ACTIVE_NAME": "任务",
                        "PROCESS_EXC_NAME": "kwj"
                    },
                    {
                        "ID": "00000000000000000000000000000020191112170318034732qd6jfhquko",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2019-11-13 07:03:18",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:48",
                        "ORG_CREATE_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2019-11-13 07:03:18",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "FORM_TYPE": "1",
                        "APPLY_REASON": null,
                        "INDEX_ID": "00000000000000000000000000000020191112170044179645r26vimku7o",
                        "APPLY_AMOUNT": 11.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000252",
                        "PROCESS_ID": "00000000000000000000000000000020191112170318208913r0jainqp9h",
                        "PAY_ITEM_CODE": "2004",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "xx项目",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "2",
                        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183917374fk7a39wf3b21o",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "由摘要由摘要",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": null,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": null,
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "产前检查产后防视",
                        "PAY_STANDARD_ID": null,
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "6",
                        "PROCESS_ACTIVE_NAME": "任务",
                        "PROCESS_EXC_NAME": "kwj"
                    },
                    {
                        "ID": "00000000000000000000000000000020191112170340936216hbsphq305n",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2019-11-13 07:03:41",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:48",
                        "ORG_CREATE_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2019-11-13 07:03:41",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "FORM_TYPE": "1",
                        "APPLY_REASON": null,
                        "INDEX_ID": "00000000000000000000000000000020191112170044179645r26vimku7o",
                        "APPLY_AMOUNT": 22.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000253",
                        "PROCESS_ID": "000000000000000000000000000000201911121703410542318alt3o1rdl",
                        "PAY_ITEM_CODE": "2005",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "xx项目",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "2",
                        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183917374fk7a39wf3b21o",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "由摘要由摘要",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": null,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": null,
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "两癌筛查",
                        "PAY_STANDARD_ID": null,
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "6",
                        "PROCESS_ACTIVE_NAME": "任务",
                        "PROCESS_EXC_NAME": "kwj"
                    },
                    {
                        "ID": "0000000000000000000000000000002019111217052306413810lstwj7un",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2019-11-13 07:05:23",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:48",
                        "ORG_CREATE_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2019-11-13 07:05:39",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "FORM_TYPE": "1",
                        "APPLY_REASON": null,
                        "INDEX_ID": "00000000000000000000000000000020191112170044179645r26vimku7o",
                        "APPLY_AMOUNT": 12.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000255",
                        "PROCESS_ID": "00000000000000000000000000000020191112170539231077n2j584flil",
                        "PAY_ITEM_CODE": "2003",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "xx项目",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "2",
                        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183917374fk7a39wf3b21o",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "由摘要由摘要由摘要",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": null,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": null,
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "三大公共卫生",
                        "PAY_STANDARD_ID": null,
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "6",
                        "PROCESS_ACTIVE_NAME": "任务",
                        "PROCESS_EXC_NAME": "kwj"
                    },
                    {
                        "ID": "00000000000000000000000000000020190531200551747695hbkfalp65m",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2019-06-01 09:05:52",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:47",
                        "ORG_CREATE_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2019-06-01 09:05:52",
                        "APPLY_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
                        "FORM_TYPE": "3",
                        "APPLY_REASON": null,
                        "INDEX_ID": "0000000000000000000000000000002017113017203479405j7okqeqesej",
                        "APPLY_AMOUNT": 400.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000246",
                        "PROCESS_ID": "00000000000000000000000000000020190531200553027042va5poo2mpn",
                        "PAY_ITEM_CODE": "100717",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "公务接待费",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "1",
                        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "呃呃呃呃呃",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": null,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": "0",
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "公务接待费",
                        "PAY_STANDARD_ID": "00000000000000000000000000000020170801155826021h58innpdaj64j",
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "普通外科病区",
                        "PROCESS_STATE": "6",
                        "PROCESS_ACTIVE_NAME": "任务",
                        "PROCESS_EXC_NAME": "kwj"
                    },
                    {
                        "ID": "00000000000000000000000000000020181206212054757832vc1f0cm60k",
                        "USER_CREATE_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "USER_CREATE_NAME": "kwj",
                        "TIME_CREATE": "2018-12-07 11:20:55",
                        "USER_UPDATE_ID": "00000000000000000000000000000020190312102854290724h8250nt7li",
                        "USER_UPDATE_NAME": "dibconfig",
                        "TIME_UPDATE": "2020-05-28 11:03:46",
                        "ORG_CREATE_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "ACCOUNT_SUIT_ID": "00000000000000000000000000000020170407175143cdb3pttp5p2m13to",
                        "BUDGET_YEAR": 2018,
                        "APPLY_DATE": "2018-12-07 11:20:55",
                        "APPLY_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "APPLY_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_USER_ID": "000000000000000000000000000000201806281223358542duhvhnl6o26o",
                        "AGENT_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
                        "FORM_TYPE": "1",
                        "APPLY_REASON": null,
                        "INDEX_ID": "00000000000000000000000000000020180702163007105h2tjutvqj7e3m",
                        "APPLY_AMOUNT": 312.0,
                        "PAY_STANDARD": -1.0,
                        "IS_ABOVE_STANDARD": "0",
                        "APPROVAL_DATE": null,
                        "APPROVAL_RESULT": "3",
                        "EXPENSE_AMOUNT": 0.0,
                        "CLOSE_DATE": null,
                        "APPLY_FORM_NO": "SQSQ-000234",
                        "PROCESS_ID": "00000000000000000000000000000020181206212055137262khlt66cpno",
                        "PAY_ITEM_CODE": "2003",
                        "APPEND_AMOUNT": 0.0,
                        "BUSI_FORM_NO": null,
                        "INDEX_NAME": "测试02",
                        "IS_OVER_BUDGET": "0",
                        "INDEX_TYPE": "2",
                        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
                        "TAX_TYPE": "0",
                        "REASON_DIGEST": "123",
                        "IS_MERGE_PAY_ITEM_EXPENSE": "0",
                        "ATTEND_ACOUNT": 0,
                        "ARRANGE_TIME": null,
                        "MOBILE": null,
                        "IS_CHANGE": "0",
                        "CHANGE_APPLY_ID": null,
                        "OLD_APPLY_ID": null,
                        "CHANGE_REASON": null,
                        "SERVICE_FEE_TYPE": null,
                        "IS_LOAN": "0",
                        "FUND_SOURCE": null,
                        "SETTLE_CODE": null,
                        "ITEM_PAY_ITEM_NAME": "三大公共卫生",
                        "PAY_STANDARD_ID": null,
                        "APPROVAL_TYPE": "2",
                        "AGENT_USER_NAME": "kwj",
                        "APPLY_USER_NAME": "kwj",
                        "APPLY_DEPT_NAME": "院办",
                        "PROCESS_STATE": "6",
                        "PROCESS_ACTIVE_NAME": "任务",
                        "PROCESS_EXC_NAME": "kwj"
                    }];
                // 以下为模拟数据
                // this.data = [
                //     {
                //         id: "1",
                //         name: "XBoot",
                //         createTime: "2018-08-08 00:08:00",
                //         updateTime: "2018-08-08 00:08:00"
                //     },
                //     {
                //         id: "2",
                //         name: "Exrick",
                //         createTime: "2018-08-08 00:08:00",
                //         updateTime: "2018-08-08 00:08:00"
                //     }
                // ];
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
                    content: "您确认要删除 " + v.name + " ?",
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
