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
                    <div class="head-name">资产维保申请单</div>
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
                                    <FormItem label="资产类型" prop="atype">
                                        <RadioGroup v-model="apply.atype" @on-change="changeType()">
                                            <Radio :label="1">一般资产维保</Radio>
                                            <Radio :label="2">车辆维保</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记人" prop="checkuser">
                                        <Input v-model="apply.checkuser" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记部门" prop="cdepartment">
                                        <Input v-model="apply.cdepartment" style="width: 320px"/>
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
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="供应商" prop="supplier">
                                        <Input v-model="apply.supplier" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维护人" prop="manuser">
                                        <Input v-model="apply.manuser" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话" prop="manmobile">
                                        <Input v-model="apply.manmobile" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保资产" prop="manasset">
                                        <Input v-model="apply.manasset" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="登记日期" prop="checktime">
                                        <Input v-model="apply.checktime" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="预算指标" prop="bindex">
                                        <Select v-model="apply.bindex" placeholder="请选择" style="width: 320px">
                                            <Option :value="1">固定资产维保</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="指标可用金额(元)" prop="ibalance">
                                        <Input v-model="apply.ibalance" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="存放地点" prop="saddress">
                                        <Input type="textarea" v-model="apply.saddress" :rows="4"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="维保说明" prop="description">
                                        <Input type="textarea" v-model="apply.description" :rows="4"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保类型" prop="mantype">
                                        <Select v-model="apply.mantype" placeholder="请选择" @on-change="changeManType()" style="width: 320px">
                                            <Option v-if="apply.atype==2" :value="10">更换机油</Option>
                                            <Option v-if="apply.atype==2" :value="11">更换轮胎</Option>
                                            <Option v-if="apply.atype==2" :value="12">洗车</Option>
                                            <Option v-if="apply.atype==2" :value="13">其他</Option>
                                            <Option v-if="apply.atype==1" :value="20">设备维护保养</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维保供应商" prop="msupplier">
                                        <Input v-model="apply.msupplier" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="预估金额(元)" prop="pamount">
                                        <Input v-model="apply.pamount" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12" v-if="apply.mantype==10 || apply.mantype==11">
                                    <FormItem label="当前公里数" prop="ckmeter">
                                        <Input v-model="apply.ckmeter" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12" v-if="apply.mantype==10 || apply.mantype==11">
                                    <FormItem label="上次公里数" prop="lkmeter">
                                        <Input v-model="apply.lkmeter" style="width: 320px" readonly/>
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
                apply: {
                    id: "", name: "系统自动生成单号",
                    date: new Date().getFullYear() + '-' +(new Date().getMonth()+1) + '-' + new Date().getDate(),
                    repairer: 'kwj', rdepartment: '普通外科病区', rtype: 0
                },
                formValidate: {
                    // mantime: [{required: true, message: "不能为空", trigger: "blur"}],
                    // manuser: [{required: true, message: "不能为空", trigger: "blur"}],
                    // manmobile: [{required: true, message: "不能为空", trigger: "blur"}],
                    // manasset: [{required: true, message: "不能为空", trigger: "blur"}],
                    // bindex: [{required: true, message: "不能为空", trigger: "blur"}],
                    // mantype: [{required: true, message: "不能为空", trigger: "blur"}],
                    // msupplier: [{required: true, message: "不能为空", trigger: "blur"}],
                    // pamount: [{required: true, message: "不能为空", trigger: "blur"}],
                    // ckmeter: [{required: true, message: "不能为空", trigger: "blur"}]
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
                /*this.$refs.form.validate(valid => {
                    if (valid) {
                        // 模拟成功
                        this.submitLoading = false;
                        this.$Message.success("添加成功");
                        this.submited();
                    }
                });*/
                if(this.apply.pamount==undefined || this.apply.pamount==null){
                    this.$Message.error('请先设置预估金额');
                    return false;
                }
                if(this.apply.mantype == 12 && this.apply.pamount > 200){
                    this.$Message.error('洗车预估金额不得大于200元');
                    return false;
                }
                if(this.apply.mantype == 10){
                    if(this.apply.ckmeter==undefined || this.apply.ckmeter==null){
                        this.$Message.error('请先设置当前公里数');
                        return false;
                    }
                    if(this.apply.ckmeter - this.apply.lkmeter <= 5000){
                        this.$Message.error('距离上次更换机油公里数不能小于5000');
                        return false;
                    }
                }
                if(this.apply.mantype == 11){
                    if(this.apply.ckmeter==undefined || this.apply.ckmeter==null){
                        this.$Message.error('请先设置当前公里数');
                        return false;
                    }
                    if(this.apply.ckmeter - this.apply.lkmeter <= 40000){
                        this.$Message.error('距离上次更换轮胎公里数不能小于40000');
                        return false;
                    }
                }
                this.submitLoading = false;
                this.submited();
            },
            close() {
                this.$emit("close", true);
            },
            submited() {
                this.$emit("submited", true);
            },
            changeType() {
                if(this.apply.atype == 1){
                    this.apply.manasset = '沙发';
                }else{
                    this.apply.manasset = '琼AA2765B';
                }
                this.apply.bindex = 1;
                this.apply.ibalance = 256489;
            },
            changeManType(){
                if(this.apply.mantype == 10){
                    this.apply.lkmeter = 38932;
                }else if(this.apply.mantype == 10){
                    this.apply.lkmeter = 13900;
                }else{
                    this.apply.lkmeter = '';
                }
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
