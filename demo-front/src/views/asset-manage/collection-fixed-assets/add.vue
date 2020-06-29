<style lang="less">
    @import "../../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back"/> 返回
                    </a>
                    <div class="head-name">资产领用单</div>
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
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="领用人" prop="user">
                                      <Input v-model="picking.user" style="width: 320px">
                                        <Button slot="append" icon="ios-person"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="领用部门" prop="department">
                                  <Input v-model="picking.department" style="width: 320px">
                                    <Button slot="append" icon="ios-home"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                                <Col span="12">
                                    <FormItem label="领用日期" prop="pdate">
                                        <DatePicker
                                                v-model="picking.pdate"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="领用日期"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                              <Col span="24">
                                <FormItem label="备注" prop="note">
                                    <Input type="textarea" v-model="picking.note" :rows="4"/>
                                </FormItem>
                              </Col>
                            </Row>
                            <h4 class="h4-title">领用资产信息</h4>
                            <Form-item class="br">
                                <Button @click="handleSubmit" type="default" style="margin-left: -120px;">
                                    选择领用资产
                                </Button>
                            </Form-item>
                            <Table border :columns="columns" :data="data" sortable="custom" ref="table"></Table>
                            <Form-item class="br">
                                <Button @click="handleSubmit" :loading="submitLoading" type="default">
                                    暂存
                                </Button>
                                <Button type="dashed" @click="close">关闭</Button>
                                <Button @click="handleSubmit" :loading="submitLoading" type="primary">
                                    送审
                                </Button>
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
                picking: {
                    id: "",
                    name: ""
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
              data: [],
              columns: [
                  {title: "资产编号", key: "code", minWidth: 200},
                  {title: "资产名称", key: "name", width: 200},
                  {title: "资产财务分类", key: "acategory", width: 150},
                  {title: "规格型号", key: "model", width: 150},
                  {title: "单位", key: "uom", width: 150},
                  {title: "资产原值(元)", key: "avalue", width: 150},
                  {title: "操作", key: "operation", width: 200}
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
