<template>
    <div class="user-edit">
        <!-- Drawer抽屉 -->
        <Drawer
                :title="title"
                v-model="visible"
                width="720"
                draggable
                :mask-closable="type=='0'"
        >
            <div
                    :style="{maxHeight: maxHeight}"
                    class="drawer-content"
            >
                <div class="user-title">
                    <div class="info-title">年度资产购置明细</div>
                </div>
                <Form
                        ref="form"
                        :model="form"
                        :rules="formValidate"
                        label-position="top"
                >
                    <Row
                            :gutter="32"
                            v-if="type=='2'"
                    >
                        <Col span="12">
                            <FormItem
                                    label="拟购资产"
                                    prop="username"
                            >
                                <Input
                                        v-model="form.username"
                                        autocomplete="off"
                                        :maxlength="16"
                                >
                                    <Button slot="append" icon="ios-git-merge"></Button>
                                </Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="资产字典编码"
                                    prop="password"
                            >
                                <Input
                                        v-model="form.username"
                                        autocomplete="off"
                                        :maxlength="16"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="32">
                        <Col span="12">
                            <FormItem
                                    label="期初存量"
                                    prop="nickname"
                            >
                                <Input v-model="form.nickname" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="本年拟购数量"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="计量单位"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="预算单价（元）"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="资产可购置数量"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="采购预算（元）"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="资产配置标准"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="单价上限（元）"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="核算对象计量单位"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="本年核算对象数量"
                                    prop="email"
                            >
                                <Input v-model="form.email" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem
                                    label="备注"
                            >
                                <Input type="textarea"
                                       v-model="form.description"
                                       :rows="4" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Divider />
                </Form>
            </div>
            <div
                    class="drawer-footer br"
                    v-show="type!='0'"
            >
                <Button
                        type="primary"
                        :loading="submitLoading"
                        @click="submit"
                >提交</Button>
                <Button @click="visible = false">取消</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
    import { getAllRoleList, addUser, editUser } from "@/api/index";
    import {
        validateUsername,
        validateMobile,
        validatePassword
    } from "@/libs/validate";
    import departmentTreeChoose from "@/views/my-components/xboot/department-tree-choose";
    import uploadPicInput from "@/views/my-components/xboot/upload-pic-input";
    import SetPassword from "@/views/my-components/xboot/set-password";
    export default {
        name: "user",
        components: {
            departmentTreeChoose,
            uploadPicInput,
            SetPassword
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object
            },
            type: {
                type: String,
                default: "0"
            }
        },
        data () {
            return {
                visible: this.value,
                title: "",
                passColor: "",
                submitLoading: false,
                maxHeight: 510,
                form: {
                    addressArray: []
                },
                formValidate: {
                    // 表单验证规则
                    username: [
                        { required: true, message: "不能为空", trigger: "blur" },
                        { validator: validateUsername, trigger: "blur" }
                    ],
                    nickname: [
                        { required: true, message: "不能为空", trigger: "blur" }
                    ],
                    mobile: [
                        { required: true, message: "请输入手机号", trigger: "blur" },
                        { validator: validateMobile, trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { validator: validatePassword, trigger: "blur" }
                    ],
                    email: [
                        { required: true, message: "不能为空" }
                    ]
                },
                roleList: []
            };
        },
        methods: {
            init () {
                this.getRoleList();
            },
            getRoleList () {
                getAllRoleList().then(res => {
                    if (res.success) {
                        this.roleList = res.result;
                    }
                });
            },
            handleSelectDepTree (v) {
                this.form.departmentId = v;
            },
            changeAddress (v) {
                this.form.address = JSON.stringify(this.form.addressArray);
            },
            changePass (v, grade, strength) {
                this.form.passStrength = strength;
            },
            changeBirth (v, d) {
                this.form.birth = v;
            },
            submit () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        if (typeof this.form.birth == "object") {
                            this.form.birth = this.format(this.form.birth, "yyyy-MM-dd");
                        }

                        if (this.type == "1") {
                            // 编辑
                            this.submitLoading = true;
                            editUser(this.form).then(res => {
                                this.submitLoading = false;
                                if (res.success) {
                                    this.$Message.success("操作成功");
                                    this.$emit("on-submit", true);
                                    this.visible = false;
                                }
                            });
                        } else {
                            // 添加
                            this.submitLoading = true;
                            addUser(this.form).then(res => {
                                this.submitLoading = false;
                                if (res.success) {
                                    this.$Message.success("操作成功");
                                    this.$emit("on-submit", true);
                                    this.visible = false;
                                }
                            });
                        }
                    }
                });
            },
            setCurrentValue (value) {
                if (value === this.visible) {
                    return;
                }
                if (this.type == "1") {
                    this.title = "编辑";
                    this.maxHeight = Number(document.documentElement.clientHeight - 121) + "px";
                } else if (this.type == "2") {
                    this.title = "添加";
                    this.maxHeight = Number(document.documentElement.clientHeight - 121) + "px";
                } else {
                    this.title = "详情";
                    this.maxHeight = "100%";
                }
                // 清空数据
                this.$refs.form.resetFields();
                this.visible = value;
            }
        },
        watch: {
            value (val) {
                this.setCurrentValue(val);
            },
            visible (value) {
                this.$emit("input", value);
            }
        },
        mounted () {
            this.init();
        }
    };
</script>

<style lang="less">
    @import "../../styles/table-common.less";
    .drawer-content {
        overflow: auto;
    }
    .drawer-content::-webkit-scrollbar {
        display: none;
    }
    .user-title {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        .info-title {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.85);
            display: block;
            margin-right: 16px;
        }
    }
    .info-header {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        display: block;
        margin-bottom: 16px;
    }
</style>

