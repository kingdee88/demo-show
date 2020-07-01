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
                    <div class="head-name">差旅申请</div>
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
                                  <Input value="演示用户" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="申请部门" prop="name">
                                  <Select
                                          v-model="form.type"
                                          placeholder="请选择"
                                          style="width: 320px"
                                  >
                                    <Option :value="0">行政后勤处</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="申请人电话" prop="name">
                                  <Input value="13109871234" style="width: 320px"/>
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
                           <h4 class="h4-title">费用预算</h4>
                            <Row :gutter="32">
                               <Col span="24">
                                <FormItem label="出差起止日期" prop="name">
                                  <DatePicker
                                          v-model="form.date"
                                          type="daterange"
                                          format="yyyy-MM-dd"
                                          clearable
                                          placeholder="选择安排时间"
                                          style="width: 320px"></DatePicker>
                                </FormItem>
                              </Col>
                                <Col span="24">
                                    <FormItem label="出差天数" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="出差人员" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="出差类型" prop="type">
                                  <Select v-model="form.type2" style="width: 320px">
                                    <Option value="1">考察调研</Option>
                                    <Option value="2">学校交流</Option>
                                    <Option value="3">外出会议</Option>
                                    <Option value="4">外出培训</Option>
                                    <Option value="5">其他公务</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="12">
                               <FormItem label="出差起止地点" prop="type">
                                  <al-selector v-model="resArr" :level="1" class="area-select" style="width: 320px"/>
                                </FormItem>
                              </Col>
                              <Col span="12">
                               <FormItem label="至" prop="type">
                                  <al-selector v-model="resArr" :level="1" class="area-select" style="width: 320px"/>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="交通工具" prop="type">
                                  <Select style="width: 320px" @on-change="jt">
                                    <Option value="1">火车</Option>
                                    <Option value="2">飞机</Option>
                                    <Option value="3">轮船</Option>
                                    <Option value="4">其他交通工具</Option>
                                    <Option value="5">单位公务用车</Option>

                                  </Select>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="交通工具等级" prop="type">
                                  <Select v-model="form.grade" style="width: 320px">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    <!-- <Option value="1">火车软席(软座、软卧)，高铁/动车商务座，全列软席列车一等软座</Option>
                                    <Option value="2">火车软席(软座、软卧)，高铁/动车一等座，全列软席列车一等软座</Option>
                                    <Option value="3">火车软席(硬座、硬卧)，高铁/动车二等座，全列软席列车二等软座</Option> -->
                                  </Select>
                                </FormItem>
                              </Col>

                              <Col span="12">
                                <FormItem label="伙食费用安排" prop="type">
                                  <Select v-model="form.grade" style="width: 320px">
                                    <Option value="1">自行解决</Option>
                                    <Option value="2">统一安排费用自理</Option>
                                    <Option value="3">对方统一安排</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="住宿费用安排" prop="type">
                                  <Select v-model="form.grade" style="width: 320px">
                                    <Option value="1">自行解决</Option>
                                    <Option value="1">对方统一安排</Option>
                                  </Select>
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
                    <Col :xl="3" :xxl="8">
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
                    type2:"1"
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              cityList: [],
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
            jt (v) {
              console.log(v);
              if(v === '1'){
                this.cityList = [
                  {
                    value : "1",
                    label : "火车软席(软座、软卧)，高铁/动车商务座，全列软席列车一等软座"
                  },
                  {
                    value: "2",
                    label: "火车软席(软座、软卧)，高铁/动车一等座，全列软席列车一等软座"
                  },
                  {
                    value: "3",
                    label: "火车软席(硬座、硬卧)，高铁/动车二等座，全列软席列车二等软座"
                  }
                ];
              }else if(v === '2'){
                this.cityList = [
                  {
                    value : "1",
                    label : "头等舱"
                  },
                  {
                    value: "2",
                    label: "商务舱"
                  },
                  {
                    value: "3",
                    label: "经济舱"
                  }
                ];
              }else if(v === '3'){
                this.cityList = [
                  {
                    value : "1",
                    label : "一等舱"
                  },
                  {
                    value: "2",
                    label: "二等舱"
                  },
                  {
                    value: "3",
                    label: "三等舱"
                  }
                ];
              }else if(v === '4'){
                this.cityList = [
                  {
                    value : "1",
                    label : "其他"
                  }
                ];
              }else if(v === '5'){
                this.cityList = [
                  {
                    value : "1",
                    label : "单位公务车辆"
                  }
                ];
              }
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
