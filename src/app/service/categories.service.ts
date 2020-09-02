import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Categories } from '../interfaces/categories';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesRef = firebase.database().ref('categories');

  categoriesChanged = new Subject<Categories[]>();

  constructor() { }

  createNewCategory(catName: string) {
    const key = this.categoriesRef.push().key;
    const cat: Categories = {
      name: catName
    };
    this.categoriesRef.child(key).set(cat);
  }

  retrieveCategories() {
    this.categoriesRef.once('value').then((data) => {
      const categoryNames = []
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          categoryNames.push(data.val()[key].name);
        }
      }
      this.categoriesChanged.next(categoryNames);
      return categoryNames;
    });
  }
}
