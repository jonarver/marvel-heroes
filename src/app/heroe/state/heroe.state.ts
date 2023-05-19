import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetHeroe,PostTeamColorHero,PutTeamColorHero,SetHeroeProfile } from './heroe.actions';
import { Heroe, HeroeTeamColor } from './heroe.model';
import { HeroesService } from '../../heroes.service'
import { tap } from 'rxjs/operators';
import { state } from '@angular/animations';

// Actions
export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
}

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
  public nameStartsWith: string;
  public heroe: {};
}

const defaults = {
  nextPage:0,
  page: 0,
  beforePage: 0,
  limit:10,
  total:0,
  count:0,
  offset:0,
  totalPages:0,
  heroeTeamColor: {HeroeTeamColor:{}},
  heroes: [],
  nameStartsWith:'',
  heroe:{}
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
   const nameStartsWith = payload.nameStartsWith
    return this.heroeService.getHeroes(payload.page, payload.limit, payload.nameStartsWith ).pipe(
      tap((resp) => {
        const {heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages } = resp;
        patchState ({heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages,nameStartsWith }) ;       
      })
    )
  }
  @Action(SetHeroeProfile)
  setHeroeProfile({ patchState }: StateContext<HeroeStateModel>, { payload }: SetHeroeProfile) {
    const heroe = payload.data 
    patchState ({heroe, ...heroe}) ;       
  }

  @Action(PostTeamColorHero)
  postTeamColorHero({ patchState }: StateContext<HeroeStateModel>, { payload }: PostTeamColorHero) {
    return this.heroeService.postTeamColor({id_heroe: payload.id_heroe, color:payload.color}).pipe(
      tap((resp) => {
        const heroeTeamColor = resp;         
      })
    )
  }

  @Action(PutTeamColorHero)
  putTeamColorHero({ patchState }: StateContext<HeroeStateModel>, { payload }: PutTeamColorHero) {
    return this.heroeService.putTeamColor(payload.id_heroe, { color:payload.color}).pipe(
      tap((resp) => {
        const heroeTeamColor = resp;         
      })
    )
  }

}
