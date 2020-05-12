<template>
  <section class="content-manager">
    <ilha-header>
      <template v-slot:title>
        Content manager
      </template>
    </ilha-header>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
      htmlHeightLast: undefined,
    };
  },
};
</script>

<style lang="scss" scoped="true">
</style>
