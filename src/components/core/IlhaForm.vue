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
            v-model="data[field.property]"
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
        :disabled="!canSave"
        @click="passes(requestSave)">Save
      </b-button>
    </div>
    </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import alertService from '@/services/alerts';


export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    url: {
      type: String,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    idProperty: {
      type: String,
      default: 'id',
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
    };
  },
  methods: {
    requestSave() {
      if (this.url) {
        if ({}.hasOwnProperty.call(this.data, this.idProperty)) {
          this.saveData();
        } else {
          this.updateData();
        }
      } else {
        this.$event.emit('onSaveRequest', this.data);
      }
    },
    saveData() {
      this.loading = true;
      this.$http.post(`${this.url}`, this.data).then(this.fetchSuccess.bind(this)).catch(this.saveError.bind(this));
    },
    updateData() {
      this.loading = true;
      const id = this.data[this.idProperty];
      this.$http.put(`${this.url}${id}`, this.data).then(this.fetchSuccess.bind(this)).catch(this.saveError.bind(this));
    },
    fetchData() {
      this.loading = true;
      this.$http.get(`${this.url}`).then(this.fetchSuccess.bind(this)).catch(this.fetchError.bind(this));
    },
    changed() {
      this.canSave = false;
      this.$refs.observer.validate().then((valid) => {
        this.canSave = valid;
      });
    },
    initData() {
      if (this.url) {
        this.fetchData();
      } else {
        this.$refs.observer.validate();
      }
    },
    fetchSuccess({ data }) {
      this.data = data;
      this.loading = false;
      setTimeout(() => {
        this.$refs.observer.validate();
      }, 0);
    },
    saveError(error) {
      console.error(error);
      this.loading = false;
      alertService.alertSaveError();
    },
    fetchError(error) {
      console.error(error);
      this.loading = false;
      alertService.alertFetchError();
      this.$refs.observer.validate();
    },
  },
  mounted() {
    this.initData();
  },
};

</script>
