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
    search_key: {
      type: String,
      value: 'key_words'
    },
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入搜索关键词'
    },
    btn_text: {
      type: String,
      value: '搜索'
    },
    btn_status: {
      type: Boolean,
      value: true
    },
    btn_clear: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  ready(){
    this.page = app.getPage()
    console.log(this.page)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 输入值
     */
    setValue(e){
      this.page.setData({
        [`${this.data.search_key}`]: e.detail.value || ''
      })
    },

    /**
     * 确认搜索
     */
    toSearch(){
      this.page.searchOk()
      console.log(this.page.searchOk())
    }
  }
})
