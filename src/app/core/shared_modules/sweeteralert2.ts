import { Input } from '@angular/core';

import Swal from "sweetalert2";

export class SweeterAlert2 {
    constructor() { }


    delete() {
        return Swal.fire({
            title: 'Alerta!!',
            text: 'Estas seguro de realizar esta acción!',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: 'rgb(17, 45, 168)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',

        })
    }

    confirmPay() {
        return Swal.fire({
            title: 'Confirme medio de pago!!',
            icon: "info",
            input: 'radio',
  inputOptions: {tarjeta:"Tarjeta",efectivo:"Efectivo"},
  inputValidator: (value) => {
    if (!value) {
      return 'You need to choose something!'
    }
  },
            showCancelButton: true,
            confirmButtonColor: 'rgb(17, 45, 168)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'aceptar',

        })
    }

  

    payWay(){
        return Swal.fire({
            title: 'Escoja la forma de pago',
            input:'number',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:'Pagar',
            cancelButtonText:'Cancel',
            inputValidator: (value) => {
                if (!value) {
                  return 'Debe ingresar la cantidad'
                }
              }
          })
    }


}