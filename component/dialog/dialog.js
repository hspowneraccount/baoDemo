// components/drawer/index.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    confirmBtn:{
      type: Boolean,
      value: false
    },
    cencelBtn: {
      type: Boolean,
      value: true
    },
    closeBtn:{
      type: Boolean,
      value: false
    },
    show: {
      type: Boolean,
      value: false
    },
    maskClose: {
      type: Boolean,
      value: true
    },
    modalType: {
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    text: ''
  },
  ready: function () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    eventClose () {
      if (this.data.maskClose) {
        this.close()
      }
    },
    close() {
      this.setData({
        show: false
      });
      this.triggerEvent('close');
    },
    confirm(){
      this.triggerEvent('confirm');
    }
  }
})
