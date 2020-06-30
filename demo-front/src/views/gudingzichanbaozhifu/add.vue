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
                    <div class="head-name">固定资产维保支付</div>
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
                                <Col span="24">
                                    <FormItem label="申请单号" prop="name">
                                        <Input v-model="apply.name" style="width: 320px; margin-right: 10px;"/>
                                        <Button type="primary">选择</Button>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="资产类型" prop="atype">
                                        <RadioGroup v-model="apply.atype">
                                            <Radio :label="1" disabled>一般资产维保</Radio>
                                            <Radio :label="2" disabled>车辆维保</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记日期" prop="checktime">
                                        <Input v-model="apply.checktime" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记人" prop="checkuser">
                                        <Input v-model="apply.checkuser" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记部门" prop="cdepartment">
                                        <Input v-model="apply.cdepartment" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保资产" prop="manasset">
                                        <Input v-model="apply.manasset" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保类型" prop="mantype">
                                        <Select v-model="apply.mantype" placeholder="请选择" style="width: 320px" disabled>
                                            <Option v-if="apply.atype==2" :value="10">更换机油</Option>
                                            <Option v-if="apply.atype==2" :value="11">更换轮胎</Option>
                                            <Option v-if="apply.atype==2" :value="12">洗车</Option>
                                            <Option v-if="apply.atype==2" :value="13">其他</Option>
                                            <Option v-if="apply.atype==1" :value="20">设备维护保养</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保时间" prop="mantime">
                                        <DatePicker
                                                v-model="apply.mantime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="维保时间"
                                                style="width: 320px" disabled></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="供应商" prop="supplier">
                                        <Input v-model="apply.supplier" style="width: 320px" readonly>
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维护人" prop="manuser">
                                        <Input v-model="apply.manuser" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话" prop="manmobile">
                                        <Input v-model="apply.manmobile" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="预算指标" prop="bindex">
                                        <Select v-model="apply.bindex" placeholder="请选择" style="width: 320px" disabled>
                                            <Option :value="1">固定资产维保</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="指标可用金额(元)" prop="ibalance">
                                        <Input v-model="apply.ibalance" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="预估金额(元)" prop="pamount">
                                        <Input v-model="apply.pamount" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12" v-if="apply.mantype==10 || apply.mantype==11">
                                    <FormItem label="当前公里数" prop="ckmeter">
                                        <Input v-model="apply.ckmeter" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="12" v-if="apply.mantype==10 || apply.mantype==11">
                                    <FormItem label="上次公里数" prop="lkmeter">
                                        <Input v-model="apply.lkmeter" style="width: 320px" readonly/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="确认金额" prop="camount">
                                        <Input v-model="apply.camount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <h4 class="h4-title">结算信息</h4>
                            <Row :gutter="32">
                                <Col span="12">
                                    <FormItem label="结算方式" prop="settlement">
                                        <Select v-model="apply.settlement" placeholder="请选择" style="width: 320px">
                                            <Option :value="1">现金</Option>
                                            <Option :value="2">支票</Option>
                                            <Option :value="3">公务卡</Option>
                                            <Option :value="4">网银转账</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否含电子发票" prop="einvoice">
                                        <RadioGroup v-model="apply.einvoice">
                                            <Radio :label="0">否</Radio>
                                            <Radio :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="发票数量" prop="inumber">
                                        <Input v-model="apply.inumber" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="支付说明" prop="pdescription">
                                        <Input type="textarea" v-model="apply.pdescription" :rows="4" />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Form-item class="br">
                                <Button type="dashed" @click="close">取消</Button>
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
                apply: {}
            };
        },
        methods: {
            init() {
            },
            handleReset() {
                this.$refs.form.resetFields();
            },
            handleSubmit() {
                /*this.$refs.form.validate(valid => {
                    if (valid) {
                        // 模拟成功
                        this.submitLoading = false;
                        this.$Message.success("添加成功");
                        this.submited();
                    }
                });*/
                this.submitLoading = false;
                this.submited();
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
