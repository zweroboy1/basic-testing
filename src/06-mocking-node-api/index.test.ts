import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callbackFn = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callbackFn, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callbackFn, timeout);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callbackFn = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callbackFn, timeout);
    expect(callbackFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callbackFn).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callbackFn = jest.fn();
    const timeout = 100;
    doStuffByInterval(callbackFn, timeout);
    expect(setIntervalSpy).toHaveBeenCalledWith(callbackFn, timeout);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackFn = jest.fn();
    const timeout = 100;
    const callCount = 3;
    doStuffByInterval(callbackFn, timeout);
    jest.advanceTimersByTime(timeout * callCount);
    expect(callbackFn).toHaveBeenCalledTimes(callCount);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'randomfile.txt';
    const joinSpy = jest.spyOn(path, 'join').mockReturnValue('/fake/path');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'randomfile.txt';
    jest.spyOn(path, 'join').mockReturnValue(pathToFile);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const fileContent = await readFileAsynchronously(pathToFile);
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'randomfile.txt';
    const fileText = 'random text';
    jest.spyOn(path, 'join').mockReturnValue(pathToFile);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileText);

    const fileContent = await readFileAsynchronously(pathToFile);
    expect(fileContent).toBe(fileText);
  });
});
