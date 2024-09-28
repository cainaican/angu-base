import { ChangeDetectorRef, Component, OnInit, inject, signal } from "@angular/core";
import { Firestore, collection, getDocs, setDoc, doc, query, namedQuery } from "@angular/fire/firestore";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { from, switchMap, of } from "rxjs";
import { TableModel } from "../table/table-model/table.model";
import uniqid from 'uniqid';

@Component({
    templateUrl: './tableview.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableViewComponent implements OnInit {

  public tableToTake: string = "";

  private _store = inject(Firestore);
  // private _messageService = inject(MessageService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);

  tableData = signal<any[]>(null) ;

  loading: boolean = true;

  tableModel = signal<TableModel | null>(null);

  constructor( private _messageService:MessageService){}

  ngOnInit() {

    this._activatedRoute.url.subscribe(() => {
      const tableName = this._router.url.split("/").reverse()[0];

      const table_query = query(collection(this._store, decodeURI(tableName)));
  
      from(getDocs(table_query))
      .subscribe({
          next: (data) => {
            if (data) {
              const mappedData = (data as any).docs.map(snapshot => snapshot.data()) as any[];
              this.tableData.set(mappedData);
              this.loading = false;
              if (!this.tableModel()) this.tableModel.set(new TableModel(mappedData[0].name, mappedData[0].thead, mappedData[0].tbody));
              if (this.tableModel()) {
                this.tableModel().newTableName = mappedData[0].name ;
                this.tableModel().thead.set(mappedData[0].thead);
                this.tableModel().tbody.set(mappedData[0].tbody);
              }
            }
          },
          error: (err) => {
            this._messageService.add({data: "Ошибка при получении данных таблицы",detail: 'Ошибка'})
          }
      })
    })
    
  }

  saveTable() {
    const tableName = this.tableModel().newTableName;
    const newtable = {
      thead: this.tableModel().thead(),
      tbody: this.tableModel().tbody(),
      name: tableName,
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
          this._messageService.add({detail: "Таблица" + tableName + 'успешно сохранена', summary: 'Сохранение', severity: "success"});
          window.location.reload();
        },
        error: (data) => {
          debugger
        }
      })

  }

  // getTable(tableName: string) {
  //   const table_query = query(collection(this._store, tableName));
  //   from(getDocs(table_query))
  //     .subscribe({
  //         next: (data) => {
  //           if (data) {
  //             const datas = (data as any).docs.map(snapshot => snapshot.data())[0];
  //             this.tableModel = new TableModel((data.query as any).id, datas.thead, datas.tbody);
  //             this.loading = false;
  //           }
  //         },
  //         error: (err) => {
  //           this._messageService.add({data: "Ошибка при получении данных о работниках",detail: 'Ошибка'})
  //         }
  //     })
  // }

  editTh(inp: HTMLInputElement) {
    inp.disabled = !inp.disabled;
  }
    
}
