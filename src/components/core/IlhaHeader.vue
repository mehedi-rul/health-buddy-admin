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
