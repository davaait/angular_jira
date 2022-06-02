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
import {ItemComponent} from "./item/item.component";
import {AuthComponent} from './auth/auth.component';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {RouterModule} from "@angular/router";
import {MatRadioModule} from "@angular/material/radio";
import {MainComponent} from './main/main.component';
import {AppRoutingModule} from "./app-routing.module";
import {MysettingsComponent} from './mysettings/mysettings.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SignUpComponent} from './sign-up/sign-up.component';
import {SignIpComponent} from "./sign-in/sign-ip.component";
import {DialogWindowComponent} from './dialog-window/dialog-window.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ListWindowComponent} from "./list-window/list-window.component";
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS
} from '@angular-material-components/color-picker';
import {InfoPanelComponent} from "./info-panel/info-panel.component";
import {EditTaskWindowComponent} from "./edit-task-window/edit-task-window.component";
import {EditListWindowComponent} from "./edit-list-window/edit-list-window.component";
import {TaskDetailsComponent} from './task-details/task-details.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ChartComponent} from './chart/chart.component';
import {NgChartsModule} from "ng2-charts";
import {BoardWindowComponent} from "./board-window/board-window.component";
import { BoardComponent } from './board/board.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    InfoPanelComponent,
    AuthComponent,
    MainComponent,
    MysettingsComponent,
    ItemComponent,
    SignUpComponent,
    SignIpComponent,
    DialogWindowComponent,
    ListWindowComponent,
    EditTaskWindowComponent,
    EditListWindowComponent,
    TaskDetailsComponent,
    ChartComponent,
    BoardWindowComponent,
    BoardComponent,
    WelcomeComponent
  ],
  imports: [
    NgxMatColorPickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
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
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatAutocompleteModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [MatDatepickerModule,
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
