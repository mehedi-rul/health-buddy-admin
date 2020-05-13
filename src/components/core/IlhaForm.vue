<template>
  <section class="ilha-form  m-3 m-t-1 p-2">
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <ValidationProvider
        v-for="(field, i) in fields"
        :key="i"
        :rules="field.rules"
        :name="field.property"
        :vid="field.property"
        v-slot="{ errors, valid }">
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

      <div class="actions has-text-right">
        <slot name="button" />

        <b-button
          type="is-info"
          class="m-l-1 m-t-1"
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
      required: true,
    },
    id: {
      required: false,
      default: '',
    },
    fields: {
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
    initData() {

    },
    save() {
    },
    fetchData() {
      this.loading = true;
      this.$http.get(`${this.url}/${this.id}`)
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
  },
  mounted() {
    this.$refs.observer.validate();
  },
};

</script>
