import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetHeroe,PostTeamColorHero,PutTeamColorHero } from './heroe.actions';
import { Heroe, HeroeTeamColor } from './heroe.model';
import { HeroesService } from '../../heroes.service'
import { tap } from 'rxjs/operators';

export class HeroeStateModel {
  public nextPage:number;
  public page:number;
  public beforePage:number;
  public limit:number;
  public total:number;
  public count:number;
  public offset:number;
  public totalPages:number;
  public heroes: Heroe[];
  public heroeTeamColor: {HeroeTeamColor:{}};
}

const defaults = {
  nextPage:0,
  page: 0,
  beforePage: 0,
  limit:0,
  total:0,
  count:0,
  offset:0,
  totalPages:0,
  heroeTeamColor: {HeroeTeamColor:{}},
  heroes: []
};

@State<HeroeStateModel>({
  name: 'heroe',
  defaults
})
@Injectable()

export class HeroeState {

   // Selectores
   @Selector()
   static heroe(state: HeroeStateModel) {
     return state;
   }
 
   constructor(private heroeService: HeroesService) { }

  @Action(GetHeroe)
  getPeople({ patchState }: StateContext<HeroeStateModel>, { payload }: GetHeroe) {
   console.log("pay",payload);   
    return this.heroeService.getHeroes(payload.page, payload.limit, payload.nameStartsWith).pipe(
      tap((resp) => {
        console.log("-----",resp);
        const {heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages } = resp;
        patchState ({heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages }) ;       
      })
    )
  }

  @Action(PostTeamColorHero)
  postTeamColorHero({ patchState }: StateContext<HeroeStateModel>, { payload }: PostTeamColorHero) {
    console.log("pay",payload); 
    return this.heroeService.postTeamColor({id_heroe: payload.id_heroe, color:payload.color}).pipe(
      tap((resp) => {
        console.log("-----",resp);
        const heroeTeamColor = resp;
        console.log("postTeamColorHero", resp);
         
      })
    )
  }

  @Action(PutTeamColorHero)
  putTeamColorHero({ patchState }: StateContext<HeroeStateModel>, { payload }: PutTeamColorHero) {
    console.log("pay",payload); 
    return this.heroeService.putTeamColor(payload.id_heroe, { color:payload.color}).pipe(
      tap((resp) => {
        console.log("-----",resp);
        const heroeTeamColor = resp;
       console.log("putTeamColorHero", resp);
         
      })
    )
  }
}
