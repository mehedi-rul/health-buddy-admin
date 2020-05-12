<template>
  <section class="ilha-user">
    <ilha-header>
      <template v-slot:title>
        Users / Edit
      </template>
    </ilha-header>
    <div class="ilha-form  m-3 m-t-1 p-2">
      <b-field label="Username">
        <b-input v-model="username"
                 placeholder="Usernamename"
                 maxlength="30"
                 required></b-input>
      </b-field>
      <b-field label="First name">
        <b-input v-model="firstName"
                 placeholder="First name"
                 maxlength="30"
                 required></b-input>
      </b-field>
      <b-field label="Last name">
        <b-input v-model="lastName"
                 placeholder="Last name"
                 maxlength="30"
                 required></b-input>
      </b-field>
      <b-field label="Email">
        <b-input type="email"
                 value="john@"
                 maxlength="30">
        </b-input>
      </b-field>
      <div class="actions has-text-right">
        <b-button
          type="is-info"
          :disabled="!hasChanges"
          class="m-t-1"
          @click="changePassword"
          outlined>Change password</b-button>

        <b-button
          type="is-info"
          class="m-l-1 m-t-1"
          :disabled="!hasChanges"
          @click="save">Login</b-button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      id: '-',
      hasChanges: true,
    };
  },
  methods: {
    updateId() {
      this.id = this.$route.params.id;
    },
  },
  mounted() {
    this.updateId();
  },
};

</script>
