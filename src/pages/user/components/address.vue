<template>
  <div class="address-list">
    <el-button class="custom-bg" type="primary" @click="openAddDialog">添加新地址</el-button>
    <div class="list-wrap">
      <div class="address-item fl" v-for="(item, index) in addressList" :key="index">
        <p class="name"><i class="el-icon el-icon-location-outline"></i>{{item.receiver}}</p>
        <div class="item-wrap">
          <p class="phone">{{item.phone}}</p>
          <p class="address">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.addressDetail}}</p>
          <p class="zipcode">邮编：{{item.zipCode}}</p>
          <el-checkbox @change="changeDefault({addressId: item.addressId})" v-model="item.isDefault" :true-label = "1" :false-label="0" class="has_checked"  name="type">默认地址</el-checkbox>
          <div class="handle">
            <a href="javascript:;" class="delete fr" @click.stop="deleteList({addressId: item.addressId})"><i class="el-icon el-icon-delete"></i>删除</a>
            <a href="javascript:;" class="edit fr" @click.stop="editAddress(item)"><i class="el-icon el-icon-edit-outline"></i>编辑</a>
          </div>
        </div>
      </div>
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editAddress(obj) {
      this.addEdit = true;
      this.addressForm = Object.assign({}, obj);
      this.addressDialogVisible = true;
    }
  },
  components: {
    'el-address': address
  }
};
</script>
<style lang="less" scoped>
.custom-bg{
  width: 160px;
  margin-bottom: 30px;
}
.cancel{
  width: 78px;
  padding: 8px 0;
}
.address-item{
  width: 256px;
  margin-right: 13px;
  box-sizing: border-box;
  &:nth-of-type(3n+3){
    margin-right: 0;
  }
  .name{
    line-height: 30px;
    background: #f2f2f2;
    margin-bottom: 12px;
    text-indent: 7px;
    .svg-icon{
      margin-right: 8px;
    }
  }
  .item-wrap{
    font-size: 12px;
    color: #666;
    line-height: 24px;
    padding: 0 21px 15px 24px;
    border: 1px solid #eaeaea;
    .phone{
      margin-top: 10px;
    }
    .zipcode{
      margin-bottom: 8px;
    }
    .handle{
      overflow: hidden;
      a{
        color: #666;
        &.delete{
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
