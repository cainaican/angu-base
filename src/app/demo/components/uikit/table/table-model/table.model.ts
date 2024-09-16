import { signal } from "@angular/core";

export class TableModel {
  thead = signal([
    {name: 'Заголовок 1', key: 'заголовок1'},
    {name: 'Заголовок 2', key: 'заголовок2'}
  ]);

  tbody = signal([])

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

    for(let key of this.thead()) {
      newRow[key.name.toLowerCase().replaceAll(" ", "")] = Math.random().toFixed(4); 
    }

    this.tbody.set(
      [
      ...this.tbody(), newRow
      ]
    );

  }

  addColumn() {

    const newCol = {name: 'Новый Заголовок', key: 'новыйзаголовок'};

    this.thead.set(
      [
      ...this.thead(), newCol
      ]
    );

    console.log(this.thead());
    console.log(this.tbody());

  }

} 