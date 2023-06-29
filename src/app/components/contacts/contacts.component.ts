import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/data-model';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  // Used to display 
  contactBehaviourSubject: BehaviorSubject<Contact[]> = new BehaviorSubject([new Contact()]);
  detailsBehaviourSubject: BehaviorSubject<Contact> = new BehaviorSubject(new Contact());

  originalContactList: Contact[] = [];
  contactList: Contact[] = []; // This is necessary so that the list can be modified while sorted/filtered
  
  ascending = true;
  currentFilterValue: string = '';

  filterFormGroup: FormGroup = new FormGroup({
    filterValue: new FormControl()
  });

  selectedID: number = 0;

  currentDialog?: MatDialogRef<ContactModalComponent>;

  constructor(private backendCalls: BackendCallsService, public dialog: MatDialog, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  // After fetching, immediately sort and select the first contact to display
  async getContacts() {
    this.originalContactList = await this.backendCalls.getContacts();
    this.contactList = this.sortAndFilterList(this.originalContactList, '');

    this.contactList[0].selected = true;
    this.selectedID = this.contactList[0].id;
    this.detailsBehaviourSubject.next(this.contactList[0]);

    this.contactBehaviourSubject.next(this.contactList);
  }

  displayDetails(contact: Contact) {
    this.selectedID = contact.id;

    this.contactList.map((searchedContact) => {
      if(searchedContact.id === contact.id) {
        searchedContact.selected = true;
      } else {
        searchedContact.selected = false;
      }
    });

    this.contactBehaviourSubject.next(this.contactList);

    // Only open modals when the page is small enough
    if(window.innerWidth < 1000) {
      this.currentDialog = this.dialog.open(ContactModalComponent, { data: { contact: contact } });
    }

    this.detailsBehaviourSubject.next(contact);
  }

  applySortAndFilter() {
    this.currentFilterValue = this.filterFormGroup.value.filterValue;
    this.contactList = this.sortAndFilterList(this.originalContactList, this.currentFilterValue);
    this.contactBehaviourSubject.next(this.contactList);
  }

  sortAndFilterList(contactsToSortAndFilter: Contact[], filterBy: string) {
    let deepCopyToModify: Contact[] = JSON.parse(JSON.stringify(contactsToSortAndFilter));

    // Filter
    deepCopyToModify = deepCopyToModify.filter((contact: Contact) => {
      return contact.name.toLowerCase().includes(filterBy.toLowerCase());
    });

    // Sort based on the ascending variable
    deepCopyToModify.sort((a: Contact, b: Contact) => {
      let first;
      let second;
      if(this.ascending) {
        first = a.name;
        second = b.name;
      } else {
        first = b.name;
        second = a.name;
      }

      return first.localeCompare(second);
    });

    // Reselect the current selected contact if it's in the sorted list
    deepCopyToModify.map((contact: Contact) => {
      if(contact.id === this.selectedID) {
        contact.selected = true;
      }
    })

    return deepCopyToModify;
  }

  toggleSort() {
    this.ascending = !this.ascending;
    this.contactList = this.sortAndFilterList(this.originalContactList, this.currentFilterValue);
    this.contactBehaviourSubject.next(this.contactList);
  }
}
