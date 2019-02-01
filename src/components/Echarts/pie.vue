<template>
  <div ref="chartDom" style="width: 100%;height: 320px;"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'
export default {
  props: {
    echartData: {
      type: Object,
      default: function () {
        return null
      }
    }
  },
  data () {
    return {
      chart1: null,
      debounceTdentify: 0
    }
  },
  watch: {
    echartData (newValue, oldValue) {
      if (newValue !== null) {
        this.drawChart()
      }
    }
  },
  // mounted () {
  //   window.addEventListener('resize', this.resizeFu, false)
  // },
  // beforeRouteLeave (to, from, next) {
  //   window.removeEventListener('resize', this.resizeFu, false)
  //   next()
  // },
  methods: {
    drawChart () {
      let { chart1 } = this
      chart1 = echarts.init(this.$refs.chartDom, 'macarons')
      let seriesData = this.echartData.itemData ? this.echartData.itemData : []
      if (seriesData.length === 0) {
        chart1.setOption({
          backgroundColor: 'rgba(232, 232, 232, 0.34)',
          title: {
            text: '暂无数据',
            left: 'center',
            top: 'middle'
          }
        })
      } else {
        chart1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: ' {b} : {c} ({d}%)'
          },
          legend: {
            show: false
          },
          series: [{
            type: 'pie',
            data: seriesData,
            label: {
              normal: {
                show: true,
                formatter: '{b}\n{d}%'
              }
            }
          }]
        })
      }
      chart1.on('click', (event) => {
        if (event.seriesType === 'pie') this.$emit('setPieMsg', event.data)
      })
      this.chart1 = chart1
    },
    resizeFu (el) {
      // 重绘，防抖500ms延迟
      this.debounceTdentify && clearTimeout(this.debounceTdentify)
      this.debounceTdentify = setTimeout(() => {
        this.chart1.resize()
      }, 500)
    }
  },
  computed: {
  }
}
</script>
