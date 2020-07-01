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
    const data = [
        {
            "ID": "1001010101",
            "PAY_ITEM_CODE": "1001010101",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "岗位工资",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239430803v18t0av3hk",
            "PARENT_NAME": "全国工资",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239430803v18t0av3hk"
        },
        {
            "ID": "1001010102",
            "PAY_ITEM_CODE": "1001010102",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "薪级工资",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "000000000000000000000000000000202006011222394249605fn865o7ml",
            "PARENT_NAME": "全国工资",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394249605fn865o7ml"
        },
        {
            "ID": "1001010201",
            "PAY_ITEM_CODE": "1001010201",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "特区津贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239511705mkwbc3f5co",
            "PARENT_NAME": "基础性绩效工资",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239511705mkwbc3f5co"
        },
        {
            "ID": "1001010202",
            "PAY_ITEM_CODE": "1001010202",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "基础津贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239515445jmrdip15ii",
            "PARENT_NAME": "基础性绩效工资",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239515445jmrdip15ii"
        },
        {
            "ID": "10010103",
            "PAY_ITEM_CODE": "10010103",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "特殊岗位津贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239565123pcc7dvjqho",
            "PARENT_NAME": "工资福利支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239565123pcc7dvjqho"
        },
        {
            "ID": "10010104",
            "PAY_ITEM_CODE": "10010104",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "社会保险缴费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239569483r4jd09092o",
            "PARENT_NAME": "工资福利支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239569483r4jd09092o"
        },
        {
            "ID": "10010106",
            "PAY_ITEM_CODE": "10010106",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "奖励性绩效工资",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239562626p02hfclcsn",
            "PARENT_NAME": "工资福利支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239562626p02hfclcsn"
        },
        {
            "ID": "10010107",
            "PAY_ITEM_CODE": "10010107",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "其他工资福利支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239572554wskj0hq1nn",
            "PARENT_NAME": "工资福利支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239572554wskj0hq1nn"
        },
        {
            "ID": "10010201",
            "PAY_ITEM_CODE": "10010201",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "离休费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239294002rn2a0mwu5o",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239294002rn2a0mwu5o"
        },
        {
            "ID": "10010202",
            "PAY_ITEM_CODE": "10010202",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "退休费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239272582rw3au5ocpi",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239272582rw3au5ocpi"
        },
        {
            "ID": "10010203",
            "PAY_ITEM_CODE": "10010203",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "退职(役)费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239275821os4jhddusj",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239275821os4jhddusj"
        },
        {
            "ID": "10010204",
            "PAY_ITEM_CODE": "10010204",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "抚恤金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239264765cjt998li1o",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239264765cjt998li1o"
        },
        {
            "ID": "10010205",
            "PAY_ITEM_CODE": "10010205",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "生活补助",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239269385qj682lnmmj",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239269385qj682lnmmj"
        },
        {
            "ID": "10010206",
            "PAY_ITEM_CODE": "10010206",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "救济费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239311330b0loqip5ah",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239311330b0loqip5ah"
        },
        {
            "ID": "10010207",
            "PAY_ITEM_CODE": "10010207",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "助学金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239314259csw8aelleo",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239314259csw8aelleo"
        },
        {
            "ID": "10010208",
            "PAY_ITEM_CODE": "10010208",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "奖励金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239302524o88r6p6i3k",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239302524o88r6p6i3k"
        },
        {
            "ID": "10010209",
            "PAY_ITEM_CODE": "10010209",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "生产补贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239308411frbroqhsdo",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239308411frbroqhsdo"
        },
        {
            "ID": "10010210",
            "PAY_ITEM_CODE": "10010210",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "住房公积金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239623098c6m1bt8hsi",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239623098c6m1bt8hsi"
        },
        {
            "ID": "10010211",
            "PAY_ITEM_CODE": "10010211",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "提租补贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239614852ksb47atdum",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239614852ksb47atdum"
        },
        {
            "ID": "10010212",
            "PAY_ITEM_CODE": "10010212",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "购房补贴",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239618859l8wfh690wo",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239618859l8wfh690wo"
        },
        {
            "ID": "10010213",
            "PAY_ITEM_CODE": "10010213",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "独生子女补助",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239608385esfv8d8v0o",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239608385esfv8d8v0o"
        },
        {
            "ID": "10010214",
            "PAY_ITEM_CODE": "10010214",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "计划生育奖",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "000000000000000000000000000000202006011222396117002sahc4hoan",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "000000000000000000000000000000202006011222396117002sahc4hoan"
        },
        {
            "ID": "10010215",
            "PAY_ITEM_CODE": "10010215",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "医疗费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239601934u1w67u69do",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239601934u1w67u69do"
        },
        {
            "ID": "10010216",
            "PAY_ITEM_CODE": "10010216",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "家属统筹医疗",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239605209vottrne6nn",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239605209vottrne6nn"
        },
        {
            "ID": "10010217",
            "PAY_ITEM_CODE": "10010217",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "患者困难补助",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239631565p20r80lbnl",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239631565p20r80lbnl"
        },
        {
            "ID": "10010218",
            "PAY_ITEM_CODE": "10010218",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "探亲路费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239634822cq9i30wa5m",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239634822cq9i30wa5m"
        },
        {
            "ID": "10010219",
            "PAY_ITEM_CODE": "10010219",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "其他对个人和家庭补助",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239627746ibnaw8lknl",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239627746ibnaw8lknl"
        },
        {
            "ID": "10010231",
            "PAY_ITEM_CODE": "10010231",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183918329shwh56d7wl9bj",
            "PAY_ITEM_NAME": "员工补贴",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "口腔科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239503706q1kpwssuol",
            "PARENT_NAME": "对个人和家庭补助",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239503706q1kpwssuol"
        },
        {
            "ID": "10020101",
            "PAY_ITEM_CODE": "10020101",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "血费",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239452085h38hkvjtkn",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239452085h38hkvjtkn"
        },
        {
            "ID": "10020102",
            "PAY_ITEM_CODE": "10020102",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "氧气费",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239437040jdcbnu31ti",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239437040jdcbnu31ti"
        },
        {
            "ID": "10020103",
            "PAY_ITEM_CODE": "10020103",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "放射材料",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "000000000000000000000000000000202006011222394415408e28shjdmk",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394415408e28shjdmk"
        },
        {
            "ID": "10020104",
            "PAY_ITEM_CODE": "10020104",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "化验材料",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239444943f81mdcl3tk",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239444943f81mdcl3tk"
        },
        {
            "ID": "10020105",
            "PAY_ITEM_CODE": "10020105",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "口腔材料",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239448098upbe2i8efk",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239448098upbe2i8efk"
        },
        {
            "ID": "10020106",
            "PAY_ITEM_CODE": "10020106",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391959267e4u34eljqso",
            "PAY_ITEM_NAME": "疫苗",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "防保科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239456989awdf4q60wk",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239456989awdf4q60wk"
        },
        {
            "ID": "10020109",
            "PAY_ITEM_CODE": "10020109",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "其他卫生材料",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239460437ciiliiqb4h",
            "PARENT_NAME": "卫生材料费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239460437ciiliiqb4h"
        },
        {
            "ID": "10020201",
            "PAY_ITEM_CODE": "10020201",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "办公用品",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239396386dold12mj2j",
            "PARENT_NAME": "日常办公用品费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239396386dold12mj2j"
        },
        {
            "ID": "10020202",
            "PAY_ITEM_CODE": "10020202",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "低值易耗品",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239399252j0kbar5hfi",
            "PARENT_NAME": "日常办公用品费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239399252j0kbar5hfi"
        },
        {
            "ID": "10020299",
            "PAY_ITEM_CODE": "10020299",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "其他材料",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222394342426je2rp0t4o",
            "PARENT_NAME": "日常办公用品费",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394342426je2rp0t4o"
        },
        {
            "ID": "10020301",
            "PAY_ITEM_CODE": "10020301",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "西药",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239316086m06bcctmuo",
            "PARENT_NAME": "药品费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239316086m06bcctmuo"
        },
        {
            "ID": "10020302",
            "PAY_ITEM_CODE": "10020302",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "中成药",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239319935ao6c5pjj7i",
            "PARENT_NAME": "药品费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239319935ao6c5pjj7i"
        },
        {
            "ID": "10020303",
            "PAY_ITEM_CODE": "10020303",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391910786q36pk20w60n",
            "PAY_ITEM_NAME": "中草药",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "药剂科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239322946w25mkuc61i",
            "PARENT_NAME": "药品费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239322946w25mkuc61i"
        },
        {
            "ID": "10020401",
            "PAY_ITEM_CODE": "10020401",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "通用资产",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239575979chklsn4qum",
            "PARENT_NAME": "固定资产购置费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239575979chklsn4qum"
        },
        {
            "ID": "10020402",
            "PAY_ITEM_CODE": "10020402",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391787987fwp711ns2ih",
            "PAY_ITEM_NAME": "专用设备",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "普通外科病区",
            "SELECTED_ID": "00000000000000000000000000000020200601122239578987007qnvqf7k",
            "PARENT_NAME": "固定资产购置费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239578987007qnvqf7k"
        },
        {
            "ID": "10020403",
            "PAY_ITEM_CODE": "10020403",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239598040tvebkvd4wh",
            "PARENT_NAME": "固定资产购置费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239598040tvebkvd4wh"
        },
        {
            "ID": "1003",
            "PAY_ITEM_CODE": "1003",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "提取医疗风险基金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239416391o2slfjn7hm",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239416391o2slfjn7hm"
        },
        {
            "ID": "100701",
            "PAY_ITEM_CODE": "100701",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "办公费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239518101f82f65t6tn",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239518101f82f65t6tn"
        },
        {
            "ID": "100702",
            "PAY_ITEM_CODE": "100702",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "印刷费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239463718ejwqvkqj3i",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239463718ejwqvkqj3i"
        },
        {
            "ID": "100703",
            "PAY_ITEM_CODE": "100703",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "咨询费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "000000000000000000000000000000202006011222394669764hupv7auun",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394669764hupv7auun"
        },
        {
            "ID": "100704",
            "PAY_ITEM_CODE": "100704",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "手续费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "000000000000000000000000000000202006011222394702856kalmcvhro",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394702856kalmcvhro"
        },
        {
            "ID": "100705",
            "PAY_ITEM_CODE": "100705",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "设备购置",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222394736852svukjfenk",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394736852svukjfenk"
        },
        {
            "ID": "100706",
            "PAY_ITEM_CODE": "100706",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "电费",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239476020upqwq67iul",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239476020upqwq67iul"
        },
        {
            "ID": "100707",
            "PAY_ITEM_CODE": "100707",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "邮电费",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239496520ihqasjsf5m",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239496520ihqasjsf5m"
        },
        {
            "ID": "100709",
            "PAY_ITEM_CODE": "100709",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "物业管理费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239507747rm7ufndqcl",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239507747rm7ufndqcl"
        },
        {
            "ID": "100711",
            "PAY_ITEM_CODE": "100711",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "差旅费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239390413c6i3lmbshm",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239390413c6i3lmbshm"
        },
        {
            "ID": "100712",
            "PAY_ITEM_CODE": "100712",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "因公出国(境)费用",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239393390417a24fobi",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239393390417a24fobi"
        },
        {
            "ID": "100713",
            "PAY_ITEM_CODE": "100713",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "维修（护）费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "0000000000000000000000000000002020060112223937303045cvcuqjim",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "0000000000000000000000000000002020060112223937303045cvcuqjim"
        },
        {
            "ID": "100714",
            "PAY_ITEM_CODE": "100714",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "租赁费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222393772198hmk816fqi",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "000000000000000000000000000000202006011222393772198hmk816fqi"
        },
        {
            "ID": "100715",
            "PAY_ITEM_CODE": "100715",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "会议费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239380070skneurl43i",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239380070skneurl43i"
        },
        {
            "ID": "100716",
            "PAY_ITEM_CODE": "100716",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "培训费",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239384362iheosienam",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239384362iheosienam"
        },
        {
            "ID": "100717",
            "PAY_ITEM_CODE": "100717",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "公务接待费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239387326eoi434q9ak",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239387326eoi434q9ak"
        },
        {
            "ID": "100725",
            "PAY_ITEM_CODE": "100725",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "专用燃料费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222394079101fiutt4mwm",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394079101fiutt4mwm"
        },
        {
            "ID": "100726",
            "PAY_ITEM_CODE": "100726",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "劳务费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239410758dtdbcbqu0l",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239410758dtdbcbqu0l"
        },
        {
            "ID": "10072701",
            "PAY_ITEM_CODE": "10072701",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
            "PAY_ITEM_NAME": "消毒费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "护理部",
            "SELECTED_ID": "00000000000000000000000000000020200601122239335452okeo4d2qto",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239335452okeo4d2qto"
        },
        {
            "ID": "10072702",
            "PAY_ITEM_CODE": "10072702",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "洗涤费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239332506dctfn8jhcm",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239332506dctfn8jhcm"
        },
        {
            "ID": "10072703",
            "PAY_ITEM_CODE": "10072703",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "污水处理费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239329328i8cu9r4owo",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239329328i8cu9r4owo"
        },
        {
            "ID": "10072704",
            "PAY_ITEM_CODE": "10072704",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
            "PAY_ITEM_NAME": "医废处理费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "护理部",
            "SELECTED_ID": "00000000000000000000000000000020200601122239325178c7stv5bssj",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239325178c7stv5bssj"
        },
        {
            "ID": "10072705",
            "PAY_ITEM_CODE": "10072705",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919538nlf3urlb54l0o",
            "PAY_ITEM_NAME": "卫生及消杀费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "护理部",
            "SELECTED_ID": "00000000000000000000000000000020200601122239351805l2tj656okk",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239351805l2tj656okk"
        },
        {
            "ID": "10072706",
            "PAY_ITEM_CODE": "10072706",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "软件及维护费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239348709crw50f2pol",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239348709crw50f2pol"
        },
        {
            "ID": "10072707",
            "PAY_ITEM_CODE": "10072707",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "物业服务费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222393448592wkcw2sbqh",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "000000000000000000000000000000202006011222393448592wkcw2sbqh"
        },
        {
            "ID": "10072708",
            "PAY_ITEM_CODE": "10072708",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "检验费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239341403mwqpn3e45l",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239341403mwqpn3e45l"
        },
        {
            "ID": "10072709",
            "PAY_ITEM_CODE": "10072709",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "计量仪器",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222393577931h7b2f3v3j",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "000000000000000000000000000000202006011222393577931h7b2f3v3j"
        },
        {
            "ID": "10072710",
            "PAY_ITEM_CODE": "10072710",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "医疗鉴定费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "0000000000000000000000000000002020060112223953317060n39d7p9o",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "0000000000000000000000000000002020060112223953317060n39d7p9o"
        },
        {
            "ID": "10072711",
            "PAY_ITEM_CODE": "10072711",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "医用X射线机检测费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239523237b8w8cbpshh",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239523237b8w8cbpshh"
        },
        {
            "ID": "10072712",
            "PAY_ITEM_CODE": "10072712",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "新生儿筛查",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239552290nq04sf2reo",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239552290nq04sf2reo"
        },
        {
            "ID": "10072799",
            "PAY_ITEM_CODE": "10072799",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "其他委托业务费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239526466bbk9j2j7vn",
            "PARENT_NAME": "委托业务费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239526466bbk9j2j7vn"
        },
        {
            "ID": "100728",
            "PAY_ITEM_CODE": "100728",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "工会经费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239413560vt245lkh3o",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239413560vt245lkh3o"
        },
        {
            "ID": "100729",
            "PAY_ITEM_CODE": "100729",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "福利费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239419317wol8nsd81h",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239419317wol8nsd81h"
        },
        {
            "ID": "100731",
            "PAY_ITEM_CODE": "100731",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "公务用车运行维护费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "0000000000000000000000000000002020060112223929951528srs0pnmm",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "0000000000000000000000000000002020060112223929951528srs0pnmm"
        },
        {
            "ID": "100732",
            "PAY_ITEM_CODE": "100732",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "业务用车运行维护费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239305555m9po0lii0j",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239305555m9po0lii0j"
        },
        {
            "ID": "100739",
            "PAY_ITEM_CODE": "100739",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "其他交通工具运行维护",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "0000000000000000000000000000002020060112223929178465rp151toi",
            "PARENT_NAME": "管理费用",
            "DATA_SELECTED": "0000000000000000000000000000002020060112223929178465rp151toi"
        },
        {
            "ID": "10079901",
            "PAY_ITEM_CODE": "10079901",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "诉讼费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "000000000000000000000000000000202006011222395592463171raa0rj",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "000000000000000000000000000000202006011222395592463171raa0rj"
        },
        {
            "ID": "10079902",
            "PAY_ITEM_CODE": "10079902",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "律师费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239555647oa2b375hho",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239555647oa2b375hho"
        },
        {
            "ID": "10079903",
            "PAY_ITEM_CODE": "10079903",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "提取坏帐准备",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239548870o99r80u1bm",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239548870o99r80u1bm"
        },
        {
            "ID": "10079904",
            "PAY_ITEM_CODE": "10079904",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919339ufm1j2p711cdm",
            "PAY_ITEM_NAME": "工作餐费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "人事科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239545566m3ulk6atqh",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239545566m3ulk6atqh"
        },
        {
            "ID": "10079905",
            "PAY_ITEM_CODE": "10079905",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839192592wlbtsav9mwkm",
            "PAY_ITEM_NAME": "宣传费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "党办",
            "SELECTED_ID": "00000000000000000000000000000020200601122239541782b7nvasfv7m",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239541782b7nvasfv7m"
        },
        {
            "ID": "10079906",
            "PAY_ITEM_CODE": "10079906",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "PAY_ITEM_NAME": "健康教育费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "科教科",
            "SELECTED_ID": "0000000000000000000000000000002020060112223953707312br5vphbk",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "0000000000000000000000000000002020060112223953707312br5vphbk"
        },
        {
            "ID": "10079909",
            "PAY_ITEM_CODE": "10079909",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "医疗纠纷补助",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239530335kdhc2mjeao",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239530335kdhc2mjeao"
        },
        {
            "ID": "10079910",
            "PAY_ITEM_CODE": "10079910",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "PAY_ITEM_NAME": "科研费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "科教科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239595069v0dhm5a99j",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239595069v0dhm5a99j"
        },
        {
            "ID": "1007991101",
            "PAY_ITEM_CODE": "1007991101",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "PAY_ITEM_NAME": "中山医合作费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "科教科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239338381e3e8fcctco",
            "PARENT_NAME": "教学费",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239338381e3e8fcctco"
        },
        {
            "ID": "1007991109",
            "PAY_ITEM_CODE": "1007991109",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "PAY_ITEM_NAME": "其他教学费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "科教科",
            "SELECTED_ID": "000000000000000000000000000000202006011222393548164k9qab3v9k",
            "PARENT_NAME": "教学费",
            "DATA_SELECTED": "000000000000000000000000000000202006011222393548164k9qab3v9k"
        },
        {
            "ID": "10079912",
            "PAY_ITEM_CODE": "10079912",
            "MANAGE_DEPT_ID": "000000000000000000000000000000201711201839194318uk2na9hb8dji",
            "PAY_ITEM_NAME": "专项经费支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "科教科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239589655easv433jjo",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239589655easv433jjo"
        },
        {
            "ID": "10079913",
            "PAY_ITEM_CODE": "10079913",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919758mnjpll27iojoo",
            "PAY_ITEM_NAME": "招牌制作费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "总务科",
            "SELECTED_ID": "0000000000000000000000000000002020060112223958645530ia0bnebm",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "0000000000000000000000000000002020060112223958645530ia0bnebm"
        },
        {
            "ID": "10079914",
            "PAY_ITEM_CODE": "10079914",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "专项业务费",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239582366554flshvlj",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239582366554flshvlj"
        },
        {
            "ID": "10079999",
            "PAY_ITEM_CODE": "10079999",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "其他费用",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239592819ml8i29v7nm",
            "PARENT_NAME": "其他",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239592819ml8i29v7nm"
        },
        {
            "ID": "104001",
            "PAY_ITEM_CODE": "104001",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "罚款支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239366533c0i4mloelh",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239366533c0i4mloelh"
        },
        {
            "ID": "104002",
            "PAY_ITEM_CODE": "104002",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "赞助支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222393693966thvr46kjm",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "000000000000000000000000000000202006011222393693966thvr46kjm"
        },
        {
            "ID": "104003",
            "PAY_ITEM_CODE": "104003",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "财产物资盘亏支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239360568p2lt1e9mmj",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239360568p2lt1e9mmj"
        },
        {
            "ID": "104004",
            "PAY_ITEM_CODE": "104004",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "捐赠支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239363629ibddvkci1j",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239363629ibddvkci1j"
        },
        {
            "ID": "104005",
            "PAY_ITEM_CODE": "104005",
            "MANAGE_DEPT_ID": "0000000000000000000000000000002017112018391936430v441u3suton",
            "PAY_ITEM_NAME": "医保违规扣款",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "医务科",
            "SELECTED_ID": "000000000000000000000000000000202006011222394211148jqw78poum",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394211148jqw78poum"
        },
        {
            "ID": "104006",
            "PAY_ITEM_CODE": "104006",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919675akkpj0e2p664k",
            "PAY_ITEM_NAME": "医管局科研经费支出",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "财务科",
            "SELECTED_ID": "00000000000000000000000000000020200601122239427897qhk3nhrqal",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239427897qhk3nhrqal"
        },
        {
            "ID": "104090",
            "PAY_ITEM_CODE": "104090",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "特别贡献奖金",
            "IS_MANAGE_DEPT_DECLARE": "1",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "00000000000000000000000000000020200601122239402218l2blherewm",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "00000000000000000000000000000020200601122239402218l2blherewm"
        },
        {
            "ID": "104091",
            "PAY_ITEM_CODE": "104091",
            "MANAGE_DEPT_ID": "00000000000000000000000000000020171120183919183429h0hkmadbll",
            "PAY_ITEM_NAME": "青年基金",
            "IS_MANAGE_DEPT_DECLARE": "0",
            "PAY_ITEM_DESC": null,
            "MANAGE_DEPT_NAME": "秘书处",
            "SELECTED_ID": "000000000000000000000000000000202006011222394041222p2vb77kjk",
            "PARENT_NAME": "其他支出",
            "DATA_SELECTED": "000000000000000000000000000000202006011222394041222p2vb77kjk"
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
                title: "支出事项设置",
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

