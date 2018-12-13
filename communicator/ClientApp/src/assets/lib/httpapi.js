import React, { Component } from 'react';
import { Observable } from 'rxjs';
import axios from 'axios';

export default class HttpApi {

     constructor() {

          // let subscription = observable$.subscribe({
          //      next: data => console.log('[data] => ', data),
          //      complete: data => console.log('[complete]'),
          // });
          
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
