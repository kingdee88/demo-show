<style lang="less">
    @import "../../styles/single-common.less";
</style>
<template>
    <div>
        <Card>
            <div slot="title">
                <div class="edit-head">
                    <a @click="close" class="back-title">
                        <Icon type="ios-arrow-back"/>
                        返回
                    </a>
                    <div class="head-name">选择合并报销指标</div>
                    <span></span>
                    <a @click="close" class="window-close">
                        <Icon type="ios-close" size="31" class="ivu-icon-ios-close"/>
                    </a>
                </div>
            </div>

            <Card>
                <Row>
                    <edit-form-table
                            :columns="columns"
                            :loading="loading"
                            :data="data"
                            @saveEditTable="saveEditTable"
                            @deleteEditTable="deleteList"
                    />
                </Row>
            </Card>
        </Card>
    </div>
</template>

<script>
    import addEdit from "./addEdit.vue";
    import EditFormTable from '../my-components/edit-table/index'
    export default {
        name: "add",
        components: {
            addEdit,
            EditFormTable
        },
        data() {
            return {
                showUser: false,
                showType: "0",
                submitLoading: false, // 表单提交状态
                form: {
                    id: "",
                    name: ""
                },
                openSearch: true,
                drop: false,
                dropDownContent: "展开查询",
                dropDownIcon: "ios-arrow-down",
                formData: {},
                searchForm: {
                    id: "",
                    nickname: "",
                    username: "",
                    departmentId: "",
                    mobile: "",
                    email: "",
                    sex: "",
                    type: "",
                    status: "",
                    pageNumber: 1,
                    pageSize: 10,
                    sort: "createTime",
                    order: "desc",
                    startDate: "",
                    endDate: ""
                },
                currView: "index",
                // 表单验证规则
                formValidate: {
                    name: [{required: true, message: "不能为空", trigger: "blur"}]
                },
                data: [],
                columns: [
                    {
                        title: "预算指标",
                        slot: "name",
                        type: 'input',
                        placeholder: '',
                        // clearable: true,
                        // disabled: true,
                        validate: [
                            { required: true, message: '预算不能为空', trigger: 'blur' }
                        ]
                    },
                    {
                        title: "指标来源"
                    },
                    {
                        title: "支出事项"
                    },
                    {
                        title: "指标可用金额"
                    },
                    {
                        title: "操作",
                        slot: "action"
                    }
                ],
                columns1: [
                    // {
                    //     type: "selection",
                    //     width: 60,
                    //     align: "center",
                    //     fixed: "left"
                    // },
                    {
                        title: "预算指标",
                        key: "title",
                        minWidth: 150
                    },
                    {
                        title: "指标来源",
                        key: "value",
                        width: 150
                    },
                    {
                        title: "支出事项",
                        key: "value",
                        width: 150
                    },
                    {
                        title: "指标可用金额",
                        key: "description",
                        width: 150
                    },
                    {
                        title: "操作",
                        slot: "action"
                    }
                ]
            };
        },
        methods: {
            init() {
            },
            saveEditTable(row) {
                this.loading = true
                setTimeout(() => {
                    // eslint-disable-next-line no-unused-vars
                    const { _index, _rowKey, ...data} = row
                    console.log(_index)
                    if (_index > this.data.length - 1) {
                        Vue.set(this.data, this.data.length, {...data})
                        this.$Message.success("添加成功")
                        this.loading = false
                    } else {
                        this.data = this.data.map((a,index) => {
                            if(index === row._index) {
                                return data
                            }
                            return {...a}
                        })
                        this.$Message.success("修改成功")
                        this.loading = false
                    }
                }, 2000);
            },
            deleteList(row) {
                this.loading = true
                setTimeout(() => {
                    this.data = this.data.filter((a, index) => index !== row._index)
                    this.$Message.success("数据保存成功")
                    this.loading = false
                }, 2000);
            },
            handleSelectDep(v) {
                this.searchForm.departmentId = v;
            },
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开查询";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                // this.getUserList();
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
            },
            add() {
                this.showType = "2";
                this.showUser = true;
            },
        },
        mounted() {
            this.init();
        }
    };
</script>
