import {
  required,
  confirmed,
  length,
  email,
  min,
  max,
} from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required, message: 'This field is required',
});

extend('email', {
  ...email,
  message: 'This field must be a valid email',
});

extend('confirmed', {
  ...confirmed,
  message: 'This field confirmation does not match',
});

extend('length', {
  ...length,
  message: 'This field must have 2 options',
});

extend('min', {
  ...min,
  message: 'The min length is {length}',
});

extend('max', max);
