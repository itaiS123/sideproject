import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notebooks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notebooks.html',
  styleUrl: './notebooks.css',
})
export class Notebooks implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  notebooks: any[] = [];
  newNotebookName: string = '';

  // ה-ID המדויק מה-Compass שלך שבו נוצרה המחברת "English"
  studentId: string = '69c29be1b94d17c7435bb281';

  ngOnInit() {
    this.loadNotebooks();
  }

  loadNotebooks() {
    this.http.get(`http://localhost:3000/api/notebooks/student/${this.studentId}`).subscribe({
      next: (data: any) => {
        this.notebooks = data;
        console.log('Notebooks loaded:', data);
      },
      error: (err) => console.error('Failed to load notebooks', err),
    });
  }

  // הפונקציה שפותחת את המחברת ושולחת אותנו ל-Workspace
  openNotebook(notebookId: string) {
    console.log('Navigating to workspace for notebook:', notebookId);
    this.router.navigate(['/workspace'], { queryParams: { id: notebookId } });
  }

  createNotebook() {
    if (!this.newNotebookName.trim()) return;

    const payload = {
      name: this.newNotebookName,
      studentId: this.studentId,
    };

    this.http.post('http://localhost:3000/api/notebooks', payload).subscribe({
      next: () => {
        this.newNotebookName = '';
        this.loadNotebooks();
      },
      error: (err) => {
        console.error('Error creating notebook:', err);
        alert('Error creating notebook');
      },
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
