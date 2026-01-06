import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // ייבוא חדש

@Component({
  selector: 'app-root',
  standalone: true, // וודא שזה מוגדר כ-standalone
  imports: [RouterOutlet, ReactiveFormsModule], // חייבים להוסיף כאן את ה-FormsModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly client = inject(HttpClient);

  // הגדרת הטופס - אלו השדות שהמשתמש ימלא
  protected userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    tel: new FormControl('')
  });

  // פונקציה שתופעל בלחיצה על הכפתור
  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value; // הנתונים שהמשתמש הקליד
      
      this.client.post("http://localhost:3000/api/users", userData).subscribe({
        next: (response) => console.log('✅ הצלחנו!', response),
        error: (err) => console.error('❌ אופס...', err)
      });
    }
  }
}