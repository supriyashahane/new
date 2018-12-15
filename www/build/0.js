webpackJsonp([0],{

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup__ = __webpack_require__(277);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = /** @class */ (function () {
    function SignupPageModule() {
    }
    SignupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__signup__["a" /* SignupPage */]),
            ],
        })
    ], SignupPageModule);
    return SignupPageModule;
}());

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, http, NP, fb, toastCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.NP = NP;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        this.isEdited = false;
        this.hideForm = false;
        this.recordID = null;
        this.baseURI = "http://192.168.43.81/myapp/";
        this.items = [];
        this.form = fb.group({
            "Course": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            "Name": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            "AppId": ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    SignupPage.prototype.ionViewWillEnter = function () {
        this.resetFields();
        this.load();
    };
    SignupPage.prototype.load = function () {
        var _this = this;
        this.http
            .get('http://192.168.43.81/myapp/signup2.php')
            .subscribe(function (data) {
            console.dir(data);
            _this.items = data;
        }, function (error) {
            console.dir(error);
        });
    };
    SignupPage.prototype.selectEntry = function (item) {
        this.Course = item.Course;
        this.Name = item.Name;
        this.AppId = item.AppId;
        this.recordID = item.id;
    };
    SignupPage.prototype.createEntry = function (Course, Name, AppId) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json' }), options = { "key": "create", "Course": Course, "Name": Name, "AppId": AppId }, url = this.baseURI + "signup2.php";
        console.log(this.http.post(url, JSON.stringify(options), headers));
        this.http.post(url, JSON.stringify(options), headers)
            .subscribe(function (data) {
            // If the request was successful notify the user
            _this.hideForm = true;
            _this.sendNotification("Congratulations the technology: " + Name + " was successfully added");
        }, function (error) {
            _this.sendNotification('Something went wrong!');
            console.log(error);
        });
    };
    SignupPage.prototype.saveEntry = function () {
        var Course = this.form.controls["Course"].value, Name = this.form.controls["Name"].value, AppId = this.form.controls["AppId"].value;
        this.createEntry(Course, Name, AppId);
        this.hideForm = false;
        //this.navCtrl.push('HomePage');
    };
    SignupPage.prototype.resetFields = function () {
        this.Course = "";
        this.Name = "";
        this.AppId = "";
    };
    SignupPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/supriya/APP/Hello/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Student Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div>\n\n      <div *ngIf="!hideForm">\n          <form [formGroup]="form" (ngSubmit)="saveEntry()">\n \n             <ion-list>\n              <ion-item-group>\n                <ion-item-divider color="light" stacked>Course Name *</ion-item-divider>\n                <ion-item>\n                       \n                 <ion-input\n                 type="text"\n                 placeholder="Enter a Course..."\n                 formControlName="Course"\n                 [(ngModel)]="Course"></ion-input>\n                </ion-item>\n             </ion-item-group>\n \n                <ion-item-group>\n                   <ion-item-divider color="light" stacked>Students Name *</ion-item-divider>\n                   <ion-item>\n                          \n                    <ion-input\n                    type="text"\n                    placeholder="Enter a name..."\n                    formControlName="Name"\n                    [(ngModel)]="Name"></ion-input>\n                   </ion-item>\n                </ion-item-group>\n\n                <ion-item-group>\n                  <ion-item-divider color="light" stacked>Application Id *</ion-item-divider>\n                  <ion-item>\n                         \n                   <ion-input\n                   type="text"\n                   placeholder="Enter Application Id..."\n                   formControlName="AppId"\n                   [(ngModel)]="AppId"></ion-input>\n                  </ion-item>\n               </ion-item-group>\n \n \n                <ion-item>\n                   <button\n                      ion-button\n                      color="primary"\n                      text-center\n                      block\n                      [disabled]="!form.valid">Save Entry</button>\n                </ion-item>\n \n             </ion-list>\n \n          </form>\n       </div>\n  </div>\n</ion-content>\n  \n\n'/*ion-inline-end:"/home/supriya/APP/Hello/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=0.js.map