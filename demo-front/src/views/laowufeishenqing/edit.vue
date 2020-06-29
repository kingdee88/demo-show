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
          <div class="head-name">劳务费申请</div>
          <span></span>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <Card>
        <p class="show-info">经办人部门：{{form.APPLY_DEPT_NAME}}   经办人：test11   申请日期：{{form.TIME_CREATE}}   申请单号：送审后自动生成</p>
        <Row type="flex" justify="space-between" :gutter="32">
          <Col :xl="21" :xxl="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
            <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
              <h4 class="h4-title">申请基本信息</h4>
              <Row :gutter="32">
                <Col span="24">
                  <FormItem label="关联行政申请" prop="name">
                    <Input v-model="form.name" style="width: 320px">
                      <Button slot="append" icon="ios-bookmarks"></Button>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申请人" prop="name">
                    <Input v-model="form.AGENT_USER_NAME" style="width: 320px">
                      <Button slot="append" icon="ios-person"></Button>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申请部门" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">普通外科病区</Option>
                        <Option :value="1">呼吸科</Option>
                        <Option :value="2">泌尿科</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="申请人电话" prop="name">
                    <Input v-model="form.MOBILE" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="预算指标" prop="name">
                    <Input v-model="form.ITEM_PAY_ITEM_NAME" style="width: 320px">
                      <Button slot="append" icon="ios-pricetag"></Button>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="指标可用金额" prop="name">
                    <Input v-model="form.APPLY_AMOUNT" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="拟安排时间" prop="name">
                    <DatePicker
                            v-model="form.date"
                            type="daterange"
                            format="yyyy-MM-dd"
                            clearable
                            placeholder="选择安排时间"
                            style="width: 320px"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="拟参与人数" prop="name">
                    <Input v-model="form.name" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="劳务费类型" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">院内</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="计税类型" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">不计税</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="事由摘要" prop="name">
                    <Input v-model="form.REASON_DIGEST" style="width: 320px" placeholder="请输入至少5个字符"/>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="申请事务" prop="name">
                    <Input
                            type="textarea"
                            v-model="form.description"
                            :rows="4"
                    />
                  </FormItem>
                </Col>
              </Row>

              <h4 class="h4-title">费用预算</h4>
             <Table
                      border
                      :columns="columns"
                      :data="datas"
                      sortable="custom"
                      ref="table"
              ></Table>
              <div class="sum-text">
                申请金额：{{NumberToChinese(datas[0]['p'])}} {{datas[0]['p']}}.00
              </div>
               <h4 class="h4-title">收款方信息</h4>
                          <Table
                                  style="margin-bottom: 20px"
                                  border
                                  :columns="columns2"
                                  :data="data2"
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
        p:0,
        c: ""
      }],
      data2:[{}],
      columns2: [{
          title:"收款方",
          key:"a"
      },{
          title:"居民类型",
          key:"b"
      },{
          title:"证件类型",
          key: "c"
      },{
        title: "证件号码",
        key:"d"
      },{
        title: "银行名称",
        key: "e"
      },{
        title: "银行账号",
        key: "f"
      }],
      columns: [
        {
          title: "费用明细",
          key: "a"
        },
        {
          title: "开支标准",
          key: "b"
        },
        {
            title: "申请金额(元)",
            key: "c"
        },
        {
          title: "备注",
          key: "d"
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
