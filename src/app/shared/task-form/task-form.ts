import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject, signal } from '@angular/core';
import { HostListener } from '@angular/core';
import { Contact } from '../../core/services/contact-service';
import { Subtask } from '../../models/task-models';
import { Contact as ContactModel } from '../../models/task-models';
import { Task as TaskModel } from '../../models/task-models';
import { Task as TaskService } from '../../core/services/task-service';

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
  readonly taskService = inject(TaskService);

  readonly title = signal('');
  readonly description = signal('');
  readonly dueDate = signal('');
  readonly priority = signal('medium');
  readonly category = signal('');

  readonly categories = ['Technical Task', 'User Story'];
  readonly categoryDropdownOpen = signal(false);

  readonly contactService = inject(Contact);
  readonly assignedToDropdownOpen = signal(false);
  readonly selectedContacts = signal<number[]>([]);

  readonly subtasks = signal<string[]>([]);
  readonly subtaskInput = signal('');
  readonly subtaskInputActive = signal(false);
  readonly editingSubtaskIndex = signal<number | null>(null);
  readonly editingSubtaskTitle = signal('');

  readonly formSubmitted = signal(false);

  onDateChange(date: string): void {
    if (!date) return;

    const [year, month, day] = date.split('-');
    this.dueDate.set(`${day}/${month}/${year}`);
  }

  selectCategory(category: string): void {
    this.category.set(category);
    this.categoryDropdownOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.add-task-category')) {
      this.categoryDropdownOpen.set(false);
    }

    if (!target.closest('.add-task-assigned-to')) {
      this.assignedToDropdownOpen.set(false);
    }
  }

  toggleContact(id: number): void {
    this.selectedContacts.update(contacts => {
      if (contacts.includes(id)) {
        return contacts.filter(contact => contact !== id);
      } else {
        return [...contacts, id];
      }
    });
  }

  isContactSelected(id: number): boolean {
    return this.selectedContacts().includes(id);
  }

  confirmSubtask(): void {
    const title = this.subtaskInput().trim();
    if (!title) return;

    this.subtasks.update(tasks => [...tasks, title]);
    this.clearSubtaskInput();
  }

  editSubtask(index: number): void {
    this.editingSubtaskIndex.set(index);
    this.editingSubtaskTitle.set(this.subtasks()[index]);
  }

  saveEditedSubtask(): void {
    const title = this.editingSubtaskTitle().trim();
    const index = this.editingSubtaskIndex();

    if (!title || index === null) return;

    this.subtasks.update(tasks =>
      tasks.map((task, i) => i === index ? title : task)
    );

    this.cancelEditSubtask();
  }

  cancelEditSubtask(): void {
    this.editingSubtaskIndex.set(null);
    this.editingSubtaskTitle.set('');
  }

  clearSubtaskInput(): void {
    this.subtaskInput.set('');
    this.subtaskInputActive.set(false);
  }

  deleteSubtask(index: number): void {
    this.subtasks.update(tasks =>
      tasks.filter((_, i) => i !== index)
    );

    this.cancelEditSubtask();
  }

  clearForm(): void {
    this.title.set('');
    this.description.set('');
    this.dueDate.set('');
    this.priority.set('medium');
    this.category.set('');

    this.selectedContacts.set([]);
    this.subtasks.set([]);

    this.clearSubtaskInput();
    this.cancelEditSubtask();

    this.categoryDropdownOpen.set(false);
    this.assignedToDropdownOpen.set(false);
    this.formSubmitted.set(false);
  }

  createTask(): void {
    this.formSubmitted.set(true);

    const isValid =
      this.isTitleValid() &&
      this.isDueDateValid(this.dueDate()) &&
      this.isCategoryValid();

    if (!isValid) return;

    if (this.subtaskInput().trim()) {
      this.confirmSubtask();
    }

    const task = this.getTaskData();

    this.taskService.addTask(task);
    this.clearForm();
  }

  isDueDateValid(date: string): boolean {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date.trim())) return false;

    const [day, month, year] = date.trim().split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parsedDate < today) return false;

    return (
      parsedDate.getFullYear() === year &&
      parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day
    );
  }

  isCategoryValid(): boolean {
    return this.categories.includes(this.category().trim());
  }

  isTitleValid(): boolean {
    const title = this.title().trim();

    return title.length > 0 && title.length <= 35;
  }

  getTaskSubtasks(): Subtask[] {
    return this.subtasks().map((name, index) => ({
      id: index,
      name: name,
      isChecked: false
    }));
  }

  getTaskContacts(): ContactModel[] {
    return this.contactService.sortedContacts().filter(contact =>
      this.selectedContacts().includes(contact.id)
    );
  }

  getTaskData(): TaskModel {
    return {
      id: Date.now(),
      title: this.title().trim(),
      description: this.description().trim(),
      date: this.dueDate(),
      category: this.category(),
      prio: this.priority() as TaskModel['prio'],
      subtasks: this.getTaskSubtasks(),
      contacts: this.getTaskContacts()
    };
  }
}
