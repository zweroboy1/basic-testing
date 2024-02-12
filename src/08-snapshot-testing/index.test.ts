import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values1 = [1, 2, 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(values1)).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const values2 = ['a', 'b', 'c'];
    expect(generateLinkedList(values2)).toMatchSnapshot();
  });
});
