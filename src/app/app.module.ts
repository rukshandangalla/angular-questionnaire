import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimeNgModule } from './prime-ng.module';

import { EAccordionComponent } from './e-accordion/accordion.component';
import { EAccordionTabComponent } from './e-accordion/accordion.tab.component';
import { EHeaderComponent } from './e-accordion/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EAccordionTabComponent,
    EAccordionComponent,
    EHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
