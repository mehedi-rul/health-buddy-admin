import { DialogProgrammatic as dialog } from 'buefy';


class AlertService {
  alertFetchError = () => {
    dialog.alert({
      title: 'Error',
      message: 'Fetch error',
      type: 'is-danger',
      hasIcon: true,
      icon: 'times-circle',
      iconPack: 'fa',
      ariaRole: 'alertdialog',
      ariaModal: true,
    });
  }

  alertSaveError = () => {
    dialog.alert({
      title: 'Error',
      message: 'Save error',
      type: 'is-danger',
      hasIcon: true,
      icon: 'times-circle',
      iconPack: 'fa',
      ariaRole: 'alertdialog',
      ariaModal: true,
    });
  }
}

export default new AlertService();
