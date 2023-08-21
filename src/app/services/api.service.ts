import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  register(data:any) {
    return this.http.post(this.apiURL + '/signup',data)
  }
}
