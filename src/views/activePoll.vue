<template>
  <section class="powerbi">
    <span>
      <iframe class="powerbi-iframe" :src="this.$root.link" frameborder="0" allowFullScreen="true"></iframe>
    </span>
  </section>
</template>
<script>

export default {

};
</script>

<style lang="scss" scoped="true">
  .powerbi {
    height: 100vh;
  }

  .powerbi-iframe {
    height: 100vh;
    width: 100%;
  }
</style>
