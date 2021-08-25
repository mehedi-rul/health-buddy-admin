<template>
  <section class="ilha-user">
    <ilha-header
      :query="query"
      @search="search">
      <template v-slot:title>
        Add Polls / Edit Polls
      </template>
    </ilha-header>
    <ilha-form
      :data="data"
      :loading="loading"
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
  usersMixin,
} from 'admin-buddy';
import { mapGetters } from 'vuex';

const fields = [
  {
    property: 'name',
    type: 'text',
    label: 'Poll Name',
    placeholder: 'Poll Name',
    maxlength: 50,
    rules: 'required',
  },
  {
    property: 'link',
    type: 'text',
    label: 'Poll Link',
    placeholder: 'Poll Link',
    maxlength: 280,
    rules: 'required',
  },
  {
    property: 'is_active',
    type: 'checkbox',
    label: 'Active Mode',
  },
];

export default {
  mixins: [searchMixin, formMixin, toastsMixin, usersMixin],
  computed: {
    ...mapGetters(['pollsUrl']),
  },
  data() {
    return {
      searchRouteName: 'ManageAdmin',
      fields: [...fields],
      is_active: false,
    };
  },
  watch: {
    pollsUrl() {
      this.resourceUrl = this.pollsUrl;
    },
  },
  mounted() {
    this.resourceUrl = this.pollsUrl;
    this.getId = (data) => data.id;
  },
};

</script>
