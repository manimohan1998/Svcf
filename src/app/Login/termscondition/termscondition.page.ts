import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-termscondition',
  templateUrl: './termscondition.page.html',
  styleUrls: ['./termscondition.page.scss'],
})
export class TermsconditionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigate(["/login"])
  }
}
