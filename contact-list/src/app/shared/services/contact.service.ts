import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: any[] = [];
  private contactSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<any[]>('/assets/datasource.json').subscribe((data) => {
      this.contacts = data;
      this.contactSubject.next(this.contacts);
    });
  }

  getContacts(): Observable<any[]> {
    return this.contactSubject.asObservable();
  }

  addContact(contact: any) {
    this.contacts.push(contact);
    this.contactSubject.next(this.contacts);
  }

  editContact(index: number, updatedContact: any) {
    this.contacts[index] = updatedContact;
    this.contactSubject.next(this.contacts);
  }
}