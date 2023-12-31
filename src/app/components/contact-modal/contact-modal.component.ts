import { Component, OnInit, Inject } from '@angular/core';
import { Contact } from 'src/app/data-model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {contact: Contact}, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
  }

}