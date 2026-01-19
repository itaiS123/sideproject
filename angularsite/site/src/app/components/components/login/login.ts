import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);

  onLogin(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // שליחת הבקשה לשרת
    this.http.post('http://localhost:3000/api/users/login', { email, password }).subscribe({
      next: (response: any) => {
        // כאן אתה מקבל את ההתראה על הצלחה!
        alert('✅ Login Successful! Welcome back.');
        console.log('Success:', response);
      },
      error: (err) => {
        // כאן אתה מקבל התראה אם הנתונים לא נכונים
        alert('❌ Login Failed: ' + (err.error.error || 'Unknown error'));
        console.error('Error:', err);
      },
    });
  }
}
