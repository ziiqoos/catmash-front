import { Cat } from '../../models/cat.model';
import { CatService } from '../../services/cat.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-cat-ranking',
  templateUrl: './cat-ranking.component.html',
  styleUrls: ['./cat-ranking.component.scss'],
  imports: [HeaderComponent]
})
export class CatRankingComponent implements OnInit {

  cats: Cat[] = [];

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.catService.getCats().subscribe((cats: Cat[]) => {
      this.cats = cats;
      console.log('this.cats ranked', this.cats);

    });
  }

}
