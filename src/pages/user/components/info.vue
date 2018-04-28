<template>
  <div class="info-wrap">
    <div class="panel password-set">
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
    </div>
    <!-- 修改昵称 -->
    <el-dialog  custom-class="username-dialog" width="475px" :visible.sync="usernameDialogVisible">
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
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog   custom-class="password-dialog" width="475px" :visible.sync="passwordDialogVisible">
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
    </el-dialog>
    <!-- 修改头像 -->
    <el-dialog   custom-class="headerImg-dialog" width="475px" :visible.sync="headerImgDialogVisible">
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
    </el-dialog>
  </div>
</template>
<script>
import load from '@/components/upload';
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass');
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
      } else if (value !== this.passwordForm.p2) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      usernameDialogVisible: false,
      passwordDialogVisible: false,
      headerImgDialogVisible: false,
      usernameForm: {
        nickname: ''
      },
      passwordForm: {
        p1: '',
        p2: '',
        oldPwd: '',
        newPwd: '',
        checkPass: ''
      },
      usernameRules: {
        nickname: [
          { required: true, message: '请输入新昵称', trigger: 'blur' }
        ]
      },
      passwordRules: {
        p1: [
          { validator: validatePass, trigger: 'blur' }
        ],
        p2: [
          { validator: validatePass, trigger: 'blur' }
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
  methods: {
    updateUsername(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$fetchPost({
            url: this.$api.UPDATE_NICKNAME,
            data: this.usernameForm
          }).then(res => {
            const userInfo = this.$tools.getItem('userInfo', 1);
            userInfo.username = this.usernameForm.nickname;
            this.$tools.setItem('userInfo', userInfo, 1);
            this.$store.commit('SET_USERNAME', this.usernameForm.nickname);
            this.$refs[form].resetFields();
            this.usernameDialogVisible = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updatePassword(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.passwordForm.oldPwd = this.$md5(this.passwordForm.p1);
          this.passwordForm.newPwd = this.$md5(this.passwordForm.p2);
          this.$fetchPost({
            url: this.$api.UPDATE_PWD,
            data: this.passwordForm
          }).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            const userInfo = this.$tools.getItem('userInfo', 1);
            userInfo.taken = res.data.token;
            this.$tools.setItem('userInfo', userInfo, 1);
            this.$store.commit('SET_TOKEN', res.data.token);
            this.$refs[form].resetFields();
            this.passwordDialogVisible = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateHeaderImg() {
      this.$fetchPost({
        url: this.$api.UPDATE_HEAD_IMG,
        data: {
          keyName: decodeURIComponent(this.newImg.substring(this.newImg.lastIndexOf('/') + 1))
        }
      }).then(res => {
        const userInfo = this.$tools.getItem('userInfo', 1);
        userInfo.headImgUrl = this.newImg;
        this.$tools.setItem('userInfo', userInfo, 1);
        this.$store.commit('SET_HEADIMGURL', this.newImg);
        this.headerImgDialogVisible = false;
      });
    },
    uplaodSucess(val) {
      this.newImg = val;
      this.loadSuccess = false;
    },
    uploadFailed(val) {
      this.$message.error(val);
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
  .img-note{
    margin-top: 28px;
    font-size: 12px;
    text-align: center;
    color: #888;
  }

}
</style>
