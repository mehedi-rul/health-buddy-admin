<template>
  <section class="content-manager">
    <ManagerPanel>
      <template v-slot:title>
        Content manager
      </template>
    </ManagerPanel>
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
