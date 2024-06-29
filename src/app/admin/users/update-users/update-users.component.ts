import { Component, signal } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsService } from '../../../services/products.service';
import { MessageService } from 'primeng/api';
import { EMPTY, finalize, tap } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UpdateUser } from '../../../models/update-user.model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrl: './update-users.component.scss',
  providers: [DialogService]
})
export class UpdateUsersComponent {
  isLoading = signal(false);

  user: UpdateUser = this.dialogConfig.data.user;
  ref: DynamicDialogRef;

  updateUserForm = this.userService.FormUpdateUser();


  selectedStaff: any [] = [
    { nombre: 'Cliente', value: false },
    { nombre: 'Admin', value: true },
  ]

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private userService: UserService,
    private dialogRef: DynamicDialogRef,
    public messageService: MessageService,
    public dialogService: DialogService
  ) {}





onSubmit() {
    this.isLoading.set(true);
    
    const selectedStaffRole = this.selectedStaff.find(role => role.value === this.updateUserForm.value.is_staff.value);
    const isStaffBoolean = selectedStaffRole ? selectedStaffRole.value === true : false;
    const updatedUser = {
      ...this.updateUserForm.value,
      is_staff: isStaffBoolean,
    };

    if (this.updateUserForm.value.email !== this.user.email) {
      updatedUser.email = this.updateUserForm.value.email; 
    } else {
      delete updatedUser.email; 
    }

    this.userService
      .updateUser(updatedUser, this.user.id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(error => {

          this.showMessage('error', 'Error', 'Ha ocurrido un error al actualizar el usuario.');
          this.isLoading.set(true);
          return EMPTY;
        }),
        tap(() => {
          if (updatedUser) {
            this.showMessage('success', 'Usuario actualizado', 'El usuario ha sido actualizado correctamente.');
            setTimeout(() => window.location.reload(), 1000);
          }
          this.dialogRef.close(updatedUser);
        })
      )
      .subscribe();
  }
  eliminar() {
    this.isLoading.set(true);
    this.userService.deleteUser(this.user.id)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ha ocurrido un error al eliminar el usuario.'
          });
          console.error('Error al eliminar el usuario:', error);
          return EMPTY; 
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario eliminado',
            detail: 'El usuario ha sido eliminado exitosamente.'
          });
          setTimeout(() => window.location.reload(), 1000);
        })
      ).subscribe();
  }
}
