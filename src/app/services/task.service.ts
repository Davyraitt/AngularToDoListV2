import { Injectable } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { Task } from '../Task';
import { Observable, of } from 'rxjs';

var jwt: any;
var items: any;
var username: string;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {
  }

  async getTasks(): Promise<Observable<Task[]>> {
    let user = await Auth.currentAuthenticatedUser()
      .then((data) => {
        jwt = data.signInUserSession.idToken.jwtToken;
        username = jwt.username;
      })
      .catch((err) => console.log(err));

    const apiName = 'tododbreader'; // replace this with your api name.
    const requestData = {
      headers: {
        Authorization: jwt,
      },
    };

    let data = await API
    .get(apiName, '/items', requestData)
    .then(response => {
      console.log(" HOI ");
      items = response.Items;
      console.log(items)
    })
    
    console.log ( "Items is: ");
    console.log(items);

    var tasks = of(items);
    return tasks;
  }

  async deleteTask(task : Task): Promise<Observable<Task[]>> {
    let apiName = 'tododbwriter'; 
    const requestData = {
      body: {
        Description: task.Description,
        Day: task.Day,
        Priority: task.Priority,
        ID: task.ID,
        Reminder: task.Reminder,
        Read: true
      },
      headers: {
        Authorization: jwt,
      },
    };

    API.post(apiName, "/items", requestData)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log(error.response);
      });


    return this.getTasks();
  }

  async updateTaskReminder(task : Task): Promise<Observable<Task[]>> {
    let apiName = 'tododbwriter'; // replace this with your api name.
    const requestData = {
      body: {
        Description: task.Description,
        Day: task.Day,
        Priority: task.Priority,
        ID: task.ID,
        Reminder: task.Reminder,
        Read: task.Read
      },
      headers: {
        Authorization: jwt,
      },
    };

    API.post(apiName, "/items", requestData)
      .then((response) => {
        //console.log({ response });
      })
      .catch((error) => {
        //console.log(error.response);
      });

    return this.getTasks();
  }

  async addTask(task : Task): Promise<Observable<Task[]>> {
    console.log("starting addtask")
    let apiName = 'tododbwriter'; // replace this with your api name.
    const requestData = {
      body: {
        Description: task.Description,
        Day: task.Day,
        Priority: task.Priority,
        ID: task.ID,
        Reminder: task.Reminder,
        Read: task.Read
      },
      headers: {
        Authorization: jwt,
      },
    };

    API.post(apiName, "/items", requestData)
      .then((response) => {
        console.log("done addtask");
        console.log({ response });
      })
      .catch((error) => {
        console.log("done addtask");
        console.log(error.response);
      });

    return this.getTasks();
  }

  
}
