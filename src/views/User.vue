<template>
  <section class="ilha-user">
    <ilha-header>
      <template v-slot:title>
        Users / Edit
      </template>
    </ilha-header>
    <ilha-form
      :url="url"
      :fields="fields">
      <template v-slot:button>
        <b-button
          type="is-info"
          class="m-t-1"
          @click="changePassword"
          outlined>Change password</b-button>
      </template>
    </ilha-form>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['url']),
  },
  data() {
    return {
      id: undefined,
      fields: [
        {
          property: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Username',
          maxlength: 30,
          required: true,
          rules: 'required',
        },
        {
          property: 'firstName',
          type: 'text',
          label: 'First name',
          placeholder: 'First name',
          maxlength: 30,
          required: true,
          rules: 'required',
        },
        {
          property: 'lastName',
          type: 'text',
          label: 'Last name',
          placeholder: 'Last name',
          maxlength: 30,
          required: true,
          rules: 'required',
        },
        {
          property: 'Email',
          type: 'email',
          label: 'Email',
          placeholder: 'Email',
          maxlength: 30,
          required: true,
          rules: 'required|email',
        },
      ],
    };
  },
  methods: {
    changePassword() {
    },
    updateId() {
      this.id = this.$route.params.id;
    },
  },
  mounted() {
    this.updateId();
  },
};

</script>
