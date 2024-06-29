import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CodeComponent } from './code/code.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})

export class ForgetPasswordComponent {
  ref: DynamicDialogRef ;

  value: string;
  constructor(
    public dialogService: DialogService,
    private messageService: MessageService,
    private AuthService:AuthService,
    private refe:DynamicDialogRef){
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  enviarcorreo() {
    this.AuthService.requestReset(this.value).subscribe({
      next: (response) => {
        this.showMessage('success', 'Correo enviado', 'Revisa tu bandeja de entrada para el siguiente paso.');
        this.showCode()
        this.refe.close();
      },
      error: (error) => {
        this.showMessage('error', 'Error', 'No se pudo enviar el correo. Por favor, intenta de nuevo.');
      }
    });
  }
  
  
    showCode() {
      const dialogConfig = {
          height: '27vw',
          width: '60vw',
          modal: true,
          breakpoints: {
              '960px': '75vw',
              '640px': '90vw'
          },
      };
      this.ref = this.dialogService.open(CodeComponent, dialogConfig);
    }
  
    onSubmit() {
      this.enviarcorreo() 
    }

  
}
