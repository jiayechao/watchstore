<template>
  <el-form :model="addressFormData" :rules="rules" ref="addressForm" label-width="92px" class="addressForm">
    <el-form-item label="收货人" prop="receiver">
      <el-input v-model="addressFormData.receiver" maxlength="4" style="width:120px;"></el-input>
    </el-form-item>
    <el-form-item label="所在地区" required>
      <el-col :span="120">
      <el-form-item prop="provinceCode">
          <el-select v-model="addressFormData.provinceCode" placeholder="省" @change="changeProvince">
            <el-option
              v-for="item in provinces"
              :key="item.provinceCode"
              :label="item.provinceName"
              :value="item.provinceCode" >
            </el-option>
        </el-select>
      </el-form-item>
      </el-col>
       <el-col :span="120">
      <el-form-item prop="cityCode">
        <el-select v-model="addressFormData.cityCode" placeholder="市" @change="changeCity">
          <el-option
            v-for="item in cities"
            :key="item.cityCode"
            :label="item.viewCityName"
            :value="item.cityCode">
          </el-option>
        </el-select>
      </el-form-item>
       </el-col>
        <el-col :span="120">
      <el-form-item prop="areaCode">
        <el-select v-model="addressFormData.areaCode" placeholder="区">
          <el-option
            v-for="item in areas"
            :key="item.areaCode"
            :label="item.areaName"
            :value="item.areaCode">
          </el-option>
        </el-select>
      </el-form-item>
        </el-col>
    </el-form-item>
    <el-form-item label="详细地址" prop="addressDetail">
      <el-input v-model="addressFormData.addressDetail" maxlength="30"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input type="tel" v-model="addressFormData.phone" style="width:220px;"></el-input>
    </el-form-item>
    <el-form-item label="邮政编码" prop="zipCode">
      <el-input v-model="addressFormData.zipCode" style="width:220px;"></el-input>
    </el-form-item>
    <el-form-item label="">
      <!-- <el-checkbox-group v-model="addressForm.isDefault"> -->
      <el-checkbox v-model="addressFormData.isDefault" :true-label="1" :false-label="0" class="has_checked"  name="type" label="设置为默认地址"></el-checkbox>
      <!-- </el-checkbox-group> -->
    </el-form-item>
    <el-form-item class="btn-wrap">
       <el-button class="custom-bg custom-height" type="primary" @click="saveAdd('addressForm')">保存并使用</el-button>
       <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import {addAddress, updateAddress} from '@/utils/address';
let getCities = function(obj) {
  return new Promise((resolve, reject) => {
    const arr = obj.$tools.getItem(obj.addressFormData.provinceCode, 1);
    if (arr && arr.length) {
      obj.cities = arr;
      return resolve(arr);
    } else {
      obj.$fetchGet({
        url: obj.$api.GET_CITY_LIST,
        params: {
          provinceCode: obj.addressFormData.provinceCode
        }
      }).then(res => {
        obj.$tools.setItem(obj.addressFormData.provinceCode, res.data, 1);
        obj.cities = res.data;
        return resolve(res.data);
      }).catch(err => {
        console.log(err);
        return reject(new Error('获取城市失败'));
      });
    }
  });
};
let getAreas = function(obj) {
  return new Promise((resolve, reject) => {
    const arr = obj.$tools.getItem(obj.addressFormData.cityCode, 1);
    console.log(arr);
    if (arr && arr.length) {
      obj.areas = arr;
      return resolve(arr);
    } else {
      obj.$fetchGet({
        url: obj.$api.GET_AREA_LIST,
        params: {
          cityCode: obj.addressFormData.cityCode
        }
      }).then(res => {
        obj.$tools.setItem(obj.addressFormData.cityCode, res.data, 1);
        obj.areas = res.data;
        return resolve(res.data);
      }).catch(err => {
        console.log(err);
        return reject(new Error('获取地区失败'));
      });
    }
  });
};
export default {
  props: {
    addressForm: {
      type: Object,
      dafault: {
        receiver: '',
        provinceCode: '',
        cityCode: '',
        areaCode: '',
        addressDetail: '',
        phone: '',
        zipCode: '',
        isDefault: 0
      }
    },
    addEdit: {
      type: Boolean
    },
    addressDialogVisible: {
      type: Boolean
    }
  },
  data() {
    let validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入真实的手机号'));
      } else {
        callback();
      }
    };
    let validateZipCode = (rule, value, callback) => {
      if (!(/^\d{6}$/.test(value)) && value) {
        callback(new Error('请输入真实的邮编'));
      } else {
        callback();
      }
    };
    return {
      provinces: [],
      cities: [],
      areas: [],
      rules: {
        receiver: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        provinceCode: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityCode: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请选择区', trigger: 'change' }
        ],
        addressDetail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validateMobile, type: 'number', trigger: 'blur' }
        ],
        zipCode: [
          { validator: validateZipCode, type: 'number', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    // 检测弹窗，编辑打开时获取city和area
    'addressDialogVisible': function(newData, oldData) {
      if (newData && this.addressFormData.provinceCode) {
        getCities(this);
        getAreas(this);
      }
    }
  },
  computed: {
    addressFormData() {
      return this.addressForm;
    }
  },
  created() {
    const arr = this.$tools.getItem('province', 1);
    if (arr && arr.length) {
      this.provinces = arr;
    } else {
      this.$fetchGet({
        url: this.$api.GET_PROVINCE_LIST
      }).then(res => {
        this.$tools.setItem('province', res.data, 1);
        this.provinces = res.data;
      });
    }
    // 编辑弹窗初始化时拿到city和area数据
    if (this.addressFormData.provinceCode) {
      getCities(this);
      getAreas(this);
    }
  },
  methods: {
    // 选择省
    changeProvince(code) {
      getCities(this).then(res => {
        // 选择后要将city和area初始化
        this.$set(this.addressFormData, 'cityCode', this.cities[0].cityCode);
      }).then(res => {
        return getAreas(this);
      }).then(res => {
        // 选择后要将area初始化
        console.log('then', this.areas);
        this.$set(this.addressFormData, 'areaCode', this.areas[0].areaCode);
      });
    },
    // 选择市
    changeCity(code) {
      getAreas(this).then(res => {
        // 选择后要将area初始化
        this.$set(this.addressFormData, 'areaCode', this.areas[0].areaCode);
      });
    },
    // 保存地址
    saveAdd(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.addEdit) {
            updateAddress(this.addressFormData).then(res => {
              this.$emit('closeAddDialog', {data: {addressId: this.addressFormData.addressId}});
              this.$refs[form].resetFields();
            });
          } else {
            addAddress(this.addressFormData).then(res => {
              console.log(res);
              this.$emit('closeAddDialog', res);
              this.$refs[form].resetFields();
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
