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

}
