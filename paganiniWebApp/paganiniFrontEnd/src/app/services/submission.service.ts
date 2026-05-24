import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submission } from '../models/submission.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private apiUrl = 'http://localhost:8080/api/submissions';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.apiUrl);
  }

  findById(id: number): Observable<Submission> {
    return this.http.get<Submission>(`${this.apiUrl}/${id}`);
  }

  save(submission: Submission): Observable<Submission> {
    return this.http.post<Submission>(this.apiUrl, submission);
  }

  update(id: number, submission: Submission): Observable<Submission> {
    return this.http.put<Submission>(`${this.apiUrl}/${id}`, submission);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}