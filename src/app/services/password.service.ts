import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = 'http://localhost:5000/api/passwords'; // Your backend URL

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
}

// Define Password model
export interface Password {
  id?: number;
  category: string;
  app: string;
  userName: string;
  encryptedPassword: string;
}

// Define Decrypted Password model
export interface DecryptedPassword {
  id: number;
  category: string;
  app: string;
  userName: string;
  decryptedPassword: string;
}
