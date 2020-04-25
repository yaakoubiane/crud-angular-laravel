import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  id: number;
  user: User;

  constructor(private route: ActivatedRoute,private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    
    this.user = new User();

    this.id = this.route.snapshot.params['id'];
    
    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data['user'];
      }, error => console.log(error));
      
  }

  list(){
    this.router.navigate(['users']);
  }

}
