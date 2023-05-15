import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from './classes/heroe';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable()
export class HeroesService {

  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';
  public heroes: Array<Heroe> = [];
  private paht = 'http://localhost:3000/api';
  
  public teams = new Map();

  constructor(private http: HttpClient) { }



  /*getHeroes (nameStartsWith?: string, page?: number) {
    console.log("TEAMS");
    console.log(Array.from(this.teams));
    if (page || page === 0) {
      this.page = page;
    }
    const url = this.protocol + this.ApiUrl + 'characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b'
    + '&offset=' + (this.page * this.step)
    + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    console.log("apiUrlXXX-----",this.apiUrlXXX);
    
    this.http.get<any>(this.apiUrlXXX).subscribe((data) => {
      this.heroes = [];
      this.total = Math.ceil(data.data.total / this.step);
      data.data.results.forEach( result => {
          this.heroes.push(new Heroe(
            result.id,
            result.name,
            result.description,
            result.modified,
            result.thumbnail,
            result.resourceURI,
            this.getTeamColor(result.id)
          ));
        }
      );
    });
    console.log("serv", this.heroes);    
  }*/

   
  getHeroes( page, offset, nameStartsWith?: string ) {
    console.log("TEAMS");
    console.log(Array.from(this.teams));
   
    const url = `${this.paht}/heroe/${page}/${offset}/${(nameStartsWith ? nameStartsWith : '')}`
 
    console.log("getHeroes>>>",url);
    
    return  this.http.get<any>(url)
            .pipe(
              map( data => {
                const {heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages } = data.data
                console.log("this.heroes==",data.data);
                return {
                   totalPages:totalPages,
                   nextPage:nextPage,
                   page:page,
                   beforePage:beforePage,
                   limit:limit,
                   total:total,
                   count:count,
                   offset:offset,
                   heroes: heroes,
                };
              })
              
            )
  }

  getHeroe(id) {
    const url = this.protocol + this.ApiUrl + 'characters/' + id + '?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b';
    console.log(url);
    return this.http.get<any>(url);
  }

  getTeamColor(id):string{
    if(this.teams.get(id)!=undefined){
      return this.teams.get(id);
    }
    else{
      return "";
    }
  }

  postTeamColor(data) {
    console.log("postTeamColor",data);
    const url = `${this.paht}/HeroeTeamColor/`
    return this.http.post<any>(url, data).pipe(
      map(data=>{
        return { data }
      }
      )
    )
}
putTeamColor(id_heroe,data) {
  console.log("PUtTeamColor",data);
  const url = `${this.paht}/HeroeTeamColor/${id_heroe}`
  return this.http.put<any>(url, data).pipe(
    map(data=>{
      return { data }
    }
    )
  )
}
}
