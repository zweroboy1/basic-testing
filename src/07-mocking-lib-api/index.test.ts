import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((func) => func),
  };
});

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';

    await throttledGetDataFromApi(baseURL);
    expect(createSpy).toHaveBeenCalledWith({ baseURL: baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/somepath';
    jest.spyOn(axios, 'create').mockReturnThis();
    const axiosGetSpy = jest
      .spyOn(axios, 'get')
      .mockResolvedValue({ data: 'string' });

    await throttledGetDataFromApi(relativePath);
    expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/somepath';
    const responseData = 'string';
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue({ data: responseData });

    const content = await throttledGetDataFromApi(relativePath);
    expect(content).toBe(responseData);
  });
});
