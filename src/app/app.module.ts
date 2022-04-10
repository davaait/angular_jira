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
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import {ItemComponent} from "./item/item.component";
import { AuthComponent } from './auth/auth.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    InfoPanelComponent,
    ItemComponent,
    AuthComponent
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
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
