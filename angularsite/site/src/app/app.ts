import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // הסרנו את Login מה-imports כי אנחנו משתמשים ב-RouterOutlet
  imports: [ReactiveFormsModule, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private client = inject(HttpClient);

  // הגדרת הטופס
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    tel: new FormControl(''),
  });

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.client.post('http://localhost:3000/api/users', userData).subscribe({
        next: (response) => {
          console.log('✅ User created!', response);
          alert('User registered successfully!');
          this.userForm.reset();
        },
        error: (err) => console.error('❌ Error:', err),
      });
    }
  }
}
