import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText= '';

  editForm = false;
  displayForm = false;

  taskData: Task = {
    label: '',
    completed: false
  }

  tasks: Task[] = [];
  searchResult: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
        .subscribe(mytasks => this.searchResult = this.tasks = mytasks);
  }

  deleteTask(id){
    this.taskService.delete(id)
        .subscribe(() => {
          this.tasks = this.tasks.filter(theTask => theTask.id != id)
        })
  }

  persistTask(){
    this.taskService.persist(this.taskData)
        .subscribe((task) => {
           this.tasks = [task, ...this.tasks]
           this.resetTask();
           this.displayForm = false;
        })
  }

  resetTask(){
    this.taskData = {
      label: '',
      completed: false
    }
  }

  toggleCompleted(task){
    this.taskService.completed(task.id, task.completed)
        .subscribe(() => {
          task.completed = !task.completed
        })
  }

  editTask(task) {
    this.taskData = task
    this.editForm = true;
  }

  updateTask(){
    this.taskService.update(this.taskData)
        .subscribe(task => {
          this.resetTask();
          this.editForm = false;
        })
  }

  showForm(){
    this.displayForm = !this.displayForm;
  }

  searchTask(){
    this.searchResult = this.tasks.filter((row) => row.label.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
