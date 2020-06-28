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
                    <div class="head-name">部门</div>
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
                                    <FormItem label="支出事项分类" prop="name">
                                      <Input v-model="form.name" style="width: 320px">
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="是否末级" prop="name">
                                  <RadioGroup v-model="form.money">
                                    <Radio  :label="0">否</Radio>
                                    <Radio  :label="1" >是</Radio>
                                  </RadioGroup>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="事项编码" prop="name">
                                  <Input v-model="form.name" style="width: 320px">

                                  </Input>
                                </FormItem>
                              </Col>
                               <Col span="12">
                                <FormItem label="事项名称" prop="name">
                                  <Input v-model="form.name" style="width: 320px">

                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="上级事项名称" prop="name">
                                  <Input v-model="form.parentItemName" style="width: 320px" readonly>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="归口部门" prop="name">
                                 <Input v-model="form.departmentName" style="width: 320px" readonly>
                                  </Input>
                                </FormItem>
                              </Col>

                              <Col span="12">
                                <FormItem label="归口编制" prop="name">
                                  <RadioGroup v-model="form.money">
                                    <Radio  :label="0">否</Radio>
                                    <Radio  :label="1" >是</Radio>
                                  </RadioGroup>
                                </FormItem>
                              </Col>
                              <Col span="24">
                                <FormItem label="事项定义" prop="name">
                                  <Input
                                          type="textarea"
                                          v-model="form.description"
                                          :rows="4"
                                  />
                                </FormItem>
                              </Col>
                            </Row>
                           <h4 class="h4-title">开支范围</h4>
                          <Table
                                  style="margin-bottom: 20px"
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
