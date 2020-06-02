import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = "http://localhost:3000/tasks";
  constructor(private http: HttpClient) {}

  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(addTask) {
    return this.http.post<Task>(this.apiUrl, addTask);
  }

  completed(id, complet) {
    return this.http.patch(`${this.apiUrl}/${id}`, {completed: !complet})
  }

  update(task){
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
}
