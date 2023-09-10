import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: any

  constructor(private route: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');

    if (contactId !== null) {
      this.contactService.getContactById(contactId).subscribe((contact) => {
        this.contact = contact;
      });
    }
  }


}
