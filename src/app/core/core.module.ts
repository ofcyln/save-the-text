import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  exports: [NotFoundComponent, AppRoutingModule, MaterialModule],
})
export class CoreModule {}
