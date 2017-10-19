import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = "http://localhost/ionic/PHP-Slim-Restful/api/"; 
let apiUrl = 'https://comsis.mx/api/auth/v1/';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class jmyapis {
public hostApisList:any;
  constructor(public http: Http) {
    //console.log('Hello AuthService Provider');
    this.hostApisList = {"938a6b38e5092f1ccaede78f57665fdc":{
                             "nombre":"Modulo",
                             "version":"1.0"
                           },
                        "8936a70da4c53e42de93a427d7a82fab":{
                             "nombre":"Directorio",
                             "version":"1.0"
                           }

                         };
  }

   vermenu(idEmpresa){
     //console.log(idEmpresa);
     const data = JSON.parse(localStorage.getItem('jmyData'));
     //console.log(data.menu[idEmpresa]);
     
     return data.menu[idEmpresa];

   }
  

  verempresas(){
     var data = JSON.parse(localStorage.getItem('jmyData'));
     console.log(data);
     
     if(data!=null)
       return data.empresaDisp;
     else
       return [];
   }
  


  verempresasapis(idEmpresa){
     const data = JSON.parse(localStorage.getItem('jmyData'));
     return data.empresasApis[idEmpresa];
   }

  empresaapi(idEmpresa){
     const data = JSON.parse(localStorage.getItem('jmyData'));
     if(data.empresaApi[idEmpresa]!=undefined)
       return data.empresaApi[idEmpresa].api;
     else
       return null;
   }

  empresadefault(){
     const data = JSON.parse(localStorage.getItem('jmyData'));
     return data.primerempresa;
   }
  



}
