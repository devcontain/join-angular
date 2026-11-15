import { Component, computed, inject } from '@angular/core';
import { Task } from '../../core/services/task';

@Component({
  imports: [],
  selector: 'app-summary',
  styleUrl: './summary.scss',
  templateUrl: './summary.html',
})
export class Summary {
  readonly greeting = this.getGreeting();
  readonly taskservice = inject(Task);
  readonly todocount = computed(() => this.taskservice.todo().length);
  readonly donecount = computed(() => this.taskservice.done().length);
  readonly progresscount = computed(() => this.taskservice.tasksinprogress().length);
  readonly awaitcount = computed(() => this.taskservice.awaitingfeedback().length);

  private getGreeting(): string {
    const hour = new Date().getHours();

    if (hour >= 18) return 'Good evening';
    if (hour >= 12) return 'Good afternoon';

    return 'Good morning';
  }


}
