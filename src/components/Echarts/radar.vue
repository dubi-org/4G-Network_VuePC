<template>
  <div ref="chartDom" :style="{width: '100%',height: height}"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    echartData: {
      type: Object,
      default: null
    },
    isResize: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '300px'
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
      if (JSON.stringify(newValue) !== '{}') {
        this.drawChart()
      }
    },
    isResize (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.resizeFu()
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
      const {echartData} = this
      this.chart1 = echarts.init(this.$refs.chartDom, 'roma')
      let seriesData = echartData.itemData ? echartData.itemData : []
      let indicator = echartData.axis.data.map(el => { return {text: el, max: echartData.max} })
      let showLegend = echartData.itemData.length !== 1
      if (seriesData.length === 0) {
        this.chart1.setOption({
          backgroundColor: 'rgba(232, 232, 232, 0.34)',
          title: {
            text: '暂无数据',
            left: 'center',
            top: 'middle'
          }
        })
      } else {
        this.chart1.setOption({
          legend: {
            show: showLegend,
            itemWidth: 15,
            itemHeight: 15,
            borderRadius: 15
          },
          tooltip: {},
          radar: {
            center: ['50%', '60%'],
            indicator: indicator
          },
          series: [{
            type: 'radar',
            data: seriesData
          }]
        })
      }
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
