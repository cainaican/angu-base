import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService,
        provideFirebaseApp(() => initializeApp({"projectId":"agronom-f15b4","appId":"1:104468609284:web:9eccfa8386de057d81b851","storageBucket":"agronom-f15b4.appspot.com","apiKey":"AIzaSyA2rKNqDK7QenWSI0iO8BBnTLFERx5AXQQ","authDomain":"agronom-f15b4.firebaseapp.com","messagingSenderId":"104468609284"})), 
        provideAuth(() => getAuth()), 
        provideFirestore(() => getFirestore()), 
        provideStorage(() => getStorage())

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
