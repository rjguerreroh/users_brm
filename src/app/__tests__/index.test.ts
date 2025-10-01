// Main test file that imports all test suites
import './users/UserService.simple.test';
import './users/UserController.simple.test';
import './users/UserRoutes.simple.test';

describe('Test Suite', () => {
  it('should run all tests', () => {
    expect(true).toBe(true);
  });
});
