import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateClient'
})
export class StateClientPipe implements PipeTransform {

  transform(value: Number, ): String {
    switch (value) {
      case 0: return "Pagado";
      case 1: return "Pendiente";
      case 2: return "Inactivo";
      default:
        "Error within pipe";
    }
  }

}
