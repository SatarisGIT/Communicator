import { Observable } from 'rxjs';
import axios from 'axios';

export default class HttpApi {

     constructor() {

     }


     static get(url) {

          return Observable.create((observer) => {

               axios.get(url)
                    .then((response) => {
                         observer.next(response.data);
                         observer.complete();
                    })
                    .catch((error) => {
                         observer.error(error);
                    });
          });

     }

     
     static post(url: string, body: Object) {

          return Observable.create((observer) => {

               axios.post(url, body)
                    .then((response) => {
                         observer.next(response.data);
                         observer.complete();
                    })
                    .catch((error) => {
                         observer.error(error);
                    });
          });

     }
}
