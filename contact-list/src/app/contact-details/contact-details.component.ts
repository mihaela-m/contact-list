import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: any
  contactForm: FormGroup
  isNewContact = false;
  editMode = false;
  deleteConfirmed = false;
  showConfirmationModal = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.pattern(/^(?:\(\d{3}\)\s*|\d{3}[-.]?)?\d{3}[-.]?\d{4}$/)],//North american phone formats
      Cell: ['', Validators.pattern(/^(?:\(\d{3}\)\s*|\d{3}[-.]?)?\d{3}[-.]?\d{4}$/)],
      RegistrationDate: ['', Validators.required],
      Age: ['', Validators.required],
    });

    this.disableFormControls();
  }

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId !== null) {
      this.contactService.getContactById(contactId).subscribe((contact) => {
        if (contact) {
          this.contact = contact;
          this.calculateAge(contact.Birthday);
          this.contactForm.patchValue({
            Address: contact.Address,
            Email: contact.Email,
            PhoneNumber: contact.PhoneNumber,
            Cell: contact.Cell,
            RegistrationDate: contact.RegistrationDate,
            Age: contact.Age,
          });
        } else {
          console.error('Contact not found.');
        }
      });
    } else {
      console.error('Invalid contact ID:', contactId);
    }
  }


  saveContact() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      if (this.contact && this.contact.id) {
        this.contact.Address = formData.Address;
        this.contact.Email = formData.Email;
        this.contact.PhoneNumber = formData.PhoneNumber;
        this.contact.Cell = formData.Cell;
        this.contact.RegistrationDate = formData.RegistrationDate;
        this.contact.Age = formData.Age;

        this.contactService.editContact(this.contact.id, this.contact);
        this.toggleEditMode();
      }
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

  goBack() {
    this.router.navigate(['/']);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      // Enable form controls when in edit mode
      this.enableFormControls();
    } else {
      // Disable form controls when not in edit mode
      this.disableFormControls();
    }
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

  private enableFormControls() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      if (control) {
        control.enable();
      }
    });
  }

  private disableFormControls() {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      if (control) {
        control.disable();
      }
    });
  }


}
