import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { NewContactFormComponent } from './new-contact-form/new-contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactDetailsComponent,
    NewContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
