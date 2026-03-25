import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  notebookId: string | null = null;
  model_transcription_result: string = '';
  nlp_summary_headline: string = '';
  model_confidence_score: number = 0;
  existing_pages: any[] = [];

  is_preview_visible: boolean = false; // שולט על הצגת התוצאה
  is_in_edit_mode: boolean = false;
  temporary_edit_buffer: string = '';
  is_dragging_file: boolean = false;

  ngOnInit() {
    this.notebookId = this.route.snapshot.queryParamMap.get('id');
    if (this.notebookId) {
      this.loadNotebookContent();
    }
  }

  loadNotebookContent() {
    this.http.get<any[]>(`http://localhost:3000/api/pages/notebook/${this.notebookId}`).subscribe({
      next: (pages) => {
        this.existing_pages = pages;
        if (pages.length > 0) {
          // אם יש דפים, נציג את האחרון שבהם אוטומטית
          this.displayPage(pages[0]);
        } else {
          // אם אין דפים, נשאר במצב העלאה
          this.is_preview_visible = false;
        }
      },
      error: (err) => console.error('Could not load pages', err)
    });
  }

  // פונקציה חדשה: מציגה דף ספציפי מההיסטוריה
  displayPage(page: any) {
    this.model_transcription_result = page.content;
    this.nlp_summary_headline = page.summary;
    this.model_confidence_score = page.accuracy;
    this.is_preview_visible = true; // מעלים את ה-Drag & Drop ומציג את התוכן
  }

  save_to_database() {
    if (!this.notebookId) return;
    const payload = {
      notebookId: this.notebookId,
      content: this.model_transcription_result,
      summary: this.nlp_summary_headline,
      accuracy: this.model_confidence_score,
    };

    this.http.post('http://localhost:3000/api/pages', payload).subscribe({
      next: () => {
        alert('Saved Successfully!');
        this.loadNotebookContent(); // טוען מחדש כדי לעדכן את ההיסטוריה
      },
      error: () => alert('Save failed'),
    });
  }

  // חזרה למצב העלאה (לסריקת דף חדש)
  createNewScan() {
    this.clear_workspace();
    this.is_preview_visible = false;
  }

  clear_workspace() {
    this.model_transcription_result = '';
    this.nlp_summary_headline = '';
    this.model_confidence_score = 0;
    this.is_preview_visible = false;
  }

  // Drag & Drop
  onDragOver(event: any) { event.preventDefault(); this.is_dragging_file = true; }
  onDragLeave() { this.is_dragging_file = false; }
  onDrop(event: any) {
    event.preventDefault();
    this.is_dragging_file = false;
    // כאן תבוא הקריאה ל-AI (כרגע דמה)
    this.model_transcription_result = 'New AI transcription...';
    this.nlp_summary_headline = 'New summary';
    this.model_confidence_score = 98;
    this.is_preview_visible = true;
  }

  start_local_edit() { this.temporary_edit_buffer = this.model_transcription_result; this.is_in_edit_mode = true; }
  save_local_edit() { this.model_transcription_result = this.temporary_edit_buffer; this.is_in_edit_mode = false; }
  cancel_local_edit() { this.is_in_edit_mode = false; }
  go_back_to_home() { this.router.navigate(['/notebooks']); }
}
