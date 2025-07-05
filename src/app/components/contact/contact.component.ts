import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  public animationsEnabled = true;
  public formSubmitted = false;

  constructor(private fb: FormBuilder,@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.animationsEnabled = window.innerWidth > 600;
    }

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log(this.emailForm);
    if (this.emailForm.valid) {
      const mail = "lattaruolo.96@gamil.com";
      const emailSub = encodeURIComponent(this.emailForm.get('subject')?.value);
      const emailBody = encodeURIComponent(this.emailForm.get('message')?.value);
      console.log(`mailto:${mail}?subject=${emailSub}&body=${emailBody}`);
      location.href = "mailto:" + mail + '?subject=' + emailSub + '&body=' + emailBody;
    }
  }
}