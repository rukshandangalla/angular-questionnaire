import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrimeNgModule } from './prime-ng.module';

import { EAccordionModule } from './e-accordion/accordion.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    EAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
