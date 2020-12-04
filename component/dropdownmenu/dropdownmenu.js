// component/tab/tab.js
const app = getApp()
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    menuObj: {
      type: Object,
      menuObj: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  ready(){
    this.page = app.getPage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击菜单选项
     */
    setDropdown(e){
      console.log(e)
      let menuObj = this.data.menuObj, item = e.currentTarget.dataset.item
      this.page.setData({
        ['menuObj.drop_type']: menuObj.drop_type == item.key ? '' : item.key
      })
    },

    /**
     * 黑色层关闭
     */
    modelClose(close){
      if (!this.data.menuObj.noModelClose || close){
        this.page.setData({
          ['menuObj.drop_type']: ''
        })
      }
    },

    /**
     * grid 二级菜单选择
     */
    setGridItem(e){
      let menuObj = this.data.menuObj, grid = e.currentTarget.dataset.grid, pidx = e.currentTarget.dataset.pidx, tier = e.currentTarget.dataset.tier || 1
      console.log(tier)
      this.page.setData({
        [`menuObj.data[${pidx}]${tier == 2 ? '.list' : ''}.value`]: grid.value
      })
      this.modelClose()
      this.triggerEvent("dropOk")
    },

    /**
    * grid 三级菜单选择
    */
    setChildGridItem(e) {
      let menuObj = this.data.menuObj, grid = e.currentTarget.dataset.grid, pidx = e.currentTarget.dataset.pidx, tier = e.currentTarget.dataset.tier || 1
      this.page.setData({
        [`menuObj.data[${pidx}].list.value`]: grid.value
      })
      this.modelClose()
      this.triggerEvent("dropOk")
    },

    /**
     * 输入值
     */
    setValue(e){
      let menuObj = this.data.menuObj, pidx = e.currentTarget.dataset.pidx
      this.page.setData({
        [`menuObj.data[${pidx}].value`]: e.detail.value
      })
    },

    /**
     * 确认搜索
     */
    toSearch(){
      this.modelClose()
      this.triggerEvent("dropOk")
    },

    /**
     * 搜索框重置
     */
    resetSearch(e){
      let menuObj = this.data.menuObj, pidx = e.currentTarget.dataset.pidx
      this.page.setData({
        [`menuObj.data[${pidx}].value`]: ''
      })
      this.toSearch()
    }
  }
})
