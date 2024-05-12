import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyCoffeShop';
  constructor(private router: Router) {}
  ngOnInit(): void {
    initFlowbite();
  }
  isPublicPage(): boolean {
    return this.router.url === '/start' || this.router.url === '/not-found' || this.router.url === '/register'; 
  }
}
