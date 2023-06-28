import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/data-model';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactList: Contact[] = [];
  contactBehaviourSubject: BehaviorSubject<Contact[]> = new BehaviorSubject([new Contact()]);
  detailsBehaviourSubject: BehaviorSubject<Contact> = new BehaviorSubject(new Contact());

  currentDialog?: MatDialogRef<ContactModalComponent>;

  failed = false;

  filterFormGroup: FormGroup = new FormGroup({
    filterValue: new FormControl()
  });

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
    if(window.innerWidth < 1000) {
      this.currentDialog = this.dialog.open(ContactModalComponent, { data: { contact: contact } });
    }
  }

  displayDetails(contact: Contact) {
    if(window.innerWidth < 1000) {
      this.currentDialog = this.dialog.open(ContactModalComponent, { data: { contact: contact } });
    }
    
    this.detailsBehaviourSubject.next(contact);
  }

  submit() {
    this.filterList(this.filterFormGroup.value.filterValue);
  }

  filterList(filterBy: string) {
    let deepCopyToModify: Contact[] = JSON.parse(JSON.stringify(this.contactList));
    deepCopyToModify = deepCopyToModify.filter((contact: Contact) => {
      return  contact.name.toLowerCase().includes(filterBy.toLowerCase()) ||
              contact.username.toLowerCase().includes(filterBy.toLowerCase()) ||
              contact.email.toLowerCase().includes(filterBy.toLowerCase());
    });
    this.contactBehaviourSubject.next(deepCopyToModify);
  }

  getInitials(name: string) {
    let splitName;
    try {
      splitName = name.split(' ');
    } catch {
      throw "Invalid input";
    }

    if(splitName.length < 2) {
      return name.charAt(0).toUpperCase();
    } else {
      return splitName[0].charAt(0).toUpperCase() + splitName[1].charAt(0).toUpperCase();
    }
  }

  printContacts() {
    console.log(this.contactList);
  }
}
