<template>
  <el-form :model="addressFormData" :rules="rules" ref="addressForm" label-width="92px" class="addressForm">
    <el-form-item label="收货人" prop="receiver">
      <el-input v-model="addressFormData.receiver" style="width:120px;"></el-input>
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
        <el-select v-model="addressFormData.areaCode" placeholder="区" @change="changeArea">
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
      <el-input v-model="addressFormData.addressDetail"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="addressFormData.phone" style="width:220px;"></el-input>
    </el-form-item>
    <el-form-item label="邮政编码" prop="zipCode">
      <el-input v-model="addressFormData.zipCode" style="width:220px;"></el-input>
    </el-form-item>
    <el-form-item label="">
      <!-- <el-checkbox-group v-model="addressForm.isDefault"> -->
      <el-checkbox v-model="addressFormData.isDefault" :true-label="1" :false-label="0" class="has_checked"  name="type" label="设置为默认地址"></el-checkbox>
      <!-- </el-checkbox-group> -->
    </el-form-item>
    <el-form-item>
       <el-button class="custom-bg custom-height" type="primary" @click="saveAdd('addressForm')">保存并使用</el-button>
       <div class="slot"></div>
    </el-form-item>
  </el-form>
</template>

<script>
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
    resetAddTag: {
      type: Boolean,
      default: false
    },
    addEdit: {
      type: Boolean
    }
  },
  data() {
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
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    addressFormData() {
      return this.addressForm;
    }
  },
  watch: {
    // 当edit为true时，要异步调取citis和areas的数据
    // resetAddTag: function (newQuestion, oldQuestion) {
    //   console.log(newQuestion, oldQuestion);
    //   if (newQuestion) {
    //     this.$refs['addressForm'].resetFields();
    //     this.addressForm.isDefault = 0;
    //     this.addressForm.zipCode = '';
    //   }
    // }
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
  },
  methods: {
    // 选择省
    changeProvince(code) {
      this.addressForm.provinceName = this.provinces.filter(item => {
        return item.provinceCode === code;
      })[0].provinceName;
      const arr = this.$tools.getItem(code, 1);
      if (arr && arr.length) {
        this.cities = arr;
      } else {
        this.$fetchGet({
          url: this.$api.GET_CITY_LIST,
          params: {
            provinceCode: code
          }
        }).then(res => {
          this.$tools.setItem(code, res.data, 1);
          this.cities = res.data;
        });
      }
    },
    // 选择市
    changeCity(code) {
      this.addressForm.cityName = this.cities.filter(item => {
        return item.cityCode === code;
      })[0].viewCityName;
      const arr = this.$tools.getItem(code, 1);
      if (arr && arr.length) {
        this.areas = arr;
      } else {
        this.$fetchGet({
          url: this.$api.GET_AREA_LIST,
          params: {
            cityCode: code
          }
        }).then(res => {
          this.$tools.setItem(code, res.data, 1);
          this.areas = res.data;
        });
      }
    },
    // 选择区
    changeArea(code) {
      this.addressForm.areaName = this.areas.filter(item => {
        return item.areaCode === code;
      })[0].areaName;
    },
    // 保存地址
    saveAdd(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let url = this.addEdit ? 'UpdateAddress' : 'AddAddress';
          this.$store.dispatch(url, this.addressFormData).then(res => {
            // 关闭弹窗,返回addressId，修改当前ID
            this.$emit('closeAddDialog', res);
          });
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
.addressForm{
  // width: 723px;
}
</style>
