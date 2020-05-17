<template>
  <ValidationObserver
    v-slot="{ passes }"
    :class="hasSpacing ? ['m-3', 'm-t-1', 'p-2'] : []"
    ref="observer"
    tag="section"
    class="ilha-form">
    <div :class="inputsContainerClasses">
      <ValidationProvider
        v-for="(field, i) in fields"
        :key="i"
        :rules="field.rules"
        :name="field.property"
        :vid="field.property"
        v-slot="{ errors, valid }"
        tag="div">
        <b-field
          :label="field.label"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors">
          <b-input
            v-model="innerData[field.property]"
            :type="field.type ? field.type : 'text'"
            :placeholder="field.placeholder"
            :maxlength="field.maxlength"
            @change.native="changed()"
          >
          </b-input>
        </b-field>
      </ValidationProvider>
    </div>

    <div
      :class="actionsClasses"
      class="actions has-text-right">
      <slot name="button" />

      <b-button
        type="is-info"
        :class="hasSpacing ? ['m-l-1', 'm-t-1'] : []"
        :loading="loading"
        @click="passes(requestSave.bind(this))"
        tabindex="0"
      >
        Save
      </b-button>
    </div>
    </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';


export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    data: {
      type: Object,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    hasSpacing: {
      type: Boolean,
      default: true,
    },
    inputsContainerClasses: {
      type: Array,
      default: () => [],
    },
    actionsClasses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      canSave: false,
      innerData: {},
    };
  },
  methods: {
    initData() {
      this.innerData = {};
      if (this.data) {
        this.innerData = { ...this.data };
      }
      this.$refs.observer.validate();
    },
    requestSave() {
      this.$emit('onSaveRequest', this.innerData);
    },
    changed() {
      this.canSave = false;
      this.$refs.observer.validate().then((valid) => {
        this.canSave = valid;
      });
    },
  },
  watch: {
    data() {
      this.initData();
    },
    fields() {
      this.initData();
    },
  },
  mounted() {
    this.initData();
  },
};

</script>
