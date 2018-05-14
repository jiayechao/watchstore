<template>
<div class="service-wrap">
  <p class="title"><svg-icon icon-class="shouhoufuwu" />售后服务<span>（如遇售后相关问题，请先联系在线客服或拨打400-705-8885）</span> <span class="fr">查看售后政策<i class="el-icon el-icon-d-arrow-right"></i></span></p>
  <el-table
        empty-text="没有购买，快去购物吧~"
        :data="detailData.itemList"
        :border="true"
        style="width: 100%">
          <el-table-column
            label="商品"
            class-name="detail-cell"
            header-align="center"
            width="240">
            <template slot-scope="scope">
                <div class="img fl" :style="{backgroundImage: 'url(' +scope.row.imgUrl + ')'}"></div>
                  <p class="name">{{scope.row.itemName}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="规格"
            width="160"
            prop="colorDescr"
            align="center">
          </el-table-column>
          <el-table-column
            label="价格"
            width="208"
            align="center">
            <template slot-scope="scope">
              <span>￥{{scope.row.subtotal}}</span>
            </template>
          </el-table-column>
            <el-table-column
            label="购买数量"
            prop="num"
            align="center">
          </el-table-column>
      </el-table>
      <el-form :model="serviceForm" :rules="rules" ref="serviceForm" label-width="94px" class="serviceForm" >
        <el-form-item  prop="serviceType">
          <span slot="label"><svg-icon icon-class="cascades" />服务类型:</span>
          <el-radio-group v-model="serviceForm.serviceType">
            <el-radio :label="1" border size="mini">退款</el-radio>
            <el-radio v-if="detailData.orderState >1 && detailData.orderState <7" :label="2" border size="mini">退货</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退款金额:" prop="refundAmount">
          <el-input style="width:128px;" v-model.number="serviceForm.refundAmount" size="mini"></el-input> 元<span style="color:#999">（退货金额不超过商品总价）</span>
        </el-form-item>
        <el-form-item label="提交数量:" prop="num">
          <el-input-number v-model="serviceForm.num"  :min="1" :max="maxNum" size="mini"></el-input-number><span style="color:#999">（您最多可提交数量为{{maxNum}}个）</span>
        </el-form-item>
        <el-form-item label="问题描述:" prop="descr">
          <el-input :rows="5" type="textarea" v-model="serviceForm.descr"></el-input>
          <p class="font-num">10~500字</p>
        </el-form-item>
        <el-form-item>
          <span slot="label"><i class="el-icon el-icon-picture-outline"  />图片信息</span>
          <div class="img-wrap">
             <div class="img-item fl" v-for="(item, index) in imgKeysArr" :key="index"   :style="{backgroundImage: 'url(' +item+ ')'}">
               <i class="el-icon-error" @click="deleteImg(index)"></i>
             </div>
             <div class="load-wrap fl"><el-uploadImg @uplaodSucess="uplaodSucess" @uploadFailed="uploadFailed" :width="72"></el-uploadImg></div>
           </div>
          <p class="img-note" style="clear:both;">为了帮助您更好的解决问题，请上传图片</p>
          <p class="img-note">最多可上传5张图片,每张图片大小不超过5M，支持bmp,gif,jpg,png,jpeg格式文件</p>
        </el-form-item>
        <el-button class="custom-bg custom-height" type="primary" @click="applyAfterSales('serviceForm')">提交</el-button>
      </el-form>
</div>
</template>
<script>
import load from '@/components/upload';
export default {
  data() {
    let validateRefundAmount = (rule, value, callback) => {
      console.log(this.maxAmount);
      if (!value) {
        callback(new Error('退款金额不能为空'));
      } else if (this.maxAmount < value) {
        callback(new Error('退款金额不超过商品总价'));
      } else if (typeof value !== 'number' && value) {
        callback(new Error('退款金额必须是数字'));
      } else {
        callback();
      }
    };
    return {
      detailData: {},
      serviceForm: {
        serviceType: 1,
        refundAmount: '',
        num: 1,
        descr: '',
        imgKeys: ''
      },
      imgKeysArr: [],
      maxNum: 0,
      maxAmount: 0,
      rules: {
        refundAmount: [
          { validator: validateRefundAmount, type: 'number', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入退货数量', trigger: 'change' }
        ],
        descr: [
          { required: true, message: '请输入详情描述', trigger: 'blur' },
          { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.$fetchPost({
      url: this.$api.GET_ORDER_DETAIL,
      data: {
        orderId: this.$route.params.orderId
      }
    }).then(res => {
      this.detailData = res.data;
      this.serviceForm.orderId = res.data.orderId;
      res.data.itemList.forEach(item => {
        // this.maxNum += item.num;
        // this.maxAmount += item.subtotal;
        if (res.data.afterSaleApplyState === 88) {
          this.$fetchPost({
            url: this.$api.GET__PRE_AFTER_APPLY_INFO,
            data: {
              orderId: this.$route.params.orderId
            }
          }).then(res => {
            console.log(res);
            this.serviceForm.serviceType = res.data.serviceType;
            this.serviceForm.refundAmount = res.data.refundAmount;
            this.serviceForm.num = res.data.num;
            this.serviceForm.descr = res.data.descr;
            this.imgKeysArr = res.data.imgUrlList;
          });
        } else if (res.data.afterSaleApplyState === 1 || res.data.afterSaleApplyState === 2) {
          const userId = this.$store.getters.userId;
          const orderId = this.serviceForm.orderId;
          this.$router.replace({path: `/user/${userId}/service_status/${orderId}`});
        }
      });
    });
    this.$fetchPost({
      url: this.$api.GET_AFTER_SALES_INFO,
      data: {
        orderId: this.$route.params.orderId
      }
    }).then(res => {
      this.maxNum = res.data.maxRefundNum;
      this.maxAmount = res.data.maxRefundAmount;
    });
  },
  methods: {
    applyAfterSales(form) {
      this.$refs[form].validate((valid) => {
        console.log(valid);
        if (valid) {
          // 这里处理一下图片数据
          let imgArr = [];
          this.imgKeysArr.forEach((item) => {
            imgArr.push(decodeURIComponent(item.substring(item.lastIndexOf('/') + 1)));
          });
          this.serviceForm.imgKeys = imgArr.join(',');
          this.$fetchPost({
            url: this.$api.APPLY_AFTER_SALES,
            data: this.serviceForm
          }).then(res => {
            const userId = this.$store.getters.userId;
            const orderId = this.serviceForm.orderId;
            this.$router.push({path: `/user/${userId}/service_status/${orderId}`});
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    uplaodSucess(val) {
      this.imgKeysArr.push(val);
    },
    uploadFailed(val) {
      console.log(val);
      this.$message.error(val);
    },
    deleteImg(index) {
      this.imgKeysArr.splice(index, 1);
    }
  },
  components: {
    'el-uploadImg': load
  }
};
</script>
<style lang="less" scoped>
@import "../../../../assets/css/base.less";
.service-wrap{
  .title{
    margin-bottom: 30px;
    span{
      font-size: 12px;
      color: #888;
      margin-left: 10px;
    }
  }
}
.el-table{
  margin-bottom: 30px;
  .detail-cell{
    .img{
        width: 77px;
        height: 92px;
        #bg-img;
      }
      .name{
        display: table-cell;
         height: 92px;
        line-height: 1.5;
        vertical-align: middle;
      }
  }
}
.el-form-item{
  margin-bottom: 16px;
  .font-num{
    text-align:right;
    font-size:12px;
    color:#888;
    line-height:1.4
  }
}
.custom-bg{
  display: block;
  margin: 40px auto 0;
}
.img-note{
  line-height:22px;
  font-size:12px;
  transform: translateX(-90px);
  margin-top:15px;
  &:nth-of-type(2){
    color:#888;
    margin-top:0px;
    }
}
.load-wrap{
  position: relative;
  width: 72px;
  height: 72px;
  line-height: 1;
  text-align: center;
  border: 1px solid #c0c0c0;
  &:after{
    position: absolute;
    width: 72px;
    line-height: 72px;
    content: '+';
    font-size: 30px;
    color: #c0c0c0;
    top: -3px;
    left: 0px;
  }
}
.img-wrap{
  // overflow: hidden;
  input{
    top: -25px;
  }
  .img-item{
    position: relative;
    width: 72px;
    height: 72px;
    margin-right: 15px;
    margin-bottom: 15px;
    border: 1px solid #eaeaea;
    #bg-img;
    .el-icon-error{
      display: none;
      position: absolute;
      color: red;
      top: -8px;
      right: -8px;
      cursor: pointer;
    }
    &:hover{
       .el-icon-error{
         display: block;
       }
    }
  }
}

</style>
