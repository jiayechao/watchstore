<template>
    <div class="hone-wrap">
      <div class="banner">
        <el-carousel height="615px" arrow="never" :interval="3000">
          <el-carousel-item v-for="(item, index) in bannerImgs" :key="index"
                            :style="{backgroundImage: 'url(' + item.imgUrl + ')'}">
            <router-link v-if="item.linkType !==3" style="display: block;height: 615px" :to="'/goods/'+item.itemBaseId">
              <a v-if="item.linkType ===3" :href="item.linkAddress" style="display: block;height: 615px"></a>
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      bannerImgs: []
    };
  },
  created() {
    // 获取banner
    this.$fetchPost({
      url: this.$api.GET_BANNER_LIST
    }).then(res => {
      this.bannerImgs = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
  @import '../../assets/css/base.less';

  .el-carousel {
    overflow: hidden;
  }

  .el-carousel__item {
    #bg-img
  }

</style>
