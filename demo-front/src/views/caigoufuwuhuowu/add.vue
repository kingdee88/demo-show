<style lang="less">
@import "../../styles/single-common.less";
</style>
<template>
  <div>
    <Card>
      <div slot="title">
        <div class="edit-head">
          <a @click="close" class="back-title">
            <Icon type="ios-arrow-back" />返回
          </a>
          <div class="head-name">采购需求申请单</div>
          <span></span>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <Card>
        <Row type="flex" justify="space-between" :gutter="32">
          <Col :xl="21" :xxl="16"  style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
            <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
              <h4 class="h4-title">申请基本信息</h4>
              <Row :gutter="32">
                <Col span="12">
                  <FormItem label="采购需求申请号">
                      送审后自动生成
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="采购分类">
                    <Select
                            placeholder="请选择"
                    >
                        <Option :value="0">工程</Option>
                        <Option :value="1">货物-非物资</Option>
                        <Option :value="2">服务</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申请人" >
                    <Input style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申请部门" prop="name">
                    <Select
                            placeholder="请选择"
                    >
                        <Option :value="0">普通外科病区</Option>
                        <Option :value="1">呼吸科</Option>
                        <Option :value="2">泌尿科</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="负责人电话" prop="name">
                    <Input style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="预算指标" prop="name">
                    <Input style="width: 300px">
                      <Button slot="append" icon="ios-pricetag"></Button>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="指标可用金额" prop="name">
                    <Input v-model="form.APPLY_AMOUNT" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="支付方式" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">合同支付</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="计划采购金额" prop="name">
                    <Input v-model="form.name" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="交付日期" prop="name">
                    <DatePicker
                            v-model="form.date"
                            type="date"
                            format="yyyy-MM-dd"
                            clearable
                            placeholder="选择开始时间"
                            style="width: 280px"
                        ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="交付地点" prop="name">
                    <Input style="width: 320px" placeholder="请输入至少5个字符"/>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="采购说明" prop="name">
                    <Input
                            type="textarea"
                            :rows="4"
                    />
                  </FormItem>
                </Col>
              </Row>
              <h4 class="h4-title">采购信息</h4>
              <Table
                      border
                      :columns="columns"
                      :data="datas"
                      sortable="custom"
                      ref="table"
              >
              </Table>
              <h4 class="h4-title">费用预算</h4>
             <Table
                      border
                      :columns="columns2"
                      :data="datas2"
                      sortable="custom"
                      ref="table"
              ></Table>
              <div class="sum-text">
                申请金额：{{NumberToChinese(datas[0]['c'])}} {{datas[0]['c']}}.00
              </div>
               <h4 class="h4-title">附件上传</h4>
                          <Table
                                  style="margin-bottom: 20px"
                                  border
                                  :columns="columns3"
                                  :data="data3"
                                  sortable="custom"
                                  ref="table"
                          ></Table>
              <Form-item class="br">
                <Button
                        @click="handleSubmit"
                        :loading="submitLoading"
                        type="primary"
                >送审
                </Button>
                <Button @click="handleReset">重置</Button>
                <Button type="dashed" @click="close">关闭</Button>
              </Form-item>
            </Form>
          </Col>
          <Col :xl="3" :xxl="8" >
            <div class="operation">
              <div class="s-modal">
                <h4 class="h4-title">风险提示</h4>
                <div class="content">无</div>
              </div>
              <div class="s-modal">
                <h4 class="h4-title">相关制度</h4>
                <div class="content">无</div>
              </div>
              <div class="s-modal">
                <h4 class="h4-title">预算指标情况</h4>
                <div class="content">
                  无
                </div>
              </div>
              <div class="s-modal">
                <h4 class="h4-title">审批过程</h4>
                <div class="content">
                  无
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Card>
  </div>
</template>

<script>
export default {
  name: "edit",
  props: {
    data: Object
  },
  data() {
    return {
      loading: false, // 表单加载状态
      submitLoading: false, // 表单提交状态
      form: {
        id: "",
        name: ""
      },
      datas: [{
        c: 0
      }],
      datas2: [
          {
              a: 0
          }
      ],
      data3:  [],
      columns3: [{
          title:"附件类型",
          key:"a"
      },{
          title:"文件名",
          key:"b"
      },{
          title:"操作",
          key: "c"
      }],
      columns2: [
            {
                title: "费用明细",
                key: "a"
            },
            {
                title: "开支标准",
                key: "b"
            },
            {
                title: "申请金额",
                key: "c"
            },
            {
                title: "备注",
                key: "d"
            }
      ],
      columns: [
        {
          title: "采购品目",
          key: "a",
          minWidth: 150
        },
        {
          title: "品目名称",
          key: "b",
          width: 150
        },
        {
            title: "名称",
            key: "c",
            width: 100
        },
        {
          title: "规格型号/项目名称",
          key: "d",
          width: 150
        },
        {
          title: "技术参数",
          key: "e"
        }
      ],
      // 表单验证规则
      formValidate: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      unit: ["仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"],
    };
  },
  methods: {
    init() {
      this.handleReset();
      this.form = this.data;
      this.datas = [{
        a: this.form.ITEM_PAY_ITEM_NAME,
        b: '据实列支',
        c: this.form.APPLY_AMOUNT,
        d: ''
      }]
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
          //     this.$Message.success("编辑成功");
          //     this.submited();
          //   }
          // });
          // 模拟成功
          this.submitLoading = false;
          this.$Message.success("编辑成功");
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
    toDx(n) {   //阿拉伯数字转换函数
      switch (n) {
        case "0":
          return "零";
        case "1":
          return "壹";
        case "2":
          return "贰";
        case "3":
          return "叁";
        case "4":
          return "肆";
        case "5":
          return "伍";
        case "6":
          return "陆";
        case "7":
          return "柒";
        case "8":
          return "捌";
        case "9":
          return "玖";
      }
    },
    NumberToChinese(m){
      m *= 100;
      m += "";
      var length = m.length;

      var result = "";
      for (var i = 0; i < length; i++) {
        if (i == 2) {
          result = "元" + result;
        } else if (i == 6) {
          result = "万" + result;
        }
        if (m.charAt(length - i - 1) == 0) {
          if (i != 0 && i != 1) {
            if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
              result = "零" + result;
            }
          }
          continue;
        }
        result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
      }
      result += result.charAt(result.length - 1) == '元' ? "整" : "";
      return result;
    }

    },
  mounted() {
    this.init();
  }
};
</script>
