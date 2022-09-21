<template>
    <el-row class="home" :gutter="20">
        <!-- 左列 -->
        <el-col :span="8" style="margin-top:20px">
            <!-- 左上登录名卡片 -->
            <el-card class="tl-card" shadow="hover">
                <div class="user">
                    <img :src="userImg" alt />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>
                        <i>上次登录时间：</i>
                        <span>2021-07-19</span>
                    </p>
                    <p>
                        <i>上次登录地点：</i>
                        <span>武汉</span>
                    </p>
                </div>
            </el-card>
            <!-- 左下表格卡片 -->
            <el-card style="margin-top:20px;height:460px">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column v-for="(val,index) in tableLabel" :key="index" :prop="index" :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <!-- 右列 -->
        <el-col :span="16">
            <!-- 右上角订单汇总图 -->
            <div class="num">
                <el-card class="tr-card" v-for="(item,index) in countData" :key="index" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="'el-icon-'+item.icon" :style="{background:item.color} "></i>
                    <div class="detail">
                        <p class="amount">￥{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <!-- 右下角图表区 -->
            <el-card class="table1" style="height:280px">
                <div style="height:280px" ref="echarts"></div>
                <!-- <echart :chartData="echartData.order" style="height:280px"></echart> -->
            </el-card>
            <div class="graph">
                <el-card class="table2" style="height:260px">
                    <div style="height:240px" ref="userEcharts"></div>
                    <!-- <echart :chartData="echartData.user" style="height:240px"></echart> -->
                </el-card>
                <el-card class="table3" style="height:260px">
                    <div style="height:240px" ref="videoEcharts"></div>
                    <!-- <echart :chartData="echartData.video" :isAxisChart="false" style="height:240px"></echart> -->
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'
// import Echart from '../../src/components/Echarts.vue'
export default {
  name: 'MyHome',
  components: {
    // Echart
  },
  data() {
    return {
      userImg: require('../../src/assets/images/user.png'),
      tableData: [],
      // tableData: [
      //   {
      //     name: 'oppo',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: 'vivo',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '苹果',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '小米',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '三星',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   },
      //   {
      //     name: '魅族',
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800
      //   }
      // ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  created() {
    getData().then((res) => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
        })
        const option = {
          xAxis: {
            data: xData
          },
          tooltip: {
            trigger: 'axis'
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
        // 用户图
        const userOption = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: '#333'
            },
            data: ['新增用户', '活跃用户']
          },
          grid: {
            left: '20%'
          },
          //提示框
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category', //类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            }
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [
            {
              name: '新增用户',
              data: data.userData.map((item) => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map((item) => item.active),
              type: 'bar'
            }
          ]
        }
        // this.echartData.user.xData = data.userData.map((item) => item.date)
        // this.echartData.user.series = [
        //   {
        //     name: '新增用户',
        //     data: data.userData.map((item) => item.new),
        //     type: 'bar'
        //   },
        //   {
        //     name: '活跃用户',
        //     data: data.userData.map((item) => item.active),
        //     type: 'bar'
        //   }
        // ]
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)
        // 饼图
        const videoOption = {
          tooltip: {
            trigger: 'item'
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series: [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
        // this.echartData.video.series = [
        //   {
        //     data: data.videoData,
        //     type: 'pie'
        //   }
        // ]
      }
      console.log(res)
    })
  }
}
</script>
<style lang="less" scoped>
.home {
  .tl-card {
    .user {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
      }
      .userinfo {
        margin-left: 30px;
        .name {
          font-size: 30px;
          font-weight: 700;
          margin: 0;
        }
        .access {
          color: #aaa;
          margin: 0;
        }
      }
    }
    .login-info {
      margin-top: 20px;
      font-size: 12px;
      p {
        height: 16px;
        line-height: 16px;
        color: #aaa;
        i {
          font-style: normal;
        }
        span {
          margin-left: 100px;
          color: #666;
        }
      }
    }
  }
  .num {
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    .tr-card {
      box-sizing: border-box;
      width: calc((100% - 20px) / 3);
      margin-top: 10px;
      .icon {
        width: 90px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
      .detail {
        margin-left: 20px;
        .amount {
          margin: 10px 0;
          font-size: 24px;
          font-weight: 700;
        }
        .txt {
          margin: 0;
          font-size: 12px;
          color: #aaa;
        }
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .table2 {
      width: 48%;
    }
    .table3 {
      width: 48%;
    }
  }
}
</style>