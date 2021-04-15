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
];

const adminLinks = [
  {
    to: '/admin/users',
    label: 'Users',
    icon: 'users',
  },
  {
    to: '/admin/flows',
    label: 'Flows',
    icon: 'flows',
  },
  {
    to: '/admin/poll-dashboard',
    label: 'Poll Dashboard',
    icon: 'powerbi',
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
