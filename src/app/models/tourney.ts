import { IUserInfo } from './user';
import { ITourneyType } from './tourneyType';

export interface ITourney {
  id?: Number;
  name: string;
  description: string;
  start_date: string;
  amount_teams: Number;
  user: IUserInfo;
  tourney_type: ITourneyType;
}
