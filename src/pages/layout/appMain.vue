<template>
    <section class="app-main">
           <router-view :key="key"></router-view>
    </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    }
  }
};
</script>
<style lang="less" scoped>
.app-main{
  min-height: calc(100% - 410px);
  background: #eef0f3;
}
</style>
