<template>
  <section class="login">
    <div class="container">
      <div class="columns section">
        <div class="column is-half login__form">
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
              <b-button type="is-info" expanded>Info</b-button>
            </div>
          </div>
        </div>
        <div class="column notification is-info box login__logo-container">
          <img src="../assets/imgs/unicef-eu-asia-logo.png">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
      htmlHeightLast: undefined,
    };
  },
  methods: {
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

<style lang="scss" scoped="true">

.login {
  height: 100%;
  background: url('../assets/imgs/login-background.png') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  > .container {
    width: 100%;
    max-width: 650px;
  }

  .box {
    box-shadow: 0px 10px 17px -5px rgba(0,0,0,0.75);
  }

  &__logo-container {
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 15vh;
    }
  }

  @media (min-width: 769px) {
    &__form {
      padding-right: 0;
    }
  }

}
</style>
