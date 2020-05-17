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
  alertSaveSuccess() {
    Toast.open({
      duration: 2000,
      message: 'Success save',
      position: 'is-bottom',
      type: 'is-success',
    });
  },
  alertSaveError() {
    Toast.open({
      duration: 2000,
      message: 'Save error',
      position: 'is-bottom',
      type: 'is-danger',
    });
  },
  alertFetchError() {
    Toast.open({
      duration: 2000,
      message: 'Entity not found',
      position: 'is-bottom',
      type: 'is-danger',
    });
  },
  alertDeleteSuccess() {
    Toast.open({
      duration: 2000,
      message: 'Deleted',
      position: 'is-bottom',
      type: 'is-success',
    });
  },
  alertDeleteError() {
    Toast.open({
      duration: 2000,
      message: 'Error on delete',
      position: 'is-bottom',
      type: 'is-danger',
    });
  },
};
