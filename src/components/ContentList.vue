<template>
  <section class="content-list m-3 m-t-1">
    <b-table
      :data="isEmpty ? [] : data"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      class="table-container">

      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="email" label="Email">
          {{ props.row.email }}
        </b-table-column>

        <b-table-column field="contact" label="Contact" centered>
          {{ props.row.contact }}
        </b-table-column>

        <b-table-column label="" centered>
          <span class="content-list__actions">
            <Icon type="edit" class="icon is-medium"/>
            <Icon type="trash" class="icon is-medium"/>
          </span>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>

export default {
  data() {
    const data = [];

    for (let i = 0; i < 10; i += 1) {
      data.push(
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@email.com',
          contact: '+55.82.99999.1234',
          gender: 'Male',
        },
      );
    }

    return {
      data,
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.content-list {
  &__actions {
    .icon {
      margin: 0 0.1em;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    &.m-3 {
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
