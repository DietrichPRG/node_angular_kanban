import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar) { }

  public openSuccess(message: string) {
    this.snackBar.open(message, 'Sucesso!', {
      duration: 5000,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public openError(message: string) {
    this.snackBar.open(message, 'ERRO!', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}