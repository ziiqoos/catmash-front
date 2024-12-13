import { CatRankingComponent } from './core/components/cat-ranking/cat-ranking.component';
import { CatVoteComponent } from './core/components/cat-vote/cat-vote.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'vote', component: CatVoteComponent },
      { path: 'ranking', component: CatRankingComponent },
      { path: '', redirectTo: 'vote', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'vote'
  }
];