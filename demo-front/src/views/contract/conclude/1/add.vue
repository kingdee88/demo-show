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
                    <div class="head-name">合同拟订申请单</div>
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
<!--                            <h4 class="h4-title">申请基本信息</h4>-->
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="合同编号" prop="name">
                                        <Input v-model="form.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="合同名称" prop="name">
                                        <Input v-model="form.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="合同分类" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请日期" prop="name">
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
                                    <FormItem label="合同标识号" prop="name">
                                        <Input v-model="form.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否开口合同" prop="name">
                                        <RadioGroup v-model="form.money">
                                            <Radio  :label="0">否</Radio>
                                            <Radio  :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="采购订单号" prop="name">
                                        <Input v-model="form.name" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="采购项目名称" prop="name">
                                  <Input v-model="form.name" style="width: 320px" />
                                </FormItem>
                              </Col>
                                <Col span="12">
                                    <FormItem label="采购性质" prop="name">
                                        <Input v-model="form.name" style="width: 320px" />
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="采购方式" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                          style="width: 320px"
                                  >
                                      <Option value="1">公开招标</Option>
                                      <Option value="2">邀请招标</Option>
                                      <Option value="3">竞争性谈判</Option>
                                      <Option value="4">单一来源采购</Option>
                                      <Option value="5">询价</Option>
                                      <Option value="6">竞争性磋商</Option>
                                      <Option value="7">批量集中采购</Option>
                                      <Option value="8">协议供货</Option>
                                      <Option value="9">定点采购</Option>
                                      <Option value="10">网上竞价</Option>
                                      <Option value="11">电子卖场</Option>
                                      <Option value="12">单独项目委托</Option>
                                      <Option value="14">其他</Option>
                                      <Option value="15">公开遴选</Option>
                                      <Option value="16">邀请遴选</Option>
                                      <Option value="17">谈判遴选</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请人" prop="name">
                                  <Input v-model="form.name" style="width: 320px"/>
                                </FormItem>
                              </Col>
                                <Col span="12">
                                    <FormItem label="申请部门" prop="name">
                                        <Input v-model="form.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="开始日期" prop="name">
                                        <DatePicker
                                                v-model="form.dateStart"
                                                type="daterange"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="选择安排时间"
                                                style="width: 320px"
                                        ></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="结束日期" prop="name">
                                        <DatePicker
                                                v-model="form.dateEnd"
                                                type="daterange"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="选择安排时间"
                                                style="width: 320px"
                                        ></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="合同金额(元)" prop="name">
                                        <Input v-model="form.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="合同份数" prop="name">
                                        <Input v-model="form.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="合同说明" prop="name">
                                        <Input v-model="form.name" style="width: 320px" placeholder="请输入至少5个字符"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否制式合同" prop="name">
                                        <RadioGroup v-model="form.contact">
                                            <Radio  :label="0">否</Radio>
                                            <Radio  :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否重大合同" prop="name">
                                        <RadioGroup v-model="form.bbbb">
                                            <Radio  :label="0">否</Radio>
                                            <Radio  :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否需审计" prop="name">
                                        <RadioGroup v-model="form.bbbbc">
                                            <Radio  :label="0">否</Radio>
                                            <Radio  :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Tabs value="name1">
                                <TabPane label="合同信息及资料" name="name1">
                                    <FormItem label="合同文本" prop="name">
                                      <Upload action="">
                                          <Button icon="ios-cloud-upload-outline">合同文本</Button>
                                      </Upload>
                                    </FormItem>
                                    <FormItem label="签约单位资料">
                                        <Upload action="">
                                            <Button icon="ios-cloud-upload-outline">签约单位资料</Button>
                                        </Upload>
                                    </FormItem>
                                    <FormItem label="其他资料">
                                        <Upload action="">
                                            <Button icon="ios-cloud-upload-outline">其他资料</Button>
                                        </Upload>
                                    </FormItem>
                                </TabPane>
                                <TabPane label="付款计划" name="name2">
                                    <Table
                                            border
                                            :columns="columns"
                                            :data="data"
                                            sortable="custom"
                                            ref="table"
                                    ></Table>
                                    <div class="sum-text">
                                        申请金额：零元整 0.00
                                    </div>
                                </TabPane>
                                <TabPane label="签约方信息" name="name3">
                                    <Col span="12">
                                        <FormItem label="签约方名称" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="签约方类型" prop="name">
                                            <Select
                                                    v-model="form.partyType"
                                                    placeholder="请选择"
                                                    style="width: 320px"
                                            >
                                                <Option value="1">单位</Option>
                                                <Option value="2">个人</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="开户银行" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="银行账号" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="联系人" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="联系电话" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="法定代表人" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="公司地址" prop="name">
                                            <Input v-model="form.name" style="width: 320px"/>
                                        </FormItem>
                                    </Col>
                                </TabPane>
                            </Tabs>
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
                          <!--<div class="s-modal">
                            <h4 class="h4-title">预算指标情况</h4>
                            <div class="content">无</div>
                          </div>-->
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
                      title: "已申请付款金额",
                      key: "value",
                      width: 150
                  },
                  {
                      title: "操作",
                      key: "description",
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
