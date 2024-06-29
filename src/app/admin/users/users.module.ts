import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    UsersComponent,
    UpdateUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ToolbarModule,
    TagModule,
    BadgeModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule
  ],
  exports: []
})
export class UsersModule { }
