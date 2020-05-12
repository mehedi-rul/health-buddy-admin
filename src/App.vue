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
@import "assets/styles/header";
@import "assets/styles/table";
@import "assets/styles/icon";
@import "assets/styles/login";

body.login, body.login #app {
  height: 100%;
  width: 100%;
}
html, .table {
  background-color: $light;
}

.table {
  &.is-striped {
    tbody, thead {
      tr:not(.is-selected):nth-child(odd), th {
        background-color: $white;
      }
    }
  }

}

.p-1 {
  padding: 1em;
}

.p-2 {
  padding: 2em;
}

.p-3 {
  padding: 3em;
}

.m-1 {
  margin: 1em;
}

.m-2 {
  margin: 2em;
}

.m-3 {
  margin: 3em;
}

.m-t-1 {
  margin-top: 1em;
}


.form-admin {
  margin-left: $sidebar-width;
}

@media screen and (max-width: 1023px) {
  .form-admin {
    margin-left: $sidebar-mobile-width;
  }
}
</style>
