<template>
  <div class="admin-page">
    <section class="sidebar-layout">
      <b-sidebar
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        :fullheight="fullheight"
        :fullwidth="fullwidth"
        type="is-white"
        open
      >

        <b-notification class="notification is-primary is-marginless" :closable="false">
          Dashboard admin
        </b-notification >
        <div class="">
          <b-menu class="is-custom-mobile">
            <b-menu-list>
              <b-menu-item icon="information-outline" tag="router-link" to="/admin/dashboard">
                <template v-slot:label>
                  <span>Dashboard</span>
                </template>
              </b-menu-item>
              <b-menu-item icon="account" label="Content Manager" tag="router-link"
                           to="/admin/content-manager">
              </b-menu-item>
              <b-menu-item icon="account" label="Users" tag="router-link" to="/admin/users">
              </b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>

      <div class="p-1 form-admin">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      fullheight: true,
      fullwidth: false,
    };
  },
};
</script>

<style lang="scss" scoped="true">
@import "../assets/styles/variables";

.p-1 {
  padding: 1em;
}

.notification {
  border-radius: 0;
}

.menu-list /deep/ {
  li {
    a {
      margin: 1.5em 0;

      span:nth-child(2) {
        margin-left: 1.5em;
      }
      border-left: 5px $white solid;

      &.router-link-exact-active {
        background-color: $white;
        color: $text;
        border-left: 5px $primary solid;
      }
    }
  }
}


@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
