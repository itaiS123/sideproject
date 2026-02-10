import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // חייב לייבא את זה

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  /*
  onLogin(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    this.http.post('http://localhost:3000/api/users/login', { email, password }).subscribe({
      next: (response: any) => {
        // 1. שמירת שם המשתמש מה-DB לצורך תצוגה בדף הבית
        localStorage.setItem('userName', response.user.username);

        // 2. הצגת הודעת ההצלחה שראינו בתמונה
        alert('✅ Login Successful!');

        // 3. פקודת המעבר - זה מה שחסר לך!
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('❌ Login Failed: ' + (err.error.error || 'Unknown error'));
      },
    });

  }
  */
  // פתרון זמני ללא שרת:
  onLogin(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    console.log('Mock Login attempt:', { email, password });

    // פתרון זמני ללא שרת:
    if (email === 'itai@test.com' && password === '123') {
      // שמירת שם משתמש פיקטיבי כדי שדף הבית יוכל להציג אותו
      localStorage.setItem('userName', 'Itai');

      alert('✅ Mock Login Successful! (No Server Mode)');
      this.router.navigate(['/home']);
    } else {
      alert('❌ Login Failed: invalid credentials');
    }
  }
}
