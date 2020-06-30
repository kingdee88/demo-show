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
                    <div class="head-name">资产调拨申请单</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="allocation" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="申请单号" prop="name">
                                        {{allocation.name}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请日期" prop="date">
                                        {{allocation.date}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请人" prop="user">
                                        {{allocation.user}}
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="申请部门" prop="department">
                                        {{allocation.department}}
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="申请理由" prop="note">
                                        <Input type="textarea" v-model="allocation.note" :rows="4"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">资产调拨信息</h4>
                            <Form-item class="br">
                                <Button @click="handleSubmit" type="default" style="margin-left: -120px;">
                                    资产调拨
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
                allocation: {
                    id: "", name: "送审后自动生成",
                    date: new Date().getFullYear() + '-' +(new Date().getMonth()+1) + '-' + new Date().getDate(),
                    user: 'kwj', department: '普通外科病区'
                },
              data: [],
              columns: [
                  {title: "资产编号", key: "code", minWidth: 200},
                  {title: "资产名称", key: "name", width: 200},
                  {title: "原使用部门", key: "odepartment", width: 150},
                  {title: "原责任人", key: "ohandler", width: 150},
                  {title: "原使用人", key: "ouser", width: 150},
                  {title: "原存放地点", key: "oaddress", width: 150}
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
