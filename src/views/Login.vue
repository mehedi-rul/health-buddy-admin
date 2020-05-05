<template>
  <section class="login container section">
    <div class="container">
      <div class="columns">
        <div class="column is-half login-form__container">
          <div class="box">
            <h3 class="subtitle">Login to Admin Management</h3>
            <b-field label="User">
              <b-input v-model="username"
                       placeholder="Enter a username or email"
                       maxlength="30"></b-input>
            </b-field>
            <b-field label="Error"
                     type="is-info"
                     message="You can have a message too">
              <b-input placeholder="Error"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password"
                       v-model="password"
                       placeholder="Enter your password"
                       maxlength="30"
                       password-reveal>
              </b-input>
            </b-field>
            <div class="buttons">
              <b-button type="is-info" expanded>Info</b-button>
            </div>
          </div>
        </div>
        <div class="column notification is-info box">
          oi
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
    };
  },
};
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;
}
body {
  background: url('../assets/imgs/login-background.png') no-repeat;
  background-size: cover;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  /*flex: 1;*/
  width: 100%;
  max-width: 800px;
  &-form {
    @media (min-width: 769px) {
      &__container {
        padding-right: 0;
      }
    }
  }
}
</style>
