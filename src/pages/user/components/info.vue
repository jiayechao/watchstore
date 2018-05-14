<template>
  <div class="info-wrap">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="86px" label-position="left" class="demo-ruleForm">
      <el-form-item label="用户名：" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
       <el-form-item label="上传头像：" prop="name">
         <div class="user-img newImg fl" :style="{backgroundImage: 'url(' + newImg + ')'}">
            <el-uploadImg @uplaodSucess="uplaodSucess" @uploadFailed="uploadFailed"></el-uploadImg>
          </div>
          <span class="img-note fl">图像尺寸支持：124*124（JPG，png)</span>
      </el-form-item>
       <el-form-item label="修改密码：" prop="p1">
          <el-input v-model="ruleForm.p1" type="password" placeholder="原密码"></el-input>
          <!-- <el-input v-model="ruleForm.p2" placeholder="新密码"></el-input>
          <el-input v-model="ruleForm.checkPass" placeholder="确认新密码"></el-input> -->
        </el-form-item>
        <el-form-item label="" prop="p2">
          <!-- <el-input v-model="ruleForm.p1" placeholder="原密码"></el-input> -->
          <el-input v-model="ruleForm.p2" type="password" placeholder="新密码"></el-input>
          <!-- <el-input v-model="ruleForm.checkPass" placeholder="确认新密码"></el-input> -->
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <!-- <el-input v-model="ruleForm.p1" placeholder="原密码"></el-input>
          <el-input v-model="ruleForm.p2" placeholder="新密码"></el-input> -->
          <el-input v-model="ruleForm.checkPass" type="password" placeholder="确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button class="submit custom-bg" type="primary" @click="uploadUserInfo('ruleForm')">提交</el-button>
          </el-form-item>

    </el-form>
    <!-- <div class="panel password-set">
      <div class="img"></div>
      <p class="desc">密码设置</p>
      <button @click="passwordDialogVisible = true">编辑</button>
    </div>
    <div class="panel headerImg-set">
       <div class="img"  :style="{backgroundImage: 'url(' + userImg + ')'}"></div>
      <p class="desc">头像设置</p>
      <button @click="headerImgDialogVisible = true">编辑</button>
    </div>
    <div class="panel username-set">
      <div class="username">{{username}}</div>
       <p class="desc">昵称设置</p>
      <button @click="usernameDialogVisible = true">编辑</button>
    </div> -->
    <!-- 修改昵称 -->
    <!-- <el-dialog  custom-class="username-dialog" width="475px" :visible.sync="usernameDialogVisible">
      <p slot="title"><i class="el-icon el-icon-edit-outline"></i>修改昵称</p>
    <el-form :model="usernameForm" :rules="usernameRules" ref="usernameForm" label-width="80px" class="usernameForm">
      <el-form-item label="原昵称：">
        <span style="padding-left:15px;">{{username}}</span>
      </el-form-item>
      <el-form-item label="新昵称：" prop="nickname">
        <el-input v-model="usernameForm.nickname"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="custom-bg custom-height" type="primary" @click="updateUsername('usernameForm')">确 定</el-button>
      <el-button plain class="custom-height" @click="usernameDialogVisible = false">取 消</el-button>
    </div>
    </el-dialog> -->
    <!-- 修改密码 -->
    <!-- <el-dialog   custom-class="password-dialog" width="475px" :visible.sync="passwordDialogVisible">
      <p slot="title"><i class="el-icon el-icon-edit-outline"></i>修改密码</p>
        <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" class="passwordForm"  label-width="22px">
          <el-form-item prop="p1">
            <span slot="label"><svg-icon icon-class="lock" /></span>
            <el-input type="password" v-model="passwordForm.p1" placeholder="原密码"></el-input>
          </el-form-item>
           <el-form-item  prop="p2">
             <span slot="label"><svg-icon icon-class="unlock" /></span>
            <el-input type="password" v-model="passwordForm.p2" placeholder="新密码"></el-input>
          </el-form-item>
           <el-form-item prop="checkPass">
             <span slot="label"><svg-icon icon-class="lock" /></span>
            <el-input type="password" v-model="passwordForm.checkPass" placeholder="确认新密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="custom-bg custom-height" type="primary" @click="updatePassword('passwordForm')">确 定</el-button>
          <el-button plain class="custom-height" @click="passwordDialogVisible = false">取 消</el-button>
        </div>
    </el-dialog> -->
    <!-- 修改头像 -->
    <!-- <el-dialog   custom-class="headerImg-dialog" width="475px" :visible.sync="headerImgDialogVisible">
      <p slot="title"><i class="el-icon el-icon-edit-outline"></i>修改头像</p>
      <div class="img-wrap">
         <div class="user-img oldImg fl"  :style="{backgroundImage: 'url(' + userImg + ')'}" ></div>
          <span class="link fl"></span>
          <div class="user-img newImg fl" :style="{backgroundImage: 'url(' + newImg + ')'}">
            <el-uploadImg @uplaodSucess="uplaodSucess" @uploadFailed="uploadFailed"></el-uploadImg>
          </div>
      </div>
      <p class="img-note"><svg-icon icon-class="info" />图像尺寸支持：124*124（JPG，png)</p>
        <div slot="footer" class="dialog-footer">
          <el-button :disabled="loadSuccess" class="custom-bg custom-height" type="primary" @click="updateHeaderImg">确 定</el-button>
          <el-button plain class="custom-height" @click="headerImgDialogVisible = false">取 消</el-button>
        </div>
    </el-dialog> -->
  </div>
