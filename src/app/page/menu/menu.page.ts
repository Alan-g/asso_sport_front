import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router,
              private menu: MenuController) {
    // this.menu.enable(true, 'first');
    this.menu.open();
  }

  ngOnInit() {
  }

}
