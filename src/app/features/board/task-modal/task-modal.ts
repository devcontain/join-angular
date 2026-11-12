import { Component, input, output } from '@angular/core';
import { Task as TaskModel } from '../../../models/task';

@Component({
  selector: 'app-task-modal',
  imports: [],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModal {
  readonly task = input.required<TaskModel>();

  readonly closed = output<void>();
  readonly edit = output<TaskModel>();
  readonly delete = output<TaskModel>();

  closeModal(): void {
    this.closed.emit();
  }

  editTask(): void {
    this.edit.emit(this.task());
  }

  deleteTask(): void {
    this.delete.emit(this.task());
  }
}
