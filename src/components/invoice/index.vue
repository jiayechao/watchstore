<template>
  <el-form :model="invoiceFormData" :rules="rules" ref="invoiceForm" label-width="92px" class="invoiceForm">
    <el-form-item label="发票类型" >
     <el-select v-model="mold" placeholder="请选择">
          <el-option
            v-for="item in molds"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="发票内容" >
        <el-select v-model="content" placeholder="请选择">
          <el-option
            v-for="item in contents"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="发票抬头" prop="title">
      <el-input v-model="invoiceFormData.title"></el-input>
    </el-form-item>
    <el-form-item label="发票税号" prop="taxNumber">
      <el-input v-model="invoiceFormData.taxNumber"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox v-model="invoiceFormData.isDefault" :true-label="1" :false-label="0" class="has_checked"  name="type" label="设置为默认发票"></el-checkbox>
    </el-form-item>
    <el-form-item  class="btn-wrap">
       <el-button class="custom-bg custom-height" type="primary" @click="saveInvoice('invoiceForm')">保存并使用</el-button>
       <div class="slot"></div>
    </el-form-item>
  </el-form>
</template>

<script>
import {addInvoice, updateInvoice} from '@/utils/invoice';
export default {
  props: {
    invoiceForm: {
      type: Object,
      dafault: {
        title: '',
        taxNumber: '',
        isDefault: 0
      }
    },
    invoiceEdit: {
      type: Boolean
    },
    invoiceDialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      content: 0,
      contents: [
        {
          value: 0,
          label: '商品明细'
        }
      ],
      mold: 0,
      molds: [
        {
          value: 0,
          label: '普通发票'
        }
      ],
      rules: {
        title: [
          { required: true, message: '请填写发票抬头', trigger: 'blur' }
        ],
        taxNumber: [
          { required: true, message: '请填写发票税号', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    invoiceFormData() {
      return this.invoiceForm;
    }
  },
  created() {
  },
  methods: {
    // 保存发票
    saveInvoice(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log('invoiceEdit', this.invoiceEdit);
          if (this.invoiceEdit) {
            updateInvoice(this.invoiceFormData).then(res => {
              this.$emit('closeInvoiceDialog');
              this.$refs[form].resetFields();
            });
          } else {
            addInvoice(this.invoiceFormData).then(res => {
              console.log(res);
              this.$emit('closeInvoiceDialog', res);
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
