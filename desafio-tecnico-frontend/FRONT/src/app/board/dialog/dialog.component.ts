import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { ITodoCard } from '../model/ITodoCard';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  ehEdicao = this.data !== undefined;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private boardService : BoardService,
    @Inject(MAT_DIALOG_DATA) public data?: ITodoCard
    ) {}

  ngOnInit(): void {
    if (!this.ehEdicao) {
      this.idFormControl.setValue('');
    }
  }

  idFormControl = new FormControl({value: this.data?.id, disabled: true});
  tituloFormControl = new FormControl(this.data?.titulo, [Validators.required]);
  conteudoFormControl = new FormControl(this.data?.conteudo, [Validators.required]);
  listaFormControl = new FormControl(this.data?.lista, [Validators.required]);

  onNoClick(): void {
    this.dialogRef.close();
  }

  salvar = async () => {

    this.data = {
      id: this.idFormControl.value!,
      titulo: this.tituloFormControl.value!,
      conteudo: this.conteudoFormControl.value!,
      lista: this.listaFormControl.value!
    };

    if (this.ehEdicao) {
      this.data = await this.boardService.atualizar(this.data);
    } else {
      this.data = await this.boardService.cadastrar(this.data);
    }

    this.dialogRef.close({ehEdicao : this.ehEdicao, data: this.data});
  }
}
