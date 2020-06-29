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
                    <div class="head-name">指标调整申请</div>
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
                                <FormItem label="申请单号" prop="name">
                                  <Input v-model="form.name" style="width: 320px" placeholder="送审后生成审批单号" readonly>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="指标名称" prop="name">
                                  <Input v-model="form.name" style="width: 320px" >
                                  </Input>
                                </FormItem>
                              </Col>
                                <Col span="24">
                                  <FormItem label="调整金额(元)" prop="itemName">
                                      <Select v-model="form.type"
                                          placeholder="指标类型" clearable style="width: 100px">
                                          <Option value="1">增加</Option>
                                          <Option value="2">减少</Option>
                                     </Select>
                                     <Input v-model="form.name" style="width: 320px"  placeholder="单位为:元"> </Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="指标总额(元)" prop="type">
                                   <label>0.00</label>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="指标可用额(元)" prop="type">
                                   <label>0.00</label>
                                </FormItem>
                              </Col>
                             
                                 <Col span="12">
                                    <FormItem label="调整说明" prop="note">
                                        <Input type="textarea" v-model="form.note" :rows="4"/>
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
                    parentItemName:"院办经费",
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
