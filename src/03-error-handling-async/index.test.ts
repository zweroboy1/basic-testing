import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const someValue = 'hello';
    const resolvedValue = await resolveValue(someValue);
    expect(resolvedValue).toBe(someValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'provided message';
    expect(() => {
      throwError(message);
    }).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
