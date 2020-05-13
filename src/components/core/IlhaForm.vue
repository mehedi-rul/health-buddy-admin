<template>
  <section class="ilha-form" :class="hasSpacing ? ['m-3', 'm-t-1', 'p-2'] : []">
    <ValidationObserver
      v-slot="{ passes }"
      ref="observer"
      tag="div">
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
          @click="passes(save)">Save
        </b-button>
      </div>

    </ValidationObserver>
  </section>
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
    url: {
      type: String,
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
      data: {},
    };
  },
  watch: {
    fields() {
      console.log(this.fields);
    },
  },
  methods: {
    save() {
      if (this.url) {
        // saving with url
      } else {
        this.$event.emit('onSaveRequest');
      }
    },
    fetchData() {
      this.loading = true;
      this.$http.get(`${this.url}`)
        .then(({ data }) => {
          this.data = data;
          this.loading = false;
        })
        .catch((error) => {
          this.data = {};
          throw error;
        });
    },
    changed() {
      this.canSave = false;
      this.$refs.observer.validate().then((valid) => {
        this.canSave = valid;
      });
    },
    initData() {
    },
  },
  mounted() {
    this.$refs.observer.validate();
  },
};

</script>
