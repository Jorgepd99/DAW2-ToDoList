import { Injectable } from '@angular/core';
import { Task } from './models/Task';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private db: AngularFirestore) {}

  getTasks(): Observable<Task[]> {
    return this.db.collection<Task>('Tasks').valueChanges({idField: 'id'});
  }

  addTask(task: Task): boolean {
    return !!this.db.collection('Tasks').add(task);
  }

  updateTask(id: string, data: Partial<Task>): boolean {
    this.db.collection('Tasks').doc(id).update(data);
    return true;
  }

  deleteTask(id: string) {
    this.db.collection('Tasks').doc(id).delete();
  }
}
