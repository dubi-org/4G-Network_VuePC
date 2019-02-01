<template>
  <div>
    <div class="form-item">
      <span class="name">省份</span>
      <Select v-model="selfProvince" style="width: 100px" @on-change="changeProvince">
        <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="form-item"  v-if="cityList.length">
      <span class="name">城市</span>
      <Select v-model="selfCity" style="width: 100px" @on-change="changeCity">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="form-item" v-if="districtList.length">
      <span class="name">行政区</span>
      <Select v-model="selfDistrict" style="width: 100px">
        <Option v-for="item in districtList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    province: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    district: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      cityList: [],
      districtList: [],
      provinceList: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }],
      selfProvince: this.province,
      selfCity: this.city,
      selfDistrict: this.district
    }
  },
  watch: {
    selfProvince (val) {
      this.$emit('update:province', val)
    },
    selfCity (val) {
      this.$emit('update:city', val)
    },
    selfDistrict (val) {
      this.$emit('update:district', val)
    }
  },
  methods: {
    changeProvince (val) {
      this.city = ''
      this.district = ''
      this.districtList = []
      this.cityList = []
      for (var i = 0; i < this.provinceList.length; i++) {
        if (this.provinceList[i].value === val) {
          this.cityList = this.provinceList[i].children ? this.provinceList[i].children : []
          return false
        }
      }
    },
    changeCity (val) {
      this.district = ''
      this.districtList = []
      for (var i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].value === val) {
          this.districtList = this.cityList[i].children ? this.cityList[i].children : []
          return false
        }
      }
    }
  }
}
</script>
<style>
  .form-item {
    display: inline-block;
  }
</style>
