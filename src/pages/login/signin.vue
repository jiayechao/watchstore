<template>
<div class="form-wrap">
  <el-form class="sign-form signin-form fr" ref="form" :rules="rules" :model="form" label-width="22px">
    <p class="title">账号登录</p>
    <el-form-item prop="loginName">
      <span slot="label"><svg-icon icon-class="my"/></span>
      <el-input type="tel" v-model="form.loginName" placeholder="手机号码"></el-input>
    </el-form-item>
     <el-form-item  prop="password">
       <span slot="label"><svg-icon icon-class="lock"/></span>
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-button class="signin custom-bg" type="primary" @click="onSubmit">登录</el-button>
    <div>
      <router-link class="forget fl" to="/forget">忘记密码？ </router-link>
      <router-link class="signup fr" to="/signup">立即注册<i class="el-icon-arrow-right"></i></router-link>
    </div>
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
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!/^.{6,12}$/.test(value)) {
        callback(new Error('密码必须为6~12位'));
      } else {
        callback();
      }
    };
    return {
      form: {
        loginName: '',
        password: '',
        p: ''
      },
      rules: {
        loginName: [
          { validator: validateMobile, type: 'number', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      captcha_url: '/wristwatch/wat/getValidateCode?platform=5&t=' + Date.now()
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$store.dispatch('LoginByMobile', this.form)
            .then(res => {
              this.$router.push(this.$route.query.redirect || '/');
            // this.showDialog = true;
            });
          // console.log(valid);
          // // 针对password做md5加密
          // this.form.p = this.$md5(this.form.password);
          // console.log(this.form.p);
          // this.$fetchPost({
          //   url: this.$api.LOGIN,
          //   data: this.form
          // }).then(res => {
          //   if (res.code !== 0) {
          //     this.$message.error(res.msg);
          //   } else {
          //     // 将返回信息存到localstorage
          //     this.$tools.setItem('userInfo', res.data, true);
          //     this.$router.push(this.$route.query.redirect || '/');
          //   }
          // });
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
          this.$message({
            message: res.msg,
            type: 'success'
          });
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
.form-wrap{
  padding-top: 95px;
  padding-bottom: 133px;
  padding-right: 122px;
  background-image: url(../../assets/images/signin.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
 .el-form{
   width: 423px;
   background: rgba(255, 255, 255, 1);
   margin: 0 auto;
   padding: 45px 50px 82px;
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
   }
    .captcha{
      width: 170px;
      height: 55px;
      vertical-align: top;
    }
    .signin{
      width: 100%;
      padding-top: 20px;
      padding-bottom: 19px;
      margin-top: 20px;
      border-radius: 0;
    }
    .signup , .forget{
      margin-top: 20px;
      color: @font-color;
    }
 }
</style>
<style lang="less">
.signin-form{
  .el-input__inner{
    background:rgba(255,255,255,0.5);
  }
  .el-form-item__label{
    background:rgba(255,255,255,0.5);
  }
}
</style>
