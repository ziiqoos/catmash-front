import { AppComponent } from './app.component';
import { CatRankingComponent } from './core/components/cat-ranking/cat-ranking.component';
import { CatVoteComponent } from './core/components/cat-vote/cat-vote.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'vote', component: CatVoteComponent },
      { path: 'ranking', component: CatRankingComponent },
    ]
  },
  {
    path: '**',
    redirectTo: 'vote'
  }
];
