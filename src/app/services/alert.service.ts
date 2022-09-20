import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  getInfoMessageCreate(title: string, message: string, icon: any) {
    return swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonText: 'Ok'
    })
  }
}
