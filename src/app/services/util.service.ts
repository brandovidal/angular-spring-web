import { Injectable } from '@angular/core';
import swal, {SweetAlertCustomClass, SweetAlertOptions} from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  showMessage({
    html = '',
    icon = 'success',
    showCancelButton = false,
    reverseButtons = false,
    confirmButtonText = 'Continuar',
    cancelButtonText = 'Cancelar'
  }: SweetAlertOptions = {}) {
    return swal.fire({
      html,
      icon,
      showCancelButton,
      reverseButtons,
      confirmButtonText,
      cancelButtonText
    })
  }
}
