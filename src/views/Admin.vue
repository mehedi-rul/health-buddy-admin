<template>
  <div class="admin-page">
    <ilha-sidebar
      :links="links"
    ></ilha-sidebar>
    <div class="form-admin">
      <router-view />
    </div>
  </div>
</template>

<script>
import { usersMixin } from 'admin-buddy';

const links = [
  {
    to: '/admin/dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    class: 'dashboard-link',
  },
  {
    to: '/admin/content-manager',
    label: 'Content Manager',
    icon: 'tables',
  },
];

const adminLinks = [
  {
    to: '/admin/users',
    label: 'Users',
    icon: 'users',
  },
];

export default {
  mixins: [usersMixin],
  data() {
    return {
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      fullheight: true,
      fullwidth: false,
      links: [...links],
    };
  },
  mounted() {
    this.getCurrentUser().then((user) => {
      if (user.is_staff) {
        this.links = [...links, ...adminLinks];
      }
    });
  },
};
</script>
