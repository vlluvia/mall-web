<template>
  <div class="home" :style="{width:width+'px',height:height+'px'}">
    <div class="goods-detail">
      <span class="infoPicLeft" >
        <img class="infoPicLeft_pic" :src="goodsInfo.goodsPic" alt="商品图片"/>
      </span>

      <div class="infoRight">
        <div class="infoBox">
          <h3 class="name">{{goodsInfo.goodsName}}</h3>
        </div>
        <div class="infoBox">
          <p>{{goodsInfo.goodsDesc}}</p>
        </div>
        <div class="infoBox">
          <h3 class="price">{{'¥'+goodsPrice}}</h3>
        </div>
        <div class="infoBox">
          <span>规格：</span>
          <el-radio v-for="(item,index) in goodsInfo.specs" :key="item.id" :label="item.id" v-model="temSpecId" border>
            {{item.specName+' 还剩'+item.stockNum+'件'}}
          </el-radio>
        </div>
        <div class="infoBox">
          <span class="amount">数量：</span>
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="temStockNum"
                           label="描述文字"></el-input-number>
        </div>
        <div class="infoBox">
          <el-button style="width: 25%;height: 60px" type="danger" plain @click="buy">立即购买</el-button>
          <el-button style="width: 25%;height: 60px" type="warning" plain @click="addCart">加入购物车</el-button>
        </div>
      </div>
    </div>

    <div class="goods-evaluate">
      <el-tabs type="border-card">
        <el-tab-pane label="评价">
          <div class="rateBox">
            <span class="rateSpan">好评率</span>
            <span class="rate">{{rate+'%'}}</span>
          </div>

          <el-card shadow="hover" :body-style="{ padding: '0px' }"
                   v-for="(item,index) in commentList" :key="'comment'+index"
          >
            <div slot="header" class="clearfix">
              <div class="userInfo">
                <img class="evaluate-user-img" :src="item.userSrc"/>
                <span class="evaluate-user-name">{{item.nickname}}</span>
              </div>
              <div class="commentInfo">
                <el-rate
                  v-model="item.starValue"
                  disabled
                  show-score
                  text-color="#ff9900"></el-rate>
                <p class="comment">{{item.comment}}</p>
                <p class="time">{{item.time}}</p>
              </div>
            </div>
          </el-card>
          <div class="evaluate">
            <div class="evaluate-rate">
              <span>评分：</span>
              <el-rate style="margin-top: 10px" v-model="starValue"></el-rate>
            </div>
            <el-input
              class="evaluate-area"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="evaluateText"></el-input>
            <el-button style="float: right; margin-right: 80px;margin-top: 20px;margin-bottom: 30px;" type="success" @click="add">评论</el-button>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div>
</template>

