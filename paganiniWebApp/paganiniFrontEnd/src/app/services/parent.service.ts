import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../models/parent.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private apiUrl = 'http://localhost:8080/api/parents';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.apiUrl);
  }

  findById(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/${id}`);
  }

  save(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl, parent);
  }

  update(id: number, parent: Parent): Observable<Parent> {
    return this.http.put<Parent>(`${this.apiUrl}/${id}`, parent);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}