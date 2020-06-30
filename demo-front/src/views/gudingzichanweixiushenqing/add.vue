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
                    <div class="head-name">资产维修申请单</div>
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
                                    <FormItem label="申请方式" prop="type">
                                        <RadioGroup v-model="apply.type">
                                            <Radio :label="apply">直接申请</Radio>
                                            <Radio :label="fault">报障</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修申请单号" prop="name">
                                        <Input v-model="apply.name" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="是否过保修期" prop="expired">
                                        <RadioGroup v-model="apply.expired">
                                            <Radio :label="0">否</Radio>
                                            <Radio :label="1">是</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修资产编号" prop="acode">
                                        <Input v-model="apply.acode" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修资产名称" prop="aname">
                                        <Input v-model="apply.aname" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修时间" prop="atime">
                                        <DatePicker
                                                v-model="apply.atime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="报修时间"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="计划实施时间" prop="ptime">
                                        <DatePicker
                                                v-model="apply.ptime"
                                                type="date"
                                                format="yyyy-MM-dd"
                                                clearable
                                                placeholder="计划实施时间"
                                                style="width: 320px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修人" prop="repairer">
                                        <Input v-model="apply.repairer" style="width: 320px">
                                            <Button slot="append" icon="ios-person"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="报修部门" prop="rdepartment">
                                        <Input v-model="apply.rdepartment" style="width: 320px">
                                            <Button slot="append" icon="ios-home"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用人" prop="uman">
                                        <Input v-model="apply.uman" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="使用部门" prop="udepartment">
                                        <Input v-model="apply.udepartment" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="存放地点" prop="saddress">
                                        <Input v-model="apply.saddress"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="故障说明" prop="description">
                                        <Input type="textarea" v-model="apply.description" :rows="4"/>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="维修建议" prop="advise">
                                        <Input type="textarea" v-model="apply.advise" :rows="4"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修类型" prop="rtype">
                                        <Select v-model="apply.rtype" placeholder="请选择">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="维修供应商" prop="rsupplier">
                                        <Input v-model="apply.rsupplier" style="width: 320px">
                                            <Button slot="append" icon="ios-bookmarks"></Button>
                                        </Input>
                                    </FormItem>
                                </Col>
                                <Col span="24">
                                    <FormItem label="预估金额" prop="pamount">
                                        <Select v-model="apply.pamount" placeholder="请选择" style="width: 320px">
                                            <Option :value="0">请选择</Option>
                                        </Select>
                                        说明：1000元以上，1000元以下
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="公里数" prop="kmeters">
                                        <Input v-model="apply.kmeters" style="width: 320px"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="上次公里数" prop="lkmeters">
                                        <Input v-model="apply.lkmeters" style="width: 320px"/>
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
                apply: {
                    id: "", name: "系统自动生成单号",
                    date: new Date().getFullYear() + '-' +(new Date().getMonth()+1) + '-' + new Date().getDate(),
                    repairer: 'kwj', rdepartment: '普通外科病区', expired: 0
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
