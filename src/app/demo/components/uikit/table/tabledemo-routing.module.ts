import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableDemoComponent } from './tabledemo.component';
import { TableViewComponent } from '../table-view/tableview.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TableDemoComponent },
		{ path: '**', component: TableViewComponent },
	])],
	exports: [RouterModule]
})
export class TableDemoRoutingModule { }
