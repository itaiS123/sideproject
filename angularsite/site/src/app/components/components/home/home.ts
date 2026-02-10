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
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      this.userName = savedName;
    }
  }

  goToModel() {
    // כאן נעבור לעבודה על ה-Convolutional Layer שביקשת
    console.log('Navigating to Model configuration...');
    // this.router.navigate(['/model-settings']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
