import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public form                   : FormGroup;
  public Course : any;
  public Name         : any;
  public AppId  : any;
  public isEdited               : boolean = false;
  public hideForm               : boolean = false;
  public pageTitle              : string;
  public recordID               : any      = null;
  private baseURI               : string  = "http://192.168.43.81/myapp/";
  public items : Array<any> = [];

  constructor(public navCtrl    : NavController,
    public http       : HttpClient,
    public NP         : NavParams,
    public fb         : FormBuilder,
    public toastCtrl  : ToastController) {
      this.form = fb.group({
        "Course"           : ["", Validators.required],
        "Name"                  : ["", Validators.required],
        "AppId"           : ["", Validators.required]

     });
  }
  ionViewWillEnter() : void
   {
      this.resetFields();
      this.load();
   }

   load() : void
   {
      this.http
      .get('http://192.168.43.81/myapp/signup2.php')
      .subscribe((data : any) => 
      {
         console.dir(data);
         this.items = data;			
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   selectEntry(item : any) : void
   {
      this.Course        = item.Course;
      this.Name = item.Name;
      this.AppId = item.AppId;
      this.recordID              = item.id;
   }

   createEntry(Course : string , Name : string, AppId : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create","Course":Course , "Name" : Name, "AppId" : AppId },
          url       : any      	= this.baseURI + "signup2.php";

        console.log(this.http.post(url, JSON.stringify(options), headers));
      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations the technology: ${Name} was successfully added`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
         console.log(error);
      });
   }

   saveEntry() : void
   {
      let Course: string = this.form.controls["Course"].value,
          Name  : string = this.form.controls["Name"].value,
          AppId   : string    = this.form.controls["AppId"].value;
         this.createEntry(Course,Name, AppId);
         this.hideForm   = false;
         //this.navCtrl.push('HomePage');
      
   }



   resetFields() : void
   {
      this.Course           = "";
      this.Name    = "";
      this.AppId    = ""
   }
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

}
