import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/data-model';
import { BackendCallsService } from 'src/app/services/backend-calls.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactList: Contact[] = [];
  contactBehaviourSubject: BehaviorSubject<Contact[]> = new BehaviorSubject([new Contact()]);

  failed = false;

  constructor(private backendCalls: BackendCallsService) { }

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

  printContacts() {
    console.log(this.contactList);
  }

}
