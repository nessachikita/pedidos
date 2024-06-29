import { Component, signal, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';
import { User } from '../../models/user.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateUsersComponent } from './update-users/update-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [DialogService]
})


export class UsersComponent implements OnInit {
  isLoading = signal(false);

  users$ = this.userService.currentUser();
  ref: DynamicDialogRef;

  constructor(private userService: UserService, public dialogService: DialogService) {}

  showUserUpdate(user: User) {
    console.log(user);
    this.ref = this.dialogService.open(UpdateUsersComponent,{
        header: 'Actualizar Usuario',
        width: '40vw',
        height: '21vw',
        modal:true,
        data: {user},
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    });
  }

  ngOnInit(): void {
    this.users$ = this.users$.pipe(
      map(users => users.map(user => {
        return { ...user, is_staff: user.is_staff ? 'Admin' : 'Cliente'};
      }))
    );
  }
}
