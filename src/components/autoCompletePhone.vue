<template>
  <AutoComplete clearable placeholder="手机号码" class="search-input" :data="resultList" @on-search="searchPhone" v-model="selfPhone" style="width: auto"></AutoComplete>
</template>

<script>
export default {
  props: {
    phone: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      selfPhone: this.phone,
      resultList: []
    }
  },
  watch: {
    selfPhone (val) {
      this.$emit('update:phone', val)
    }
  },
  methods: {
    searchPhone (val) {
      this.resultList = !val ? [] : [
        val,
        18922234444,
        18923344445
      ]
    }
  }
}
</script>
