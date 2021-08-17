<template>
  <div class="admin-page">
    <!-- <ilha-sidebar
      :links="links"
    ></ilha-sidebar> -->
     <section
    class="ilha-sidebar">
    <b-sidebar
      :mobile="mobile"
      :expand-on-hover="expandOnHover"
      :reduce="reduce"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :can-cancel="false"
      type="is-white"
      open
    >
      <div class="menu-header p-1 is-primary">
        <span class="menu-header__title">Dashboard</span>
        <b-icon
          @click.native="toggleReduce"
          icon="menu"
          class="menu-header__icon icon is-medium"/>
      </div>
      <div class="">
        <b-menu class="is-custom-mobile">
          <b-menu-list>
            <b-menu-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
              :class="link.class"
              :tag="link.tag" @click="handleRoute()">
              <template v-slot:label>
                <ilha-icon :type="link.icon" class="icon is-medium"/>
                <span>{{ link.label }}</span>
                <b-icon v-if="!reduce" icon="chevron-right"/>
              </template>
              <template v-if="link.archived == 'archived'">
                <span v-for="(poll, index) in polls" :key="index">
                  <b-menu-item class="sub_poll" icon="poll" @click="handleArchived(poll)" v-if="poll.is_active == false" :label="poll.name"></b-menu-item>
                </span>
              </template>
               <template v-if="link.active == 'active'">
                <span v-for="(poll, index) in polls" :key="index">
                  <b-menu-item class="sub_poll" icon="poll"  @click="handleActive(poll)" v-if="poll.is_active == true" :label="poll.name"></b-menu-item>
                </span>
              </template>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
    <div class="form-admin">
      <router-view />
    </div>
  </div>
</template>

<script>
import { usersMixin } from 'admin-buddy';
import { mapGetters } from 'vuex';
import axios from 'axios';

const links = [
  {
    to: '/admin/dashboard',
    label: 'Admin Dashboard',
    icon: 'dashboard',
    class: 'dashboard-link',
    tag: 'router-link',
  },
  {
    to: '/admin/active-poll/:id',
    label: 'Active Polls',
    icon: 'poll',
    active: 'active',
  },
  {
    to: '/admin/archived-polls',
    label: 'Archived polls',
    icon: 'poll',
    archived: 'archived',
  },
];

const adminLinks = [

  {
    to: '/admin/manage-polls',
    label: 'Manage Polls',
    icon: 'managePoll',
    tag: 'router-link',
  },
  {
    to: '/admin/users',
    label: 'Users',
    icon: 'users',
    tag: 'router-link',
  },
  {
    to: '/admin/flows',
    label: 'Flows',
    icon: 'flows',
    tag: 'router-link',
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
      polls: {
        type: Array,
        default: () => [],
      },
    };
  },
  computed: {
    ...mapGetters(['pollsUrl']),
  },
  watch: {
    usersUrl() {
      this.resourceUrl = this.pollsUrl;
    },
  },
  mounted() {
    this.getCurrentUser().then((user) => {
      if (user.is_staff) {
        this.links = [...links, ...adminLinks];
      }
    });
    this.resourceUrl = this.pollsUrl;
    axios
      .get(this.resourceUrl)
      .then((response) => {
        this.polls = response.data.results;
        setTimeout(() => this.polls, 2000);
      });
  },
  methods: {
    handleActive(poll) {
      this.$root.link = poll.link;
      this.$router.push({ name: 'Active_polls', params: { id: poll.name } });
    },
    handleArchived(poll) {
      this.$root.link = poll.link;
      this.$router.push({ name: 'Archived_polls', params: { id: poll.name } });
    },
    handleRoute() {
      this.resourceUrl = this.pollsUrl;
      axios
        .get(this.resourceUrl)
        .then((response) => {
          this.polls = response.data.results;
          setTimeout(() => this.polls, 2000);
        });
    },
    toggleReduce() {
      this.reduce = !this.reduce;
      if (this.reduce) {
        document.body.classList.add('ilha-sidebar__reduced');
      } else {
        document.body.classList.remove('ilha-sidebar__reduced');
      }
    },
  },
};
</script>
