import { ToastProgrammatic as Toast } from 'buefy';

export default {
  successLoginAlert() {
    Toast.open({
      duration: 2000,
      message: 'User logged',
      position: 'is-bottom',
      type: 'is-success',
    });
  },
  errorLoginAlert() {
    Toast.open({
      duration: 2000,
      message: 'Incorrect username or password',
      position: 'is-bottom',
      type: 'is-danger',
    });
  },
};
