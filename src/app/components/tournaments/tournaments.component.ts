import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { getDateFromString } from '../../utils/getDate';

import { ITourney } from '../../models/tourney';
import { ITourneyType } from '../../models/tourneyType';
import { IUserInfo } from '../../models/user';
import { AlertService, AlertMsg } from '../../services/alert.service';
import { CREATED, ERROR, UPDATED, DELETED } from './messages';
import { validDate } from '../../shared/formValidators';

const CurrentTournaments = gql`
  query CurrentTournaments{
    tourneys {
      id
      name
      description
      start_date
      amount_teams
      tourney_type {
        id
        name
      }
    }
  }
`;

const CurrentTournament = gql`
  query CurrentTournament($id: Int!) {
    tourney(id: $id) {
      id
      name
      amount_teams
      start_date
      amount_teams
      description
      user {
        id
      }
      tourney_type {
        id
        name
      }
    }
  }
`;

const CreateTournament = gql`
  mutation CreateTournament($tourney: NewTourney) {
    createTourney(tourney: $tourney) {
      id
      name
    }
  }
`;

const UpdateTournament = gql`
  mutation UpdateTournament($id: Int!, $tourney: EditTourney) {
    updateTourney(id: $id, tourney: $tourney) {
      id
      name
    }
  }
`;

const CurrentTournamentTypes = gql`
  query CurrentTourneysTypes {
    tourneysTypes {
      id
      name
    }
  }
`;

const DeleteTournament = gql`
  mutation DeleteTournament($id: Int!) {
    deleteTourney(id: $id) {
      id
      name
      amount_teams
      start_date
      amount_teams
      description
      user {
        id
      }
      tourney_type {
        id
        name
      }
    }
  }
`;

const USER_DATA = {
  'id': 1,
  'lastname': 'Upton',
  'firstname': 'Isom',
  'email': 'Nayeli.Abbott@Swift.org',
  'avatar': 'http://www.gravatar.com/avatar/?s=200'
};

@Component({
  selector: 'app-tournaments',
  templateUrl: 'tournaments.component.html',
  styles: []
})
export class TournamentsComponent implements OnInit {

  tourneysStream$: any;
  tournamentForm: FormGroup;
  tourneys: Array<ITourney> = [];
  tourneysTypes: Array<ITourneyType> = [];

  tourney: ITourney = {} as ITourney;

  openedForm = false;

  pageTitle = '';

  loading = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.tourneysStream$ = this.apollo.watchQuery<any>({
      query: CurrentTournaments
    });

    this.tourneysStream$.subscribe(({ data }) => {
      this.tourneys = data.tourneys;
    });

    this.apollo.watchQuery<any>({
      query: CurrentTournamentTypes
    }).subscribe(({ data }) => {
      this.tourneysTypes = data.tourneysTypes;
    });

    this.tournamentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(),
      start_date: new FormControl(null, [Validators.required, validDate]),
      amount_teams: new FormControl(null, [Validators.required, Validators.min(1)]),
      tourney_type: new FormControl(null, [Validators.required]),
    });
  }

  refresh() {
    this.loading = true;
  }

  getTourney(id: number = 0): void {
    if (id) {
      this.apollo.watchQuery<any>({
        query: CurrentTournament,
        variables: {
          id
        }
      }).subscribe(({ data }) => {
        this.onTourneyRetrieved(data.tourney);
      });
    } else {
      const tourney = {
        name: '',
        description: '',
        start_date: '',
        amount_teams: 0,
        user: USER_DATA,
        tourney_type: {} as ITourneyType,
      };
      this.onTourneyRetrieved(tourney);
    }
  }

  onTourneyRetrieved(tourney: ITourney): void {
    this.openedForm = true;
    if (this.tournamentForm) {
      this.tournamentForm.reset();
    }
    this.tourney = tourney;

    if (!this.tourney) {
      this.pageTitle = 'Add Tournament';
    } else {
      this.pageTitle = `Edit Tournament: ${this.tourney.name}`;
      const tourney_type = this.tourneysTypes.find(x => x.id === this.tourney.tourney_type.id);
      this.tournamentForm.patchValue({
        name: this.tourney.name,
        description: this.tourney.description,
        start_date: getDateFromString(this.tourney.start_date),
        amount_teams: this.tourney.amount_teams,
        tourney_type: tourney_type
      });
    }
  }

  saveTournament() {
    this.openedForm = false;
    if (this.tournamentForm.dirty && this.tournamentForm.valid) {
      const tourney: ITourney = Object.assign({}, this.tourney, this.tournamentForm.value);
      if (!tourney.id) {
        this.apollo.mutate({
          mutation: CreateTournament,
          variables: {
            'tourney': {
              name: tourney.name,
              description: tourney.description,
              amount_teams: tourney.amount_teams,
              user_id: +tourney.user.id,
              tourney_type_id: +tourney.tourney_type.id
            }
          }
        }).subscribe(x => {
          this.onOperationComplete();
          this.alertService.show(CREATED);
        }, err => {
          this.alertService.show(ERROR);
        });
      } else {
        this.apollo.mutate({
          mutation: UpdateTournament,
          variables: {
            'id': tourney.id,
            'tourney': {
              name: tourney.name,
              description: tourney.description,
              amount_teams: tourney.amount_teams,
              start_date: tourney.start_date,
            }
          }
        }).subscribe(x => {
          this.onOperationComplete();
          this.alertService.show(UPDATED);
        }, err => {
          this.alertService.show(ERROR);
        });
      }
    }
  }

  deleteTourney(id: number): void {
    this.apollo.mutate({
      mutation: DeleteTournament,
      variables: {
        'id': id
      }
    }).subscribe(x => {
      this.onOperationComplete();
      this.alertService.show(DELETED);
    }, err => {
      this.alertService.show(ERROR);
    });
  }

  onOperationComplete(): void {
    // Reset the form to clear the flags
    this.tournamentForm.reset();
    this.tourneysStream$.refetch();
  }
}
