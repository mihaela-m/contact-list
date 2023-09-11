import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: any
  isNewContact = false;
  editMode = false;
  deleteConfirmed = false;
  showConfirmationModal = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) { }

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId !== null) {
      this.contactService.getContactById(contactId).subscribe((contact) => {
        if (contact) {
          this.contact = contact;
          this.calculateAge(contact.Birthday);
        } else {
          console.error('Contact not found.');
        }
      });
    } else {
      console.error('Invalid contact ID:', contactId);
    }
  }

  saveContact() {
    if (this.contact && this.contact.id) {
      this.contactService.editContact(this.contact.id - 1, this.contact);
      this.toggleEditMode();
    }
  }

  deleteContact() {
    if (this.contact && this.contact.id) {
      this.contactService.deleteContact(this.contact.id);
      this.router.navigate(['/']);
    }
  }


  calculateAge(birthday: string) {
    const today = new Date();
    const birthdate = new Date(birthday);
    const age = today.getFullYear() - birthdate.getFullYear();

    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      this.contact.Age = age - 1;
    } else {
      this.contact.Age = age;
    }
  }
  
  goBack(){
    this.router.navigate(['/']);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onDeleteClick() {
    this.showConfirmationModal = true;
  }

  onConfirmation(confirmed: boolean) {
    this.showConfirmationModal = false;
    if (confirmed) {
      this.deleteContact();
    }
  }


}
