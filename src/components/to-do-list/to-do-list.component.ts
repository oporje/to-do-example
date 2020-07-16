import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { KEY_CODE } from '../../model/key-code.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class TodoListComponent {

  @Input('listItem') listItem;
  @Output() removeItem = new EventEmitter();
  @Output() editedItem = new EventEmitter();
  @Output() selectedItem = new EventEmitter();
  @ViewChild('todoInput', {static: false}) todoInput: ElementRef;

  constructor() {}

  // emit removed item
  removeToDoFromList(listItem) {
    this.removeItem.emit(listItem);
  }

  editToDoItem(todoItem) {
    todoItem.showEdit = true;
    setTimeout(() => {
      this.todoInput.nativeElement.focus();
    }, 100);
  }

  // save edited value on enter to support
  onEditInputKeydown(event, toDoItem, isKeyboardEvent = false) {
    if (isKeyboardEvent) {
      if (event
          && event.keyCode === KEY_CODE.ENTER) {
        toDoItem.name = this.todoInput.nativeElement.value;
        toDoItem.showEdit = false;
        this.editedItem.emit(toDoItem);
      } else if (event && event.keyCode === KEY_CODE.ESC) {
        toDoItem.showEdit = false;
      }
    } else {
      toDoItem.name = this.todoInput.nativeElement.value;
      toDoItem.showEdit = false;
      this.editedItem.emit(toDoItem);
    }
  }

  toggleCheckbox(toggleItem) {
    toggleItem.isSelected = !toggleItem.isSelected;
    this.selectedItem.emit(toggleItem);
  }
}
