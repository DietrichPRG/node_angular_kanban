import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITodoCard } from './model/ITodoCard';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  //todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  public isOpen = true;

  public todo: ITodoCard[] = [];

  public doing: ITodoCard[] = [];
  public done: ITodoCard[] = [];

  constructor(private dialog: MatDialog, private boardService: BoardService) { }

  async ngOnInit() {
    const datas = await this.boardService.listar();
    console.log(datas);

    this.todo = datas.filter(x => x.lista === 'todo');
    this.doing = datas.filter(x => x.lista === 'doing');
    this.done = datas.filter(x => x.lista === 'done');
  }

  drop(event: CdkDragDrop<ITodoCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    // get the item that was moved
    const item = event.container.data[event.currentIndex];

    switch (event.container.id) {
      case 'cdkDoneList':
        item.lista = 'done';
        break;

      case 'cdkDoingList':
        item.lista = 'doing';
        break;

      case 'cdkTodoList':
        item.lista = 'todo';
        break;
    }
    
    this.boardService.atualizar(item);
  }

  moveCard = async (item : ITodoCard, from : string, to : string) => {

    item.lista = to;

    await this.boardService.atualizar(item);

    switch (from) {
      case 'todo':
        this.todo = this.todo.filter(x => x.id !== item.id);
        break;

      case 'doing':
        this.doing = this.doing.filter(x => x.id !== item.id);
        break;

      case 'done':
        this.done = this.done.filter(x => x.id !== item.id);
        break;
    }

    switch (to) {
      case 'todo':
        this.todo.push(item);
        break;

      case 'doing':
        this.doing.push(item);
        break;

      case 'done':
        this.done.push(item);
        break;
    }
  }

  excluir = async (item: ITodoCard) => {

    await this.boardService.excluir(item.id);

    switch (item.lista) {
      case 'todo':
        this.todo = this.todo.filter(x => x.id !== item.id);
        break;

      case 'doing':
        this.doing = this.doing.filter(x => x.id !== item.id);
        break;

      case 'done':
        this.done = this.done.filter(x => x.id !== item.id);
        break;
    }
  }

  openDialog(item?: ITodoCard): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      if (result.ehEdicao) {

        // verifica se mudou o status
        if (item?.lista !== result.data.lista) {
          // se mudou o status, remove o item da lista antiga
          switch (item?.lista) {
            case 'todo':
              this.todo = this.todo.filter(x => x.id !== result.data.id);
              break;

            case 'doing':
              this.doing = this.doing.filter(x => x.id !== result.data.id);
              break;

            case 'done':
              this.done = this.done.filter(x => x.id !== result.data.id);
              break;
          }

          // adiciona o item na nova lista
          switch (result.data.lista) {
            case 'todo':
              this.todo.push(result.data);
              break;

            case 'doing':
              this.doing.push(result.data);
              break;
              
            case 'done':
              this.done.push(result.data);
              break;
          }
        }
        else
        {
          // se não mudou o status, atualiza o item na lista
          switch (result.data.lista) {
            case 'todo':
              this.todo = this.todo.map(x => x.id === result.data.id ? result.data : x);
              break;

            case 'doing':
              this.doing = this.doing.map(x => x.id === result.data.id ? result.data : x);
              break;
              
            case 'done':
              this.done = this.done.map(x => x.id === result.data.id ? result.data : x);
              break;
          }
        }
      } else {
        // adiciona o item em sua respectiva lista
        switch (result.data.lista) {
          case 'todo':
            this.todo.push(result.data);
            break;

          case 'doing':
            this.doing.push(result.data);
            break;

          case 'done':
            this.done.push(result.data);
            break;
        }
      }
    });
  }
}
