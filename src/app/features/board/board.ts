import { Component, inject, signal } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskCard } from './task-card/task-card';
import { Task } from '../../core/services/task';
import { Task as TaskModel } from '../../models/task';
import { TaskModal } from './task-modal/task-modal';

@Component({
  imports: [CdkDropList, TaskCard, CdkDropListGroup, TaskModal],
  selector: 'app-board',
  styleUrl: './board.scss',
  templateUrl: './board.html',
})
export class Board {
  readonly taskservice = inject(Task);
  readonly selectedTask = signal<TaskModel | null>(null);

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

  openTask(task: TaskModel): void {
    this.selectedTask.set(task);
  }

  closeTask(): void {
    this.selectedTask.set(null);
  }

  deleteTask(task: TaskModel): void {
    this.taskservice.todo.update(tasks =>
      tasks.filter(item => item.id !== task.id)
    );

    this.taskservice.tasksinprogress.update(tasks =>
      tasks.filter(item => item.id !== task.id)
    );

    this.taskservice.awaitingfeedback.update(tasks =>
      tasks.filter(item => item.id !== task.id)
    );

    this.taskservice.done.update(tasks =>
      tasks.filter(item => item.id !== task.id)
    );

    this.closeTask();
  }
}