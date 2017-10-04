import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplitPane } from '../providers/split-pane';
import { Welcome } from '../pages/welcome/welcome';
import { ModuloPage } from '../pages/modulo/modulo';
import { AdminEmpresasPage } from '../pages/admin-empresas/admin-empresas';
import { AdminApiPage } from '../pages/admin-api/admin-api';

import {Signup} from "../pages/signup/signup";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Welcome;
  pages: Array<{title: string, component: any, icon: any}>;

  constructor(  platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, public splitPane: SplitPane, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

     this.pages = [
      { title: 'Inicio (Blog)', component: Welcome, icon: "apps" },
      { title: 'Admin Empresas', component: AdminEmpresasPage, icon: "ice-cream"  }, 
      { title: 'Admin Api', component: AdminApiPage, icon: "ice-cream"  }, 
      { title: 'Modulo', component: ModuloPage, icon: "cube"  },
      //{ title: 'List', component: ListPage }
    ];
     
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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
