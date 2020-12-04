//index.js
//获取应用实例
import { loginOut } from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuObj: {
      data: [
        {
          name: '状态',
          type: 'grid_btn',
          key: 'order_type',
          value: 4,
          dvalue: 4,
          data: [ 
            {
              name: '全部',
              value: 4
            },
            {
              name: '待支付',
              value: 0
            },
            {
              name: '租借中',
              value: 1
            },
            {
              name: '已完成',
              value: 2
            },
            {
              name: '0元订单',
              value: 6
            },
            {
              name: '租借失败',
              value: 5
            },
            {
              name: '扣款失败',
              value: 7
            }
          ]
        },
        {
          name: '全部商户',
          type: 'search',
          key: 'store_name',
          placeholder: '请输入商户名称'
        },
        {
          name: '全部设备',
          type: 'search',
          key: 'goods_sn',
          placeholder: '请输入设备SN码',
          list: {
            name: '设备类型',
            type: 'grid_btn',
            key: 'device_type',
            value: -1,
            dvalue: -1,
            data: [
              {
                name: '全部',
                value: -1
              },
              {
                name: '充电座',
                value: 0
              },
              {
                name: '充电线',
                value: 1
              },
              {
                name: '按摩枕',
                value: 2
              },
              {
                name: '充电桩',
                value: 3
              },
              {
                name: '洗衣机',
                value: 4
              }
            ]
          }
        }
      ]
    },
    tips: '请稍后',
    show: true,
    animated: true,
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    oneButton: [{ text: '确定' }],
    show:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){
    this.timer = setInterval(() => {
      this.setData({
        show: !this.data.show
      })
    }, 2000)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  loginOut(){
      loginOut().then(res =>{
        console.log(res)   
      })
  },
  tapDialogButton(e){
    console.log(e)
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false,
      show:false
    })
  },
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },
  /**
 * dropdownmenu 确认
 */
  dropOk() {
    let data = this.data.menuObj.data
    for (var i in data) {
      if (data[i].value != undefined) this.data.selObj[data[i].key] = data[i].value
      let childList = data[i].list
      if (childList) {
        if (childList.value != undefined) this.data.selObj[childList.key] = childList.value
      }
    }
    this.loadProList(this.data.TabCur)
  },
})
