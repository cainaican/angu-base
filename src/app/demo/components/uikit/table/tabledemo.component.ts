import { Component, DestroyRef, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { collection, doc, Firestore, getDocs, query, setDoc } from '@angular/fire/firestore';
import { concatMap, from, of, Subject, switchMap, takeUntil } from 'rxjs';
import uniqid from 'uniqid';
import { TableModel } from './table-model/table.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TableConstructorService } from './services/table-constructor.service';
interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [ConfirmationService, MessageService]
})
export class TableDemoComponent implements OnInit, OnDestroy {

  public tableToTake: string = "";
  private _destroyRef = inject(DestroyRef);
  private _destroySubj = new Subject();
  private _store = inject(Firestore);
  private _messageService = inject(MessageService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _tableConstructor = inject(TableConstructorService);


  tableData = signal<any[]>(null) ;

  loading: boolean = true;

  tableModel: TableModel | null = null;

  ngOnInit() {
    this._activatedRoute.url.subscribe(() => {
      const tableName = this._router.url.split("/").reverse()[0];

      const table_query = query(collection(this._store, tableName));
  
      from(getDocs(table_query))
      .subscribe({
          next: (data) => {
            if (data) {
              this.tableData.set((data as any).docs.map(snapshot => snapshot.data()) as any[]);
              this.loading = false;
            }
          },
          error: (err) => {
            this._messageService.add({data: "Ошибка при получении данных о работниках",detail: 'Ошибка'})
          }
      })
    })
    
  }

  get products(): any[] {
    return this.tableModel.tbody();
  }

  saveTable() {
    const tableName = this.tableModel.newTableName;
    const newtable = {
      thead: this.tableModel.thead(),
      tbody: this.tableModel.tbody(),
      name: tableName
    }

    const table_query = query(collection(this._store, decodeURI(tableName)));
    const id = uniqid();

    from(getDocs(table_query)).pipe(
      switchMap((data) => of(data?.docs[0]?.id)),
      switchMap((existId) => 
        existId ? 
          from(setDoc(doc(this._store, tableName, existId), newtable))
          : from(setDoc(doc(this._store, tableName, id), newtable))),
      concatMap(() => from(setDoc(doc(this._store, 'tables', 'admin'), {tables: [...this._tableConstructor.tableNames, tableName]}))),
      takeUntil(this._destroySubj)
    ).subscribe((data) => {
      this._messageService.add({detail: "Таблица" + tableName + 'успешно сохранена', summary: 'Сохранение', severity: "success"});
      window.location.reload();
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

  ngOnDestroy(): void {
    
  }

    
}