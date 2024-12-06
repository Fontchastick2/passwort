import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DecryptedPassword, Password } from '../models/password';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = 'http://localhost:5051/api/passwords'; // Your backend URL

  constructor(private http: HttpClient) { }


  // Add a password
  addPassword(password: Password): Observable<Password> {
    return this.http.post<Password>(this.baseUrl, password);
  }

  // Get all passwords for a user
  getPasswordsByUsername(username: string): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.baseUrl}/${username}`);
  }

  // Get a single password by ID
  getPasswordById(id: number): Observable<Password> {
    return this.http.get<Password>(`${this.baseUrl}/${id}`);
  }

  // Get a single password by ID with decrypted password
  getDecryptedPasswordById(id: number): Observable<DecryptedPassword> {
    return this.http.get<DecryptedPassword>(`${this.baseUrl}/${id}/decrypted`);
  }

  // Get all passwords
  getAllPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.baseUrl}`);
  }

  // Update a password
  updatePassword(id: number, updatedPassword: Password): Observable<Password> {
    return this.http.put<Password>(`${this.baseUrl}/${id}`, updatedPassword);
  }

  // Delete a password
  deletePassword(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  verifyValue(value: string): Observable<{ message: string }> {
    const payload = { Value: value };
    return this.http.post<{ message: string }>(`${this.baseUrl}/verify`, payload);
  }
}

