// component/tab/tab.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    fixed: {
      type: Boolean,
      value: true
    },

    tabs: {
      type: Array,
      value: []
    },

    tabsObj: {
      type: Object,
      value: {}
    },

    TabCur: {
      type: Number,
      value: 0
    },

    type: { // 0 数组  1 数组对象
      type: Number,
      value: 0
    },

    filterUrl: { // 筛选url
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * tab切换
     */
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.idx
      })
      this.triggerEvent("tabSelect", {
        value: e.currentTarget.dataset.idx
      })
    }
  }
})
