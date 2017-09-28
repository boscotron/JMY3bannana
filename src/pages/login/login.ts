import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {AuthService} from "../../providers/auth-service";
import {Signup} from "../signup/signup";
import {RepassPage} from "../repass/repass";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  
  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController, public authService: AuthService, private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
    this.resposeData = result;
    console.log(this.resposeData);
    if(this.resposeData.userData){
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
    this.navCtrl.push(TabsPage);
  }
  else{
    this.presentToast("El usuario o contraseña no es valido");
  }
    


    }, (err) => {
      this.presentToast("Ocurrio un error de conexión, por favor verifica tu conexión a internet");
    });
   }
   else{
    this.presentToast("Se requiere de un usuario y contraseña");
   }
  
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000
    });
    toast.present();
  }

   repass() {
    this
      .navCtrl
      .push(RepassPage);
  }
   signup() {
    this
      .navCtrl
      .push(Signup);
  }

}
