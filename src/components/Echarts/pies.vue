<template>
  <div ref="chartDom" style="width: 100%;height: 260px;"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    echartData: {
      type: Object,
      default: function () {
        return null
      }
    },
    isResize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      chart1: null,
      debounceTdentify: 0,
      seriesData: null
    }
  },
  watch: {
    echartData (newValue, oldValue) {
      if (newValue !== null) {
        this.drawChart()
      }
    },
    isResize (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.drawChart()
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
      let {chart1, isResize} = this
      chart1 = echarts.init(this.$refs.chartDom, 'roma')
      this.seriesData = this.echartData.itemData ? this.echartData.axis.data.map((item, index) => {
        let x = 0
        let y = 50
        if (isResize) {
          x = index / (this.echartData.axis.data.length - 1) * 80 + 10
          y = 50
        } else {
          if (index > 2) {
            x = (index - 3) / 2 * 60 + 20
            y = 75
          } else {
            x = index / 2 * 60 + 20
            y = 35
          }
        }
        return {
          name: item,
          type: 'pie',
          center: [`${x}%`, `${y}%`],
          radius: isResize ? [70, 54] : [50, 42],
          hoverAnimation: false,
          label: {
            normal: {
              position: 'center',
              formatter: '{b}: {d}%'
            }
          },
          data: [{
            value: 0,
            tooltip: { show: false },
            label: {
              normal: {
                fontSize: 16,
                fontWeight: 'bold',
                position: 'center',
                formatter: '{a}'
              }
            }
          }].concat(this.echartData.itemData.map(el => {
            return { name: el.name, value: el.data[index] }
          }))
        }
      }) : []
      if (this.seriesData.length === 0) {
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
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {},
          series: this.seriesData
        })
      }
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
