import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Heroe } from '../classes/heroe';
import { HeroesService } from '../heroes.service';

import { Location } from '@angular/common';
import { PostTeamColorHero,PutTeamColorHero } from '../heroe/state/heroe.actions'
import { HeroeState } from '../heroe/state/heroe.state';
import { Observable } from 'rxjs';


import { ModalPollComponent } from '../modal-poll/modal-poll.component';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit {

    // Selector asociado a la propiedad people del estado
    @Select(HeroeState.heroe)
    heroe$: Observable<Heroe>;

  @ViewChild('modal') modal;
  private assignedTeam:boolean;
  public heroe: Heroe;
  public question_modal: string;
  public team:string = "";
  public group_colors = {"azul" : "#1f8ff7",
                        "violeta":"#a43de3",
                        "naranjo":"#df5c0f",
                        "verde":"#0ea521"}

  constructor(private route: ActivatedRoute, 
              private heroesService: HeroesService, 
              private _location: Location,
              private store: Store ) { }

  ngOnInit() {
    this.heroe = JSON.parse(localStorage.getItem('heroe'))
    this.assignedTeam = this.heroe.teamColor!=''?true:false
    console.log("assignedTeam",this.assignedTeam);
    
    this.fetchHeroe()
    
  }

  goBack() {
    this._location.back();
  }

  getTeam(team):void{
    console.log("Color: "+this.group_colors[team]);
    this.team = team;
    
    if (!this.assignedTeam) {
      console.log("post");
      
      this.store.dispatch(new PostTeamColorHero({id_heroe:this.heroe.id, color:this.group_colors[team] }));
    }else{
      console.log("put");
      this.store.dispatch(new PutTeamColorHero({id_heroe:this.heroe.id, color:this.group_colors[team] }));
    }
  }

  launchModal():void{
    //this.question_modal="¿Dónde ubicarías a tu súper héroe?";
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }

  fetchHeroe(){
    // Nos subscribimos para estar pendiente de los cambios de la propiedad
    this.heroe$.subscribe({
      next: (data) => {
        
        // Obtenemos el team color del heroes
        console.log("fetchHeroe",data);
        
        
      }
    })
  }

}
