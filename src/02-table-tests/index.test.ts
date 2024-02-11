import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: -1, b: -2, action: Action.Add, expected: -3 },
  { a: -1, b: -2, action: Action.Subtract, expected: 1 },
  { a: -1, b: -2, action: Action.Multiply, expected: 2 },
  { a: -1, b: -2, action: Action.Divide, expected: 0.5 },
  { a: -1, b: -2, action: Action.Exponentiate, expected: 1 },
  { a: 1, b: 0, action: Action.Add, expected: 1 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 1, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 555555, b: 444444, action: Action.Add, expected: 999999 },
  { a: 555555, b: 444444, action: Action.Subtract, expected: 111111 },
  { a: 555555, b: 444444, action: Action.Multiply, expected: 246913086420 },
  { a: 555555, b: 444444, action: Action.Divide, expected: 1.25 },
  { a: 555555, b: 444444, action: Action.Exponentiate, expected: Infinity },
  { a: -11, b: 11, action: Action.Add, expected: 0 },
  { a: -11, b: 11, action: Action.Subtract, expected: -22 },
  { a: -11, b: 11, action: Action.Multiply, expected: -121 },
  { a: -11, b: 11, action: Action.Divide, expected: -1 },
  { a: -11, b: 11, action: Action.Exponentiate, expected: -285311670611 },
  { a: 1, b: 2, action: 'Invalid', expected: null },
  { a: 1, b: 'str', action: Action.Add, expected: null },
  { a: 'str', b: 33, action: Action.Multiply, expected: null },
  { a: false, b: true, action: Action.Add, expected: null }
];


describe('simpleCalculator', () => {
  test.each(testCases)('($a $action $b) should return $expected', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });

});

