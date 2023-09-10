import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactIndexComponent } from './contact-index/contact-index.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { NewContactFormComponent } from './new-contact-form/new-contact-form.component';

const routes: Routes = [
  { path: '', component: ContactIndexComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'contact-form', component: NewContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
