import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, NavController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplitPane } from '../providers/split-pane';
import { jmyapis } from '../providers/jmyapis';
import { Welcome } from '../pages/welcome/welcome';
import { ModuloPage } from '../pages/modulo/modulo';
import { AdminEmpresasPage } from '../pages/admin-empresas/admin-empresas';
import { AdminApiPage } from '../pages/admin-api/admin-api';
import { AdminUsuariosPage } from '../pages/admin-usuarios/admin-usuarios';

import {Signup} from "../pages/signup/signup";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) nav: Nav;

  public empresas : any;
  public empresasApis : any;
  public nomUsuario : any;
  rootPage:any = Welcome;
  pages: Array<{title: string, component: any, icon: any, api: any}>;
  pagesView: Array<{title: string, component: any, icon: any}>;
  nuevoMenu:  any[] = [];
  formulario={
          "idEmpresa":""
  };

  constructor(  platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, public splitPane: SplitPane, public menu: MenuController,public toastCtrl: ToastController, public jmyApis: jmyapis) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
     var data = JSON.parse(localStorage.getItem('userData'));

     /* enlistarr los modulos disponibles den esta app */
     this.pages = [{ 
        title: 'Inicio (Blog)', 
        component: Welcome, 
        icon: "apps",
        api: null
      },{ 
        title: 'Admin Empresas', 
        component: AdminEmpresasPage, 
        icon: "ice-cream",
        api: null
      }, { 
        title: 'Admin Api', 
        component: AdminApiPage, 
        icon: "ice-cream",
        api: null  
      }, { 
        title: 'Admin Usuarios', 
        component: AdminUsuariosPage, 
        icon: "ice-cream",
        api: null
      },{ 
        title: 'Modulo', 
        component: ModuloPage, 
        icon: "cube",
        api: "938a6b38e5092f1ccaede78f57665fdc"  
      },{ 
        title: 'Test', 
        component: ModuloPage, 
        icon: "cube",
        api: "c7f8d7eb668bf5c72f773f581c284978"  
      },{ 
        title: 'Directorio', 
        component: ModuloPage, 
        icon: "cube",
        api: "8936a70da4c53e42de93a427d7a82fab"  
      },
    ];
    this.pagesView=[];

     if(data!=null){
        console.log(this.pages);
        //this.pagesView=this.pages;
        this.empresas = this.jmyApis.verempresas();
        this.formulario.idEmpresa=this.jmyApis.empresadefault();
        this.empresasApis = this.jmyApis.verempresasapis(this.formulario.idEmpresa);
        this.vermenu(this.formulario.idEmpresa);
        this.nombreUsuario();
      }else{
      
     }
  }
nombreUsuario(){
    const data = JSON.parse(localStorage.getItem('userData'));
    return data.userData.name;
}
cambiarEmpresa(){
  const idEmpresa = this.formulario.idEmpresa;
  this.vermenu(idEmpresa);
}

vermenu(idEmpresa){
  var acMenu = this.jmyApis.vermenu(idEmpresa);
  var host = this.pages;
  //console.log(acMenu);
  this.nuevoMenu = [];
  var historial = []; 
  var accApi = this.jmyApis.empresaapi(idEmpresa);
  //console.log(accApi);
  for(var i = 0; i < host.length; ++i){
   var mostrar = (host[i].api==null)? true: false;
   if(accApi!=undefined && host[i].api!=null){
     let newList = accApi.filter((t) => t == host[i].api);
     if(newList.length > 0){
       mostrar = true;
     }
     historial.push({host:host[i],accApi:accApi,mostrar:mostrar,newList:newList});
   }
    if(mostrar){
      this.nuevoMenu.push({ 
              title: host[i].title, 
               component: host[i].component, 
               icon: host[i].icon  
             }); 
     }
  }
  //console.log(historial);
  //console.log(this.nuevoMenu);
  this.pagesView=this.pages;
  this.pagesView=this.nuevoMenu;
}

alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }

  openPage(page) {
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
    localStorage.clear();
    this.menu.enable(false);
    this.navCtrl.push(Welcome);
    location.reload();
  }
  session(){
    return true;
  }


}
