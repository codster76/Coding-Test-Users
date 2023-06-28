import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
