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
                    <div class="head-name">开评标</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="招标文件" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                  <Col span="12">
                                    <FormItem label="采购项目" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="采购编号" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="开标评审费" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请人" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请部门" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                    <Option :value="0" selected>普通外科病区</Option>
                                    <Option :value="1">呼吸科</Option>
                                    <Option :value="2">泌尿科</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                                <Col span="12">
                                <FormItem label="开标/开始时间" prop="name">
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
                                <Col span="12">
                                <FormItem label="开标/结束时间" prop="name">
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
                               <Col span="24">
                                <FormItem label="开标/询价地点" prop="name">
                                  <Input v-model="form.name" style="width: 320px" placeholder="请输入至少5个字符"/>
                                </FormItem>
                              </Col>
                                <Col span="12">
                                <FormItem label="评价结果公示时间" prop="name">
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
                                <Col span="12">
                                <FormItem label="公示周期(天)" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="公示网址" prop="name">
                                  <Input v-model="form.name" style="width: 320px" placeholder="请输入至少5个字符"/>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="开标结果" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                    <Option :value="0" selected>完成采购</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                                <Col span="24">
                                <FormItem label="备注" prop="name">
                                  <Input
                                          type="textarea"
                                          v-model="form.description"
                                          :rows="4"
                                  />
                                </FormItem>
                              </Col>
                              
                            </Row>
                           <h4 class="h4-title">评标人员</h4>
                          <Table
                                  border
                                  :columns="columns"
                                  :data="data"
                                  sortable="custom"
                                  ref="table"
                          ></Table>
                           <h4 class="h4-title">附件上传</h4>
                          <Table
                                  style="margin-bottom: 20px"
                                  border
                                  :columns="columns2"
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
                    name: ""
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              columns: [
                {
                  title: "专家姓名",
                  key: "title",
                  minWidth: 150
                },
                {
                  title: "专家类型",
                  key: "value",
                  width: 150
                },
                {
                  title: "操作",
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
