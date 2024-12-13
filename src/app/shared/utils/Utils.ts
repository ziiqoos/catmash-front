import { Observable, of } from 'rxjs';

export class Utils {

  /**
 * Handles errors that occur during an operation, logs the error to the console,
 * and returns a fallback result to keep the application stable.
 * 
 */
  static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
