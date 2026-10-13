import { Component, input } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  imports: [],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
}
