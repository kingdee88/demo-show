<style lang="less">
    @import "../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back"/> 返回
                    </a>
                    <div class="head-name">资产处置单</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="apply" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="申请单号" prop="name">
                                        {{apply.name}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请日期" prop="date">
                                        {{apply.date}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请人" prop="aman">
                                        {{apply.aman}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请部门" prop="adepartment">
                                        {{apply.adepartment}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="处置方式" prop="method">
                                        <Select v-model="apply.method" placeholder="请选择">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="接收单位" prop="rcompany">
                                        <Input v-model="apply.rcompany" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="接收人" prop="rman">
                                        <Input v-model="apply.rman" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话" prop="phonenumber">
                                        <Input v-model="apply.phonenumber" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="申请理由" prop="description">
                                        <Input type="textarea" v-model="apply.description" :rows="4"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">资产信息</h4>
                            <Form-item class="br">
                                <Button type="default" style="margin-left: -120px;">
                                    选择资产
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
                apply: {
                    id: "", name: "送审后自动生成", method: 0,
                    date: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
                    aman: 'kwj', adepartment: '普通外科病区'
                },
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}],
                    method: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                data: [],
                columns: [
                    {title: "资产编号", key: "code", minWidth: 200},
                    {title: "资产名称", key: "name", width: 200},
                    {title: "处置费用(元)", key: "camount", width: 150},
                    {title: "处置收入(元)", key: "cincome", width: 150},
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
