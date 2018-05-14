<template>
  <div class="address-list">
    <el-button class="custom-bg" type="primary" @click="openAddDialog">添加新地址</el-button>
    <div class="list-wrap">
      <el-table
      class="myAddList"
        empty-text="还没有填写收获地址~"
        :data="addressList"
        @cell-mouse-enter="setDefaultVisible"
        @cell-mouse-leave="setDefaultHide"
        style="width: 100%">
        <el-table-column
          label="收货人"
          width="75"
          prop="receiver">
        </el-table-column>
        <el-table-column
          label="所在地区"
          width="150">
          <template slot-scope="scope">
            <span>{{scope.row.provinceName}} {{scope.row.cityName}} {{scope.row.areaName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="详细地址"
          width="200"
          prop="addressDetail">
        </el-table-column>
        <el-table-column
          label="邮编"
          prop="zipCode"
          width="68">
        </el-table-column>
        <el-table-column
          label="手机号"
          width="120"
         prop="phone">
        </el-table-column>
         <el-table-column
          label="操作"
          class-name="handle"
          width="90">
          <template slot-scope="scope">
            <span @click="editAddress(scope.row)">修改</span><span style="margin:6px;color:#999">|</span>
            <span @click="deleteList({addressId:scope.row.addressId})">删除</span>
          </template>
        </el-table-column>
         <el-table-column
          label=""
          class-name="setDafault"
          align="center">
          <template slot-scope="scope">
            <span class="default" v-if="scope.row.isDefault">默认地址</span>
            <el-button v-else v-show="scope.row.setDfault === 0" class="custom-bg custom-height" type="primary" @click="changeDefault({addressId:scope.row.addressId})">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建地址弹窗 -->
    <el-dialog  custom-class="address-dialog hasCancel"  width="675px" :visible.sync="addressDialogVisible">
      <p slot="title"><span v-if="!addEdit">+ 新建地址</span><span v-else><i class="el- icon el-icon-edit-outline"></i> 修改地址</span></p>
        <el-address :addressDialogVisible="addressDialogVisible" :addEdit="addEdit"  :addressForm="addressForm" @closeAddDialog="closeAddDialog">
          <el-button class="cancel" plain @click="addressDialogVisible = false">取消</el-button>
        </el-address>
    </el-dialog>
  </div>
</template>
<script>
// , addAddress, updateAddress, , resetDefaultAddress
import {getAddressList, delAddress, resetDefaultAddress} from '@/utils/address';
import address from '@/components/address';
export default {
  data() {
    return {
      addressDialogVisible: false,
      addressList: [],
      addEdit: false,
      addressForm: {}
    };
  },
  created() {
    getAddressList().then(res => {
      res.data.addressList.forEach(item => {
        item.setDfault = 1;
      });
      this.addressList = res.data.addressList;
    });
  },
  methods: {
    openAddDialog() {
      this.addEdit = false;
      this.addressForm = {};
      this.addressDialogVisible = true;
    },
    closeAddDialog(res) {
      this.addressDialogVisible = false;
      getAddressList().then(res => {
        this.addressList = res.data.addressList;
      });
    },
    changeDefault(data) {
      resetDefaultAddress(data).then(res => {
        return getAddressList();
      }).then(res => {
        res.data.addressList.forEach(item => {
          item.setDfault = 1;
        });
        this.addressList = res.data.addressList;
      });
    },
    deleteList(data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAddress(data).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
        return getAddressList().then(res => {
          console.log(res);
          this.addressList = res.data.addressList;
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    editAddress(obj) {
      this.addEdit = true;
      this.addressForm = Object.assign({}, obj);
      this.addressDialogVisible = true;
    },
    setDefaultVisible(row, column, cell, event) {
      row.setDfault = 0;
    },
    setDefaultHide(row, column, cell, event) {
      row.setDfault = 1;
    }
  },
  components: {
    'el-address': address
  }
};
</script>
<style lang="less" scoped>
@import '../../../assets/css/base.less';
.custom-bg{
  width: 160px;
  margin-bottom: 30px;
}
.cancel{
  width: 78px;
  padding: 8px 0;
}
.el-table{
  font-size: 12px;
  .handle{
    span{
      color: @base-color;
      cursor: pointer;
    }
  }
  .setDafault{
    .default{
      display: inline-block;
      width: 60px;
      height: 18px;
      line-height: 18px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    .el-button{
      width: 60px;
      font-size: 12px;
      padding: 2px 0;
      margin-bottom: 0;
    }
  }
}
// .address-item{
//   width: 256px;
//   margin-right: 13px;
//   margin-bottom: 15px;
//   box-sizing: border-box;
//   &:nth-of-type(3n+3){
//     margin-right: 0;
//   }
//   .name{
//     line-height: 30px;
//     background: #f2f2f2;
//     margin-bottom: 12px;
//     text-indent: 7px;
//     .svg-icon{
//       margin-right: 8px;
//     }
//   }
//   .item-wrap{
//     height: 162px;
//     font-size: 12px;
//     color: #666;
//     line-height: 24px;
//     padding: 0 21px 15px 24px;
//     border: 1px solid #eaeaea;
//     .phone{
//       margin-top: 10px;
//     }
//     .address{
//       height: 48px;
//       overflow: hidden;
//     }
//     .zipcode{
//       margin-bottom: 8px;
//     }
//     .handle{
//       overflow: hidden;
//       a{
//         color: #666;
//         &.delete{
//           margin-left: 20px;
//         }
//       }
//     }
//   }
// }
</style>
