<template>
  <section class="ilha-login">
    <div class="container">
      <div class="columns section">
        <div class="column is-half ilha-login__form">
          <div class="box">
            <h3 class="subtitle">Login to Admin Management</h3>
            <b-field label="User">
              <b-input v-model="username"
                       placeholder="Enter a username or email"
                       maxlength="30"
                       required></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password"
                       v-model="password"
                       placeholder="Enter your password"
                       maxlength="30"
                       required
                       password-reveal>
              </b-input>
            </b-field>
            <div class="buttons">
              <b-button
                type="is-info"
                :disabled="!canLogin"
                @click="tryLogin"
                expanded>Login</b-button>
            </div>
            <div class="has-text-centered">
              <a class="has-text-danger">Forgot your password?</a>
            </div>
          </div>
        </div>
        <div class="column notification is-info box ilha-login__logo-container">
          <img :src="appLogo">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    appLogo: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      username: undefined,
      password: undefined,
      htmlHeightLast: undefined,
    };
  },
  computed: {
    canLogin() {
      return this.username && this.password;
    },
  },
  methods: {
    tryLogin() {
      this.$router.push('admin/users');
    },
    updateViewStyle(mounted) {
      const { body } = document;
      const html = body.parentNode;

      if (mounted) {
        body.classList.add('login');
        this.htmlHeightLast = html.style.height;
        html.style.height = '100%';
      } else {
        body.classList.remove('login');
        html.style.height = this.htmlHeightLast;
      }
    },
  },
  mounted() {
    this.updateViewStyle(true);
  },
  destroyed() {
    this.updateViewStyle(false);
  },
};
</script>
