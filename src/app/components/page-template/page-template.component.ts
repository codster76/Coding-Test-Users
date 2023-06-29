import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})
export class PageTemplateComponent implements OnInit {

  currentDialog?: MatDialogRef<InfoComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  infoButtonPressed() {
    this.currentDialog = this.dialog.open(InfoComponent);
  }

}
