
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
            title: 'Pagar!!',
            text: 'Guardar pago del cliente',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: 'rgb(17, 45, 168)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'aceptar',

        })
    }

  

    payWay(){
        return Swal.fire({
            title: 'Escoja la forma de pago',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:'Efectivo',
            cancelButtonText:'Tarjeta'
          })
    }


}