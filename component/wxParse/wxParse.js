const app = getApp();
/**
 * utils函数引入
 **/
import showdown from './showdown.js';
import HtmlToJson from './html2json.js';
/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pid: { // 活动id
      type: Number,
      value: ''
    },

    data: { // 编辑器数据
      type: String,
      value: ''
    },

    /**
     * 内容类型
     */
    type: {
      type: String,
      value: 'html'
    },

    /**
     * 图片2边间距
     */
    imagePadding: {
      type: Number,
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  ready() {
    realWindowWidth = app.globalData.systemInfo.windowWidth;
    realWindowHeight = app.globalData.systemInfo.windowHeight;
  },

  observers: { //观察者：属性监听
    'pid'() { // 监听 pid 是否设置了数据
      // 倒计时
      if (this.data.pid > 0) {
        this.wxParse();
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 主函数入口区
     **/
    wxParse() {
      var that = this, transData = {}, bindName = 'wxParseData'; //存放转化后的数据
      if (this.data.type == 'html') {
        transData = HtmlToJson.html2json(that.data.data, bindName);
      } else if (this.data.type == 'md' || this.data.type == 'markdown') {
        var converter = new showdown.Converter();
        var html = converter.makeHtml(that.data.data);
        transData = HtmlToJson.html2json(html, bindName);
      }
      transData.view = {};
      transData.view.imagePadding = this.data.imagePadding
      that.setData({
        [bindName]: transData
      });
    },

    // 图片点击事件
    wxParseImgTap(e) {
      var that = this;
      var nowImgUrl = e.currentTarget.dataset.src;
      var tagFrom = e.currentTarget.dataset.from;
      if (typeof(tagFrom) != 'undefined' && tagFrom.length > 0) {
        wx.previewImage({
          current: nowImgUrl, // 当前显示图片的http链接
          urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
        })
      }
    },

    /**
     * 图片视觉宽高计算函数区 
     **/
    wxParseImgLoad(e) {
      var that = this;
      var tagFrom = e.currentTarget.dataset.from;
      var idx = e.currentTarget.dataset.idx;
      if (typeof(tagFrom) != 'undefined' && tagFrom.length > 0) {
        that.calMoreImageInfo(e, idx, that, tagFrom)
      }
    },

    // 假循环获取计算图片视觉最佳宽高
    calMoreImageInfo(e, idx, that, bindName) {
      var temData = that.data[bindName];
      if (!temData || temData.images.length == 0) {
        return;
      }
      var temImages = temData.images;
      //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
      var recal = this.wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
      // temImages[idx].width = recal.imageWidth;
      // temImages[idx].height = recal.imageheight; 
      // temData.images = temImages;
      // var bindData = {};
      // bindData[bindName] = temData;
      // that.setData(bindData);
      var index = temImages[idx].index
      var key = `${bindName}`
      for (var i of index.split('.')) key += `.nodes[${i}]`
      var keyW = key + '.width'
      var keyH = key + '.height'
      that.setData({
        [keyW]: recal.imageWidth,
        [keyH]: recal.imageheight,
      })
    },

    // 计算视觉优先的图片宽高
    wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
      //获取图片的原始长宽
      var windowWidth = 0,
        windowHeight = 0;
      var autoWidth = 0,
        autoHeight = 0;
      var results = {};
      var padding = that.data[bindName].view.imagePadding;
      windowWidth = realWindowWidth - 2 * padding;
      windowHeight = realWindowHeight;
      //判断按照那种方式进行缩放
      // console.log("windowWidth" + windowWidth);
      if (originalWidth > windowWidth) { //在图片width大于手机屏幕width时候
        autoWidth = windowWidth;
        // console.log("autoWidth" + autoWidth);
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        // console.log("autoHeight" + autoHeight);
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
      } else { //否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }
      return results;
    },

    wxParseTemArray(temArrayName, bindNameReg, total, that) {
      var array = [];
      var temData = that.data;
      var obj = null;
      for (var i = 0; i < total; i++) {
        var simArr = temData[bindNameReg + i].nodes;
        array.push(simArr);
      }

      temArrayName = temArrayName || 'wxParseTemArray';
      obj = JSON.parse('{"' + temArrayName + '":""}');
      obj[temArrayName] = array;
      that.setData(obj);
    },

    /**
     * 配置emojis
     * 
     */
    emojisInit(reg = '', baseSrc = "/wxParse/emojis/", emojis) {
      HtmlToJson.emojisInit(reg, baseSrc, emojis);
    }
  }
})