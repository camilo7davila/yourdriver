import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/interface/user.interface';
import 'firebase/database';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  users: User[]

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.sort(data)
    })
  }

  sort(data) {
    this.users = data.sort((a, b) => {
      if(a.date < b.date) {
        return 1
      }
      if(a.date > b.date) {
        return -1
      }
      return 0
    })
  }

}
