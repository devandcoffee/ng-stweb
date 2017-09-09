import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const ALERT_TYPES = {
  danger: 'alert-danger',
  warning: 'alert-warning',
  info: 'alert-info',
  success: 'alert-success'
};

export class AlertMsg {
  show: boolean;
  message: string;
  type: string;
}

@Injectable()
export class AlertService {

  alertStatus: BehaviorSubject<AlertMsg> = new BehaviorSubject<AlertMsg>({
    show: false,
    message: null,
    type: null
  });

  show(alertMsg: AlertMsg) {
    this.alertStatus.next(alertMsg);
  }
}
