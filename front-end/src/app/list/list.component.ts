import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import {TasksService} from '../tasks.service';
import {SortFunctions} from '../utils/sort-functions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {
  
  constructor(private taskServiceInjection: TasksService) {
    this.taskService = taskServiceInjection;
  }

  
  public taskService: TasksService;
  
  public taskList: Task[] = [];
  
  addTask(task:Task) {
    this.taskService.addTask(task);
  }

  public sortByName = SortFunctions.sortByName;
  public sortByDate = SortFunctions.sortByCreationDate;
  public sortByStatus = SortFunctions.sortByStatus;
  
  sortList(compareFn: ((a: Task,b: Task) => number)) {
    this.taskList.sort(compareFn);
  }

  markTaskAsInProgress(task: Task) {
    this.taskService.updateTask(task.id as string, {status: 'inProgress'});
  }

  markTaskAsCompleted(task: Task) {
    this.taskService.updateTask(task.id as string, {status: 'done'});
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id as string);
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    })
  }
}
