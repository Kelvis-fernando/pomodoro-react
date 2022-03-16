import { secondsToMinutes } from './seconds-to-minutes';
console.log(secondsToMinutes(10));
describe('Testing function seconds to minutes', () => {
  it('should zeroLeft function return a string', () => {
    expect(secondsToMinutes(1500)).toBe(`${25}:${'00'}`);
  });
});
