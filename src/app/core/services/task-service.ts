import { Service, signal } from '@angular/core';
import { Task as TaskModel } from '../../models/task-models';
import * as guest from '../../data/guest-tasks';

@Service()
export class Task {
    readonly todo = signal<TaskModel[]>(structuredClone(guest.todo));
    readonly tasksinprogress = signal<TaskModel[]>(structuredClone(guest.tasksinprogress));
    readonly awaitingfeedback = signal<TaskModel[]>(structuredClone(guest.awaitingfeedback));
    readonly done = signal<TaskModel[]>(structuredClone(guest.done));

    addTask(task: TaskModel): void {
        this.todo.update(tasks => [...tasks, task]);
    }

    toggleSubtask(taskId: number, subtaskId: number): void {
        const lists = [
            this.todo,
            this.tasksinprogress,
            this.awaitingfeedback,
            this.done
        ];

        for (const list of lists) {
            list.update(tasks =>
                tasks.map(task =>
                    task.id === taskId
                        ? {
                            ...task,
                            subtasks: task.subtasks.map(subtask =>
                                subtask.id === subtaskId
                                    ? { ...subtask, isChecked: !subtask.isChecked }
                                    : subtask
                            )
                        }
                        : task
                )
            );
        }
    }
}