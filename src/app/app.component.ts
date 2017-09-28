import { Component } from '@angular/core';
import { Platform, App, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplitPane } from '../providers/split-pane';
import { Welcome } from '../pages/welcome/welcome';

import {Signup} from "../pages/signup/signup";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Welcome;
  pages: Array<{title: string, component: any}>;
  invitedPages: Array<{title: string, component: any}>;
  usuariosPages: Array<{title: string, component: any}>;
  doctoresPages: Array<{title: string, component: any}>;

  constructor(  platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, public splitPane: SplitPane, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

     this.pages = [
      { title: 'Inicio (Blog)', component: Signup },
      { title: 'Dieta de la semana', component: Welcome },
      { title: 'Tu dieta', component: Welcome },
      //{ title: 'List', component: ListPage }
    ];
    this.invitedPages = [    
      { title: 'Ingresa', component: Signup }
     ];
  }
get navCtrl(): NavController {
    return this.app.getRootNav();
  }
   backToWelcome(){
   const root = this.app.getRootNav();
    root.popToRoot();
  }
  logout(){
    //Api Token Logout 
    
    localStorage.clear();
    this.menu.enable(false);
     setTimeout(()=> this.backToWelcome(), 1000);
    this.navCtrl.push(Welcome);
  }
  session(){

    return true;
  }


}
