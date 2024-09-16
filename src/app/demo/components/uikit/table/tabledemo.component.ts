import { Component, OnInit, ViewChild, ElementRef, inject, signal } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { Database, ref, set } from '@angular/fire/database';
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

  tableModel = null;

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

  saveTable(data: {
    tableName: string,
    fields: object
  }) {

    const id = uniqid();

    
    from(setDoc(doc(this._store, data.tableName, id), data.fields)).subscribe({
      next: (data) => {
        debugger
      },
      error: (data) => {
        debugger
      }
    })
  }

  newTable(): void {
    this.tableModel = new TableModel();
  }


    
}