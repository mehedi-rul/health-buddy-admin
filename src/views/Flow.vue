<template>
  <section class="ilha-user">
    <ilha-header
      :query="query"
      @search="search"
      input-search-placeholder="Buscar..."
      logout-label="Sair">
      <template v-slot:title>
        Flows / Edit
      </template>
    </ilha-header>
    <ilha-form
      :data="data"
      :loading="loading"
      :fetch-loading="fetchLoading"
      :fields="fields"
      @onSaveRequest="save"
    >
    </ilha-form>
  </section>
</template>

<script>
import {
  searchMixin,
  formMixin,
  toastsMixin,
} from 'admin-buddy';
import { mapGetters } from 'vuex';

export default {
  mixins: [searchMixin, formMixin, toastsMixin],
  data() {
    return {
      openedIconChooser: false,
      searchRouteName: 'FlowsAdmin',
      fields: [
        {
          property: 'uuid',
          label: 'UUID',
          sortable: true,
        },
        {
          property: 'name',
          label: 'Name',
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['flowsUrl']),
  },
  watch: {
    flowsUrl() {
      this.resourceUrl = this.flowsUrl;
    },
  },
  mounted() {
    this.resourceUrl = this.flowsUrl;
  },
};

</script>
