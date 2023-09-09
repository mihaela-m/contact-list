import { Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-contact-index',
  templateUrl: './contact-index.component.html',
  styleUrls: ['./contact-index.component.css']
})
export class ContactIndexComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  contacts: any[] = [];
  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  showDetails(contact: any) {
    console.log(contact);
  }

}
