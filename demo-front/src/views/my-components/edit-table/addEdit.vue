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
                <Row
                >

                    <Form
                            ref="searchForm"
                            inline
                            :label-width="70"
                    >
                        <FormItem label="指标类型" prop="name">
                            <Select v-model="sdsd"
                                    placeholder="请选择"
                            >
                                <Option value="1">全部</Option>
                                <Option value="2">基本经费</Option>
                                <Option value="3">业务经费</Option>
                            </Select>
                        </FormItem>
                        <Form-item
                                label="指标名称"
                        >
                            <Input
                                    type="text"
                                    clearable

                            />
                        </Form-item>

                        <Form-item
                                label="所属部门"
                        >
                            <Input
                                    type="text"
                                    clearable
                                    placeholder=""

                            >
                                 <Button slot="append" icon="ios-bookmarks"></Button>
                            </Input>
                        </Form-item>
                        <Form-item
                                label="指标编码"
                        >
                            <Input
                                    type="text"
                                    clearable
                                    placeholder=""

                            />
                        </Form-item>
                        <Form-item
                                style="margin-left:-35px;"
                                class="br"
                        >
                            <Button
                                    type="primary"
                                    icon="ios-search"
                            >搜索
                            </Button>
                            <Button>重置</Button>
                        </Form-item>
                    </Form>
                </Row>
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
    const data = [
        {
        "ID": "000000000000000000000000000000202005281206029293327ds3s7i73i",
        "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917850n11bvibpsdohj",
        "APPROVAL_TYPE": "1",
        "BUDGET_AMOUNT": 10101.0,
        "ISSUED_AMOUNT": 10101.0,
        "USED_AMOUNT": 0.0,
        "AVAILABLE_AMOUNT": 10034.0,
        "FROZEN_AMOUNT": 67.0,
        "PAY_ITEM_CODE": "10010201",
        "PROJECT_ID": null,
        "MEMO": null,
        "PAY_ITEM_NAME": "离休费",
        "IS_MANAGE_DEPT_DECLARE": "1",
        "PAY_STANDARD_ID": null,
        "FORM_TYPE": "1",
        "PAY_DETAIL": "2",
        "NEED_APPLY": "0",
        "PAY_ITEM_CONDITION": 0.0,
        "IS_LEAF_ITEM": "1",
        "PAY_ITEM_TYPE": "1",
        "PAY_STANDARD_NAME": null,
        "INDEX_CODE": "10010201",
        "MANAGER_USER_ID": "00000000000000000000000000000020181112141632764188k4mcd20nqj",
        "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919339ufm1j2p711cdm",
        "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
        "ITEM_MANAGE_USER_ID": null,
        "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
        "PROCESS": "-1",
        "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
        "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
        "IS_ALLOW_MARGE_EXPENSE": "1",
        "IS_ITEM_CONTROL": "0",
        "INDEX_TYPE": "1",
        "DEPT_NAME": "外科",
        "MANAGER_USER_NAME": "王丹"
    },
        {
            "ID": "00000000000000000000000000000020200603093824947611w6m27a0rnn",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183918329shwh56d7wl9bj",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 1000000.0,
            "ISSUED_AMOUNT": 1000000.0,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 1000000.0,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "10010201",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "离休费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "2",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "10010201",
            "MANAGER_USER_ID": "000000000000000000000000000000201810101454500226049hqkphk7sl",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "1",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "口腔科",
            "MANAGER_USER_NAME": "唐婷婷"
        },
        {
            "ID": "00000000000000000000000000000020190108092225843087svv79dtcso",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917850n11bvibpsdohj",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 9000.0,
            "ISSUED_AMOUNT": 9000.0,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 9000.0,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "1003",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "1003",
            "MANAGER_USER_ID": "000000000000000000000000000000201808231452019198911oibq3k52k",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "外科",
            "MANAGER_USER_NAME": "test"
        },
        {
            "ID": "00000000000000000000000000000020200528113326971795jcsqd29nwj",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "1",
            "BUDGET_AMOUNT": 102.0,
            "ISSUED_AMOUNT": 102.0,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 102.0,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "1003",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "1003",
            "MANAGER_USER_ID": "000000000000000000000000000000201808231452019198911oibq3k52k",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "test"
        },
        {
            "ID": "000000000000000000000000000000202005281200333041458vavhqeufn",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917850n11bvibpsdohj",
            "APPROVAL_TYPE": "1",
            "BUDGET_AMOUNT": 89.0,
            "ISSUED_AMOUNT": 89.0,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 89.0,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "1003",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "1003",
            "MANAGER_USER_ID": "000000000000000000000000000000201807171433520460ri5tomm4590j",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "外科",
            "MANAGER_USER_NAME": "config"
        },
        {
            "ID": "000000000000000000000000000000202006030949187456210tcnieqnri",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "3",
            "BUDGET_AMOUNT": 2.0E11,
            "ISSUED_AMOUNT": 2.0E11,
            "USED_AMOUNT": 10000.0,
            "AVAILABLE_AMOUNT": 1.99999988524E11,
            "FROZEN_AMOUNT": 1476.0,
            "PAY_ITEM_CODE": "104001",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "罚款支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "1",
            "NEED_APPLY": null,
            "PAY_ITEM_CONDITION": null,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "104001",
            "MANAGER_USER_ID": "00000000000000000000000000000020190925111838235841djovuumphn",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "123456"
        },
        {
            "ID": "0000000000000000000000000000002020062214134425633747obioesek",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 9.0E11,
            "ISSUED_AMOUNT": 9.0E11,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 9.0E11,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "1001",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "人员经费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": null,
            "PAY_DETAIL": "1",
            "NEED_APPLY": null,
            "PAY_ITEM_CONDITION": null,
            "IS_LEAF_ITEM": "0",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "1001",
            "MANAGER_USER_ID": "00000000000000000000000000000020180425113303049hc8dlqr99sfhh",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "aaron"
        },
        {
            "ID": "00000000000000000000000000000020200622135614978830wt414o669j",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 2.0E8,
            "ISSUED_AMOUNT": 2.0E8,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 2.0E8,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "10020201",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "办公用品",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "1",
            "NEED_APPLY": null,
            "PAY_ITEM_CONDITION": null,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "10020201",
            "MANAGER_USER_ID": "000000000000000000000000000000201801231733592900m8u7lphpsdvi",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "刘克飞"
        },
        {
            "ID": "00000000000000000000000000000020200622141550688792ae8k6ivdjo",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 5.0E9,
            "ISSUED_AMOUNT": 5.0E9,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 5.0E9,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "100711",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "差旅费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "2",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "100711",
            "MANAGER_USER_ID": "00000000000000000000000000000020180425113303049hc8dlqr99sfhh",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "aaron"
        },
        {
            "ID": "00000000000000000000000000000020200622142016773469lpeo83surn",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 7.0E9,
            "ISSUED_AMOUNT": 7.0E9,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 7.0E9,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "100712",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "因公出国(境)费用",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": "000000000000000000000000000000201708151005448480vv995mj77ork",
            "FORM_TYPE": "6",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": "定制差旅-交通",
            "INDEX_CODE": "100712",
            "MANAGER_USER_ID": "00000000000000000000000000000020180425113303049hc8dlqr99sfhh",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "aaron"
        },
        {
            "ID": "00000000000000000000000000000020200622142543561356rwde8d2a2n",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 9.99999999999E11,
            "ISSUED_AMOUNT": 9.99999999999E11,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 9.99999999999E11,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "100713",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "维修（护）费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": "1",
            "PAY_DETAIL": "1",
            "NEED_APPLY": null,
            "PAY_ITEM_CONDITION": null,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "100713",
            "MANAGER_USER_ID": "00000000000000000000000000000020180425113303049hc8dlqr99sfhh",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "aaron"
        },
        {
            "ID": "00000000000000000000000000000020200622140442544268e9ppla6a7m",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 3.0E8,
            "ISSUED_AMOUNT": 2.0E8,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 2.0E8,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "100715",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "会议费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": "000000000000000000000000000000201708011558093564u2oi6bkk62tl",
            "FORM_TYPE": "4",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": "会议费标准",
            "INDEX_CODE": "100715",
            "MANAGER_USER_ID": "00000000000000000000000000000020180813100059201ifm0cbahaff7k",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "李二萌"
        },
        {
            "ID": "00000000000000000000000000000020200622142342347821nhmfdh9fln",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 8.8888888888E10,
            "ISSUED_AMOUNT": 8.8888888888E10,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 8.8888888888E10,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "100716",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "培训费",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_STANDARD_ID": "00000000000000000000000000000020170801155837438j230dj3btu53h",
            "FORM_TYPE": "5",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": "培训费标准",
            "INDEX_CODE": "100716",
            "MANAGER_USER_ID": "00000000000000000000000000000020180425113303049hc8dlqr99sfhh",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "ITEM_MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "aaron"
        },
        {
            "ID": "000000000000000000000000000000202006221418148172642s9itvanaj",
            "BUDGET_DEPT_ID": "00000000000000000000000000000020171120183917350kf63167aospmi",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 6.0E9,
            "ISSUED_AMOUNT": 6.0E9,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 6.0E9,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "100717",
            "PROJECT_ID": null,
            "MEMO": null,
            "PAY_ITEM_NAME": "公务接待费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": "00000000000000000000000000000020170801155826021h58innpdaj64j",
            "FORM_TYPE": "3",
            "PAY_DETAIL": "1",
            "NEED_APPLY": "0",
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "1",
            "PAY_STANDARD_NAME": "公务接待标准",
            "INDEX_CODE": "100717",
            "MANAGER_USER_ID": "00000000000000000000000000000020180425113303049hc8dlqr99sfhh",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "PROCESS": "-1",
            "EXPENSE_PROCESS": "000000000000000000000000000000201711091452077597r2b0vutqh2rn",
            "APPLY_PROCESS": "00000000000000000000000000000020170727113631461kb1uhb9mw524o",
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "1",
            "DEPT_NAME": "演示医院",
            "MANAGER_USER_NAME": "aaron"
        },
        {
            "ID": "00000000000000000000000000000020200102215829834554fbr6r7oi5o",
            "BUDGET_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "APPROVAL_TYPE": "2",
            "BUDGET_AMOUNT": 9764690.0,
            "ISSUED_AMOUNT": 1000.0,
            "USED_AMOUNT": 0.0,
            "AVAILABLE_AMOUNT": 1000.0,
            "FROZEN_AMOUNT": 0.0,
            "PAY_ITEM_CODE": "001303",
            "PROJECT_ID": null,
            "PAY_ITEM_NAME": "二级经费-归口、末级",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_STANDARD_ID": null,
            "FORM_TYPE": null,
            "PAY_DETAIL": null,
            "NEED_APPLY": null,
            "PAY_ITEM_CONDITION": 0.0,
            "IS_LEAF_ITEM": "1",
            "PAY_ITEM_TYPE": "0",
            "PAY_STANDARD_NAME": null,
            "INDEX_CODE": "001303",
            "MANAGER_USER_ID": "",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "MEMO": "",
            "ITEM_MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "ITEM_MANAGE_USER_ID": null,
            "INDEX_EXPENSE_PROCESS_ID": null,
            "PROCESS": "-1",
            "EXPENSE_PROCESS": null,
            "APPLY_PROCESS": null,
            "IS_ALLOW_MARGE_EXPENSE": "0",
            "IS_ITEM_CONTROL": "0",
            "INDEX_TYPE": "0",
            "DEPT_NAME": "普通外科病区"
        }];
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
                sdsd: '1',
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
                title: "指标选择",
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
                        title: '请选择',
                        align: 'center',
                        key: 'checkBox',
                        width: 80,
                        render: (h, params) => {
                            let _self = this;
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row.checkBox
                                    },
                                    on: {
                                        'on-change': (e)=> {
                                            if (e == false) {
                                                _self.disabled = true
                                            }
                                            this.tData.forEach((items) => {  //先取消所有对象的勾选，checkBox设置为false
                                                _self.$set(items, 'checkBox', false)
                                            });
                                            _self.tData[params.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: "指标名称",
                        key: "PAY_ITEM_NAME",
                        minWidth: 120,
                        tooltip: true
                    },
                    {
                        title: "所属部门",
                        key: "DEPT_NAME",
                        minWidth: 120
                    },
                    {
                        title: "预算可用金额(元)",
                        key: "AVAILABLE_AMOUNT",
                        minWidth: 140
                    },
                    {
                        title: "指标编码",
                        key: "INDEX_CODE",
                        minWidth: 120
                    },
                    {
                        title: "指标来源",
                        key: "MANAGE_DEPT_NAME",
                        minWidth: 120,
                        render: (h, params) => {
                            return h("div", [params.row.APPROVAL_TYPE === '1' ? '上年结算' : params.row.APPROVAL_TYPE === '2' ? '年初预算' : '追加预算'])}
                    },
                    {
                        title: "责任人",
                        key: "MANAGER_USER_NAME",
                        minWidth: 120
                    },
                    {
                        title: "预算指标情况",
                        key: "PAY_ITEM_DESC",
                        minWidth: 120,
                        render: (h, params) => {
                            return h("div", ['100%'])}
                    },
                    {
                        title: "指标说明",
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
                if (this.tData.filter(res => res.checkBox).length > 0) {
                    this.$Message.success("操作成功");
                    this.$emit("on-submit", this.tData.filter(res => res.checkBox));
                    this.visible = false;
                } else {
                    this.$Message.warning("请选择");
                }

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
    @import "../../../styles/table-common";

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

