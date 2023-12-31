import {
  Component,
  OnInit,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  constructor(private heroService: HeroService) {
  }

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    console.log(55555)
    this.searchTerms.next(term);
    console.log(66666)
  }

  ngOnInit(): void {
    console.log(44444)
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      // distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
