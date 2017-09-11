import { AlertMsg, ALERT_TYPES } from '../../services/alert.service';

export const CREATED: AlertMsg = {
  show: true,
  message: 'Team Created',
  type: ALERT_TYPES.success
};

export const UPDATED: AlertMsg = {
  show: true,
  message: 'Team Updated',
  type: ALERT_TYPES.success
};

export const DELETED: AlertMsg = {
  show: true,
  message: 'Team Deleted',
  type: ALERT_TYPES.success
};

export const ERROR: AlertMsg = {
  show: true,
  message: 'There was an error in server',
  type: ALERT_TYPES.danger
};



