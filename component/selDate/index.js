const app = getApp()
import dateTimePicker from './dateTimePicker.js'
Component({
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    spaceMake: {
      type: String,
      value: '-'
    },

    key: {
      type: String,
      value: 'date'
    },

    dateLength: {
      type: Number,
      value: 3
    },

    startYear: {
      type: Number,
      value: new Date().getFullYear() - 5
    },

    endYear: {
      type: Number,
      value: new Date().getFullYear()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateTimeArray: null,
    dateTime: null
  },

  ready() {
    this.page = app.getPage()
    let pData = this.data
    let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear)
    obj.dateTime = obj.dateTime.slice(0, pData.dateLength)
    obj.dateTimeArray = obj.dateTimeArray.slice(0, pData.dateLength)
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeDateTimeColumn(e) {
      let pData = this.data,
        dateTime = pData.dateTime,
        dateArr = pData.dateTimeArray
      dateTime[e.detail.column] = e.detail.value
      if (pData.dateLength > 2) {
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][dateTime[0]], dateArr[1][dateTime[1]])
      }
      this.setData({
        dateTimeArray: dateArr,
        dateTime: dateTime
      })
    },

    /**
     * 确定选择时间
     */
    changeDateTime(e) {
      let pData = this.data,
        dateTimeArray = pData.dateTimeArray,
        dateTime = pData.dateTime,
        value = ''
      for (var i in dateTime) {
        if (i < dateTime.length - 1){
          value += dateTimeArray[i][dateTime[i]] + pData.spaceMake
        }else{
          value += dateTimeArray[i][dateTime[i]]
        }        
      }
      this.page.setData({
        [this.data.key]: value
      })
    }
  }
})