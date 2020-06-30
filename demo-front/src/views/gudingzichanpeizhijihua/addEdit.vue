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
                <Table
                        size="small"
                        :loading="loading"
                        border
                        :columns="columns"
                        :data="tData"
                        sortable="custom"
                        @on-sort-change="changeSort"
                        @on-selection-change="showSelect"
                        ref="table">
                </Table>
                <Row type="flex" justify="end" class="page" style="margin-top: 20px">
                    <Page
                            :current="searchForm.pageNumber"
                            :total="total"
                            :page-size="searchForm.pageSize"
                            @on-change="changePage"
                            @on-page-size-change="changePageSize"
                            :page-size-opts="[15,20,50]"
                            size="small"
                            show-total
                            show-elevator
                            show-sizer
                    ></Page>
                </Row>
            </div>
            <div
                    class="br"
                    v-show="type!='0'"
            >
                <Button
                        type="primary"
                        :loading="submitLoading"
                        @click="submit"
                >提交
                </Button>
                <Button @click="visible = false">取消</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
    const data = [];
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
                title: "年度资产购置明细",
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
                        title: "拟购资产",
                        key: "PAY_ITEM_CODE",
                        minWidth: 120
                    },
                    {
                        title: "资产字典编码",
                        key: "PAY_ITEM_NAME",
                        minWidth: 120
                    },
                    {
                        title: "期初存量",
                        key: "PARENT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "本年拟购数量",
                        key: "IS_MANAGE_DEPT_DECLARE",
                        minWidth: 120
                    },
                    {
                        title: "计量单位",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "预算单价(元)",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120
                    },
                    {
                        title: "资产可购数量",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120
                    },
                    {
                        title: "采购预算(元)",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120
                    },
                    {
                        title: "资产配置标准",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120
                    }
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

