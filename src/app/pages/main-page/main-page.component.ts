import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  showInitTemglate: boolean = true;
  showAuthTemplate: boolean = false;
  showRegTemplate: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('init');
  }

  showAuth() {
    this.showInitTemglate = false;
    this.showAuthTemplate = true;
  }

  showReg() {
    this.showInitTemglate = false;
    this.showRegTemplate = true;
  }
}
