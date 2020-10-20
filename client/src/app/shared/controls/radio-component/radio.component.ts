import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RadioData } from '../../models/radio.data';

@Component({
  selector: 'radio-component',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() title: string = '';
  @Input() array: RadioData[] = [];
  @Input() name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
