import { Injectable } from '@angular/core';
import { ScopedLumberjackLogger } from '@ngworker/lumberjack';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class HeroLogger extends ScopedLumberjackLogger {
  scope = 'HeroService';

  addedHero(id: number): void {
    const logger = this.createTraceLogger(`added hero w/ id=${id}`).build();
    logger();
  }

  deletedHero(id: number): void {
    const logger = this.createTraceLogger(`deleted hero id=${id}`).build();
    logger();
  }

  fetchedHero(id: number): void {
    const logger = this.createTraceLogger(`fetched hero id=${id}`).build();
    logger();
  }

  fetchedHeroes(): void {
    const logger = this.createTraceLogger('fetched heroes').build();
    logger();
  }

  heroesMatching(term: string, heroes: Hero[]): void {
    const message =
      heroes.length > 0
        ? `found heroes matching "${term}"`
        : `no heroes matching "${term}"`;
    const logger = this.createTraceLogger(message).build();
    logger();
  }

  operationFailed(errorMessage: string, operation = 'operation'): void {
    const logger = this.createErrorLogger(
      `${operation} failed: ${errorMessage}`
    ).build();
    logger();
  }

  tryFetchHero(id: number, hero: Hero | undefined): void {
    const outcome = hero ? `fetched` : `did not find`;
    const message = `${outcome} hero id=${id}`;
    const logger = this.createTraceLogger(message).build();
    logger();
  }

  updatedHero(id: number): void {
    const logger = this.createTraceLogger(`updated hero id=${id}`).build();
    logger();
  }
}
