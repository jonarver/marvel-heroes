import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetHeroe,PostTeamColorHero,PutTeamColorHero,SetHeroeProfile, GetHeroeProfile } from './heroe.actions';
import { Heroe, HeroeTeamColor } from './heroe.model';
import { HeroesService } from '../../heroes.service'
import { tap } from 'rxjs/operators';
import { state } from '@angular/animations';

// Actions
export class FeedHeroe {
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
  public nameStartsWith: string;
  public heroe: Heroe;
  public feed: Boolean;
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

  heroes: [],
  nameStartsWith:'',
  heroe:{
     id: '',
     name: '',
     description: '',
     modified: '',
     thumbnail: {},
     resourceURI: '',
     teamColor: '',
  },
  feed: false,
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
  getHeroe({ patchState }: StateContext<HeroeStateModel>, { payload }: GetHeroe) { 
   const nameStartsWith = payload.nameStartsWith
    return this.heroeService.getHeroes(payload.page, payload.limit, payload.nameStartsWith ).pipe(
      tap((resp) => {
        const {heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages } = resp;
        patchState ({heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages,nameStartsWith }) ;       
      })
    )
  }
  @Action(SetHeroeProfile)
  setHeroeProfile(ctx: StateContext<HeroeStateModel>, { payload }: SetHeroeProfile) {
    const state = ctx.getState();
    const heroe = payload.data 
    ctx.setState ({...state,heroe}) ;       
  }

  @Action(GetHeroeProfile)
  getHeroeProfile(ctx: StateContext<HeroeStateModel>, { payload }: SetHeroeProfile) {
    const state = ctx.getState();
    const {heroe} = state 
    return heroe 
  }

  @Action(PostTeamColorHero)
  postTeamColorHero(ctx: StateContext<HeroeStateModel>, { payload }: PostTeamColorHero) {
    
    return this.heroeService.postTeamColor({id_heroe: payload.id_heroe, color:payload.color}).pipe(
      tap((resp) => {
        //const {color} = resp.data;
        const state = ctx.getState();
        //state.heroe.teamColor=color
        ctx.setState ({...state,}) ;        
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
