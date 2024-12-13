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

  constructor(private catService: CatService, private router: Router) { }

  ngOnInit() {
    this.catService.getCats().subscribe((cats: Cat[]) => {
      this.cats = cats;
      this.gameNumber = cats.reduce((accumulator, cat) => accumulator + (cat.score || 0), 0);
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
      this.gameNumber++;
    });
  }

  showRanking(): void {
    this.router.navigate(['/ranking']);
  }
}
