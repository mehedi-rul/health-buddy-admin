<template>
  <section class="content-manager">
    <IlhaHeader>
      <template v-slot:title>
        Content manager
      </template>
    </IlhaHeader>
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
