import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from './classes/heroe';
import {  map } from 'rxjs/operators';

@Injectable()
export class HeroesService {
  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';
  public heroes: Array<Heroe> = [];
  private paht = 'http://localhost:3000/api';
  public teams = new Map();
  
  constructor(private http: HttpClient) { }   
  getHeroes( page, offset, nameStartsWith?: string ) {  
    console.log("data=========="); 
    const url = `${this.paht}/heroe/${page}/${offset}/${(nameStartsWith ? nameStartsWith : '')}`    
    return  this.http.get<any>(url)
            .pipe(
              map( data => {
                console.log("data==========", data);
                
                const {heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages } = data
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

  postTeamColor(data) {
    const url = `${this.paht}/HeroeTeamColor/`
    return this.http.post<any>(url, data).pipe(
      map((data:{})=>{
        return { data }
      }
      )
    )
}
putTeamColor(id_heroe,data) {
  const url = `${this.paht}/HeroeTeamColor/${id_heroe}`
  return this.http.put<any>(url, data).pipe(
    map(data=>{
      return { data }
    }
    )
  )
}
}
