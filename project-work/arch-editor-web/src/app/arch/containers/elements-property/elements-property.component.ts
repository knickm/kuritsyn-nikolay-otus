import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-elements-property',
  templateUrl: './elements-property.component.html',
  styleUrls: ['./elements-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementsPropertyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
