import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the form-related modules

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.css']
})
export class NewContactFormComponent implements OnInit {
  contactForm: FormGroup;

  contact: any = {
    Name: '',
    Address: '',
    Email: '',
    PhoneNumber: '',
    Cell: '',
    Birthday: '',
  };
  constructor(private router: Router, private contactService: ContactService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],
      Cell: ['', Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],
      Birthday: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  saveContact() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.contactService.addContact(formData);
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
