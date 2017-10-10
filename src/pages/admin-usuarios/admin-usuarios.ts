import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {Common} from "../../providers/common";


/**
 * Generated class for the AdminUsuariosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-usuarios',
  templateUrl: 'admin-usuarios.html',
})
export class AdminUsuariosPage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;
  public empresas : any;

  public divs : any;
  public divApis : boolean;
  public divUsuarios : boolean;

  public usuario : any;    
  public apisSelect : any;    
  public permisoSelect	 : any;    
  public listaApis	 : any;   
  usrdisp = {} ;
  print = {"empresaApi":""
			};
  permisos = {	"ID_APK":"",
				"P":""
			};
  formulario = {"id_empresa":"",
  				"nombre":"",
  				"permisos":{},
  			};
  mensajes = {
  		"perm_0":"Oculto al usuario",
  		"perm_1":"Oculto al usuario",
  		"perm_2":"Oculto al usuario",
  		"perm_3":"Oculto al usuario",
  		"perm_4":"Oculto al usuario",
  };
  nivelPermisos = [	{"nombre":"Oculto",
  					 "nivel":"0"
					},
					{"nombre":"Consulta",
  					 "nivel":"1"
					},
					{"nombre":"Autor",
  					 "nivel":"2"
					},
					{"nombre":"Editor",
  					 "nivel":"3"
					},
					{"nombre":"Administrador",
  					 "nivel":"4"
					},
  ];
  guardar : {
  		"usuarios":{},
  		"apis":{},
  		"permisos":{},
  };
  userPostData = {
    "user_id": "",
    "token": "",
    "body": {"usuario":""},
    "fn":""
  };
 
  constructor(public common: Common, public navCtrl: NavController, public authService : AuthService, public navParams: NavParams, public toastCtrl: ToastController) {
  	 const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;
    this.empresas_lista();
    this.api_lista();

    this.divs = {	"usuario":true,
    				"empresas":false,
					"apis":false,


  	};

    this.print.empresaApi = '';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsuariosPage');
  }

  verificarUsuario(){
  	if(this.usuario!=undefined){	
    	this.divs.empresas = true;
    	this.userPostData.fn = "verUsr" ;
    	this.userPostData.body.usuario = this.usuario;
    	console.log("verificarUsuario FN");
	     console.log(this.userPostData);
	    this.common.presentLoading();
	    this.authService
	      .postData(this.userPostData, "usuarios")
	      .then((result) => {
	        this.resposeData = result;

	        console.log(this.resposeData);

	        if (this.resposeData.feedData) {
	        	this.usrdisp =Array.of( this.resposeData.feedData);
	          	console.log(this.usrdisp);
	        } else {
	          console.log("No access");
	        }

	      }, (err) => {
	        //Connection failed message
	      });

	      this.common.closeLoading();
    }else{
    	this.alerta("Define un usuario válido");
    }

  }

  asignarEmpresa(){
    this.divs.empresas = false;
    this.divs.usuario = false;
    this.divs.apis = true;
  }
  asignacion(id,permiso){
  	console.log("id:"+id);
  	console.log("permiso:"+permiso);
  	
  }
  asignarApi(id,permiso){
  	this.divs.empresas = false;
    this.divs.usuario = false;
    this.divs.apis = false;
  	
  }

  verAPIS(){
    this.divApis = true;
    this.print.empresaApi = 'Nombre de la empresa';
  }
  guardarPermisos(){
	  	this.guardar = {
	  		"usuarios":this.usuario,
	  		"apis":this.apisSelect,
	  		"permisos":this.permisoSelect,
	  };
	  console.log(this.guardar);
	  this.alerta("Permisos de usuario guardado correctamente");
	  
  }




  api_lista() {
    console.log("api FN");
    console.log(this.userPostData);
    this.common.presentLoading();
    this
      .authService
      .postData(this.userPostData, "api")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.listaApis = this.resposeData.feedData;
          console.log(this.dataSet);

          console.log(this.resposeData);
        } else {
          console.log("No access");
        }

      }, (err) => {
        //Connection failed message
      });

      this.common.closeLoading();
  }

  empresas_lista() {

    console.log("empresas FN");
    this
      .authService
      .postData(this.userPostData, "empresas")
      .then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
        	this.empresas = this.resposeData.feedData;
         //this.dataSet = 
          console.log(this.dataSet);
          console.log(this.resposeData);
          this.empresas=this.resposeData.feedData;
        } else {
          console.log("No access");
           this.empresas=false;
        }
      }, (err) => {
        //Connection failed message
      });
	}



  alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      showCloseButton: true,
      closeButtonText: 'X',
      position: 'top'
    });
    toast.present();
   }

}
