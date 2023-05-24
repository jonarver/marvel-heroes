import { TestBed } from '@angular/core/testing';
import {  Store,NgxsModule  } from '@ngxs/store';
import { SetHeroeProfile,PostTeamColorHero,PutTeamColorHero,GetHeroe } from './heroe.actions'
import {HeroeStateModel,HeroeState } from './heroe.state'
import { HeroesService } from '../../heroes.service'
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { of } from 'rxjs';



class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
  put = jasmine.createSpy('httpClient.put');
  post = jasmine.createSpy('httpClient.post');

}


const mockTestFeeService = {
  postTeamColor: () => of({data:{color:"#ffff"}}),
  putTeamColor: () => of({data:{color:"#ffff"}}),
  getHeroes: () => of({heroes:[], nextPage:1, 
                      page:0, beforePage:0, 
                      limit:10, total:10, count:10, offset:0, totalPages:10 })
};

describe('heroe Store', () => {
  let store: Store;
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [NgxsModule.forRoot([HeroeState,])],
          providers:[HeroesService,]
       
        });
        TestBed.configureTestingModule({
          imports: [NgxsModule.forRoot([HeroeState])],
          providers: [
            HeroesService,
            {provide: HttpClient, useClass: HttpClientMock},
            {provide: HeroesService, useValue: mockTestFeeService }
          ]
        });
        store = TestBed.inject(Store);
      });

      it('SetHeroeProfile', () => {
        const payload={data:{
          id: "1",
          name: 'iron-man',
          description: 'hombre de hierro',
          modified: "10-20-2020",
          thumbnail:{},
          resourceURI: '',
          teamColor: 'rojo',
        }}
        store.dispatch(new SetHeroeProfile(payload));
        const state = store.selectSnapshot(state => state.heroe.heroe);
        expect(state.name).toBe('iron-man');
      });

      it('PostTeamColorHero', async() => {
        const payload={
          id_heroe: "1",
          color: '#ffff',
        }    
        store.dispatch(new PostTeamColorHero(payload)).toPromise
        const state = store.selectSnapshot(state => state.heroe.heroe);
        expect(state.teamColor).toBe('');
      });
      it('PutTeamColorHero', async() => {
        const payload={
          id_heroe: "1",
          color: '#ffff',
        }    
        store.dispatch(new PutTeamColorHero(payload)).toPromise
        const state = store.selectSnapshot(state => state.heroe.heroe);
        expect(state.teamColor).toBe('');
      });
      it('GetHeroe', async() => {
        const payload={ nameStartsWith: 'spiderman', page: 0, limit:10 }   
        store.dispatch(new GetHeroe(payload)).toPromise
        const state = store.selectSnapshot(state => state);
        expect(state.heroes).toEqual([]);
      });
});