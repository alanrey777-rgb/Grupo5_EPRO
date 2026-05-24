import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialFile } from '../models/material-file.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialFileService {

  private apiUrl = 'http://localhost:8080/api/material-files';

  constructor(private http: HttpClient) {}

  findAll(): Observable<MaterialFile[]> {
    return this.http.get<MaterialFile[]>(this.apiUrl);
  }

  findById(id: number): Observable<MaterialFile> {
    return this.http.get<MaterialFile>(`${this.apiUrl}/${id}`);
  }

  save(materialFile: MaterialFile): Observable<MaterialFile> {
    return this.http.post<MaterialFile>(this.apiUrl, materialFile);
  }

  update(id: number, materialFile: MaterialFile): Observable<MaterialFile> {
    return this.http.put<MaterialFile>(`${this.apiUrl}/${id}`, materialFile);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}