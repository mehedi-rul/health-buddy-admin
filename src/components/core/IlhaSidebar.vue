<template>
  <section class="ilha-sidebar">
    <b-sidebar
      :mobile="mobile"
      :expand-on-hover="expandOnHover"
      :reduce="reduce"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      type="is-white"
      open
    >
      <div class="menu-header p-1 is-primary">
        <span class="menu-header__title">Dashboard admin</span>
        <b-icon icon="menu" class="menu-header__icon icon is-medium"/>
      </div>
      <div class="">
        <b-menu class="is-custom-mobile">
          <b-menu-list>
            <b-menu-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
              :class="link.class"
              tag="router-link">
              <template v-slot:label>
                <ilha-icon :type="link.icon" class="icon is-medium"/>
                <span>{{ link.label }}</span>
                <b-icon icon="chevron-right"/>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>

export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      fullheight: true,
      fullwidth: false,
    };
  },
  mounted() {
    console.log(this.links);
  },
};
</script>
