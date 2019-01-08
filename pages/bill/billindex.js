// pages/bill/billindex.js
var util = require("../../utils/util.js");
const app = getApp() //定义这个才能用app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bills: {

    },
    mytitle: '正在读取....'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //console.log(this.data);
    //console.log('onready');
    if (app.globalData.userInfo) {
      // console.log('go');
      var db = wx.cloud.database();
      db.collection('bills').where({
        BillType: '生活开销'
      }).get().then(res => {
        var data = res.data;
        for (var a in data) {
          data[a].BillTime = util.formatTime(data[a].BillTime);
        }
        this.setData({
          bills: data,
          mytitle: ''
        });
        // console.log('aaaaaaaa');
        // console.log(super.data);
      });
      // db.collection('bills').get({
      //   success(res) {
      //     console.log(res);
      //   }
      // });
      // db.collection('bills').add({
      //   data:{
      //     //"_id": XDIWdInnuWjcivBh
      // BillQty: 12,
      // BillTime:new Date(),
      // BillType: '生活开销',
      // Remark: '支出备注，这顿吃得真饱'
      //   },success(res){
      //     console.log('插入成功');
      //   }
      // })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // console.log(this.data);
    // console.log('onshow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  listData: function(data) {
    //  console.log('aaaaaaaa');
    this.setData(data);
  },
  listData2: function() {
    //this.setData({mytitle:'aaaaaa'});
    var db = wx.cloud.database();
    db.collection('bills').where({
      BillType: '生活开销'
    }).get().then(res => {
      console.log(res.data);
      this.setData({
        mytitle: res.data[0].BillType,
        bills: res.data
      });
    })
  },

  addBills: function() {
    var db = wx.cloud.database();
    for (var i = 0; i < 100; i++) {
      db.collection('bills').add({
        data: {
          //"_id": XDIWdInnuWjcivBh
          BillQty: 12+i,
          BillTime: new Date(),
          BillType: '生活开销',
          Remark: '吃饭'+i
        },
        success(res) {
          console.log('插入成功');
        }
      })
    }
  }

})