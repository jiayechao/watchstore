<template>
<div class="form-wrap">
  <el-form class="sign-form signup-form" ref="form" :rules="rules" :model="form" label-width="22px">
    <p class="title">注册账号</p>
    <el-form-item prop="mobile">
      <span slot="label"><svg-icon icon-class="my"/></span>
      <el-input type="tel" v-model="form.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <div class="inline-wrap">
      <el-form-item  class="inline-item" prop="captcha">
        <span slot="label"><svg-icon icon-class="yanzhengma"/></span>
        <el-input v-model="form.captcha" placeholder="请输入右侧验证码"></el-input>
      </el-form-item>
      <img class="captcha fr" @click="againValidate"  :src="captcha_url" alt="验证码">
    </div>
    <div class="inline-wrap">
      <el-form-item  class="inline-item" prop="regCode">
        <span slot="label"><i class="el-icon-edit-outline"></i></span>
        <el-input v-model="form.regCode" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-button class="register-code custom-bg fr" type="primary" @click="getRegisterCode">发送验证码</el-button>
    </div>
     <el-form-item  prop="password">
       <span slot="label"><svg-icon icon-class="unlock"/></span>
      <el-input type="password" v-model="form.password" placeholder="请输入6~12位密码"></el-input>
    </el-form-item>
     <el-form-item class="checkPass" prop="checkPass">
       <span slot="label"><svg-icon icon-class="lock"/></span>
      <el-input type="password" v-model="form.checkPass" placeholder="请再次输入密码"></el-input>
    </el-form-item>
    <el-form-item class="protocol" prop="checkProtocol">
      <el-checkbox-group v-model="form.checkProtocol">
      <el-checkbox class="has_checked"  name="type"></el-checkbox><span class="">我已看过并接受《<a href="javascript:;" @click="showProtocol">用户协议</a>》</span>
      </el-checkbox-group>
    </el-form-item>
    <el-button class="signup custom-bg" type="primary" @click="onSubmit">立即注册</el-button>
    <router-link class="signin fr" to="/signin">切换为登录 <i class="el-icon-arrow-right"></i></router-link>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    let validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入真实的手机号'));
      } else {
        callback();
      }
    };
    let validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入右侧验证码'));
      } else if (!(/^\w{4}$/.test(value))) {
        callback(new Error('验证码只能是四位数字和字母'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        if (!/^.{6,12}$/.test(value)) {
          callback(new Error('密码必须为6~12位'));
        } else {
          callback();
        }
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        mobile: '',
        captcha: '',
        regCode: '',
        password: '',
        p: '',
        checkPass: '',
        checkProtocol: []
      },
      rules: {
        mobile: [
          { validator: validateMobile, type: 'number', trigger: 'blur' }
        ],
        captcha: [
          { validator: validateCaptcha, trigger: 'blur' }
        ],
        regCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkProtocol: [
          { required: true, message: '请确认查看用户协议', trigger: 'change' }
        ]
      },
      captcha_url: '/wristwatch/wat/getValidateCode?platform=5&t=' + Date.now()
    };
  },
  methods: {
    againValidate() {
      this.captcha_url = '/wristwatch/wat/getValidateCode?platform=5&t=' + Date.now();
    },
    showProtocol() {

    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(valid);
          // 针对password做md5加密
          this.form.p = this.$md5(this.form.password);
          console.log(this.form.p);
          this.$fetchPost({
            url: this.$api.MOBILE_REGISTER,
            data: this.form
          }).then(res => {
            this.$message({
              message: '注册成功，即将跳转到首页',
              type: 'success'
            });
            // 将返回信息存到localstorage
            this.$tools.setItem('userInfo', res.data, true);
            setTimeout(() => {
              this.$router.push({path: '/'});
            }, 3000);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getRegisterCode() {
      let tag = true;
      this.$refs['form'].validateField('mobile', (valid) => {
        if (valid) {
          tag = false;
        }
      });
      this.$refs.form.validateField('captcha', (valid) => {
        if (valid) {
          tag = false;
        }
      });
      if (tag) {
        this.$fetchPost({
          url: this.$api.GET_REGISTER_CODE,
          data: {
            mobile: this.form.mobile,
            validateCode: this.form.captcha
          }
        }).then(res => {
          console.log(res);
          this.$message.error(res.msg);
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.form-wrap{
  padding-top: 50px;
  padding-bottom: 90px;
  background: #eef0f3;
}
 .el-form{
   width: 475px;
   background: #fff;
   margin: 0 auto;
   padding: 45px 52px 88px;
   box-shadow: 0px 0px 10px 0px #ccc;
   box-sizing: border-box;
   .title{
     font-size: 18px;
     color: #333;
     line-height: 1;
     text-align: center;
     margin-bottom: 52px;
   }
   .el-form-item{
     border: 1px solid #e5e5e5;
     margin-bottom: 25px;
     .svg-icon{
       margin-right: 0;
     }
     &.inline-item{
       display: inline-block;
       width: 186px;
     }
     &.protocol{
       border: 0;
       margin-bottom: 10px;
       span{
         font-size: 14px;
         color: #666;
         margin-left: 10px;
         a{
           color: @base-color;
         }
       }
     }
     &.checkPass{
         margin-bottom: 20px;
       }
      &.protocol {
        margin-bottom: 22px;
      }
   }
    .captcha{
      width: 170px;
      height: 55px;
      vertical-align: top;
    }
    .register-code{
      width: 170px;
      padding-top: 20px;
      padding-bottom: 19px;
      border-radius: 0;
    }
    .signup{
      width: 100%;
      padding-top: 20px;
      padding-bottom: 19px;
      border-radius: 0;
    }
    .signin{
      margin-top: 20px;
      color: @font-color;
    }
 }
</style>
