import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PassworddComponent } from '../password/password.component';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {
  ref: DynamicDialogRef ;
  value = ['', '', '', '', '', ''];

  
  constructor(
    private messageService: MessageService,
    public dialogService: DialogService,
    private authService:AuthService,
    private refe:DynamicDialogRef){ 
      {this.authService.closeDialog$.subscribe((close) => {
        if (close) {
          this.ref.close(); 
        }
      });
    }
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  resend() {
    this.showMessage('success', 'Operación exitosa', 'Código enviado correctamente');
    this.authService.resend();
  }

  enviarOtp() {
    const otp = this.value.join(''); 
    this.authService.verifycode(otp).subscribe({
      next: (response) => {
      },
      error: (error) => {
        if (error.error.non_field_errors && error.error.non_field_errors.includes('Correo y código coinciden.')) {
          this.showMessage('success', 'Operación exitosa', 'Puede ingresar su nueva contraseña.')
          this.refe.close()
          this.showPassword();
        } else {
          this.showMessage('error', 'error', 'El código o correo no son válidos.')
        }
      }
    });
  }

  showPassword() {
    const dialogConfig = {
        header: 'Recuperar contraseña',
        height: '20vw',
        width: '60vw',
        modal: true,
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    };
    this.ref = this.dialogService.open(PassworddComponent, dialogConfig);
  }

  onSubmit(){
    this.enviarOtp();
  }

}
