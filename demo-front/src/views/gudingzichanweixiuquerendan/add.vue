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
                    <div class="head-name">资产维修确认单</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row type="flex" justify="space-between" :gutter="32">
                    <Col span="24" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
                        <Form ref="form" :model="confirm" :label-width="120" :rules="formValidate">
                            <h4 class="h4-title">基本信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="维修单号" prop="name">
                                        <Input v-model="confirm.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修经办人" prop="roperator">
                                        <Input v-model="confirm.roperator" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="经办人部门" prop="rdepartment">
                                        <Input v-model="confirm.rdepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修来源" prop="rorigin">
                                        <RadioGroup v-model="confirm.rorigin">
                                            <Radio :label="0">维修申请</Radio>
                                            <Radio :label="1">报障</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修申请单号" prop="applycode">
                                        <Input v-model="confirm.applycode" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmark"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修资产编号" prop="acode">
                                        <Input v-model="confirm.acode" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修资产名称" prop="aname">
                                        <Input v-model="confirm.aname" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修时间" prop="atime">
                                        <Input v-model="confirm.atime" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修部门" prop="adepartment">
                                        <Input v-model="confirm.adepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用人" prop="uman">
                                        <Input v-model="confirm.uman" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用部门" prop="udepartment">
                                        <Input v-model="confirm.udepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="确认人" prop="cman">
                                        <Input v-model="confirm.cman" style="width: 320px">
                                            <Button slot="append" icon="ios-person"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="确认时间" prop="ctime">
                                        <DatePicker
                                                v-model="confirm.ctime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="确认时间"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">维修信息</h4>
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="故障原因说明" prop="description">
                                        <Input type="textarea" v-model="confirm.description" :rows="4"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="维修类别" prop="rtype">
                                        <Select v-model="confirm.rtype" placeholder="请选择" style="width: 320px">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修开始时间" prop="rstime">
                                        <DatePicker
                                                v-model="confirm.rstime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="维修开始时间"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修结束时间" prop="retime">
                                        <DatePicker
                                                v-model="confirm.retime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="维修结束时间"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修方" prop="ruser">
                                        <Input v-model="confirm.ruser" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话" prop="rphonenumber">
                                        <Input v-model="confirm.rphonenumber" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="维修情况" prop="rdetail">
                                        <Input type="textarea" v-model="confirm.rdetail" :rows="4"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="维修地点" prop="raddress">
                                        <Input v-model="confirm.raddress"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="预计维修费(元)" prop="pramount">
                                        <Input v-model="confirm.pramount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="实际维修费(元)" prop="aramount">
                                        <Input v-model="confirm.aramount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="费用说明" prop="adescription">
                                        <Input v-model="confirm.adescription"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="验收说明" prop="checknote">
                                        <Input type="textarea" v-model="confirm.checknote" :rows="4"/>
                                    </FormItem>
                                </Col>
                            </Row>
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
                confirm: {
                    id: "", name: "送审后自动生成", rorigin: 0, rtype: 0,
                    roperator: 'kwj', rdepartment: '普通外科病区', expired: 0
                },
                formValidate: {
                    applycode: [{required: true, message: "不能为空", trigger: "blur"}],
                    rstime: [{required: true, message: "不能为空", trigger: "blur"}],
                    retime: [{required: true, message: "不能为空", trigger: "blur"}],
                    rtype: [{required: true, message: "不能为空", trigger: "blur"}],
                    ruser: [{required: true, message: "不能为空", trigger: "blur"}],
                    aramount: [{required: true, message: "不能为空", trigger: "blur"}]
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
