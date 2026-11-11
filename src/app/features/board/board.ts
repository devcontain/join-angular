import { Component, inject } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskCard } from './task-card/task-card';
import { Task } from '../../core/services/task';
import { Task as TaskModel } from '../../models/task';

@Component({
  imports: [CdkDropList, TaskCard, CdkDropListGroup],
  selector: 'app-board',
  styleUrl: './board.scss',
  templateUrl: './board.html',
})
export class Board {
  readonly taskservice = inject(Task);

  onTaskDrop(event: CdkDragDrop<TaskModel[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.taskservice.todo.set([...this.taskservice.todo()]);
    this.taskservice.tasksinprogress.set([...this.taskservice.tasksinprogress()]);
    this.taskservice.awaitingfeedback.set([...this.taskservice.awaitingfeedback()]);
    this.taskservice.done.set([...this.taskservice.done()]);
  }
}