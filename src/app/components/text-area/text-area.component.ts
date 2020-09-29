import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('saveTheText') saveTheText: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.saveTheText.nativeElement.focus();
  }
}
