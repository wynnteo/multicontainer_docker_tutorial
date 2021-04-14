import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './modules/product/product.module';
const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'product' },
  	{
	    path: 'product',
	    loadChildren:() => ProductModule,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
