import { ITourney } from './tourney';

export interface IUserInfo {
  id?: Number;
  firstname: String;
  lastname: String;
  email: String;
  avatar: String;
  tourneys?: Array<ITourney>;
}
