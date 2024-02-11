import { simpleCalculator, Action } from './index';

type dataUnit = {
  number1: number;
  number2: number;
  sum: number;
  diff: number;
  mult: number;
  part: number;
  exp: number;
};

const dataSet: dataUnit[] = [
  {
    number1: 1,
    number2: 2,
    sum: 3,
    diff: -1,
    mult: 2,
    part: 0.5,
    exp: 1
  },
  {
    number1: -1,
    number2: -2,
    sum: -3,
    diff: 1,
    mult: 2,
    part: 0.5,
    exp: 1
  },
  {
    number1: 1,
    number2: 0,
    sum: 1,
    diff: 1,
    mult: 0,
    part: Infinity,
    exp: 1
  },
  {
    number1: 555555,
    number2: 444444,
    sum: 999999,
    diff: 111111,
    mult: 246913086420,
    part: 1.25,
    exp: Infinity
  },
  {
    number1: -11,
    number2: 11,
    sum: 0,
    diff: -22,
    mult: -121,
    part: -1,
    exp: -285311670611
  },
];



describe('simpleCalculator tests', () => {

  test('should add two numbers', () => {
    for (const data of dataSet) {
      const sum = simpleCalculator({
        a: data.number1,
        b: data.number2,
        action: Action.Add
      });
      expect(sum).toBe(data.sum);
    }
  });

  test('should subtract two numbers', () => {
    for (const data of dataSet) {
      const diff = simpleCalculator({
        a: data.number1,
        b: data.number2,
        action: Action.Subtract
      });
      expect(diff).toBe(data.diff);
    }
  });

  test('should multiply two numbers', () => {
    for (const data of dataSet) {
      const mult = simpleCalculator({
        a: data.number1,
        b: data.number2,
        action: Action.Multiply
      });
      expect(mult).toBe(data.mult);
    }
  });

  test('should divide two numbers', () => {
    for (const data of dataSet) {
      const part = simpleCalculator({
        a: data.number1,
        b: data.number2,
        action: Action.Divide
      });
      expect(part).toBe(data.part);
    }
  });

  test('should exponentiate two numbers', () => {
    for (const data of dataSet) {
      const exp = simpleCalculator({
        a: data.number1,
        b: data.number2,
        action: Action.Exponentiate
      });
      expect(exp).toBe(data.exp);
    }
  });

  test('should return null for invalid action', () => {
    const invalidResult = simpleCalculator({
      a: 1,
      b: 2,
      action: 'Invalid'
    });
    expect(invalidResult).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArguments: any[] = [{
      a: 1,
      b: 'str',
      action: Action.Add
    },
    {
      a: 'str',
      b: 33,
      action: Action.Multiply
    },
    {
      a: false,
      b: true,
      action: Action.Add
    }
    ];

    for (const argument of invalidArguments) {
      const invalidResult = simpleCalculator(argument);
      expect(invalidResult).toBeNull();
    }
  });

});
