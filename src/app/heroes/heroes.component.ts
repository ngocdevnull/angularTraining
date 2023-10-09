import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService } from '../messages.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent {
  constructor(
    private heroService: HeroService,
    private messagesService: MessagesService,
    route: ActivatedRoute
  ) {
    route.params.subscribe((params) => console.log(params));
  }
  selectedHero?: Hero;
  heroes: Hero[] = [];
  inputValue: string | null = '';
  maxFiles: number = 3;
  tooFewFiles: boolean = false;
  onFileChange(event: any) {
    const selectedFiles: FileList = event.target.files;

    if (selectedFiles.length !== this.maxFiles) {
      this.tooFewFiles = true;
      event.target.value = null;
    } else {
      this.tooFewFiles = false;
    }
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messagesService.add(`Selected hero id=${hero.id}`);
  }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
