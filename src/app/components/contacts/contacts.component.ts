import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/data-model';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactList: Contact[] = [];
  contactBehaviourSubject: BehaviorSubject<Contact[]> = new BehaviorSubject([new Contact()]);

  currentDialog?: MatDialogRef<ContactModalComponent>;

  failed = false;

  constructor(private backendCalls: BackendCallsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    try {
      this.getContacts();
    } catch {
      this.failed = true;
    }
  }

  async getContacts() {
    this.contactList = await this.backendCalls.getContacts();

    this.contactBehaviourSubject.next(this.contactList);
  }

  openModal(contact: Contact) {
    this.currentDialog = this.dialog.open(ContactModalComponent, { data: { contact: contact } });
  }

  printContacts() {
    console.log(this.contactList);
  }

}
