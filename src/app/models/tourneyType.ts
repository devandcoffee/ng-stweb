import { ITourney } from './tourney';

export interface ITourneyType {
  id?: Number;
  name: string;
  tourneys: Array<ITourney>;
}
