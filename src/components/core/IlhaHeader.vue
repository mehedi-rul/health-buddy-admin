<template>
  <section class="manager-panel">
    <div class="manager-panel__query-container">
      <b-field class="search-field">
        <b-input placeholder="Search..."
                 type="search"
                 icon="magnify"
                 icon-clickable
                 @icon-click="searchIconClick">
        </b-input>
      </b-field>
      <div class="actions">
        <b-button
          outlined
          @click="logout()"
          type="is-info"
          class="">
          Log out
        </b-button>
      </div>
    </div>
    <h1 class="m-3 m-b-1 subtitle">
      <span>
        <slot name="title"/>
      </span>
      <b-button
        v-if="newEntityUrl"
        :to="newEntityUrl"
        tag="router-link"
        type="is-info"
        class="btn-add p-1"
      >
        {{ addBtnLabel }}
      </b-button>
    </h1>
  </section>
</template>

<script>

export default {
  props: {
    newEntityUrl: {
      type: String,
    },
    addBtnLabel: {
      type: String,
      default: 'New',
    },
  },
  methods: {
    searchIconClick() {
    },
    logout() {
      localStorage.clear();
      this.$router.push({ path: '/' });
    },
  },
};
</script>
