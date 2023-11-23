import { Injectable } from '@angular/core';
import { List } from './list';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

 
  

  private getAllURL = 'http://localhost:3000/api/superheroes/lists';

  //${searchName.value}&race=${searchRace.value}&publisher=${searchPublisher.value}&power=${searchPower.value}&limit=${searchLimit.value}

  async createList(listName: string, idsList: string[]): Promise<any> {
    const listItem = { listName, ids: idsList };
    try {
      const response = await fetch(this.getAllURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listItem),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async getList(selectedID: number): Promise<List[] | undefined> {
    const idNum = `/${selectedID}`;
    const url = this.getAllURL + idNum;
    const data = await fetch(url);
    return (await data.json()) ?? [];
  }

  getLists(): Promise<any[]> {
    return fetch(this.getAllURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching lists:', error);
        throw error;
      });
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}



