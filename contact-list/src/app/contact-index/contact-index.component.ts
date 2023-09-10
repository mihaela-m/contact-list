import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.css']
})
export class ContactIndexComponent implements OnInit {

  constructor(private contactService: ContactService, private router: Router) { }
  contacts: any[] = [];
  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  showDetails(contact: any) {
    if (contact.id !== undefined && contact.id !== null) {
      this.router.navigate(['/contact', contact.id]);
    } else {
      console.error('Invalid contact ID:', contact.id);
    }
  }
}
