export interface HeroesStateModel {
    posts: Heroe[];
  }
  
  export interface Heroe {
     id: string;
     name: string;
     description: string;
     modified: Date;
     thumbnail: Object;
     resourceURI: string;
     teamColor: string;
  }

  export interface listHeroes{
   beforePage:number
   count:number
   heroes:Heroe[]
   limit:number
   nextPage:number
   offset:number
   page:number
   total:number
   totalPages:number
   nameStartsWith:string
   heroe:Heroe
  }

  export interface HeroeTeamColor {
   id: string;
   calor: string;
   
}