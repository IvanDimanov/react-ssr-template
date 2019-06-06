/**
 * Check if the income var is a real number (integer, octal, or float).
 *
 * @param  {Mixed}   number  The variable that need to be checked if it's a number var
 * @return {Boolean}         Return a true if the income var is a number (else false)
 */
function isNumber(number) {
  return !isNaN( parseFloat(number) ) && isFinite(number);
}

/**
 * Will return a pseudo-random number in a given range of the first two arguments.
 * If some of the arguments are missing, we'll fallback to default range limits or
 * to default 'Math.random()' function
 *
 * @dependencies
 *   isNumber()
 *
 * @param  {Number} limit1         [Optional] Range numbers limitation
 * @param  {Number} limit2         [Optional] Range numbers limitation
 * @param  {Number} floatPrecision [Optional] Will tell how precise the returned number need to be, e.g.
 *                                            when floatPrecision=2, answer may be 7.45, floatPrecision=3, answer may be 7.453
 * @return {Number}
 *
 * @examples
 *   getRandomNumber()           =>  0.4821015023626387  // default Math.random()
 *   getRandomNumber(10)         =>  1983785338          // default upper limit
 *   getRandomNumber(10, 15)     =>  12                  // Random number with floating point of 0
 *   getRandomNumber(10, 15, 3)  =>  14.206              // Random number with floating point of 3
 *
 *   getRandomNumber('a')           =>  3906844682       // default upper & lower limits
 *   getRandomNumber('a', 17)       =>  -2537090446      // default lower limits
 *   getRandomNumber('a', 17, 'a')  =>  -3632881518      // default lower & floating limits
 */
function getRandomNumber(limit1, limit2, floatPrecision) {
  /* Check if we need to round in a specific precision */
  if (!isNumber(floatPrecision) || floatPrecision < 0) {
    floatPrecision = 0;
  }

  /* Fallback to default Math function of no arguments were supported */
  if (limit1 === limit2 &&
      !floatPrecision
  ) {
    return isNumber(limit1) ? limit1 : Math.random();
  }

  /* Set default range limitations */
  const maxRange = Math.pow(2, 32) - 1;
  if (!isNumber(limit1)) limit1 = -maxRange;
  if (!isNumber(limit2)) limit2 = +maxRange;

  let limitLower = Math.min(limit1, limit2);
  let limitUpper = Math.max(limit1, limit2);
  const limitFloat = Math.pow(10, floatPrecision);

  limitLower = Number( Number.parseFloat(limitLower).toFixed(floatPrecision) );
  limitUpper = Number( Number.parseFloat(limitUpper).toFixed(floatPrecision) );

  let randomNumber;
  randomNumber = Math.random();
  randomNumber *= limitUpper - limitLower + 1 * Math.pow(0.1, floatPrecision);
  randomNumber = Math.floor( randomNumber * limitFloat) / limitFloat;
  randomNumber += limitLower;
  randomNumber = Number( Number.parseFloat(randomNumber).toFixed(floatPrecision) );

  return randomNumber;
}

export default getRandomNumber;
