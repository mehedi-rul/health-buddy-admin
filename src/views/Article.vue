<template>
  <section class="ilha-user">
    <ilha-header
      :query="query"
      @search="search">
      <template v-slot:title>
        Content Manager / Edit
      </template>
    </ilha-header>
    {{ uploadUrl }}
    <ilha-form
      v-if="uploadUrl && uploadHeadersReq"
      :data="data"
      :loading="loading"
      :fields="fields"
      :uploadUrl="uploadUrl"
      :uploadHeadersReq="uploadHeadersReq"
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
      searchRouteName: 'ContentManagerAdmin',
      fields: [
        {
          property: 'title',
          type: 'text',
          label: 'Title',
          placeholder: 'Title',
          rules: 'required',
        },
        {
          property: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          placeholder: 'Subtitle',
          rules: 'required',
        },
        {
          property: 'body',
          type: 'editor',
          label: 'Post text',
          rules: 'required',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['articlesUrl', 'uploadUrl', 'uploadHeadersReq']),
  },
  methods: {
  },
  watch: {
    articlesUrl() {
      this.resourceUrl = this.articlesUrl;
    },
  },
  mounted() {
    this.resourceUrl = this.articlesUrl;
  },
};

</script>
