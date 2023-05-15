import { Component, OnInit, ViewChild } from '@angular/core';
//import { Heroe } from '../classes/heroe';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { listHeroes, Heroe } from '../heroe/state/heroe.model'
import { GetHeroe } from '../heroe/state/heroe.actions'
import { HeroeState } from '../heroe/state/heroe.state';

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString;
  public heroes : Heroe[] ;
  public page = 1;
  public total = 0;
  public offset = 10;
  public beforePage = 0;
  public limit= 0;
  public count= 0;
  public nextPageH = 0;
  public totalPages = 0

   // Selector asociado a la propiedad people del estado
   @Select(HeroeState.heroe)
   heroe$: Observable<listHeroes>;

  // The child component : spinner
  @ViewChild('spi') spinner;
  /* public heroes: Array<Heroe> = []; */

  constructor(private heroesService: HeroesService, 
              private router:Router,
              private store: Store ) { }
  async ngOnInit() {
   
    /*const her = await this.heroesService.cargarUsuarios().subscribe((data) => {
      console.log("her---",data);
    this.heroes = data.heroes

    })*/

    // this.heroes = this.heroesService.heroes
    // this.page=this.heroesService.page
    // this.total=this.heroesService.total

    
    this.filter(0, 10)
    this.fetchHeroe()
  }
 
  submitSearch() {
    console.log("filter");
    
    this.filter(0, this.limit, this.searchString);
  }

  prevPage() {
    this.filter( this.beforePage, this.offset,this.searchString );
  }

  nextPage() {
 
    this.filter(this.nextPageH, this.limit, this.searchString);
  }

  go_to(data){
     // Guardo los datos del heroe en local localStorage
     console.log("data",data);
     
     localStorage.setItem('heroe',JSON.stringify(data));

    this.router.navigateByUrl('/heroe/'+data.id);
  }
  /*get_heroes(){
    this.heroesService.getHeroes();
  }*/

  filter(page, limit, nameStartsWith?) {
   
    // Activo la acción, dandole el nombre a filtrar
    this.store.dispatch(new GetHeroe({ page, limit, nameStartsWith }));
  }

  fetchHeroe(){
    // Nos subscribimos para estar pendiente de los cambios de la propiedad
    this.heroe$.subscribe({
      next: (data) => {
        
        // Obtenemos el array de heroes
        const {heroes, nextPage, page, beforePage, limit, total, count, offset, totalPages } = data
        this.heroes  = heroes
        this.nextPageH=nextPage,
         this.page=page,
         this.beforePage=beforePage,
         this.limit=limit,
         this.total=total,
         this.count=count,
         this.offset=offset
         this.totalPages= totalPages 
        
      }
    })
  }

}
