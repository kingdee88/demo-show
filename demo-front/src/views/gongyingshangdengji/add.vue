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
                    <div class="head-name">供应商登记单</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col :xl="21" :xxl="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="采购订单号" prop="name">
                                      送审后自动生成
                                    </FormItem>
                                </Col>
                                  <Col span="12">
                                    <FormItem label="项目名称" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="采购申请单" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="经办人" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="经办部门" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                                <Col span="登记日期">
                                <FormItem label="登记日期" prop="name">
                                  <DatePicker
                                          v-model="form.date"
                                          type="date"
                                          format="yyyy-MM-dd"
                                          clearable
                                          placeholder="选择时间"
                                          style="width: 320px"
                                  ></DatePicker>
                                </FormItem>
                              </Col>
                                <Col span="采购说明">
                                <FormItem label="备注" prop="name">
                                  <Input
                                          type="textarea"
                                          v-model="form.description"
                                          :rows="4"
                                  />
                                </FormItem>
                              </Col>

                            </Row>
                            <h4 class="h4-title">供应商信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="供应商" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                  <Col span="12">
                                    <FormItem label="社会统一信用代码" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="联系人" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="电话" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="单位地址" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                                <Col span="12">
                                <FormItem label="法定代表人" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="注册地类型" prop="name">
                                    <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                  </Select>
                                </FormItem>
                              </Col>
                                  <Col span="12">
                                <FormItem label="企业规模" prop="name">
                                    <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                  </Select>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="开户行名称" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="开户行账号" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="24">
                                <FormItem label="采购预算金额(元)" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="24">
                                <FormItem label="采购金额(元)" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="结余金额(元)" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="结余资金率" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>


                            </Row>
                           <h4 class="h4-title">采购信息</h4>
                          <Table
                                  border
                                  :columns="columns"
                                  :data="data"
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
                    <Col :xl="3" :xxl="8">
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
                    name: ""
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              columns: [
                {
                  title: "采购品目",
                  key: "title",
                  minWidth: 150
                },
                {
                  title: "品目名称",
                  key: "value",
                  width: 150
                },
                {
                  title: "名称",
                  key: "value",
                  width: 150
                },
                {
                  title: "规格型号",
                  key: "value",
                  width: 150
                },
                {
                  title: "技术参数",
                  key: "value",
                  width: 150
                }
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
