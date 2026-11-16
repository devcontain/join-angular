import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
  readonly title = signal('');
}
