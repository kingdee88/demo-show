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
                    <div class="head-name">固定资产报障单</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="fault" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="报障单号" prop="name">
                                        <Input v-model="fault.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报障时间" prop="date">
                                        <Input v-model="fault.date" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报障人" prop="ruser">
                                        <Input v-model="fault.ruser" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报障部门" prop="rdepartment">
                                        <Input v-model="fault.rdepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产编号" prop="acode">
                                        <Input v-model="fault.acode" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产名称" prop="aname">
                                        <Input v-model="fault.aname" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用人" prop="uuser">
                                        <Input v-model="fault.uuser" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用部门" prop="udepartment">
                                        <Input v-model="fault.udepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="存在问题" prop="note">
                                        <Input type="textarea" v-model="fault.note" :rows="4"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Form-item class="br">
                                <Button @click="handleSubmit" :loading="submitLoading" type="primary">
                                    保存
                                </Button>
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
                fault: {
                    id: "", name: "系统自动生成单号",
                    date: new Date().getFullYear() + '-' +(new Date().getMonth()+1) + '-' + new Date().getDate(),
                    ruser: 'kwj', rdepartment: '普通外科病区'
                }
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
