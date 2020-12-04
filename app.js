//app.js
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        console.log(e)
        this.globalData.StatusBar = e.statusBarHeight
        let capsule = wx.getMenuButtonBoundingClientRect()
        console.log(capsule)
        if (capsule) {
          this.globalData.Custom = capsule
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50
        }
        console.log(this.globalData) 
      }
    })
    // let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
    // console.log(extConfig)
    // this.globalData.app_id = extConfig.app_id || ''
    // this.globalData.agent_id = extConfig.agent_id || ''
    // this.globalData.systemInfo = wx.getSystemInfoSync()
    // this.getSiteInfo()
    // this.getShareInfo()
    // this.queryOrderStatus()
  },
  onShow(){
    this.hidetabbar()  //隐藏tabBar   
    this.getPage()  
  },
  /**
   * 隐藏tabbar
   */
  hidetabbar() {
    wx.hideTabBar({
      fail() {
        setTimeout(function () { // 做了个延时重试一次，作为保底。
          wx.hideTabBar();
        }, 500);
      }
    });
  },
  /**
 * 获取页面
 */
  getPage(num = 1) {
    //获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
    let pages = getCurrentPages(); //获取页面
    console.log(pages) 
    return pages[pages.length - num];
  },
  /**
  * 返回
  */
  goBack(delta = 1) {
    let pages = getCurrentPages(); //获取页面
    console.log(pages)
    if (pages.length > delta) {
      wx.navigateBack({
        delta: delta
      });
    } else if (pages.length > 1) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  },
  /**
* 用户get请求
*/
  get(url, json = {}) {
    // json.user_id = wx.getStorageSync('user_id') || '';
    // json.token = wx.getStorageSync('token') || '';
    return this.request('GET', url, json)
  },

  /**
   * 用户post请求
   */
  post(url, json = {}) {
    // json.user_id = wx.getStorageSync('user_id') || '';
    // json.token = wx.getStorageSync('token') || '';
    return this.request('POST', url, json)
  },
  /**
 * request 请求封装
 */
  request(method, url, json, type, conten_type = 'application/json', ) {
    const that = this;
    // json.appid = this.globalData.app_id || 'wx05c9c3f67154991a';
    // json.agent_id = this.globalData.agent_id || '99';
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.requestUrl + url,
        data: json,
        header: {
          'content-type': conten_type
        },
        method: method,
        success(res) {
          let data = res.data; 
          // 回调成功执行resolve
          console.log(json)
          // wx.setStorageSync('Logintoken', json.token)
          // if (json.otherCode) {
          //   resolve(data); // 返回已经便于拿msg
          // } else if (data.code == 0) {
          //   resolve(data.data);
          // } else if (data.msg == '验证失败，无效的token' || data.msg == '登陆已过期，请重新登陆') {
          //   if (type == 1) {
          //     if (json.login == 2) {
          //       reject(data);
          //     } else {
          //       if (!that.toLogin) {
          //         that.toLogin = true;
          //         that.loginStatus = false;
          //         wx.showLoading({ title: '登录中~~~' });
          //         that.checkLogin();
          //       } else {
          //         that.toLogin = false;
          //         reject(data);
          //       }
          //     }
          //   } else if (type == 2) {
          //     wx.redirectTo({
          //       url: '/pages/agent/login/login',
          //     })
          //   }
          // } else {
          //   wx.showToast({
          //     icon: 'none',
          //     title: data.msg,
          //     duration: 3000
          //   })
          // }
        },
        fail(data) {
          // 回调失败时
          if (typeof reject == 'function') {
            reject(data);
          } else {
            wx.showToast({
              title: data.errMsg
            });
          }
        },
      })
    });
  },
  globalData: {
    userInfo: null
  }
})