// Main test file that imports all test suites
import './users/UserService.test';
import './users/UserController.test';
import './users/UserRoutes.test';
import './users/UserSearch.test';

describe('Test Suite', () => {
  it('should run all tests', () => {
    expect(true).toBe(true);
  });
});
