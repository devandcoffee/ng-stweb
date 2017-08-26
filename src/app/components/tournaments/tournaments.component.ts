import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentsService } from '../../services/tournaments.service';
import { ITournament } from '../../models/tournament';

import { FormGroup, FormControl } from '@angular/forms';

import { getDateFromString } from '../../utils/getDate';


@Component({
  selector: 'app-tournaments',
  templateUrl: 'tournaments.component.html',
  styles: []
})
export class TournamentsComponent implements OnInit {

  tournamentForm: FormGroup;
  tournaments: Array<ITournament> = [];
  tournament: ITournament = {} as ITournament;

  openedForm = false;

  pageTitle = '';

  loading = false;

  constructor(private router: Router, private tournamentsService: TournamentsService) {
  }

  ngOnInit(): void {
    this.refresh();
    this.tournamentForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      start_date: new FormControl(),
      amount_teams: new FormControl(),
      tournamentTypeId: new FormControl(),
    });
  }

  refresh() {
    this.loading = true;
    this.tournamentsService.getTournaments().subscribe(
      (tournaments: Array<ITournament>) => {
        this.tournaments = tournaments;
        this.loading = false;
      },
      error => this.processError(error)
    );
  }

  getProduct(id: number = 0): void {
    this.tournamentsService.getTournament(id)
      .subscribe(
      (tournament: ITournament) => this.onTournamentRetrieved(tournament),
    );
  }

  onTournamentRetrieved(tournament: ITournament): void {
    this.openedForm = true;
    if (this.tournamentForm) {
      this.tournamentForm.reset();
    }
    this.tournament = tournament;

    if (this.tournament.id === 0) {
      this.pageTitle = 'Add Tournament';
    } else {
      this.pageTitle = `Edit Tournament: ${this.tournament.name}`;
    }

    // Update the data on the form
    this.tournamentForm.patchValue({
      name: this.tournament.name,
      description: this.tournament.description,
      start_date: getDateFromString(this.tournament.start_date),
      amount_teams: this.tournament.amount_teams,
      tournamentTypeId: this.tournament.tournamentTypeId
    });
  }

  saveTournament() {
    this.openedForm = false;
    if (this.tournamentForm.dirty && this.tournamentForm.valid) {
      // Copy the form values over the product object values
      const tournament = Object.assign({}, this.tournament, this.tournamentForm.value);

      this.tournamentsService.saveTournament(tournament)
        .subscribe(() => this.onSaveComplete());
    }
  }

  delete(id: number): void {
    this.tournamentsService.deleteProduct(id).subscribe(() => this.onSaveComplete());
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.tournamentForm.reset();
    this.refresh();
  }

  private processError(error) {
    if (error.status === 401) {
      this.router.navigate(['/']);
    }
  }
}
