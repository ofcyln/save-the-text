import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule, FlexLayoutModule],
  exports: [NotFoundComponent, AppRoutingModule, MaterialModule, FlexLayoutModule],
})
export class CoreModule {}
