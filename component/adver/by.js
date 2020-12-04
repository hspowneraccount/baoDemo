// components/adver/by.js
const app = getApp();
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '172.5rpx'
    },

    show: {
      type: Boolean,
      value: false
    },

    postion_id: {
      type: Number,
      value: 2
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
    getAd() {
      app.get('commonapi/get_ads', {
        postion_id: this.data.postion_id,
        zuo_sn: wx.getStorageSync('ad_zuo_sn')
      }).then(res => {
        let list = []
        for (var i in res) {
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
    }
  }
})