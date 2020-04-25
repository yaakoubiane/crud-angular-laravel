import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User = new User();
  submitted = false;
  id:number;

  constructor(private route: ActivatedRoute,private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data['user'];
      }, error => console.log(error));
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  edit() {
    this.userService.updateUser(this.user, this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
    //this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
