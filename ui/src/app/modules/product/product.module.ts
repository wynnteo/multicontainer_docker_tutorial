import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material.module';
import { ProductRoutingModule } from './product.routing.module';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    AngularMaterialModule,
    ProductRoutingModule
  ],
  declarations: [
  	ProductListComponent
  ],
  entryComponents: [],
  providers: [],
})
export class ProductModule {}
