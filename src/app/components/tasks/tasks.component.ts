import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { API, Auth } from 'aws-amplify';
import { TaskService } from '../../services/task.service';

var jwt: any;
var apiName: any;
var path = '/items';
var user: any;
var items: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  async ngOnInit(): Promise<void> {
    user = await Auth.currentAuthenticatedUser()
      .then((data) => {
        jwt = data.signInUserSession.idToken.jwtToken;
      })
      .catch((err) => console.log(err));

    (await this.taskService.getTasks()).subscribe(
      (tasks: Task[]) => (this.tasks = tasks)
    );
  }

  async sendToDoToDatabase() {
    console.log('clicked');

    apiName = 'tododbwriter'; // replace this with your api name.
    const requestData = {
      body: {
        Description: 'Als het goed is wordt dit verwijderd!!!!',
        Day: 'Juli 5th at 2:30pm',
        Priority: 'High',
        ID: this.getRandomInt(99999),
        Reminder: true,
        Read: false,
      },
      headers: {
        Authorization: jwt,
      },
    };

    API.post(apiName, path, requestData)
      .then((response) => {
        //console.log({ response });
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }

  async getMatchingToDoFromDatabase() {
    console.log('Get clicked');
    const apiName = 'tododbreader'; // replace this with your api name.
    const requestData = {
      headers: {
        Authorization: jwt,
      },
    };

    API.get(apiName, path, requestData)
      .then((response) => {
        console.log(' resp: ');
        console.log({ response });
        items = response.items;
        return items;
      })
      .catch((error) => {
        console.log(error.response);
        return null;
      });
  }

  async deleteTask(task: Task) {
    //
    (await this.taskService.deleteTask(task)).subscribe(
      () => (this.tasks = this.tasks.filter((t) => t.ID !== task.ID))
    );
  }

  async toggleReminder(task: Task) {
    task.Reminder = !task.Reminder;
    (await this.taskService.updateTaskReminder(task)).subscribe();
  }

  async addTask(task: Task) {
    (await this.taskService.addTask(task)).subscribe((tasks: Task[]) =>
      this.tasks.push(task)
    );
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
