import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ShopComponent } from './shop/shop.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'edit/:produto', component: EditComponent }
];
