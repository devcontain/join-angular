import { Component, input } from '@angular/core';
import { Task } from '../../../models/task'
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  imports: [DragDropModule],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  readonly task = input.required<Task>();
}
