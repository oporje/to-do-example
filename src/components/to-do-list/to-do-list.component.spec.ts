import { TestBed, async } from '@angular/core/testing';
import { TodoListComponent } from './to-do-list.component';
import { Component } from '@angular/core';

fdescribe('To do component', () => {
  const mockToDoItem = {
    id: 1,
    priority: 1,
    name: 'test',
    showEdit: false
  };
  const fixture = TestBed.createComponent(TodoListComponent);
  const component = fixture.componentInstance;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent
      ],
    }).compileComponents();
  }));

  it('should create the To do list component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle flag on edit', () => {
    component.editToDoItem(mockToDoItem);
    expect(mockToDoItem.showEdit).toBeTruthy();
  });

  it('should call emit on remove item', () => {
    const spyonRemoveItem = spyOn(component.removeItem, 'emit');
    component.removeToDoFromList(mockToDoItem);
    expect(spyonRemoveItem).toHaveBeenCalled();
  });
});
