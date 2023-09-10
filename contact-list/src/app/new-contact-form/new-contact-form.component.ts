import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.css']
})
export class NewContactFormComponent {
  contact: any = {
    Name: '',
    Address: '',
    Email: '',
    PhoneNumber: '',
    Cell: '',
    RegistrationDate: '',
    Age: ''
  };
  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit(): void {
  }

  saveContact() {
    if (this.contact) {

      this.contactService.addContact(this.contact);
      this.router.navigate(['/']);
    }
  }

}
