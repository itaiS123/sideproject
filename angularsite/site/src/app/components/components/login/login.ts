// login.ts
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [], // וודא ש-CommonModule או ReactiveFormsModule כאן אם צריך
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  onLogin(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // פנייה ל-API האמיתי בשרת שלך
    this.http.post('http://localhost:3000/api/users/login', { email, password }).subscribe({
      next: (response: any) => {
        // שמירת השם מה-DB (כפי שמופיע ב-Compass: "itai")
        localStorage.setItem('userName', response.user.username);
        alert('✅ Login Successful! Connected to Database.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // הצגת הודעת שגיאה במקרה של פרטים לא נכונים
        alert('❌ Login Failed: ' + (err.error.error || 'Invalid credentials'));
      },
    });
  }
}
