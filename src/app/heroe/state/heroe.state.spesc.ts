import { NgxsTestBed } from '@ngxs-labs/testing';
import {HeroeStateModel,FeedAnimals} from './heroe.state'

describe('heroe', () => {
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

  it('it toggles feed', (async () => {
    const { selectSnapshot, dispatch } = NgxsTestBed.configureTestingStates({ states: [ HeroeStateModel ] });
  
    dispatch(new HeroeStateModel());
    const feed = selectSnapshot(state => state.zoo.feed);
    
    expect(feed).toBe(true);
  }));
  
});