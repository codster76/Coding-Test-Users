import { Injectable } from '@angular/core';
import { Contact } from '../data-model';

@Injectable({
  providedIn: 'root'
})
export class BackendCallsService {

  APIUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor() { }

  async getContacts() {
    const response = await fetch(this.APIUrl);
    const data = await response.json();
    const contacts: Contact[] = [];
    for(let contact of data) {
      contacts.push(contact);
    }
    return contacts as Contact[];
  }
}