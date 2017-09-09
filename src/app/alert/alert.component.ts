import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AlertMsg } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements OnInit {

  @Input('alertMsg') alertMsg: AlertMsg;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onCloseAlert() {
    this.onClose.emit();
  }

}
