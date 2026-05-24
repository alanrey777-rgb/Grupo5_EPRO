import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiUrl = 'http://localhost:8080/api/grades';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }

  findById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.apiUrl}/${id}`);
  }

  save(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.apiUrl, grade);
  }

  update(id: number, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiUrl}/${id}`, grade);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}