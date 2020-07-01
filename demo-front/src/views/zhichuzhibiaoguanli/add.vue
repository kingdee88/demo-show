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
                    <div class="head-name">支出指标管理</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <Row :gutter="24">
                                <Col span="12">
                                    <FormItem label="预算年度" prop="itemName">
                                      <label>2020</label>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="指标类型" prop="type">
                                    <Select v-model="form.type"
                                          placeholder="指标类型" clearable style="width: 200px">
                                          <Option value="1">非项目指标</Option>
                                  </Select>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="支出事项" prop="name">
                                  <Input v-model="form.name" style="width: 320px">

                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="指标部门" prop="name">
                                  <Input v-model="form.name" style="width: 320px">

                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="归口部门" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="责任人" prop="name">
                                  <Input v-model="form.name" style="width: 320px">
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="是否公共指标" prop="public">
                                    <Select v-model="form.public"
                                          placeholder="指标类型" clearable style="width: 200px">
                                          <Option value="1">是</Option>
                                          <Option value="0">否</Option>
                                  </Select>
                                </FormItem>
                              </Col>

                              <Col span="12">
                                <FormItem label="控制方式" prop="public">
                                    <Select v-model="form.public"
                                          placeholder="控制方式" clearable style="width: 200px">
                                          <Option value="0">刚性控制(不允许超标)</Option>
                                  </Select>
                                </FormItem>
                              </Col>



                               <Col span="12">
                                <FormItem label="指标来源" prop="source">
                                    <Select v-model="form.source"
                                          placeholder="请选择" clearable style="width: 200px">
                                          <Option value="1">上年结转</Option>
                                          <Option value="2">年初预算</Option>
                                          <Option value="3">追加预算</Option>
                                  </Select>
                                </FormItem>
                              </Col>

                              <Col span="12">
                                 <FormItem label="批复日期" prop="date">
                                    <DatePicker v-model="form.date"
                                        type="date"
                                        format="yyyy-MM-dd"
                                        clearable
                                        placeholder="选择安排时间"
                                        style="width: 320px"></DatePicker>
                                 </FormItem>
                              </Col>

                               <Col span="12">
                                    <FormItem label="预算金额" prop="fee">
                                         <Input v-model="form.fee" style="width: 320px" />
                                    </FormItem>
                                </Col>
                                 <Col span="12">
                                    <FormItem label="财政资金项目" prop="fee">
                                         <Input v-model="form.fee" style="width: 320px" />
                                    </FormItem>
                                </Col>
                                 <Col span="12">
                                    <FormItem label="指标说明" prop="fee">
                                         <Input v-model="form.fee" style="width: 320px" />
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
                    type:"1",
                    public:"0",
                    itemName: "支出事项分类",
                    money:1,
                    parentItemName:"秘书处经费",
                    departmentName:"普通外科病区"
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              columns: [
                {
                  title: "支出事项名称",
                  key: "title",
                  minWidth: 200
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
