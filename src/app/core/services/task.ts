import { Service, signal } from '@angular/core';
import { Task as TaskModel } from '../../models/task';
import * as guest from '../../data/guest-tasks';

@Service()
export class Task {
    readonly todo = signal<TaskModel[]>(structuredClone(guest.todo));
    readonly tasksinprogress = signal<TaskModel[]>(structuredClone(guest.tasksinprogress));
    readonly awaitingfeedback = signal<TaskModel[]>(structuredClone(guest.awaitingfeedback));
    readonly done = signal<TaskModel[]>(structuredClone(guest.done));
}