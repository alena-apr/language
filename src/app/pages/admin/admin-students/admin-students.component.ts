import { Component } from '@angular/core';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.scss',
})
export class AdminStudentsComponent {
  students: IUser[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data) => {
      this.students = data;
    });
  }

  goToStudentPage(student: IUser) {
    this.router.navigate([`exercises/admin/student/${student._id}`]);
  }
}
