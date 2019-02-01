<template>
  <div>
    <Card>
      <div class="search-form">
        <div class="form-item">
          <span class="name">日志类型</span>
          <Select v-model="chartsParam.logType" clearable style="width: 180px">
            <Option v-for="item in logTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="form-item">
          <span class="name">开始时间</span>
          <DatePicker type="datetime" v-model="chartsParam.beginTime" placeholder="开始时间"></DatePicker>
        </div>
        <div class="form-item">
          <span class="name">结束时间（可不选）</span>
          <DatePicker type="datetime"  v-model="chartsParam.endTime" placeholder="结束时间"></DatePicker>
        </div>
        <div class="form-item">
          <span class="name">号码</span>
          <auto-complete-phone :phone.sync="chartsParam.phone"></auto-complete-phone>
        </div>
        <Button @click="handleSearch" class="search-btn" type="primary">查询</Button>
      </div>
      <div class="filter-box">上网日志列表
        <div class="btn-list">
          <ButtonGroup shape="circle">
            <Button :type="(activeType === item.type)?'primary':'default'" v-for="item in quickDateList" :key="item.type" @click="changQuickDate(item.type)">
              {{item.label}}
            </Button>
          </ButtonGroup>
          &nbsp;<Button type="success" shape="circle" ghost @click="showCharts = true">显示报表</Button>
          &nbsp;<Button type="primary" shape="circle" ghost @click="exportData(1)">导出数据</Button>
        </div>
      </div>
      <Table highlight-row stripe ref="currentTable" :loading="loading" :height="tableHeight" size="small" :columns="header" :data="table" @on-row-click="showCharts = true"></Table>
      <Page class="page" :current="pagination.current" :total="pagination.total" :page-size="pagination.size" :page-size-opts="[10, 20, 50, 100]" @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator show-total show-sizer />
    </Card>
    <chart-dialog dialogTitle="报表分析" :showCharts="showCharts" :chartsParam="chartsParam" @close="closeChart"></chart-dialog>
  </div>
</template>
<script>
import autoCompletePhone from '_c/autoCompletePhone'
const chartDialog = resolve => require(['./children/chartDialog'], resolve)
export default {
  name: 'NetworkLog',
  components: {
    chartDialog, autoCompletePhone
  },
  data () {
    return {
      activeType: 0,
      chartsParam: {
        logType: '2',
        beginTime: '',
        endTime: '',
        phone: '18819425697'
      },
      header: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '号码',
          key: 'name1'
        },
        {
          title: '业务结束时间',
          key: 'name2',
          minWidth: 40,
          sortable: true
        },
        {
          title: '上行流量',
          key: 'name3',
          width: 110,
          sortable: true
        },
        {
          title: '下行流量',
          key: 'name4',
          width: 110,
          sortable: true
        },
        {
          title: '总流量',
          key: 'name5',
          width: 110,
          sortable: true
        },
        {
          title: '网站',
          key: 'name6',
          minWidth: 40
        },
        {
          title: 'URL',
          key: 'name7'
        },
        {
          title: '业务大类',
          key: 'name8'
        },
        {
          title: '业务子类',
          key: 'name9',
          filters: [
            {
              label: '微信',
              value: '微信'
            },
            {
              label: '其他',
              value: '其他'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.name9.indexOf(value) > -1
          }
        }
      ],
      loading: false,
      logTypeList: [
        {
          value: '1',
          label: 'LTE HTTP上网日志（客服版）'
        },
        {
          value: '2',
          label: 'TD-LTE HTTP上网日志（客服版）'
        },
        {
          value: '3',
          label: 'GSM HTTP上网日志（客服版）'
        },
        {
          value: '4',
          label: 'LTE HTTP上网日志'
        }
      ],
      pagination: {
        current: 1,
        total: 0,
        size: 10
      },
      quickDateList: [
        { type: 0, label: '全部' },
        { type: 1, label: '今天' },
        { type: 2, label: '昨天' },
        { type: 3, label: '前天' },
        { type: 4, label: '近一周' },
        { type: 5, label: '近一月' }
      ],
      showCharts: false,
      table: [],
      tableHeight: 450
    }
  },
  created () {
    // this.getTableData()
  },
  mounted () {
    this.getTableData()
    this.tableHeight = window.innerHeight - 270
  },
  methods: {
    handleSearch () {
      this.pagination.current = 1
      this.getTableData()
    },
    getTableData () {
      this.loading = true
      // let params = Object.assign(this.pagination, this.chartsParam)
      this.table = [
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '其他'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '其他'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        },
        {
          name1: '132****1233',
          name2: '2018-09-20 00:00:00',
          name3: '213',
          name4: '433',
          name5: '2132',
          name6: 'www.baidu.com',
          name7: '/bai/wang',
          name8: '即时通信',
          name9: '微信'
        }
      ]
      this.pagination.total = this.table.length
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    exportData (type) {
      this.$refs.currentTable.exportCsv({
        filename: 'The original data'
      })
    },
    changePage (val) {
      this.pagination.current = val
      this.getTableData()
    },
    changeSize (val) {
      this.pagination.size = val
      this.getTableData()
    },
    closeChart (data) {
      this.showCharts = data
    },
    changQuickDate (type) {
      this.activeType = type
    }
  }
}
</script>
<style lang="less" scoped>
  .filter-box{
    border-left: 4px solid #2d8cf0;
    padding: 0px 7px;
    margin-bottom: 15px;
    .btn-list{
      display: inline-block;
      margin-left: 20px;
    }
  }
  .page{
    margin: 15px 0 15px;
    text-align: right;
  }
  .highlight{
    color: #ed4014;
  }
</style>
