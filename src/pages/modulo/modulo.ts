import {Component} from '@angular/core';
import {NavController, App, AlertController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";

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
    "json_head": {},
    "json_body": {},
    "fn":""
  };
  json_head = {
  	"nombre":""
  };
  constructor(public common: Common, private alertCtrl: AlertController,public navCtrl : NavController, public app : App, public authService : AuthService) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.empresas_lista();

  }

  empresas_lista() {
    console.log("empresas FN");
    console.log(this.userPostData);
   // this.common.presentLoading();
    this
      .authService
      .postData(this.userPostData, "empresas")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
        //  this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);

          console.log(this.resposeData);
        } else {
          console.log("No access");
        }

      }, (err) => {
        //Connection failed message
      });
  }



  empresas_guardar() {
    

    this.userPostData.json_head = this.json_head;
    this.userPostData.fn = 'guardar';
    console.log(this.userPostData);
    //this.common.presentLoading();
    this
      .authService
      .postData(this.userPostData, "empresas")
      .then((result) => {
      	console.log(result);
        this.resposeData = result;
        if (this.resposeData.feedData) {
              //this.common.closeLoading();
          console.log(this.resposeData);
        } else {
          console.log("No access");
        }

      }, (err) => {
        //Connection failed message
      });
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
