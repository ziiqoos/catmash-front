import { CatService } from '../../services/cat.service';
import { CatVoteComponent } from './cat-vote.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockCats } from '../../../shared/mocks/cat.mocks';
import { of } from 'rxjs';
import { Router } from '@angular/router';

class MockCatService {
  getCats() {
    return of(mockCats);
  }

  upVoteCat(catId: string) {
    return of(null);
  }
}

describe('CatVoteComponent', () => {
  let component: CatVoteComponent;
  let fixture: ComponentFixture<CatVoteComponent>;
  let catService: CatService;
  let router: Router;

  beforeEach(async () => {
    const mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [CatVoteComponent],
      providers: [
        { provide: CatService, useClass: MockCatService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatVoteComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cats and gameNumber on load', () => {
    expect(component.cats.length).toBe(5);
    expect(component.gameNumber).toBe(11);
  });

  it('should select two random distinct cats', () => {
    component.selectRandomCats();
    expect(component.leftIndex).not.toEqual(component.rightIndex);
    expect(component.leftIndex).toBeGreaterThanOrEqual(0);
    expect(component.rightIndex).toBeGreaterThanOrEqual(0);
    expect(component.leftIndex).toBeLessThan(component.cats.length);
    expect(component.rightIndex).toBeLessThan(component.cats.length);
  });

  it('should call upVoteCat and increment gameNumber', () => {
    spyOn(catService, 'upVoteCat').and.callThrough();
    spyOn(component, 'selectRandomCats').and.callThrough();

    const initialGameNumber = component.gameNumber;
    const catId = component.cats[0].id;

    component.upVoteCat(catId);

    expect(catService.upVoteCat).toHaveBeenCalledWith(catId);
    expect(component.selectRandomCats).toHaveBeenCalled();
    expect(component.gameNumber).toBe(initialGameNumber + 1);
  });

  it('should navigate to /ranking when showRanking is called', () => {
    component.showRanking();
    expect(router.navigate).toHaveBeenCalledWith(['/ranking']);
  });
});