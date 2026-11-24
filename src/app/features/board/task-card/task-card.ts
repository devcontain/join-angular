import { Component, input } from '@angular/core';
import { Task } from '../../../models/task-models'
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  imports: [DragDropModule],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  readonly task = input.required<Task>();

  getCompletedSubtasks(): number {
    return this.task().subtasks.filter(subtask => subtask.isChecked).length;
  }

  getSubtaskProgress(): number {
    const total = this.task().subtasks.length;

    if (total === 0) return 0;

    return (this.getCompletedSubtasks() / total) * 100;
  }
}
