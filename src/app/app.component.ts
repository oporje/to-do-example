import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PRIORIRY } from '../model/priority.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toDolist = [];
  typesOfPriority = [];
  selectedToDoItems = [];
  uniqueSelected = [];
  @ViewChild('todoInput', {static: false}) todoInputRef: ElementRef;

  constructor() {}

  ngOnInit() {
    this.typesOfPriority = Object.values(this.filterPriorityKeys());
  }

  // return static array for priorities
  filterPriorityKeys() {
    return {
      high: PRIORIRY.HIGH,
      medium: PRIORIRY.MEDIUM,
      low: PRIORIRY.LOW
    };
  }

  // add to do to the list
  addToDoList(toDoItem): void {
    this.toDolist = [...this.toDolist, {
                        name: toDoItem.name,
                        priority: toDoItem.priority,
                        showEdit: false,
                        isSelected: false,
                        id: (this.toDolist.length + 1)
                    }];

    this.todoInputRef.nativeElement.value = null;

  }

  // remove do to from list array
  removeToDoFromList(toDoItem): void {
    this.toDolist = this.toDolist.filter(item => item.id !== toDoItem.id);
  }

  // find the edited value and replace
  editItemFromList(toDoItem) {
    this.toDolist = this.toDolist.map(item => item.id === toDoItem.id ? toDoItem : item);
  }

  // get unique selected items to delete
  getSelectedItem(selectedItem) {
    this.selectedToDoItems = [...this.selectedToDoItems, selectedItem];
    this.uniqueSelected = [...new Set(this.selectedToDoItems
                                          .filter(item => item.isSelected)
                                          .map(filteredItem => filteredItem.id))];
  }

  // delete selected items and set set to empty
  deleteSelected(event) {
    this.toDolist = this.toDolist.filter(item => !this.uniqueSelected.includes(item.id));
    this.selectedToDoItems = [];
    this.uniqueSelected = [...new Set(this.selectedToDoItems)];
  }

}
