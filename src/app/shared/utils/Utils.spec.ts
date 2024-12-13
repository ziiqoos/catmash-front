import { Utils } from './Utils';

describe('Utils', () => {
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    // Spy on console.error to capture the error logs
    consoleErrorSpy = spyOn(console, 'error');
  });

  it('should handle errors and log to the console', () => {
    const errorMessage = 'Something went wrong';
    const operation = 'Test Operation';
    const mockResult = { mock: 'result' };

    const errorHandler = Utils.handleError(operation, mockResult);

    // Simulate an error
    errorHandler({ message: errorMessage }).subscribe(result => {
      expect(result).toEqual(mockResult);  // Ensure the result is the provided mock result
      expect(consoleErrorSpy).toHaveBeenCalledWith(`${operation} failed: ${errorMessage}`);
    });
  });

  it('should return the default result when there is an error', () => {
    const errorMessage = 'Test error';
    const mockResult = { mock: 'result' };

    const errorHandler = Utils.handleError('Test Operation', mockResult);

    errorHandler({ message: errorMessage }).subscribe(result => {
      expect(result).toEqual(mockResult);  // Ensure the result is the provided mock result
    });
  });
});
