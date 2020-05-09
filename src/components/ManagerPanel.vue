<template>
  <section class="manager-panel">
    <b-field class="search-field">
      <b-input placeholder="Search..."
               type="search"
               icon="magnify"
               icon-clickable
               @icon-click="searchIconClick">
      </b-input>
    </b-field>
    <h1 class="p-1 subtitle">
      <slot name="title"/>
    </h1>
  </section>
</template>

<script>

export default {
  name: 'ManagerPanel',
  methods: {
    searchIconClick() {
    },
  },
};
</script>

<style lang="scss" scoped>
.manager-panel {
  .search-field {
    background-color: white;
    padding: calc((4em - 2.25em) / 2);

    input {
      border: none;
      box-shadow: none;
    }
  }
  .subtitle {
    font-weight: bold;
  }
}


</style>
