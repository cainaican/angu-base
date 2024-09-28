import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { collection, DocumentData, Firestore, getDocs, query, QuerySnapshot } from '@angular/fire/firestore';
import { TableConstructorService } from '../demo/components/uikit/table/services/table-constructor.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  tableNames: any[] = [];
  
  private _store = inject(Firestore);
  private _tableConstructor = inject(TableConstructorService);

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Главная',
        items: [
          {
            label: 'Дашборд',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
          {
            label: 'Конструктор таблиц',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/uikit/table'],
          },
        ],
      },
      {
        label: 'Таблицы',
        items: [
          // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
          // { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
          // { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
          // { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
          // { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
         
          // { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
          // { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
          // { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
          // { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
          // { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
          // { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
          // { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
          // { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
          // { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
          // { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
        ],
      },
      // {
      //     label: 'Prime Blocks',
      //     items: [
      //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
      //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
      //     ]
      // },
      // {
      //     label: 'Utilities',
      //     items: [
      //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
      //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
      //     ]
      // },
      // {
      //     label: 'Pages',
      //     icon: 'pi pi-fw pi-briefcase',
      //     items: [
      //         {
      //             label: 'Landing',
      //             icon: 'pi pi-fw pi-globe',
      //             routerLink: ['/landing']
      //         },
      //         {
      //             label: 'Auth',
      //             icon: 'pi pi-fw pi-user',
      //             items: [
      //                 {
      //                     label: 'Login',
      //                     icon: 'pi pi-fw pi-sign-in',
      //                     routerLink: ['/auth/login']
      //                 },
      //                 {
      //                     label: 'Error',
      //                     icon: 'pi pi-fw pi-times-circle',
      //                     routerLink: ['/auth/error']
      //                 },
      //                 {
      //                     label: 'Access Denied',
      //                     icon: 'pi pi-fw pi-lock',
      //                     routerLink: ['/auth/access']
      //                 }
      //             ]
      //         },
      //         {
      //             label: 'Crud',
      //             icon: 'pi pi-fw pi-pencil',
      //             routerLink: ['/pages/crud']
      //         },
      //         {
      //             label: 'Timeline',
      //             icon: 'pi pi-fw pi-calendar',
      //             routerLink: ['/pages/timeline']
      //         },
      //         {
      //             label: 'Not Found',
      //             icon: 'pi pi-fw pi-exclamation-circle',
      //             routerLink: ['/notfound']
      //         },
      //         {
      //             label: 'Empty',
      //             icon: 'pi pi-fw pi-circle-off',
      //             routerLink: ['/pages/empty']
      //         },
      //     ]
      // },
      // {
      //     label: 'Hierarchy',
      //     items: [
      //         {
      //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //                 {
      //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
      //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
      //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
      //                     ]
      //                 },
      //                 {
      //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
      //                     ]
      //                 },
      //             ]
      //         },
      //         {
      //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
      //             items: [
      //                 {
      //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
      //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
      //                     ]
      //                 },
      //                 {
      //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
      //                     items: [
      //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
      //                     ]
      //                 },
      //             ]
      //         }
      //     ]
      // },
      // {
      //     label: 'Get Started',
      //     items: [
      //         {
      //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
      //         },
      //         {
      //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
      //         }
      //     ]
      // }
    ];

    const q = query(collection(this._store, 'tables'));
    getDocs(q).then((data: QuerySnapshot) => {
      const rawData = (data.docs[0].data() as any).tables;
      this._tableConstructor.tableNames = rawData;
      this.tableNames = rawData.map(el => {
       return { 
        label: el,
        icon: 'pi pi-fw pi-table',
        routerLink: ['/uikit/table/' + el]
       }
      });

      this.model[1].items = [...this.model[1].items, ...this.tableNames];
    })
  }
}
