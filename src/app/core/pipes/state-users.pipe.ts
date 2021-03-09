import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateUsers'
})
export class StateUsersPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) {
      return "Bloqueado";
    }else{return "Habilitado"}
  }

}
