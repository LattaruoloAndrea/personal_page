import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      // to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      // console.log('Form submitted', this.emailForm.value);
      const mail = "mailto:test@domain.com";
      const emailSub=  this.emailForm.get('subject')?.value;
      const emailBody = this.emailForm.get('message')?.value
      // var p = 'mailto:' + mail+'?subject='+  +'&body='+ this.emailForm.get('message')?.value;
      // window.location.href = mail;
      location.href = "mailto:"+mail+'&subject='+emailSub+'&body='+emailBody;
      // Here you would typically call a service to send the email
      // For example: this.emailService.sendEmail(this.emailForm.value);
    }
  }
}
