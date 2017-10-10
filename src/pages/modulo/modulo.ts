import {Component} from '@angular/core';
import {NavController, App, AlertController,ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";
import {JMYDB} from "../../providers/jmydb";

@Component({
  selector: 'page-modulo',
  templateUrl: 'modulo.html',
})
export class ModuloPage {
  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  userPostData = {
    "user_id": "",
    "token": "",
    "nombre": "",
    "json_body": {},
    "fn":""
  };
  json_head = {
    "nombre":""
  };
  constructor(public common: Common, private alertCtrl: AlertController,public navCtrl : NavController, public app : App, public authService : AuthService,public toastCtrl: ToastController,public jmyDB: JMYDB) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    
  }
  usuarios(){
    this.jmyDB.jmyUsuarios({"fn":"lista"});
  }
  pruebaVer(){
    var varextra:{"guardar uno","guardar dos"};
    
    this.jmyDB.jmy({
          "fn":"guardar", // ver, guardar
          "head":{
            "tabla":"DBINDEX", 
            "ID_F":"TEST", 
          }, 
           "body":{
            "varialbe1":"guardar uno",
            "varialbe2": varextra,
          },
    });
    console.log(this.jmyDB.resultado);
    
    this.jmyDB.jmy({
          "fn":"ver", // ver, guardar
          "head":{
            "tabla":"DBINDEX", // *obligatorio ver, guardar
            "ID_F":"TEST", 
          }, 
    });
    console.log(this.jmyDB.resultado);
    
  }

  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }
  converTime(time) {
    let a = new Date(time * 1000);
    return a;
  }

  backToWelcome() {
    const root = this
      .app
      .getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout

    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);

  }
}
