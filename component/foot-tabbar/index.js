// tabBarComponent/tabBar.js
const app = getApp();
Component({
  options: {
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
	  ossdomain: app.globalData.ossdomain,
    isIphoneX: wx.getStorageSync('isIphoneX'),
    tabbar: {}
  },

  ready(){
    app.editTabbar().then(res => {
      console.log(res) 
      console.log(res)
      this.setData({
        tabbar: res
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
