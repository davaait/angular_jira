import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HeaderComponent} from './header/header.component';
import {ButtonComponent} from './button/button.component';
import {InfoPanelComponent} from './info-panel/info-panel.component';
import {ItemComponent} from "./item/item.component";
import {AuthComponent} from './auth/auth.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {RouterModule} from "@angular/router";
import {MatRadioModule} from "@angular/material/radio";
import {TermsofserviceComponent} from './termsofservice/termsofservice.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {MainComponent} from './main/main.component';
import {AppRoutingModule} from "./app-routing.module";
import { MysettingsComponent } from './mysettings/mysettings.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SignUpComponent } from './sign-up/sign-up.component';
import {SignIpComponent} from "./sign-in/sign-ip.component";
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    InfoPanelComponent,
    AuthComponent,
    TermsofserviceComponent,
    PrivacyComponent,
    MainComponent,
    MysettingsComponent,
    ItemComponent,
    SignUpComponent,
    SignIpComponent,
    DialogWindowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressBarModule,
    DragDropModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule,
    MatRadioModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
