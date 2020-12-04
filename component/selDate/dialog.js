const app = getApp()
Component({
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    selObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selType: 1
  },

  ready() {
    this.page = app.getPage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 选择日期层
     */
    setModel(e) {
      let idx = e ? e.currentTarget.dataset.idx : 0
      if (idx == 1) this.selObj = this.data.selObj
      if (idx == 0 && this.clearDateStatus) {
        this.page.setData({
          selObj: this.selObj
        })
      }else if (idx == 0 && this.selObj != this.data.selObj){
        this.clearDate()
      }
      this.clearDateStatus = false
      this.setData({
        editModel: idx
      })
    },

    /**
     * 选择日期类型
     */
    setSelType(e) {
      this.setData({
        selType: e.currentTarget.dataset.type
      })
    },

    /**
     * 选择完成
     */
    selOk() {
      let pData = this.data
      if (pData.selType == 2 && pData.selObj.month) {
        this.page.setData({
          ['selObj.begin']: pData.selObj.month + '-01',
          ['selObj.end']: this.getCurrentMonthLast(pData.selObj.month)
        })
      }
      this.setData({
        editModel: 0
      })
      this.triggerEvent("dateOk")
    },

    /**
     * 清空选择
     */
    clearDate(){
      this.page.setData({
        ['selObj.begin']: '',
        ['selObj.end']: '',
        ['selObj.month']: ''
      })
      this.clearDateStatus = true
    },

    /**
     * 获取指定月最后一天
     */
    getCurrentMonthLast(date) {     
      var endDate = new Date(date); // date 2018-08
      var month = endDate.getMonth();     
      var nextMonth = ++month;     
      var nextMonthFirstDay = new Date(endDate.getFullYear(), nextMonth, 1);     
      var oneDay = 1000 * 60 * 60 * 24;
      var dateString = new Date(nextMonthFirstDay - oneDay);
      return (dateString.toLocaleDateString()).replace(new RegExp('/', 'g'), "-"); //toLocaleDateString() 返回 如：2018/8/31
    }
  }
})