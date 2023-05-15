export class GetHeroe {
  static readonly type = '[Heroe] Get Heroes';
  constructor(public payload: { nameStartsWith?: string, page: number, limit:number }) { }
}
export class PostTeamColorHero {
  static readonly type = '[Heroe] Post Team Color Heroe';
  constructor(public payload: { id_heroe:string, color:string }) { }
}
export class PutTeamColorHero {
  static readonly type = '[Heroe] Put Team Color Heroe';
  constructor(public payload: { id_heroe:string, color:string }) { }
}


