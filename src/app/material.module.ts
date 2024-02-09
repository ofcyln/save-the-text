import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [MatIconModule, MatButtonModule],
  exports: [MatIconModule, MatButtonModule],
})
export class MaterialModule {}
