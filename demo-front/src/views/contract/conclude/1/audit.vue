<style lang="less">
    @import "../../../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back"/>
                        返回
                    </a>
                    <div class="head-name">事前申请审核</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row class="operation">
                    <Button
                            @click="delAll"
                            icon="ios-checkmark-circle"
                    >批量同意</Button>
                    <Button
                            @click="delAll"
                            icon="md-close-circle"
                    >批量不同意</Button>
                    <Button icon="md-refresh">刷新</Button>
                    <Button
                            type="dashed"
                            @click="openSearch=!openSearch"
                    >{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
                </Row>
                <Row class="operation">
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
                   label="申请类型"
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
                                      label="申请金额"
                                      prop="sex"
                              >
             <Input
                     type="text"
                     v-model="searchForm.username"
                     clearable
                     placeholder=""
                     style="width: 100px"
             />~<Input
                                      type="text"
                                      v-model="searchForm.username"
                                      clearable
                                      placeholder=""
                                      style="width: 100px"
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
                </Row>
            </Card>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "add",
        data() {
            return {
                submitLoading: false, // 表单提交状态
                form: {
                    id: "",
                    name: ""
                },
                openSearch: true,
                drop: false,
                dropDownContent: "展开查询",
                dropDownIcon: "ios-arrow-down",
                formData: {},
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
                    pageSize: 10,
                    sort: "createTime",
                    order: "desc",
                    startDate: "",
                    endDate: ""
                },
                currView: "index",
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                data: [],
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    },
                    {
                        title: "申请单号",
                        key: "title",
                        minWidth: 150
                    },
                    {
                        title: "预算指标",
                        key: "value",
                        width: 150
                    },
                    {
                        title: "支出事项",
                        key: "value",
                        width: 150
                    },
                    {
                        title: "申请金额",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "申请类型",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "申请部门",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "申请人",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "经办人",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "申请事由",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "申请日期",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "申请状态",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "当前操作环节",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "当前操作人",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "操作",
                        key: "description",
                        width: 150
                    }
                ]
            };
        },
        methods: {
            init() {
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
            handleReset() {
                this.$refs.form.resetFields();
            },
            handleSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // this.postRequest("请求路径", this.form).then(res => {
                        //   this.submitLoading = false;
                        //   if (res.success) {
                        //     this.$Message.success("添加成功");
                        //     this.submited();
                        //   }
                        // });
                        // 模拟成功
                        this.submitLoading = false;
                        this.$Message.success("添加成功");
                        this.submited();
                    }
                });
            },
            close() {
                this.$emit("close", true);
            },
            submited() {
                this.$emit("submited", true);
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
