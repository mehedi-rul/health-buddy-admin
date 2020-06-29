<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
@import "assets/styles/variables";

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
@import "~admin-buddy/src/assets/styles/header";
@import "~admin-buddy/src/assets/styles/table";
@import "~admin-buddy/src/assets/styles/icon";
@import "~admin-buddy/src/assets/styles/login";
@import "~admin-buddy/src/assets/styles/form";
@import "~admin-buddy/src/assets/styles/sidebar";

@import "~admin-buddy/src/assets/styles/common";
@import "~admin-buddy/src/assets/styles/summary-box";

body.login, body.login #app {
  height: 100%;
  width: 100%;
}
html {
  background-color: $light;
  font-family: 'Oxygen', sans-serif;
}

</style>
