import { TestBed } from '@angular/core/testing';
import {  Store,NgxsModule  } from '@ngxs/store';
import { HeroesService } from './heroes.service'
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { of,defer } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Heroe } from './classes/heroe';



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

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let heroService: HeroesService;
/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('HeroesService', () => {
  let heroesService: HeroesService;
  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','put','post']);
    heroService = new HeroesService
    
    (httpClientSpy);
  });

  it('getHeroes obtener arreglo de heroes', (done: DoneFn) => {
    const heroes: Heroe[] =
      [{  id: "1",
      name: 'iron-man',
      description: 'hombre de hierro',
      modified: "10-20-2020",
      thumbnail:{},
      resourceURI: '',
      teamColor: 'rojo',}, 
      { id:"2", name: 'iron-man',
      description: 'hombre de hierro',
      modified: "10-20-2020",
      thumbnail:{},
      resourceURI: '',
      teamColor: 'rojo'}];
      const data ={
        data: {
          totalPages: 10,
          nextPage: 1,
          page: 0,
          beforePage: 1,
          limit: 10,
          total: 10,
          count: 1500,
          offset: 0,
          heroes: heroes,
        }
      }
  
    httpClientSpy.get.and.returnValue(asyncData(data));
    const paht='http://localhost:3000/';
    const page = 0;
    const offset = 0;
    const nameStartsWith = 'spidermen'

    const url = `${paht}/heroe/${page}/${offset}/${(nameStartsWith ? nameStartsWith : '')}`  
          
    heroService.getHeroes(0,10,'spiderman').subscribe({
        next: heroes => {
          expect(heroes)
            .withContext('expected heroes')
            .toEqual(data.data);
          done();
        },
        error: done.fail
      });
      expect(httpClientSpy.get.calls.count())
        .withContext('one call')
        .toBe(1);
  
  });

  it('putHeroes actualizar equipo de un heroe', (done: DoneFn) => {
    const body:any={color:'#ffff' }   
    httpClientSpy.put.and.returnValue(asyncData(body));
    heroService.putTeamColor(1,body).subscribe(
        data => {
          console.log(data.data,"COLOR",body);
          
          expect(data.data).toEqual(body);
          done(); 
        },
        done.fail
        
      );
      expect(httpClientSpy.put.calls.count())
        .withContext('one call')
        .toBe(1);
  });

  it('postHeroes asignarle un equipo al heroe', (done: DoneFn) => {
    const body:any={id:'1',color:'#ffff' }   
    httpClientSpy.post.and.returnValue(asyncData(body));
    heroService.postTeamColor(body).subscribe(
        data => {
          console.log(data.data,"COLOR",body);
          
          expect(data.data).toEqual(body);
          done(); 
        },
        done.fail
        
      );
      expect(httpClientSpy.post.calls.count())
        .withContext('one call')
        .toBe(1);
  });

  it('postHeroes asignarle un equipo al heroe', (done: DoneFn) => {
    const body:any={id:'1',color:'#ffff' }   
    httpClientSpy.post.and.returnValue(asyncData(body));
    heroService.postTeamColor(body).subscribe(
        data => {
          console.log(data.data,"COLOR",body);
          
          expect(data.data).toEqual(body);
          done(); 
        },
        done.fail
        
      );
      expect(httpClientSpy.post.calls.count())
        .withContext('one call')
        .toBe(1);
  });

      
});