</template>
<script>
import load from '@/components/upload';
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '' && this.ruleForm.checkPass === '' && this.ruleForm.p2 === '') {
        callback();
      } else {
        if (value === '') {
          callback(new Error('原密码不能为空'));
        } else if (value && !/^.{6,12}$/.test(value)) {
          callback(new Error('密码必须为6~12位'));
        } else {
          callback();
        }
      }
    };
    let validatePass1 = (rule, value, callback) => {
      if (value === '' && this.ruleForm.checkPass === '' && this.ruleForm.p1 === '') {
        callback();
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        if (value === '') {
          callback(new Error('新密码不能为空'));
        } else if (!/^.{6,12}$/.test(value)) {
          callback(new Error('密码必须为6~12位'));
        } else {
          callback();
        }
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '' && this.ruleForm.p1 === '' && this.ruleForm.p2 === '') {
        callback();
      } else if (value !== this.ruleForm.p2) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      usernameDialogVisible: false,
      passwordDialogVisible: false,
      headerImgDialogVisible: false,
      ruleForm: {
        nickname: '',
        keyName: '',
        p1: '',
        p2: '',
        oldPwd: '',
        newPwd: '',
        checkPass: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入新昵称', trigger: 'blur' }
        ],
        p1: [
          { validator: validatePass, trigger: 'blur' }
        ],
        p2: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      imageUrl: '',
      newImg: '',
      loadSuccess: true
    };
  },
  computed: {
    userImg() {
      return this.$store.getters.headImgUrl || 'https://watch-user-1256442970.picgz.myqcloud.com/';
    },
    username() {
      return this.$store.getters.username;
    }
  },
  created() {
    this.ruleForm.nickname = this.username;
    this.newImg = this.userImg;
  },
  methods: {
    uplaodSucess(val) {
      this.newImg = val;
      this.loadSuccess = false;
    },
    uploadFailed(val) {
      this.$message.error(val);
    },
    uploadUserInfo(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.ruleForm.keyName = decodeURIComponent(this.newImg.substring(this.newImg.lastIndexOf('/') + 1));
          this.ruleForm.oldPwd = this.ruleForm.p1 ? this.$md5(this.ruleForm.p1) : '';
          this.ruleForm.newPwd = this.ruleForm.p2 ? this.$md5(this.ruleForm.p2) : '';
          this.$fetchPost({
            url: this.$api.UPDATE_USER_INFO,
            data: this.ruleForm
          }).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$tools.removeItem('userInfo', 1); // 这里清除userinfo后要添加回去
            this.$store.commit('SET_USERID', res.data.userId);
            this.$store.commit('SET_TOKEN', res.data.token);
            this.$store.dispatch('GetUserInfo').then(res => {
              this.ruleForm.p1 = this.ruleForm.p2 = this.ruleForm.checkPass = '';
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components: {
    'el-uploadImg': load
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.info-wrap{
  .panel{
    float: left;
    width: 258px;
    height: 214px;
    padding: 30px 0;
    margin-right: 10px;
    background: #f3f4f6;
    box-sizing: border-box;
    &:nth-of-type(3){
      margin-right: 0;
    }
    .img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      #bg-img;
    }
    .desc{
      line-height: 34px;
      text-align: center;
    }
    button{
      display: block;
      width: 78px;
      height: 30px;
      color: #666;
      background: #fff;
      text-align: center;
      margin: 10px auto 0;
      border-radius: 4px;
      border: 1px solid #eaeaea;
      cursor: pointer;
    }
  }
  .password-set{
    .img{
      background-image: url('../../../assets/images/mimashezhi.png');
    }
  }
  .username-set{
    .username{
       width: 134px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 32px auto 18px;
        background: #9bddf6;
        border-radius: 30px;
    }
  }
  .passwordForm{
    .svg-icon{
      margin-right: 0;
    }
    .el-form-item{
      border: 1px solid #e5e5e5;
    }
  }
  .img-wrap{
    overflow: hidden;
    .user-img{
      width: 104px;
      height: 104px;
      background: #eaeaea;
      border-radius: 50%;
      #bg-img;
      &.oldImg{
        margin-left: 40px;
      }
    }
    .link{
      width: 91px;
      height: 7px;
      margin: 48px 12px 0;
      background: url(../../../assets/images/jiant2.png)
    }
  }
  .el-form-item{
    margin-bottom: 30px;
    .el-input{
      width: 240px;
    }
  }
  .img-note{
    margin-top: 28px;
    margin-left: 30px;
    font-size: 12px;
    text-align: center;
    color: #888;
  }
  .user-img{
      width: 104px;
      height: 104px;
      background: #fff;
      border: 1px solid #eaeaea;
      border-radius: 50%;
      #bg-img;
  }
}
</style>
