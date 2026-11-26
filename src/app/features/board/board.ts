
import { Component, inject, signal, computed } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskCard } from './task-card/task-card';
import { Task } from '../../core/services/task-service';
import { Task as TaskModel } from '../../models/task-models';
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

  search = signal('');

  filteredtodo = computed(() => this.filterArray(this.taskservice.todo()));
  filteredinprogress = computed(() => this.filterArray(this.taskservice.tasksinprogress()));
  filteredawaitfeedback = computed(() => this.filterArray(this.taskservice.awaitingfeedback()));
  filtereddone = computed(() => this.filterArray(this.taskservice.done()));

  readonly isHorizontal = toSignal(
    this.breakpointObserver.observe('(max-width: 1500px)').pipe(
      map(state => state.matches)
    ),
    { initialValue: false }
  );

  onTaskDrop(event: CdkDragDrop<TaskModel[]>): void {
    const source = event.previousContainer.data;
    const target = event.container.data;
    const task = event.item.data;

    const previousindex = source.indexOf(task);

    if (previousindex === -1) return;

    const currentindex = this.search().trim().length > 0
      ? this.getTargetIndex(target, task, event.currentIndex)
      : event.currentIndex;

    if (source === target) {
      moveItemInArray(source, previousindex, currentindex);
    } else {
      transferArrayItem(source, target, previousindex, currentindex);
    }

    this.updateTaskSignals();
  }

  private getTargetIndex(
    target: TaskModel[],
    task: TaskModel,
    currentindex: number
  ): number {
    const remaining = target.filter(item => item !== task);
    const visible = this.filterArray(remaining);

    if (currentindex < visible.length) {
      return remaining.indexOf(visible[currentindex]);
    }

    if (visible.length > 0) {
      return remaining.indexOf(visible[visible.length - 1]) + 1;
    }

    return remaining.length;
  }

  onTaskDropAtEnd(event: CdkDragDrop<TaskModel[]>): void {
    const source = event.previousContainer.data;
    const target = event.container.data;
    const task = event.item.data;

    const previousindex = source.indexOf(task);

    if (previousindex === -1) return;

    if (source === target) {
      moveItemInArray(
        target,
        previousindex,
        target.length - 1
      );
    } else {
      transferArrayItem(
        source,
        target,
        previousindex,
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

  filterArray(tasks: TaskModel[]): TaskModel[] {
    const search = this.search().trim().toLowerCase();
    return tasks.filter(task => task.title.toLowerCase().includes(search));
  }
}
