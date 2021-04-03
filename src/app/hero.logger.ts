import { Injectable } from '@angular/core';
import { LumberjackLogger } from '@ngworker/lumberjack';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class HeroLogger extends LumberjackLogger {
  addedHero(id: number): void {
    const logger = this.createTraceLogger(`added hero w/ id=${id}`)
      .withScope('HeroService')
      .build();
    logger();
  }

  deletedHero(id: number): void {
    const logger = this.createTraceLogger(`deleted hero id=${id}`)
      .withScope('HeroService')
      .build();
    logger();
  }

  fetchedHero(id: number): void {
    const logger = this.createTraceLogger(`fetched hero id=${id}`)
      .withScope('HeroService')
      .build();
    logger();
  }

  fetchedHeroes(): void {
    const logger = this.createTraceLogger('fetched heroes')
      .withScope('HeroService')
      .build();
    logger();
  }

  heroesMatching(term: string, heroes: Hero[]): void {
    const message =
      heroes.length > 0
        ? `found heroes matching "${term}"`
        : `no heroes matching "${term}"`;
    const logger = this.createTraceLogger(message)
      .withScope('HeroService')
      .build();
    logger();
  }

  operationFailed(errorMessage: string, operation = 'operation'): void {
    const logger = this.createErrorLogger(
      `${operation} failed: ${errorMessage}`
    )
      .withScope('HeroService')
      .build();
    logger();
  }

  tryFetchHero(id: number, hero: Hero | undefined): void {
    const outcome = hero ? `fetched` : `did not find`;
    const message = `${outcome} hero id=${id}`;
    const logger = this.createTraceLogger(message)
      .withScope('HeroService')
      .build();
    logger();
  }

  updatedHero(id: number): void {
    const logger = this.createTraceLogger(`updated hero id=${id}`)
      .withScope('HeroService')
      .build();
    logger();
  }
}
