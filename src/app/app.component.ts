import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

const USER_INFO = [
  {id: 1, "name": "John Smith", "occupation": "Advisor", "dateOfBirth": "1984-05-05", "age": 36},
  {id: 2, "name": "Muhi Masri", "occupation": "Developer", "dateOfBirth": "1992-02-02", "age": 28},
  {id: 3, "name": "Peter Adams", "occupation": "HR", "dateOfBirth": "2000-01-01", "age": 20},
  {id: 4, "name": "Lora Bay", "occupation": "Marketing", "dateOfBirth": "1977-03-03", "age": 43},
];

const USER_SCHEMA = {
  "name": "text",
  "occupation": "text",
  "dateOfBirth": "date",
  "age": "number",
  "edit": "edit",
  "select": "select"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['select', 'name', 'occupation', 'dateOfBirth', 'age', 'edit'];
  dataSource = USER_INFO;
  dataSchema = USER_SCHEMA;

  constructor(public dialog: MatDialog) {}

  addRow() {
    const newRow = {id: Math.floor(Math.random() * 1000), "name": "", "occupation": "", "dateOfBirth": "", "age": 0, isEdit: true, selected: false}
    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id) {
    this.dataSource = this.dataSource.filter(u => u.id !== id);
  }

  removeSelectedRows() {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.dataSource = this.dataSource.filter((u: any) => !u.selected);
      }
    });
  }
}