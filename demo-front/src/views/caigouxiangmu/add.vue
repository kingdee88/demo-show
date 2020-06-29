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
          <div class="head-name">采购项目</div>
          <span></span>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <Card>
        <Row type="flex" justify="space-between" :gutter="32">
          <Col span="16" style="border-right: 1px solid rgba(233, 232, 233, 0.6);">
            <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
              <h4 class="h4-title">申请基本信息</h4>
              <Row :gutter="32">
                <Col span="12">
                  <FormItem label="采购需求申请号" prop="name">
                      送审后自动生成
                    <!-- <Input v-model="form.name" style="width: 320px"> -->
                      <!-- <Button slot="append" icon="ios-bookmarks"></Button> -->
                    <!-- </Input> -->
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="项目名称" prop="name">
                    <Input v-model="form.name" style="width: 320px"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="项目申请人" prop="name">
                    test11
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申请部门" prop="name">
                    普通外科病区
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="支付方式" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">转账</Option>
                        <Option :value="1">合同支付</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申请日期" prop="name">
                    2020-07-02
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="预算指标" prop="name">
                    <Input v-model="form.ITEM_PAY_ITEM_NAME" style="width: 320px">
                      <Button slot="append" icon="ios-pricetag"></Button>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="支出事项" prop="name">
                    <Input v-model="form.APPLY_AMOUNT" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="指标可用金额" prop="name">
                    <Input v-model="form.APPLY_AMOUNT" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="资金来源" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">财政拨款</Option>
                        <Option :value="1">自筹资金</Option>
                        <Option :value="1">自有资金</Option>
                        <Option :value="1">地方财政</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="采购分类" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">工程</Option>
                        <Option :value="1">货物-非物资</Option>
                        <Option :value="1">服务</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="项目联系人" prop="name">
                    <Input v-model="form.ITEM_PAY_ITEM_NAME" style="width: 320px">
                      <Button slot="append" icon="ios-pricetag"></Button>
                    </Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="联系人电话" prop="name">
                    <Input v-model="form.ITEM_PAY_ITEM_NAME" style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem label="立项说明" prop="name">
                    <Input
                            type="textarea"
                            v-model="form.description"
                            :rows="4"
                    />
                  </FormItem>
                </Col>
              </Row>
              <h4 class="h4-title">采购信息</h4>
              <Row :gutter="32">
                <Col span="12">
                  <FormItem label="采购性质" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">政府采购</Option>
                        <Option :value="1">自主采购</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="采购组织形式" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">政府集中采购</Option>
                        <Option :value="1">部门集中采购</Option>
                        <Option :value="1">分散采购</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="代理机构类型" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">集中采购机构</Option>
                        <Option :value="1">社会代理机构</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="采购方式" prop="name">
                    <Select
                            v-model="form.type"
                            placeholder="请选择"
                    >
                        <Option :value="0">公开招标</Option>
                        <Option :value="1">邀请招标</Option>
                        <Option :value="1">询价</Option>
                     </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="采购预算金额" prop="name">
                    <Input style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="控制价" prop="name">
                    <Input style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="项目执行结果" prop="name">
                    <Input style="width: 320px"/>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="结项日期" prop="name">
                    <DatePicker
                            v-model="form.date"
                            type="date"
                            format="yyyy-MM-dd"
                            clearable
                            placeholder="选择时间"
                            style="width: 320px"
                        ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="是否涉密" prop="name">
                    <RadioGroup v-model="form.IS_LOAN">
                      <Radio  :label="'0'">否</Radio>
                      <Radio  :label="'1'">是</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="采购编号" prop="name">
                    <Input style="width: 320px"/>
                  </FormItem>
                </Col>
              </Row>
              <h4 class="h4-title">明细信息</h4>
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
          <Col span="8">
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
      columns2: [
            {
                title: "采购品目",
                key: "a"
            },
            {
                title: "品目名称",
                key: "b"
            },
            {
                title: "名称",
                key: "c"
            },
            {
                title: "规格型号",
                key: "d"
            },{
              title: "技术参数",
              key: "e"
            },{
              title: "是否进口",
              key: "f"
            },{
              title: "数量单位",
              key: "g"
            },{
              title: "单价",
              key: "h"
            },{
              title: "采购数量",
              key: "i"
            },{
              title: "预算金额",
              key: "j"
            },{
              title: "备注",
              key: "k"
            },{
              title: "操作",
              key: "l"
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
