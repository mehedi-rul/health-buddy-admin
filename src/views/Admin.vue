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
              <b-menu-item tag="router-link" to="/admin/dashboard" class="dashboard-link">
                <template v-slot:label>
                  <Icon type="dashboard" class="icon is-medium"/>
                  <span>Dashboard</span>
                </template>
              </b-menu-item>
              <b-menu-item tag="router-link" to="/admin/content-manager">
                <template v-slot:label>
                  <Icon type="tables" class="icon is-medium"/>
                  <span>Content Manager</span>
                </template>
              </b-menu-item>
              <b-menu-item tag="router-link" to="/admin/users">
                <template v-slot:label>
                  <Icon type="users" class="icon is-medium"/>
                  <span>Users</span>
                </template>
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
  text-transform: uppercase;
  font-weight: bold;
}

.menu-list /deep/ {
  li {
    margin: 1em 0;

    a {
      display: flex;
      align-items: center;
      padding-left: 1.5em;
      border-left: 5px $white solid;

      span:nth-child(2) {
        margin-left: 1.5em;
      }

      &.router-link-exact-active {
        background-color: $white;
        color: $text;
        border-left: 5px $primary solid;
      }
    }

    &.dashboard-link {
      &:after {
        display: block;
        border-bottom: 1px solid $divider;
        content: '';
        margin: 10px 20px;
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
