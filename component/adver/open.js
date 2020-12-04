// components/adver/open.js
const app = getApp();
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    closeBtn: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false
    },
    maskClose: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    DotStyle: true,
    swiperList: [],
  },

  ready() {
    this.getAd()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取广告
     */
    getAd(){
      app.get('commonapi/get_ads', {
        postion_id: 1,
        zuo_sn: wx.getStorageSync('ad_zuo_sn')
      }).then(res => {
        let list = []
        for(var i in res){
          list.push({
            type: 'image',
            url: res[i].img_url,
            ad_link: res[i].ad_link
          })
        }
        this.setData({
          swiperList: list
        })
      })
    },
    
    eventClose() {
      if (this.data.maskClose) {
        this.close()
      }
    },

    close() {
      this.setData({
        show: false
      })
    }
  }
})