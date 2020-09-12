import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Categories } from '../interfaces/categories';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  userId = localStorage.getItem('currentUserId');
  categoriesRef = firebase.database().ref(this.userId).child('categories');
  categoriesChanged = new Subject<Categories[]>();

  constructor() { }

  createNewCategory(catName: string) {
    const key = this.categoriesRef.push().key;
    const cat: Categories = {
      id: key,
      name: catName
    };
    this.categoriesRef.child(key).set(cat);
  }

  retrieveCategories() {
    this.categoriesRef.once('value').then((data) => {
      const categories = [];
      for (const key in data.val()) {
        if (data.val().hasOwnProperty(key)) {
          categories.push(data.val()[key]);
        }
      }
      this.categoriesChanged.next(categories);
      return categories;
    });
  }

  deleteCategory(id: string) {
    this.categoriesRef.child(id).remove();
  }
}
