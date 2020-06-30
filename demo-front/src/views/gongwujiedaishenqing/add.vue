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
                    <div class="head-name">公务接待申请</div>
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
                            <h4 class="h4-title">申请基本信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="关联行政申请" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
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
                                    <Option :value="0">普通外科病区</Option>
                                    <Option :value="1">呼吸科</Option>
                                    <Option :value="2">泌尿科</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="申请人电话" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="预算指标" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-pricetag"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="指标可用金额" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="拟安排时间" prop="name">
                                  <DatePicker
                                          v-model="form.date"
                                          type="daterange"
                                          format="yyyy-MM-dd"
                                          clearable
                                          placeholder="选择安排时间"
                                          style="width: 320px"
                                  ></DatePicker>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="拟参与人数" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="是否需借款" prop="name">
                                  <RadioGroup v-model="form.money">
                                    <Radio  :label="0">否</Radio>
                                    <Radio  :label="1">是</Radio>
                                  </RadioGroup>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="事由摘要" prop="name">
                                  <Input v-model="form.name" style="width: 320px" placeholder="请输入至少5个字符"/>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="申请事务" prop="name">
                                  <Input
                                          type="textarea"
                                          v-model="form.description"
                                          :rows="4"
                                  />
                                </FormItem>
                              </Col>
                            </Row>
                           <h4 class="h4-title">接待信息</h4>
                          <Row :gutter="32">
                                
                              <Col span="12">
                                <FormItem label="接待对象单位" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="接待等级" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                    <Option value="0">普通接待</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="接待日期" prop="name">
                                  <DatePicker
                                          v-model="form.date"
                                          type="daterange"
                                          format="yyyy-MM-dd"
                                          clearable
                                          placeholder="选择接待日期"
                                          style="width: 320px"
                                  ></DatePicker>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="接待天数" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="接待对象人数" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="接待就餐安排" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                    <Option value="0">工作餐</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="接待就餐地点" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                  >
                                    <Option value="0">单位食堂</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="地点说明" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-pricetag"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="陪餐人员" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="陪餐人数" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                            </Row>
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
                            <h4 class="h4-title">风险提示</h4>
                            <div class="content">无</div>
                          </div>
                          <div class="s-modal">
                            <h4 class="h4-title">相关制度</h4>
                            <div class="content">无</div>
                          </div>
                          <div class="s-modal">
                            <h4 class="h4-title">预算指标情况</h4>
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
                    type:"0"
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              columns: [
                {
                  title: "费用明细",
                  key: "title",
                  minWidth: 150
                },
                {
                  title: "开支标准",
                  key: "value",
                  width: 150
                },
                {
                  title: "申请金额(元)",
                  key: "value",
                  width: 150
                },
                {
                  title: "备注",
                  key: "description"
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
