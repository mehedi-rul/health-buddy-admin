<template>
  <i class="ilha-icon">
    <inline-svg :src="icon" :width="size" :height="size"/>
  </i>
</template>

<script>
import chart from '../../assets/icons/chart.svg';
import dashboard from '../../assets/icons/dashboard.svg';
import edit from '../../assets/icons/edit.svg';
import form from '../../assets/icons/form.svg';
import tables from '../../assets/icons/tables.svg';
import trash from '../../assets/icons/trash.svg';
import uiElements from '../../assets/icons/ui-element.svg';
import users from '../../assets/icons/users.svg';

const icons = {
  chart,
  dashboard,
  edit,
  form,
  tables,
  trash,
  uiElements,
  users,
};

export default {
  props: {
    type: String,
    fill: String,
    size: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    icon() {
      return icons[this.type];
    },
  },
};
</script>
