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
                    <div class="head-name">合同阶段变更申请</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col :xl="21" :xxl="16"  style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="合同编号" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="合同名称" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="合同分类" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请日期" prop="name">
                                  <DatePicker
                            v-model="form.date"
                            type="date"
                            format="yyyy-MM-dd"
                            clearable
                            placeholder="选择申请日期"
                            style="width: 280px"
                        ></DatePicker>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请人" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请部门" prop="name">
                                  <Select v-model="form.money" style="width: 320px">
                                    <Option value="1">HT-秘书处</Option>
                                </Select>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="原合同金额" prop="name">
                                   <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                                <Col span="12">
                                <FormItem label="合同金额(元)" prop="name">
                                   <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="变更说明" prop="name">
                                  <Input
                                          type="textarea"
                                          v-model="form.description"
                                          :rows="4"
                                  />
                                </FormItem>
                              </Col>
                            </Row>
                           <h4 class="h4-title">付款计划</h4>
                          <Table
                                  border
                                  :columns="columns"
                                  :data="data"
                                  sortable="custom"
                                  ref="table"
                          ></Table>
                          <div class="sum-text">
                            金额(合计):
                          </div>
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
                    <Col :xl="3" :xxl="8" >
                        <div class="operation">
                          <div class="s-modal">
                            <h4 class="h4-title">风险提示</h4>
                            <div class="content">无</div>
                          </div>
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
                    name: "",
                    money:"1"
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              columns: [
                {
                  title: "阶段类型",
                  key: "title",
                  minWidth: 150
                },
                {
                  title: "阶段名称",
                  key: "value",
                  width: 150
                },
                {
                  title: "付款条件",
                  key: "value",
                  width: 150
                },
                {
                  title: "预计付款日期",
                  key: "value",
                  width: 150
                },
                {
                  title: "付款金额(元)",
                  key: "value",
                  width: 150
                },
                {
                  title: "操作",
                  key: "value",
                  width: 150
                },
              ],
              columns2: [
                {
                  title: "附件类型",
                  key: "title",
                  minWidth: 150
                },
                {
                  title: "文件名",
                  key: "value"
                },
                {
                  title: "操作",
                  key: "value",
                  width: 150
                }
              ]
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
