import { Component, computed, inject } from '@angular/core';
import { Task } from '../../core/services/task';

@Component({
  imports: [],
  selector: 'app-summary',
  styleUrl: './summary.scss',
  templateUrl: './summary.html',
})
export class Summary {
  readonly taskservice = inject(Task);

  readonly greeting = this.getGreeting();
  readonly todocount = computed(() => this.taskservice.todo().length);
  readonly donecount = computed(() => this.taskservice.done().length);
  readonly progresscount = computed(() => this.taskservice.tasksinprogress().length);
  readonly awaitcount = computed(() => this.taskservice.awaitingfeedback().length);

  readonly tasksInBoard = computed(() =>
    this.taskservice.todo().length +
    this.taskservice.tasksinprogress().length +
    this.taskservice.awaitingfeedback().length +
    this.taskservice.done().length
  );

  readonly urgentcount = computed(() =>
    this.taskservice.todo().filter(task => task.prio === 'urgent').length +
    this.taskservice.tasksinprogress().filter(task => task.prio === 'urgent').length +
    this.taskservice.awaitingfeedback().filter(task => task.prio === 'urgent').length
  );

  readonly openTasks = computed(() => [
    ...this.taskservice.todo(),
    ...this.taskservice.tasksinprogress(),
    ...this.taskservice.awaitingfeedback()
  ]);

  readonly nextDeadline = computed(() => {
    const dates = this.openTasks()
      .map(task => this.parseDate(task.date))
      .filter(date => date !== null);

    if (dates.length === 0) return null;

    return new Date(Math.min(...dates.map(date => date.getTime())));
  });

  private parseDate(value: string): Date | null {
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day) return null;

    return date;
  }

  readonly deadlineText = computed(() => {
    const deadline = this.nextDeadline();

    if (!deadline) return 'No Upcoming Deadline';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadline < today) return 'Overdue Deadline';

    return 'Upcoming Deadline';
  });

  readonly deadlineDateEn = computed(() => {
    const deadline = this.nextDeadline();

    if (!deadline) return '';

    return deadline.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  });

  readonly deadlineDateDe = computed(() => {
    const deadline = this.nextDeadline();

    if (!deadline) return '';

    return deadline.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  });

  private getGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 18) return 'Good evening,';
    if (hour >= 12) return 'Good afternoon,';

    return 'Good morning,';
  }
}
