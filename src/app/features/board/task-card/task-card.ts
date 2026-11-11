import { Component, input } from '@angular/core';
import { Task } from '../../../models/task'
import {
  DragDropModule,
  type DragConstrainPosition
} from '@angular/cdk/drag-drop';


@Component({
  imports: [DragDropModule],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  readonly task = input.required<Task>();

/*   readonly centerDrag: DragConstrainPosition = (
    pointer,
    _drag,
    dimensions,
    pickup
  ) => ({
    x: pointer.x - pickup.x - dimensions.width / 2,
    y: pointer.y - pickup.y - dimensions.height / 2
  }); */
}
