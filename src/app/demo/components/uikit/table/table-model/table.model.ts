import { signal } from "@angular/core";
import uniqid from 'uniqid';

export interface IThead {
  name: string;
  key: string;
}
export interface ITBody {
  name: string;
  key: string;
}

export class TableModel {

  public newTableName = '';

  thead = signal<IThead[]>([
    {name: 'Заголовок 1', key: uniqid() + uniqid()},
    {name: 'Заголовок 2', key: uniqid() + uniqid()}
  ]);

  tbody = signal([])

  constructor(name?: string, thead?: IThead[], tbody?: ITBody[]) {
    if (thead && tbody && name) {
      this.thead.set(thead);
      this.tbody.set(tbody);
      this.newTableName = name;
    }
  }

  get theadValues(): string[] {
    return this.thead().map(el => el.name);
  }

  get theadKeys(): string[] {
    return this.thead().map(el => el.key);
  }

  get length(): number {
    return this.tbody().length ?? 0;
  }


  addRow() {
    const newRow = {};
    for(let row of this.thead()) {
      newRow[row.key] = ""; 
    }
    this.tbody.set(
      [
      ...this.tbody(), newRow
      ]
    );
  }

  addColumn() {
    const newCol = {name: 'Новый Заголовок', key: uniqid() + uniqid()};
    this.thead.set(
      [
      ...this.thead(), newCol
      ]
    );
  }

  dblclickOnTheadItem(e: MouseEvent, thObject: Object) {
    this.changeColumnName(e, thObject);
  }

  private changeColumnName(e: MouseEvent, th: Object) {
      

    
  }

} 