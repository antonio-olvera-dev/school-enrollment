import { Injectable } from '@angular/core';


//Para prevenir problemas de seguridad, verifica que el email con el que se registran no contiene las palabras prohibidas “admin”, “root” y “sysadmin”. -->

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public students:Students[] = [];
  constructor() { }

  isAdmin(control) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((control.value.toLowerCase()).search('admin') > -1 || (control.value.toLowerCase()).search('root') > -1 || (control.value.toLowerCase()).search('sysadmin') > -1) {
          resolve({ isAdmin: true });
        } 
        resolve( null );
      },1000);

    });

  }


}

export interface Students{
name:string,
lastname:string,
dni:string,
phone:string,
street:string,
number:string,
city:string,
email:string,
subjects:string[]
}