import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectapp',
  templateUrl: './selectapp.page.html',
  styleUrls: ['./selectapp.page.scss'],
})
export class SelectappPage implements OnInit {
type=['Customer','Employee']
  constructor(private router:Router) { }

  ngOnInit() {
  }
  select(val){
  localStorage.setItem("app",val)
  this.router.navigate(['/login'])
  }
}
