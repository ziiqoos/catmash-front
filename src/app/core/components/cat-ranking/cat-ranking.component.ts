import { Cat } from '../../models/Cat.model';
import { CatService } from '../../services/cat.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cat-ranking',
  templateUrl: './cat-ranking.component.html',
  styleUrls: ['./cat-ranking.component.scss']
})
export class CatRankingComponent implements OnInit {

  cats: Cat[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  paginatedCats: Cat[] = [];
  _totalPages = 0;
  errorMsg: string = '';

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.catService.getCats().subscribe({
      next: (cats: Cat[]) => {
        this.cats = cats;
        this.updatePaginatedCats();
      },
      error: (msg: string) => {
        this.errorMsg = msg;
      }
    });
  }

  get totalPages() {
    this._totalPages = Math.ceil((this.cats.length - 3) / this.itemsPerPage);
    return this._totalPages;
  }


  public set totalPages(totalPages: number) {
    this._totalPages = totalPages;
  }

  updatePaginatedCats() {
    const startIndex = 3 + (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCats = this.cats.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCats();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCats();
    }
  }
}
