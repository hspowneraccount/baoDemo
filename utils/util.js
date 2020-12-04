const app = getApp();

/**
 * 选择图片路径
 */
function chooseImageTap() {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success(res) {
        console.log(res)
        if (!res.cancel) {
          let type = res.tapIndex == 0 ? 'album' : 'camera';
          chooseWxImage(type).then(res => {
            resolve(res);
          })
        }
      }
    })
  });
}

function saveCode(){
  wx.saveImageToPhotosAlbum({
    filePath: '/img/axcScan.jpg',
    success(res) {  
      console.log
      if (res.dataset == 'saveImageToPhotosAlbum:ok') {
        wx.showToast({
          title: '保存成功'
        });
      } else {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2500
        });
      }
    },
    fail(err) {
      console.log(err);
      wx.showToast({
        title: err.errMsg,
        icon: 'none',
        duration: 2500
      });
    }
  });
}

/**
 * 选择图片
 */
function chooseWxImage(type) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success(res) {
        console.log(res)
        let name = res.tempFilePaths[0];
        name.replace("http://tmp/", "");
        console.log(name)
        wx.showLoading({
          title: '上传中',
        });
        uploadFile({
          file: res.tempFilePaths[0],
          name: name
        }).then(url => {
          resolve({
            url: url,
            type: 1
          });
        });
      },
      fail(err) {
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 2500
        })
      }
    })
  });
}

/**
 * 上传文件
 */
function uploadFile(query) {
  const that = this,
    formData = {};
  formData.file = query.file;
  formData.token = wx.getStorageSync('token');
  console.log(formData)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `https://api.st.aixinchong.com/Image/uploadImage`,
      filePath: query.file,
      name: 'file',
      formData: formData,
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
      },
      success(res) {
        console.log(res);
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.showToast({
            title: '上传成功'
          });
          let info = JSON.parse(res.data);
          console.log(info);
          wx.showToast({
            title: '上传成功' + info.data.file_url,
          });
          resolve(info.data.file_url);
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none'
          });
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showToast({
          title: '网络连接错误',
          icon: 'none'
        });
      }
    })
  })
}

function pay(json) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      appId: json.appid,
      timeStamp: json.timeStamp + "",
      nonceStr: json.nonceStr,
      package: json.package,
      signType: json.signType,
      paySign: json.paySign,
      success(res) {
        resolve(res)
      },
      fail(res) { 
        reject(res);
      },
      complete(res) {
        console.log(res)
      }
    })
  })
}  

function getLocation(json = {}) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: json.type || 'gcj02',
      success(res) {
        resolve({
          code: 0,
          data: res
        })
      },
      fail(err) {
        console.log('locationfail')
        console.log(err)
        if (err.error == 2001) {
          wx.getSetting({
            success: (res) => {
              if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
                wx.confirm({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权',
                  success(res) {
                    if (res.cancel) {
                      wx.showToast({
                        content: '取消授权'
                      });
                      reject()
                    } else if (res.confirm) {
                      wx.openSetting({
                        success(dataAu) {
                          if (dataAu.authSetting["scope.location"] == true) {
                            getLocation().then(rres => {
                              resolve({
                                code: 0,
                                data: rres
                              })
                            })
                          } else {
                            wx.showToast({
                              title: '定位失败'
                            })
                            reject()
                          }
                        },
                        fail() {
                          reject()
                        }
                      })
                    }
                  },
                  fail(err) {
                    reject(err)
                  }
                })
              }
            }
          })
        } else {
          wx.showModal({
            content: err.errorMessage,
            showCancel: false,
            success(res) {
              if (res.confirm) {

              }
            }
          })
          reject()
        }
      }
    })
  })
}

/**
 * 退出登录
 */
function loginOut(){
  return new Promise((resolve, reject) => {
  wx.showModal({
    title: '退出登录',
    content: '确定退出登录吗？',
    success(res) {
      resolve(res) 
      if (res.confirm) {
        app.globalData.agentInfo = '';
        wx.removeStorageSync('shopToken');
        wx.removeStorageSync('shopUser_id');
        wx.showToast({
          title: '退出成功',
        });
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/test/test',
          })
        }, 1000)
      }
    }
  })
  })
}

module.exports = {
  pay: pay,
  chooseImageTap: chooseImageTap,
  chooseWxImage: chooseWxImage,
  getLocation: getLocation,
  saveCode: saveCode,
  loginOut: loginOut
}