
import { Component, inject, signal } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskCard } from './task-card/task-card';
import { Task } from '../../core/services/task';
import { Task as TaskModel } from '../../models/task';
import { TaskModal, } from './task-modal/task-modal';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  imports: [CdkDropList, TaskCard, CdkDropListGroup, TaskModal, CdkScrollable, CdkDrag],
  selector: 'app-board',
  styleUrl: './board.scss',
  templateUrl: './board.html',
})
export class Board {
  readonly taskservice = inject(Task);
  readonly selectedTask = signal<TaskModel | null>(null);
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHorizontal = toSignal(
    this.breakpointObserver.observe('(max-width: 1500px)').pipe(
      map(state => state.matches)
    ),
    { initialValue: false }
  );

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

    this.updateTaskSignals();
  }

  onTaskDropAtEnd(event: CdkDragDrop<TaskModel[]>): void {
    const source = event.previousContainer.data;
    const target = event.container.data;

    if (source === target) {
      moveItemInArray(
        target,
        event.previousIndex,
        target.length - 1
      );
    } else {
      transferArrayItem(
        source,
        target,
        event.previousIndex,
        target.length
      );
    }

    this.updateTaskSignals();
  }

  private updateTaskSignals(): void {
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
