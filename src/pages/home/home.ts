import { Component } from '@angular/core';

import { NavController, NavParams, ToastController} from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public form                   : FormGroup;
    public Course : any;
    public Name : any;
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
        console.log('Hello RestServiceProvider Provider')
        this.form = fb.group({
          "Course"        : ["",Validators.required],
          "Name"        : ["",Validators.required],
  
       });
    }
    ionViewWillEnter() : void
    {
       
       this.resetFields();
    }
      
  
    selectEntry(item : any) : void
    {
       this.Course        = item.Course;
       this.Name        = item.Name;
       this.recordID              = item.id;
    }
  
    createEntry(Course,Name : string) : void
    {
      
       let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
           options 	: any		= { "Course" : Course,"Name" : Name },
           url       : any      	= this.baseURI + "log-data.php";
           console.log(Name);
           console.log(typeof Name);
       this.http.post(url, JSON.stringify(options), headers)
       .subscribe((data : any) =>
       {
          // If the request was successful notify the user
          
          console.log(data);
          this.items = data;
          
          this.sendNotification(` ${Name} success`);
          return data;
       },
       (error : any) =>
       {
          console.log(error);
          this.sendNotification('wrong!');
       });
       
    }
  
    addEntry() : void
    {
       let 
           Course: string = this.form.controls["Course"].value,
           Name   : string    = this.form.controls["Name"].value;
          this.resetFields();
          this.createEntry(Course,Name);
          this.hideForm   = false;
          
          this.navCtrl.push('DetailsPage');
  
       
    }
  
  
  
  
    /**
     * Clear values in the page's HTML form fields
     *
     * @public
     * @method resetFields
     * @return {None}
     */
    resetFields() : void
    {
       this.AppId    = "";
    }
  
  
  
  
    /**
     * Manage notifying the user of the outcome of remote operations
     *
     * @public
     * @method sendNotification
     * @param message 	{String} 			Message to be displayed in the notification
     * @return {None}
     */
    sendNotification(message : string)  : void
    {
       let notification = this.toastCtrl.create({
           message       : message,
           duration      : 3000
       });
       notification.present();
    }
  
  
  

  
}
