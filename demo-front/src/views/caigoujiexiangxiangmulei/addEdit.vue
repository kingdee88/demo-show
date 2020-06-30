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
                 <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
                            <Row :gutter="32">
                                <Col span="24">
                                    <FormItem label="采购结项单号" prop="name">
                                     送审后自动生成
                                    </FormItem>
                                </Col>
                                  <Col span="12">
                                    <FormItem label="采购项目" prop="name">
                                      <Input v-model="form.name" >
                                        <Button slot="append" icon="ios-bookmarks"></Button>
                                      </Input>
                                    </FormItem>
                                </Col>
                              <Col span="12">
                                <FormItem label="登记日期" prop="name">
                                     <DatePicker
                                          v-model="form.date"
                                          type="date"
                                          format="yyyy-MM-dd"
                                          clearable
                                          placeholder="选择时间"
                                  ></DatePicker>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="经办人" prop="name">
                                  <Input v-model="form.name" >
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                              <Col span="12">
                                <FormItem label="经办部门" prop="name">
                                  <Input v-model="form.name">
                                    <Button slot="append" icon="ios-person"></Button>
                                  </Input>
                                </FormItem>
                              </Col>
                                <Col span="24">
                                <FormItem label="结项说明" prop="name">
                                  <Input
                                          type="textarea"
                                          v-model="form.description"
                                          :rows="4"
                                  />
                                </FormItem>
                              </Col>
                              
                            </Row>
                            <Form-item class="br">
                                <Button
                                        @click="handleSubmit"
                                        :loading="submitLoading"
                                        type="primary"
                                >保存
                                </Button>
                                <Button @click="handleReset">重置</Button>
                                <Button type="dashed" @click="close">关闭</Button>
                            </Form-item>
                        </Form>
            </div>
        </Drawer>
    </div>
</template>

<script>
    const data = [ ];
    import {getAllRoleList, addUser, editUser} from "@/api/index";
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
        data() {
            return {
               total: 0,
                searchForm: {
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 15, // 页面大小
                    sort: "createTime", // 默认排序字段
                    order: "desc" // 默认排序方式
                },
                historyData: [],
                tData: data,
                visible: this.value,
                title: "采购结项新增",
                passColor: "",
                submitLoading: false,
                maxHeight: 510,
                form: {
                    addressArray: []
                },
                formValidate: {
                    // 表单验证规则
                    username: [
                        {required: true, message: "请输入登录账号", trigger: "blur"},
                        {validator: validateUsername, trigger: "blur"}
                    ],
                    nickname: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    mobile: [
                        {required: true, message: "请输入手机号", trigger: "blur"},
                        {validator: validateMobile, trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {validator: validatePassword, trigger: "blur"}
                    ],
                    email: [
                        {required: true, message: "请输入邮箱地址"},
                        {type: "email", message: "邮箱格式不正确"}
                    ]
                },
                roleList: [],
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                        fixed: "left"
                    },
                    {
                        title: "预算事项编码",
                        key: "PAY_ITEM_CODE",
                        minWidth: 120
                    },
                    {
                        title: "预算事项名称",
                        key: "PAY_ITEM_NAME",
                        minWidth: 120
                    },
                    {
                        title: "上级预算事项",
                        key: "PARENT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "归口代编",
                        key: "IS_MANAGE_DEPT_DECLARE",
                        minWidth: 120
                    },
                    {
                        title: "归口管理部门",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "事项定义",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120
                    },
                ]
            };
        },
        methods: {
            init() {
                this.historyData = data;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if (this.historyData.length < this.searchForm.pageSize) {
                    this.tData = this.historyData;
                } else {
                    this.tData = this.historyData.slice(0, this.searchForm.pageSize);
                }
                this.total = this.historyData.length;
            },
            getRoleList() {
                getAllRoleList().then(res => {
                    if (res.success) {
                        this.roleList = res.result;
                    }
                });
            },
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.clearSelectAll();
                let _start = (v - 1) * this.searchForm.pageSize;
                let _end = v * this.searchForm.pageSize;
                this.tData = this.historyData.slice(_start, _end);
            },
            changePageSize(v) {
                this.searchForm.pageSize = v;
                let _start = (this.searchForm.pageNumber - 1) * v;
                let _end = this.searchForm.pageNumber * v;
                this.tData = this.historyData.slice(_start, _end);
            },
            handleSelectDepTree(v) {
                this.form.departmentId = v;
            },
            changeAddress(v) {
                this.form.address = JSON.stringify(this.form.addressArray);
            },
            changePass(v, grade, strength) {
                this.form.passStrength = strength;
            },
            changeBirth(v, d) {
                this.form.birth = v;
            },
            submit() {
              this.$Message.success("操作成功");
              this.$emit("on-submit", true);
              this.visible = false;
            },
            setCurrentValue(value) {
                if (value === this.visible) {
                    return;
                }
                this.visible = value;
            }
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            },
            visible(value) {
                this.$emit("input", value);
            }
        },
        mounted() {
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

