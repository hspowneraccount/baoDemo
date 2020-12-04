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
    isIphoneX: false,
    tabbar: {},
    tabbar: {
      list: [
        {
          "pagePath": "pages/agent/index/index",
          "text": "首页",
          "iconPath": "img/tabbar/shouye.png",
          "selectedIconPath": "img/tabbar/shouye_.png"
        },
        {
          "pagePath": "pages/agent/data/data",
          "text": "统计",
          "iconPath": "img/tabbar/tongji.png",
          "selectedIconPath": "img/tabbar/tongji_.png"
        },
        {
          "pagePath": "pages/agent/distribution/distribution",
          "text": "铺货",
          "iconPath": "img/tabbar/puhuo.png",
          "selectedIconPath": "img/tabbar/puhuo_.png"
        },
        {
          "pagePath": "pages/agent/agent/agent",
          "text": "代理",
          "iconPath": "/img/tabbar/daili.png",
          "selectedIconPath": "img/tabbar/daili_.png"
        },
        {
          "pagePath": "pages/agent/user/user",
          "text": "个人",
          "iconPath": "img/tabbar/wode.png",
          "selectedIconPath": "img/tabbar/wode_.png"
        }
      ],
      "backgroundColor": "#ffffff",
      "selectedColor": "#39b54a",
      "color": "#545454"
    },
  },

  ready(){
    // app.editTabbar().then(res => {
    //   console.log(res) 
    //   console.log(res)
    //   this.setData({
    //     tabbar: res
    //   })
    // })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
