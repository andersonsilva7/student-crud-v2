import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../studentService/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  columns: Array<string> = ["Id", "Nome", "Email", "Ações"];

  @ViewChild('confirmationModal') confirmationModal!: ElementRef;

  private modalInstance: any;
  studentToDelete: any;

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      students => {
        this.students = students;
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  editStudent(id: string): void {
    this.router.navigate(['/students/edit', id]);
  }

  deleteConfirmed() {
    if (this.studentToDelete) {
      const id = this.studentToDelete.id;
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.loadStudents();
          this.closeModal();
        },
        error => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }

  confirmDeleteStudent(student: any) {
    this.studentToDelete = student;
    this.openModal();
  }

  openModal() {
    if (this.confirmationModal) {
      this.modalInstance = new (window as any).bootstrap.Modal(this.confirmationModal.nativeElement);
      this.modalInstance.show();
    }
  }
  
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  viewStudentDetails(id: string): void {
    this.router.navigate(['students/details/', id]);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
