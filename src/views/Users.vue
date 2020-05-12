<template>
  <section class="users">
    <ilha-header>
      <template v-slot:title>
        Users
      </template>
    </ilha-header>
    <ilha-table
      :header="header"
      :data="data"
      can-edit
      can-delete
    ></ilha-table>
  </section>
</template>

<script>

export default {
  data() {
    const data = [];

    for (let i = 0; i < 20; i += 1) {
      data.push(
        {
          id: i + 1,
          name: `John Doe ${i + 1}`,
          email: 'john.doe@email.com',
          contact: '+55.82.99999.1234',
          gender: 'Male',
        },
      );
    }

    return {
      data,
      header: [
        {
          property: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          property: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          property: 'contact',
          label: 'Contact',
          centered: true,
        },
      ],
    };
  },
};

</script>

<style lang="scss" scoped="true">
</style>
