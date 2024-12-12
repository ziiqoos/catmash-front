import { animate, style, transition, trigger } from '@angular/animations';
import { Cat } from '../../models/Cat.model';
import { CatService } from '../../services/cat.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-vote',
  templateUrl: './cat-vote.component.html',
  styleUrls: ['./cat-vote.component.scss'],
  imports: [HeaderComponent],
  animations: [
    trigger('fadeAnimation', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms', style({ opacity: 0 }))
      ]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CatVoteComponent implements OnInit {
  cats: Cat[] = [];
  leftIndex = 0;
  rightIndex = 0;

  constructor(private catService: CatService, private router: Router) { }

  ngOnInit() {
    this.catService.getCats().subscribe((cats: Cat[]) => {
      this.cats = cats;
      this.selectRandomCats();
    });
  }

  selectRandomCats(): void {
    const maxIndex = this.cats.length;
    this.leftIndex = Math.floor(Math.random() * maxIndex);
    do {
      this.rightIndex = Math.floor(Math.random() * maxIndex);
    } while (this.leftIndex === this.rightIndex);
  }

  upVoteCat(catId: string): void {
    this.catService.upVoteCat(catId).subscribe(() => {
      this.selectRandomCats();
    });
  }

  showRanking(): void {
    this.router.navigate(['/ranking']);
  }
}
