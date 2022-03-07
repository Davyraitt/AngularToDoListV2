import { Injectable } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { Task } from '../Task';
import { Observable, of } from 'rxjs';

var jwt: any;
var items: any;

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

}
