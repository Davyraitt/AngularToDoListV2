import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TASKS } from '../../mock-tasks';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = TASKS;

  constructor() {
    console.log('Hoi wereld');
    // maybe api stuff here?
  }

  ngOnInit(): void {
    

  }

  async onClickPush() {
        console.log("clicked")
        let jwt;
     
        const user = await Auth.currentAuthenticatedUser()
          .then(
            data => {jwt = data.signInUserSession.idToken.jwtToken}
            )
          .catch(err => console.log(err));
    

        const apiName = 'tododbwriter'; // replace this with your api name.
        const path = '/items'; //replace this with the path you have configured on your API
        const requestData = {
          body: {
            Description:'Afspraak met dr maken',
            Day:'April 5th at 2:30pm',
            Priority:'High',
            ID:2,
            Reminder:true
          }, 
          headers: {
            Authorization: jwt
          }, 
        };

        console.log({requestData});
    
        API.post(apiName, path, requestData)
          .then((response) => {
            console.log({response})
          })
          .catch((error) => {
            console.log(error.response);
          });
  }

  async onClickGet() { 
    console.log("Get clicked")

    let jwt;
    const user = await Auth.currentAuthenticatedUser()
      .then(
        data => {jwt = data.signInUserSession.idToken.jwtToken}
        )
      .catch(err => console.log(err));

      const apiName = 'tododbreader'; // replace this with your api name.
      const path = '/items'; //replace this with the path you have configured on your API
      const requestData = { 
        headers: {
          Authorization: jwt
        }, 
      };

      API.get(apiName, path, requestData)
      .then((response) => {
        console.log({response})
      })
      .catch((error) => {
        console.log(error.response);
      });

  }
}
