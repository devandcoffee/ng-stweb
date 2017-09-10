import { AlertMsg, ALERT_TYPES } from '../../services/alert.service';

export const LOGGED_IN: AlertMsg = {
  show: true,
  message: 'Logged In',
  type: ALERT_TYPES.success
};

export const LOGIN_FAILED: AlertMsg = {
  show: true,
  message: 'Username or password is incorrect',
  type: ALERT_TYPES.danger
};



