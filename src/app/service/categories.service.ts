import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesRef = firebase.database().ref('categories');

  constructor() { }
}
