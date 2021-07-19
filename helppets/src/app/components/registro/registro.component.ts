import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public state

  constructor(
    public activate : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activate.paramMap.subscribe(dataRuta=>{
      this.state = dataRuta.get('state')
    })
    console.log(this.state)
  }


  start(state) {

  }

}
