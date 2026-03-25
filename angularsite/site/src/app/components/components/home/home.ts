import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  userName: string = 'User';

  constructor(private router: Router) {}

  ngOnInit() {
    // שליפת שם המשתמש שנשמר ב-Login
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      this.userName = savedName;
    }
  }

  // ניווט לסביבת העבודה (OCR + CNN)
  goToWorkspace() {
    this.router.navigate(['/workspace']);
  }

  // ניווט לניהול מחברות (החלק החדש)
  goToNotebooks() {
    this.router.navigate(['/notebooks']);
  }

  // ניקוי נתונים וחזרה למסך הכניסה
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
