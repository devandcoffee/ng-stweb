import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ITeam } from '../../models/teams';
import { IStatus } from '../../models/status';

import { FormGroup, FormControl } from '@angular/forms';

import { getDateFromString } from '../../utils/getDate';
import { AlertService, ALERT_TYPES } from '../../services/alert.service';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styles: []
})
export class TeamsComponent implements OnInit {

  teamForm: FormGroup;
  teams: Array<ITeam> = [];
  statuses: Array<IStatus> = [];

  team: ITeam = {} as ITeam;

  openedForm = false;

  pageTitle = '';

  loading = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.refresh();
    // this.statusesService.getStatuses().
    //   subscribe((statuses: Array<IStatus>) => this.statuses = statuses);
    // this.teamForm = new FormGroup({
    //   name: new FormControl(),
    //   statusId: new FormControl(),
    // });
  }

  refresh() {
    this.loading = true;
    // this.teamsService.getTeams().subscribe(
    //   (teams: Array<ITeam>) => {
    //     this.teams = teams;
    //     this.loading = false;
    //   },
    //   error => this.processError(error)
    // );
  }

  getTeam(id: number = 0): void {
    // this.teamsService.getTeam(id)
    //   .subscribe(
    //   (team: ITeam) => this.onTeamRetrieved(team),
    // );
  }

  onTeamRetrieved(team: ITeam): void {
    this.openedForm = true;
    if (this.teamForm) {
      this.teamForm.reset();
    }
    this.team = team;

    if (this.team.id === '') {
      this.pageTitle = 'Add Team';
    } else {
      this.pageTitle = `Edit Team: ${this.team.name}`;
    }

    // Update the data on the form
    this.teamForm.patchValue({
      name: this.team.name,
      statusId: this.team.statusId
    });
  }

  saveTeam() {
    this.openedForm = false;
    if (this.teamForm.dirty && this.teamForm.valid) {
      const team = Object.assign({}, this.team, this.teamForm.value);

      // this.teamsService.saveTeam(team)
      //   .subscribe(() => this.onSaveComplete());
    }
  }

  delete(id: number): void {
    // this.teamsService.deleteTeam(id).subscribe(() => this.onSaveComplete());
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.teamForm.reset();
    this.refresh();
  }

  private processError(error) {
    if (error.status === 401) {
      this.router.navigate(['/']);
    }
  }

}
