<template>
  <section class="users">
    <b-field class="search-field">
      <b-input placeholder="Search..."
               type="search"
               icon="magnify"
               icon-clickable
               @icon-click="searchIconClick">
      </b-input>
    </b-field>
    <h1>Users</h1>
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
  methods: {
    searchIconClick() {
    },
  },
};
</script>

<style lang="scss" scoped="true">
</style>
