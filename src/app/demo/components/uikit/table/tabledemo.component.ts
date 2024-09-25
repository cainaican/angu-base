import { Component, OnInit, inject, signal } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { from, of, switchMap } from 'rxjs';
import uniqid from 'uniqid';
import { TableModel } from './table-model/table.model';
interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {

  public tableToTake: string = "";

  private _store = inject(Firestore);
  private _messageService = inject(MessageService);

  employees = signal<any[]>(null) ;
  employeesTableHeaders: any[] = [
    {name: 'Имя'},
    {name: 'Фамилия'},
    {name: 'Возраст'},
    {name: 'Профессия'},
  ];

  loading: boolean = true;

  tableModel: TableModel | null = null;

  ngOnInit() {

    const emplyee_query = query(collection(this._store, "employees"));

    from(getDocs(emplyee_query))
    .subscribe({
        next: (data) => {
          if (data) {
            this.employees.set((data as any).docs.map(snapshot => snapshot.data()) as any[]);
            console.log(this.employees())
            this.loading = false;
          }
        },
        error: (err) => {
          this._messageService.add({data: "Ошибка при получении данных о работниках",detail: 'Ошибка'})
        }
    })
  }

  get products(): any[] {
    return this.tableModel.tbody();
  }

  saveTable() {

    const tableName = this.tableModel.newTableName;
    const newtable = {
      thead: this.tableModel.thead(),
      tbody: this.tableModel.tbody()
    }

    const table_query = query(collection(this._store, tableName));
    const id = uniqid();

    from(getDocs(table_query)).pipe(
      switchMap((data) => of(data?.docs[0]?.id)),
      switchMap((existId) => 
        existId ? 
          from(setDoc(doc(this._store, tableName, existId), newtable))
          : from(setDoc(doc(this._store, tableName, id), newtable))
    )).subscribe({
        next: (data) => {
          debugger
        },
        error: (data) => {
          debugger
        }
      })

  }

  getTable(tableName: string) {
    const table_query = query(collection(this._store, tableName));
    from(getDocs(table_query))
      .subscribe({
          next: (data) => {
            if (data) {
              const datas = (data as any).docs.map(snapshot => snapshot.data())[0];
              this.tableModel = new TableModel((data.query as any).id, datas.thead, datas.tbody);
              this.loading = false;
            }
          },
          error: (err) => {
            this._messageService.add({data: "Ошибка при получении данных о работниках",detail: 'Ошибка'})
          }
      })
  }

  newTable(): void {
    this.tableModel = new TableModel();
  }

  editTh(inp: HTMLInputElement) {
    inp.disabled = !inp.disabled;
  }


    
}