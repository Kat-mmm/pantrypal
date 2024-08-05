import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private appId = 'YOUR_APP_ID';
  private appKey = 'YOUR_APP_KEY';
  private apiUrl = 'https://api.edamam.com/search';

  constructor(private http: HttpClient) { }

  getRecipes(ingredient: string): Observable<any> {
    const url = `${this.apiUrl}?q=${ingredient}&app_id=${this.appId}&app_key=${this.appKey}`;
    return this.http.get(url);
  }
}
