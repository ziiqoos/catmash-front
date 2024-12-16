import { Cat } from '../../models/Cat.model';
import { CatService } from '../../services/cat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-vote',
  templateUrl: './cat-vote.component.html',
  styleUrls: ['./cat-vote.component.scss']
})
export class CatVoteComponent implements OnInit {
  cats: Cat[] = [];
  gameNumber = 0;
  leftIndex = 0;
  rightIndex = 0;

  showPlusOneLeft = false;
  showPlusOneRight = false;
  errorMsg: string = '';

  constructor(private catService: CatService, private router: Router) { }

  ngOnInit() {
    this.catService.getCats().subscribe({
      next: (cats: Cat[]) => {
        this.cats = cats;
        this.gameNumber = cats.reduce((accumulator, cat) => accumulator + (cat.score || 0), 0);
        this.selectRandomCats();
      },
      error: (error: string) => {
        this.errorMsg = error;
      }
    });
  }

  selectRandomCats(): void {
    const maxIndex = this.cats.length;
    this.leftIndex = Math.floor(Math.random() * maxIndex);
    do {
      this.rightIndex = Math.floor(Math.random() * maxIndex);
    } while (this.leftIndex === this.rightIndex);
  }

  upVoteCat(catId: string, position = 'left'): void {
    this.catService.upVoteCat(catId).subscribe({
      next: (_): void => {
        this.showPlusOne(position);
        this.selectRandomCats();
        this.gameNumber++;
      },
      error: (error): void => {
        console.log('error', error);
        this.errorMsg = error;
      }
    });
  }

  showRanking(): void {
    this.router.navigate(['/ranking']);
  }

  showPlusOne(position: string) {
    if (position === 'left') {
      this.showPlusOneLeft = true;
      setTimeout(() => (this.showPlusOneLeft = false), 1500);
    } else if (position === 'right') {
      this.showPlusOneRight = true;
      setTimeout(() => (this.showPlusOneRight = false), 1500);
    }
  }
}
