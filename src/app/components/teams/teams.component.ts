import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../../services/teams.service';
import { StatusesService } from '../../services/statuses.service';

import { ITeam } from '../../models/teams';
import { IStatus } from '../../models/status';

import { FormGroup, FormControl } from '@angular/forms';

import { getDateFromString } from '../../utils/getDate';

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
    private teamsService: TeamsService,
    private statusesService: StatusesService
  ) {
  }

  ngOnInit(): void {
    this.refresh();
    this.statusesService.getStatuses().
      subscribe((statuses: Array<IStatus>) => this.statuses = statuses);
    this.teamForm = new FormGroup({
      name: new FormControl(),
      statusId: new FormControl(),
    });
  }

  refresh() {
    this.loading = true;
    this.teamsService.getTeams().subscribe(
      (teams: Array<ITeam>) => {
        this.teams = teams;
        this.loading = false;
      },
      error => this.processError(error)
    );
  }

  private processError(error) {
    if (error.status === 401) {
      this.router.navigate(['/']);
    }
  }

}
