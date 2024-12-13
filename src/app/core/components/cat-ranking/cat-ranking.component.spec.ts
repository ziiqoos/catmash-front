import { CatRankingComponent } from './cat-ranking.component';
import { CatService } from '../../services/cat.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockCats } from '../../../shared/mocks/cat.mocks';
import { of } from 'rxjs';

class MockCatService {
  getCats() {
    return of(mockCats);
  }
}

describe('CatRankingComponent', () => {
  let component: CatRankingComponent;
  let fixture: ComponentFixture<CatRankingComponent>;
  let catService: CatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatRankingComponent],
      providers: [
        { provide: CatService, useClass: MockCatService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatRankingComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with cats from the service', () => {
    expect(component.cats.length).toBe(5);
    expect(component.cats[0].id).toBe('1');
  });

  it('should calculate total pages correctly', () => {
    expect(component.totalPages).toBe(1);
  });

  it('should initialize paginatedCats correctly on load', () => {
    expect(component.paginatedCats.length).toBe(2); // Only two cats after skipping the first 3
    expect(component.paginatedCats[0].id).toBe('4'); // Starts after the first 3
  });

  it('should paginate to the next page correctly', () => {
    component.nextPage();
    expect(component.currentPage).toBe(1); // No next page available
    expect(component.paginatedCats[0].id).toBe('4');
  });

  it('should paginate to the previous page correctly', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1); // No previous page available
    expect(component.paginatedCats[0].id).toBe('4');
  });

  it('should not go to the next page if on the last page', () => {
    component.currentPage = component.totalPages;
    component.nextPage();
    expect(component.currentPage).toBe(component.totalPages);
  });

  it('should not go to the previous page if on the first page', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should update paginatedCats when currentPage changes', () => {
    component.currentPage = 1;
    component.updatePaginatedCats();
    expect(component.paginatedCats[0].id).toBe('4');
  });

  it('should slice paginatedCats correctly based on itemsPerPage', () => {
    component.currentPage = 1;
    component.updatePaginatedCats();
    expect(component.paginatedCats.length).toBe(2);
    expect(component.paginatedCats[0].id).toBe('4');
  });

});
