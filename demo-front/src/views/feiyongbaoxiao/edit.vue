<style lang="less">
    @import "../../styles/single-common.less";
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
                    <div class="head-name">借款申请</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                 <p class="show-info">经办人部门：{{form.APPLY_DEPT_NAME}}   经办人：test11   申请日期：{{form.TIME_CREATE}}   报销单编号：送审后自动生成</p>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">报销基本信息</h4>
                            <Row :gutter="32">
                               <Col span="12">
                                    <FormItem label="关联事先申请">
                                      <Input style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="关联行政申请">
                                      <Input style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="借款人">
                                      <Input style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="借款部门">
                                      <Input style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="本次借款金额">
                                    <Input style="width: 320px"/>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="待还款金额" prop="name">
                                  <Input style="width: 320px"/>
                                </FormItem>
                              </Col>
                               <Col span="24">
                                <FormItem label="结算方式" prop="name">
                                  <CheckboxGroup >
                                    <Checkbox label="现金"></Checkbox>
                                    <Checkbox label="网银转账"></Checkbox>
                                    <Checkbox label="支票"></Checkbox>
                                    <Checkbox label="公务卡"></Checkbox>
                                </CheckboxGroup>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="事由摘要" prop="name">
                                  <Input style="width: 320px"/>
                                </FormItem>
                              </Col>
                               <Col span="24">
                                <FormItem label="详细事由" prop="name">
                                    <Input
                                            type="textarea"
                                            :rows="4"
                                    />
                                </FormItem>
                                </Col>
                            </Row>
                            
                            <h4 class="h4-title">收款方信息</h4>
                            <Table
                                  border
                                  :columns="columns4"
                                  :data="data4"
                                  sortable="custom"
                                  ref="table"
                                ></Table>
                            <h4 class="h4-title">附件上传</h4>
                                <Table
                                  style="margin-bottom: 20px"
                                  border
                                  :columns="columns5"
                                  :data="data5"
                                  sortable="custom"
                                  ref="table"
                                ></Table>
                            <Form-item class="br">
                                <Button
                                        @click="handleSubmit"
                                        :loading="submitLoading"
                                        type="primary"
                                >送审
                                </Button>
                                <Button @click="handleReset">重置</Button>
                                <Button type="dashed" @click="close">关闭</Button>
                            </Form-item>
                        </Form>
                    </Col>
                    <Col span="8">
                        <div class="operation">
                          <div class="s-modal">
                            <h4 class="h4-title">相关制度</h4>
                            <div class="content">无</div>
                          </div>
                        </div>
                    </Col>
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
                    TIME_CREATE: "2020-07-01",
                    APPLY_DEPT_NAME: "外科病区"

                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                data4: [],
                data5:[],
              columns4: [
                  {
                      title: "收款方",
                      key: "a"
                  },
                  {
                      title: "开户银行网点名称",
                      key:"b"
                  },
                  {
                      title: "银行账户",
                      key: "c"
                  },
                  {
                      title: "支付系统银行行号",
                      key: "d"
                  },
                  {
                      title: "应付金额(元)",
                      key: "e"
                  },
                  {
                      title: "结算方式",
                      key: "f"
                  },
                  {
                      title: "操作",
                      key: "g"
                  }
              ],
              columns5: [{
                    title:"附件类型",
                    key:"a"
                },{
                    title:"文件名",
                    key:"b"
                },{
                    title:"操作",
                    key: "c"
                }],
            };
        },
        methods: {
            init() {
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
