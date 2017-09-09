import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarityIcons } from 'clarity-icons';

import { AlertService, AlertMsg } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  alertMsg: AlertMsg;

  constructor(
    private router: Router,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.alertStatus.subscribe((alertMsg: AlertMsg) =>
      this.alertMsg = alertMsg
    );
  }

  onCloseAlert() {
    const alertMsg = {
      show: false,
      message: null,
      type: null,
    }
    this.alertService.show(alertMsg);
  }
}
