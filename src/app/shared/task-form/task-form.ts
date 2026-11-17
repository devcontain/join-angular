import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject, signal } from '@angular/core';
import { HostListener } from '@angular/core';
import { Contact } from '../../core/services/contact';

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
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

    if (this.editingSubtaskIndex() === index) {
      this.clearSubtaskInput();
    }
  }
}
