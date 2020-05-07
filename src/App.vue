<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
@import "assets/styles/variables";

// Light Green - #80BD41
// Orange - #F26A21
// Magenta - #961A49
// Violet - #6A1E74
// Warm Grey - #D8D1C9
// Cool Grey - #777779
// Dark Blue - #374EA2


// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": ($white, $black),
  "black": ($black, $white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "twitter": ($twitter, $twitter-inverter),
  "text": ($text, $text-invert),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

body.login, body.login #app {
  height: 100%;
  width: 100%;
}
.form-admin {
  margin-left: 260px;
}

@media screen and (max-width: 1023px) {
  .form-admin {
    margin-left: 80px;
  }
}
</style>
