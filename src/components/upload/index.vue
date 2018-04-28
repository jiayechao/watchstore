<template>
<div class="upload-wrap">
  <input type="file" ref="uploadFile" @change="upload">
  <el-progress  v-show="uploading" type="circle" :percentage="process" :width="width"></el-progress>
</div>

</template>

<script>
import COS from 'cos-js-sdk-v5';
import getCosAuth from '@/utils/getCosAuth';
export default {
  props: {
    width: {
      type: Number,
      default: 104
    }
  },
  data() {
    return {
      uploading: false,
      process: 0,
      state: {
        bucket: 'watch-user-1256442970',
        region: 'ap-guangzhou'
      },
      cos: '',
      max: 0
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  },
  created() {
    this.cos = new COS({getAuthorization: this.getAuthorization});
  },
  methods: {
    getAuthorization (options, callback) {
      getCosAuth(options, callback, (fetchRes) => {
        // 可以在这里面统一处理各种异常情况
        // fetchRes.code === 0 上传成功
        // fetchRes.code === 1 文件过大
        // fetchRes.code === 2 底层加签接口异常，腾讯云的问题
        // fetchRes.code === 3 rest加签接口异常，自己的接口超时等
        // fetchRes.code === 9999 没传文件
        console.log('fetchRes', fetchRes);
      });
    },
    upload() {
      let file = this.$refs.uploadFile.files[0];
      if (!file) {
        return;
      }
      // 最大不能超过5个
      if (this.max > 4) {
        this.$emit('uploadFailed', '最多只能上传五张');
        return;
      }
      let key = '' + this.userId + Date.now();
      this.cos.putObject({
        Bucket: this.state.bucket, // Bucket 格式：test-1250000000
        Region: this.state.region,
        Key: key + file.name,
        Body: file,
        onProgress: (info) => {
          this.uploading = true;
          this.process = info.percent * 100;
        }
      }, (err, data) => {
        this.uploading = false;
        if (err) {
          this.$emit('uploadFailed', err.error.Code);
          return;
        }
        this.max++;
        this.$emit('uplaodSucess', data.Location);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.upload-wrap{
  position: relative;
  width: 100%;
  height: 100%;
  input{
    position: relative;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .el-progress{
      position: absolute;
      top: 0;
      left: 0;;
  }
}

</style>
