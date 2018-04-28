<template>
  <div id="app">
    <HeaderBar />
    <AppMain />
    <FooterBar />
  </div>
</template>

<script>
import { HeaderBar, FooterBar, AppMain } from './pages/layout';
export default {
  name: 'App',
  components: {
    HeaderBar,
    AppMain,
    FooterBar
  }
};
</script>

<style lang="less">
  /* 引用公共样式 */
  @import "./assets/css/common.less";
</style>
