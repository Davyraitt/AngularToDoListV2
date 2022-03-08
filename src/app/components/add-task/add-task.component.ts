import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  Description: string = '';
  Priority: string = '';
  Day: string = '';
  Reminder: boolean = false;
  Username: string = '';

  constructor() {}

  async ngOnInit(): Promise<void> {
    let data = await Auth.currentAuthenticatedUser()
      .then((data) => {
        let jwt = data.signInUserSession.idToken.jwtToken;
        this.Username = jwt.username;
      })
      .catch((err) => console.log(err));
  }

  async onSubmit() {
    if (!this.Description || !this.Priority || !this.Day || !this.Reminder) {
      alert('Please make sure you have entered every field in the form!');
      return;
    }

    const newTask : Task = {
    ID: this.getRandomInt(99999999),
    Description: this.Description,
    Priority: this.Priority,
    Day: this.Day,
    Reminder: false,
    Owner: this.Username,
    Read: false
    };

    this.onAddTask.emit(newTask);

    this.Description = '';
    this.Day = '';
    this.Priority = '';
    this.Reminder = false;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
