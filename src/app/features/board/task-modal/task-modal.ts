import { Component, input, output } from '@angular/core';
import { Task as TaskModel } from '../../../models/task-models';

@Component({
  selector: 'app-task-modal',
  imports: [],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.scss',
})
export class TaskModal {
  readonly task = input.required<TaskModel>();
  readonly subtaskChanged = output<{ taskId: number; subtaskId: number }>();

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

  toggleSubtask(subtaskId: number): void {
    this.subtaskChanged.emit({
      taskId: this.task().id,
      subtaskId
    });
  }
}
