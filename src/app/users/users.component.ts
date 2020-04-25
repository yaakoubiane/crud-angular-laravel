import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  users:User[];
  user:User;

  constructor(private userService:UsersService,
    private router:Router,) {
    
  }

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService.getusers()
        .subscribe(user =>{ this.users = user['users'];
          console.log(this.users);
    });
  }

  deleteUser(user){
    this.userService.deleteUser(user).subscribe(
      data => {
        console.log(data);
        this.getUsers();
      },
      error => console.log(error)
    );
  }

  userDetails(id: number){
    this.router.navigate(['show-user', id]);
  }

  EditUser(id: number){
    this.router.navigate(['edit-user', id]);
  }

}