<script>
  import Radio from '../components/Radio';
  import GoodsItem from '../components/GoodsItem';
  import NumberInput from '../components/NumberInput';
  import {getGoodsInfo, getComment, addComment, addCart, myData, buy} from '../api/mall';
  import {mapState, mapMutations} from 'vuex';
  import {getClientSize} from '../util/util';

  export default {
    name: "GoodsDetail",
    components: {
      Radio,
      GoodsItem,
      NumberInput
    },
    computed: {
      width() {
        return getClientSize().width;
      },
      height() {
        return getClientSize().height;
      },
      ...mapState([
        'clientToken',
        'clientName'
      ]),
      goodsPrice() {
        let unitPrice = 0;
        if (this.goodsInfo.specs !== undefined) {
          this.goodsInfo.specs.map((item, index) => {
            if (this.temSpecId === 0 && index === 0) {
              unitPrice = Number(item.price);
            } else {
              if (item.id === this.temSpecId) {
                unitPrice = Number(item.price);
              }
            }
          })
          return (this.num * unitPrice);
        }
      },
      temStockNum() {
        let stockNum = 0;
        if (this.goodsInfo.specs !== undefined) {
          this.goodsInfo.specs.map((item, index) => {
            if (this.temSpecId === 0 && index === 0) {
              stockNum = Number(item.stockNum);
            } else {
              if ((item.id === this.temSpecId)) {
                stockNum = Number(item.stockNum);
              }
            }
          })
          return stockNum;
        }
      },
      id() {
        return this.$route.params.id;
      },
    },
    data() {
      return {
        starValue: 5,
        evaluateText: "",
        num: 1,
        temSpecId: 0,
        goodsInfo: {},
        rate: 60,
        commentList: []
      }
    },
    methods: {
      handleChange(value) {
        // console.log(value);
      },
      buy() {
        if (this.clientName !== "") {
          const res = myData({
            token: this.clientToken
          })
          res
            .then((data) => {
              if (data.address === null || data.phone === null || data.recipient === null) {
                this.$message.error('购买失败，请到个人中心，补全信息');
              } else {
                const res = buy({
                  token: this.clientToken,
                  goodsId: this.id,
                  specId: this.temSpecId,
                  count: this.num
                });
                res
                  .then((data) => {
                    this.$message({
                      message: '购买成功',
                      type: 'success'
                    });
                    this.getGoodsInfo(this.id);
                  })
                  .catch((e) => {
                    this.$message.error('购买失败');
                  })
              }
            })
            .catch((e) => {
              this.$message.error('数据获取失败');
            })
        } else {
          this.$message.error('请先登录');
        }
      },
      addCart() {
        if (this.clientName !== "") {
          const res = addCart({
            token: this.clientToken,
            goodsId: this.id,
            specId: this.temSpecId,
            count: this.num,
          });
          res
            .then((data) => {
              this.$message({
                message: '添加到购物车成功',
                type: 'success'
              });
            })
            .catch((e) => {
              this.$message.error('添加到购物车失败');
            })
        } else {
          this.$message.error('请先登录');
        }
      },
      add() {
        if (this.clientName !== "") {
          if (this.evaluateText !== "") {
            const res = addComment({
              token: this.clientToken,
              starValue: this.starValue,
              comment: this.evaluateText,
              goodsId: this.id
            });
            res
              .then((data) => {
                this.$message({
                  message: '评论成功',
                  type: 'success'
                });
                this.getComment(this.id)
              })
              .catch((e) => {
                this.$message.error('评论失败');
              })
          } else {
            this.$message.error('请评论');
          }
        } else {
          this.$message.error('请先登录');
        }
      },
      getComment(goodsId) {
        const res = getComment(goodsId);
        res
          .then((data) => {
            this.commentList = data;
          })
          .catch((e) => {
            this.$message.error('数据获取失败');
          })
      },
      getGoodsInfo(id) {
        const res = getGoodsInfo(id);
        res
          .then((data) => {
            this.goodsInfo = data;
            this.temSpecId = data.specs[0].id;
          })
          .catch((e) => {
            this.$message.error('数据获取失败');
          })
      },
    },
    mounted() {
      this.getGoodsInfo(this.id);
      // this.getGoodsMsg(this.id);
      this.getComment(this.id);
    },

    watch: {
      $route(to, from) {
        this.getGoodsInfo(to.params.id);
        // this.getGoodsMsg(to.params.id);
        this.getComment(to.params.id);
      }
    }
  }
</script>

<style scoped>

  .home {
    margin: 0px;
    padding: 0px;
  }

  .goods-detail {
    width: 80%;
    height: 650px;
    margin: 40px auto;
  }

  .infoPicLeft {
    /*display: inline-block;*/
    width: 430px;
    height: 650px;
    vertical-align: center

  }
  .infoPicLeft_pic{
    width: 430px;
    max-height: 430px;
    margin-top: 100px;
  }
  .infoRight {
    display: inline-block;
    float: right;
    width: 60%;
    height: 100%;
    /*background-color: red;*/
  }

  .name {
    font-size: 40px;
  }

  .infoBox {
    margin-top: 50px;
    margin-bottom: 30px;
    margin-left: 80px;
  }

  .price {
    font-size: 35px;
    color: #be4141;
  }

  .tips {
    width: auto;
    margin: 10px 20px 0 5px;
  }

  .amount {
    color: #7d7d7d;
    font-size: 13px;
    display: inline-block;
    width: 55px;
  }

  .NumberInput {
    display: inline-block;
    vertical-align: middle;
  }

  .goods-evaluate {
    width: 80%;
    margin: 40px auto;
  }

  .rateBox {
    margin-bottom: 10px;
  }

  .rateSpan {
    color: #7d7d7d;
    display: inline-block;
    margin-right: 10px;
  }

  .rate {
    color: #be4141;
    font-weight: 600;
    font-size: 30px;
  }

  .userInfo {
    width: 80px;
    display: inline-block;
    text-align: center;
  }

  .evaluate-user-img {
    margin: auto;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 6px;
  }

  .evaluate-user-name {
    font-size: 13px;
    color: #7d7d7d;
  }

  .commentInfo {
    display: inline-block;
    vertical-align: top;
  }

  .evaluate {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    /*background-color: red;*/
    /*padding-left: 40px;*/
    display: inline;
  }

  .evaluate-rate {
    margin-top: 25px;
    margin-left: 40px;
    width: 70%;
  }

  .evaluate-area {

    margin-top: 25px;
    margin-left: 40px;
    width: 90%;
  }
</style>
