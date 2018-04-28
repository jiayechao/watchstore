<template>
  <div>
    {{errMsg}}
  </div>
</template>

<script>
export default {
  computed: {
    errMsg() {
      return this.$router.query.error;
    }
  }
};
</script>

<style lang="less" scoped>

</style>
