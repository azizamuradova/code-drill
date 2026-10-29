export const categories = [
  {
    name: 'Warmup-1',
    description: 'Simple warmup problems to get started',
    difficulty: 'easy',
    group_name: 'Fundamentals',
    icon_name: 'flame',
    problems: [
      {
        description:
          'Return true if we sleep in: it is not a weekday, or we are on vacation.',
        solution: `function sleepIn(weekday, vacation) {\n  return !weekday || vacation;\n}`,
        tests: [
          [false, false],
          [true, false],
          [false, true],
          [true, true],
        ],
      },
      {
        description:
          'Return the sum of two numbers. If they are the same, return double the sum.',
        solution: `function sumDouble(a, b) {\n  return a === b ? (a + b) * 2 : a + b;\n}`,
        tests: [
          [1, 2],
          [3, 2],
          [2, 2],
          [-1, 0],
        ],
      },
      {
        description:
          'Return the absolute difference between n and 21, but double it if n is over 21.',
        solution: `function diff21(n) {\n  return n > 21 ? (n - 21) * 2 : 21 - n;\n}`,
        tests: [[19], [10], [21], [25]],
      },
      {
        description:
          'Return true if one of the numbers is 10 or their sum is 10.',
        solution: `function makes10(a, b) {\n  return a === 10 || b === 10 || a + b === 10;\n}`,
        tests: [
          [9, 10],
          [9, 9],
          [1, 9],
          [3, 4],
        ],
      },
      {
        description:
          'Return true if n is within 10 of 100 or within 10 of 200.',
        solution: `function nearHundred(n) {\n  return Math.abs(100 - n) <= 10 || Math.abs(200 - n) <= 10;\n}`,
        tests: [[93], [90], [89], [210]],
      },
      {
        description:
          'Return true if one number is negative and one is positive. If negative is true, return true only if both are negative.',
        solution: `function posNeg(a, b, negative) {\n  if (negative) return a < 0 && b < 0;\n  return (a < 0 && b > 0) || (a > 0 && b < 0);\n}`,
        tests: [
          [1, -1, false],
          [-1, 1, false],
          [-4, -5, true],
          [1, 1, false],
        ],
      },
      {
        description:
          'Return a new string with "not " added to the front, unless it already starts with "not".',
        solution: `function notString(str) {\n  return str.startsWith('not') ? str : 'not ' + str;\n}`,
        tests: [['candy'], ['x'], ['not bad'], ['bad']],
      },
      {
        description:
          'Return the string with the first and last characters swapped.',
        solution: `function frontBack(str) {\n  if (str.length <= 1) return str;\n  return str[str.length - 1] + str.slice(1, -1) + str[0];\n}`,
        tests: [['code'], ['a'], ['ab'], ['hello']],
      },
      {
        description:
          'Return the first 3 characters repeated 3 times. Use the whole string if it is shorter than 3.',
        solution: `function front3(str) {\n  const front = str.slice(0, 3);\n  return front + front + front;\n}`,
        tests: [['Java'], ['Chocolate'], ['ab'], ['']],
      },
      {
        description: 'Return true if n is a multiple of 3 or a multiple of 5.',
        solution: `function or35(n) {\n  return n % 3 === 0 || n % 5 === 0;\n}`,
        tests: [[3], [10], [8], [15]],
      },
    ],
  },
  {
    name: 'Warmup-2',
    description: 'Warmup problems with loops',
    difficulty: 'medium',
    group_name: 'Fundamentals',
    icon_name: 'flame',
    problems: [
      {
        description: 'Return the string repeated n times.',
        solution: `function stringTimes(str, n) {\n  let result = '';\n  for (let i = 0; i < n; i++) result += str;\n  return result;\n}`,
        tests: [
          ['Hi', 2],
          ['Hi', 3],
          ['Hi', 0],
          ['Oh', 4],
        ],
      },
      {
        description: 'Return n copies of the first 3 characters of the string.',
        solution: `function frontTimes(str, n) {\n  return str.slice(0, 3).repeat(n);\n}`,
        tests: [
          ['Chocolate', 2],
          ['Chocolate', 3],
          ['Ab', 3],
          ['', 4],
        ],
      },
      {
        description:
          'Count how many times "xx" appears in the string. Overlapping is allowed, so "xxx" has 2.',
        solution: `function countXX(str) {\n  let count = 0;\n  for (let i = 0; i < str.length - 1; i++) {\n    if (str[i] === 'x' && str[i + 1] === 'x') count++;\n  }\n  return count;\n}`,
        tests: [['abcxx'], ['xxx'], ['xxxx'], ['abc']],
      },
      {
        description:
          'Return a string made of every other character, starting with the first.',
        solution: `function stringBits(str) {\n  let result = '';\n  for (let i = 0; i < str.length; i += 2) result += str[i];\n  return result;\n}`,
        tests: [['Hello'], ['Hi'], ['Heeololeo'], ['']],
      },
      {
        description:
          'For "Code" return "CCoCodCode": each growing prefix of the string joined together.',
        solution: `function stringSplosion(str) {\n  let result = '';\n  for (let i = 1; i <= str.length; i++) result += str.slice(0, i);\n  return result;\n}`,
        tests: [['Code'], ['abc'], ['ab'], ['x']],
      },
      {
        description: 'Return the number of 9s in the array.',
        solution: `function arrayCount9(nums) {\n  return nums.filter((n) => n === 9).length;\n}`,
        tests: [[[1, 2, 9]], [[1, 9, 9]], [[1, 9, 9, 3, 9]], [[]]],
      },
      {
        description:
          'Return true if one of the first 4 numbers in the array is a 9.',
        solution: `function arrayFront9(nums) {\n  return nums.slice(0, 4).includes(9);\n}`,
        tests: [[[1, 2, 9, 3, 4]], [[1, 2, 3, 4, 9]], [[1, 2, 3, 4, 5]], [[9]]],
      },
      {
        description:
          'Return true if the sequence 1, 2, 3 appears somewhere in the array.',
        solution: `function array123(nums) {\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (nums[i] === 1 && nums[i + 1] === 2 && nums[i + 2] === 3) return true;\n  }\n  return false;\n}`,
        tests: [
          [[1, 1, 2, 3, 1]],
          [[1, 1, 2, 4, 1]],
          [[1, 1, 2, 1, 2, 3]],
          [[1, 2]],
        ],
      },
      {
        description:
          'Return the string with every "x" removed, except an "x" at the very start or end.',
        solution: `function stringX(str) {\n  if (str.length <= 2) return str;\n  return str[0] + str.slice(1, -1).replaceAll('x', '') + str[str.length - 1];\n}`,
        tests: [['xxHxix'], ['abxxxcd'], ['xabxxxcdx'], ['x']],
      },
      {
        description:
          'Return a string made of the characters at index 0, 1, 4, 5, 8, 9 and so on.',
        solution: `function altPairs(str) {\n  let result = '';\n  for (let i = 0; i < str.length; i += 4) result += str.slice(i, i + 2);\n  return result;\n}`,
        tests: [['kitten'], ['Chocolate'], ['CodingHorror'], ['y']],
      },
    ],
  },
  {
    name: 'Logic-1',
    description: 'Basic if/else logic',
    difficulty: 'easy',
    group_name: 'Logic',
    icon_name: 'split',
    problems: [
      {
        description:
          'A party is successful if there are 40 to 60 cigars, or 40 or more on the weekend.',
        solution: `function cigarParty(cigars, isWeekend) {\n  if (isWeekend) return cigars >= 40;\n  return cigars >= 40 && cigars <= 60;\n}`,
        tests: [
          [30, false],
          [50, false],
          [70, true],
          [70, false],
        ],
      },
      {
        description:
          'Return 2 if either style is 8 or more, 0 if either is 2 or less, otherwise 1. The "2 or less" rule wins.',
        solution: `function dateFashion(you, date) {\n  if (you <= 2 || date <= 2) return 0;\n  if (you >= 8 || date >= 8) return 2;\n  return 1;\n}`,
        tests: [
          [5, 10],
          [5, 2],
          [5, 5],
          [3, 8],
        ],
      },
      {
        description:
          'Squirrels play when the temperature is 60 to 90, or 60 to 100 in summer.',
        solution: `function squirrelPlay(temp, isSummer) {\n  const upper = isSummer ? 100 : 90;\n  return temp >= 60 && temp <= upper;\n}`,
        tests: [
          [70, false],
          [95, false],
          [95, true],
          [59, true],
        ],
      },
      {
        description:
          'Return 0 for no ticket, 1 for a small ticket (61-80), 2 for a big ticket (81+). On your birthday the limits are 5 higher.',
        solution: `function caughtSpeeding(speed, isBirthday) {\n  const extra = isBirthday ? 5 : 0;\n  if (speed <= 60 + extra) return 0;\n  if (speed <= 80 + extra) return 1;\n  return 2;\n}`,
        tests: [
          [60, false],
          [65, false],
          [65, true],
          [86, true],
        ],
      },
      {
        description:
          'Return the sum of a and b, but sums from 10 to 19 return 20.',
        solution: `function sortaSum(a, b) {\n  const sum = a + b;\n  return sum >= 10 && sum <= 19 ? 20 : sum;\n}`,
        tests: [
          [3, 4],
          [9, 4],
          [10, 11],
          [5, 5],
        ],
      },
      {
        description:
          'Return true if n is a multiple of 11 or one more than a multiple of 11.',
        solution: `function specialEleven(n) {\n  return n % 11 === 0 || n % 11 === 1;\n}`,
        tests: [[22], [23], [24], [0]],
      },
      {
        description:
          'Return true if a + b equals c, or a + c equals b, or b + c equals a.',
        solution: `function twoAsOne(a, b, c) {\n  return a + b === c || a + c === b || b + c === a;\n}`,
        tests: [
          [1, 2, 3],
          [3, 1, 2],
          [3, 2, 2],
          [5, 3, -2],
        ],
      },
      {
        description:
          'Return true if b is greater than a and c is greater than b. If bOk is true, b does not need to be greater than a.',
        solution: `function inOrder(a, b, c, bOk) {\n  return (bOk || b > a) && c > b;\n}`,
        tests: [
          [1, 2, 4, false],
          [1, 2, 1, false],
          [1, 1, 2, true],
          [3, 2, 4, false],
        ],
      },
      {
        description:
          'Return true if two or more of the numbers have the same last digit.',
        solution: `function lastDigit(a, b, c) {\n  const x = a % 10;\n  const y = b % 10;\n  const z = c % 10;\n  return x === y || y === z || x === z;\n}`,
        tests: [
          [23, 19, 13],
          [23, 19, 12],
          [23, 19, 3],
          [1, 2, 3],
        ],
      },
      {
        description:
          'Return "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for both, otherwise the number as a string.',
        solution: `function fizzString(n) {\n  if (n % 15 === 0) return 'FizzBuzz';\n  if (n % 3 === 0) return 'Fizz';\n  if (n % 5 === 0) return 'Buzz';\n  return String(n);\n}`,
        tests: [[1], [3], [10], [15]],
      },
    ],
  },
  {
    name: 'Logic-2',
    description: 'Harder logic puzzles',
    difficulty: 'medium',
    group_name: 'Logic',
    icon_name: 'split',
    problems: [
      {
        description:
          'You have small bricks (1 inch) and big bricks (5 inches). Return true if you can make exactly goal inches.',
        solution: `function makeBricks(small, big, goal) {\n  const bigUsed = Math.min(big, Math.floor(goal / 5));\n  return goal - bigUsed * 5 <= small;\n}`,
        tests: [
          [3, 1, 8],
          [3, 1, 9],
          [3, 2, 10],
          [1, 4, 12],
        ],
      },
      {
        description:
          'Return the sum of the three numbers, but a number that appears more than once does not count.',
        solution: `function loneSum(a, b, c) {\n  let sum = 0;\n  if (a !== b && a !== c) sum += a;\n  if (b !== a && b !== c) sum += b;\n  if (c !== a && c !== b) sum += c;\n  return sum;\n}`,
        tests: [
          [1, 2, 3],
          [3, 2, 3],
          [3, 3, 3],
          [9, 2, 2],
        ],
      },
      {
        description:
          'Return the sum of the numbers, but a 13 and every number after it do not count.',
        solution: `function luckySum(a, b, c) {\n  if (a === 13) return 0;\n  if (b === 13) return a;\n  if (c === 13) return a + b;\n  return a + b + c;\n}`,
        tests: [
          [1, 2, 3],
          [1, 2, 13],
          [1, 13, 3],
          [13, 2, 3],
        ],
      },
      {
        description:
          'Return the sum of the numbers, but treat any number from 13 to 19 as 0, except 15 and 16.',
        solution: `function noTeenSum(a, b, c) {\n  const fix = (n) => (n >= 13 && n <= 19 && n !== 15 && n !== 16 ? 0 : n);\n  return fix(a) + fix(b) + fix(c);\n}`,
        tests: [
          [1, 2, 3],
          [2, 13, 1],
          [2, 1, 14],
          [16, 17, 18],
        ],
      },
      {
        description:
          'Round each number to the nearest 10 (5 rounds up) and return the sum.',
        solution: `function roundSum(a, b, c) {\n  const round10 = (n) => Math.round(n / 10) * 10;\n  return round10(a) + round10(b) + round10(c);\n}`,
        tests: [
          [16, 17, 18],
          [12, 13, 14],
          [6, 4, 4],
          [4, 6, 5],
        ],
      },
      {
        description:
          'Return true if one of b or c is close to a (within 1) and the other is far (2 or more away from both).',
        solution: `function closeFar(a, b, c) {\n  const near = (x, y) => Math.abs(x - y) <= 1;\n  const far = (x, y) => Math.abs(x - y) >= 2;\n  return (near(a, b) && far(a, c) && far(b, c)) || (near(a, c) && far(a, b) && far(b, c));\n}`,
        tests: [
          [1, 2, 10],
          [1, 2, 3],
          [4, 1, 3],
          [4, 5, 3],
        ],
      },
      {
        description:
          'Return the larger value nearest to 21 without going over. Return 0 if both are over.',
        solution: `function blackjack(a, b) {\n  if (a > 21 && b > 21) return 0;\n  if (a > 21) return b;\n  if (b > 21) return a;\n  return Math.max(a, b);\n}`,
        tests: [
          [19, 21],
          [21, 19],
          [19, 22],
          [22, 23],
        ],
      },
      {
        description:
          'Return true if the three numbers are evenly spaced when sorted, like 4, 6, 2.',
        solution: `function evenlySpaced(a, b, c) {\n  const [x, y, z] = [a, b, c].sort((m, n) => m - n);\n  return y - x === z - y;\n}`,
        tests: [
          [2, 4, 6],
          [4, 6, 2],
          [4, 6, 3],
          [6, 2, 4],
        ],
      },
      {
        description:
          'Small bars weigh 1 kilo, big bars 5 kilos. Return the number of small bars needed to make goal, using big bars first, or -1 if impossible.',
        solution: `function makeChocolate(small, big, goal) {\n  const bigUsed = Math.min(big, Math.floor(goal / 5));\n  const needed = goal - bigUsed * 5;\n  return needed <= small ? needed : -1;\n}`,
        tests: [
          [4, 1, 9],
          [4, 1, 10],
          [4, 1, 7],
          [6, 2, 7],
        ],
      },
      {
        description:
          'Return true if the string contains as many "cat" as "dog".',
        solution: `function catDog(str) {\n  return str.split('cat').length === str.split('dog').length;\n}`,
        tests: [['catdog'], ['catcat'], ['1cat1cadodog'], ['']],
      },
    ],
  },
  {
    name: 'String-1',
    description: 'Basic string problems',
    difficulty: 'easy',
    group_name: 'Strings & Arrays',
    icon_name: 'text',
    problems: [
      {
        description: 'Return "Hello name!" for the given name.',
        solution: `function helloName(name) {\n  return 'Hello ' + name + '!';\n}`,
        tests: [['Bob'], ['Alice'], ['X'], ['Dolly']],
      },
      {
        description: 'Return a + b + b + a.',
        solution: `function makeAbba(a, b) {\n  return a + b + b + a;\n}`,
        tests: [
          ['Hi', 'Bye'],
          ['Yo', 'Alice'],
          ['What', 'Up'],
          ['', 'y'],
        ],
      },
      {
        description: 'Wrap the word in an HTML tag, like <i>Yay</i>.',
        solution: `function makeTags(tag, word) {\n  return '<' + tag + '>' + word + '</' + tag + '>';\n}`,
        tests: [
          ['i', 'Yay'],
          ['i', 'Hello'],
          ['cite', 'Yay'],
          ['b', ''],
        ],
      },
      {
        description: 'Return a string of 3 copies of the last 2 characters.',
        solution: `function extraEnd(str) {\n  return str.slice(-2).repeat(3);\n}`,
        tests: [['Hello'], ['ab'], ['Hi'], ['Candy']],
      },
      {
        description: 'Return the first half of a string of even length.',
        solution: `function firstHalf(str) {\n  return str.slice(0, str.length / 2);\n}`,
        tests: [['WooHoo'], ['HelloThere'], ['abcdef'], ['']],
      },
      {
        description: 'Return the string without its first and last characters.',
        solution: `function withoutEnd(str) {\n  return str.slice(1, -1);\n}`,
        tests: [['Hello'], ['java'], ['coding'], ['ab']],
      },
      {
        description:
          'Return the shorter string, then the longer, then the shorter again.',
        solution: `function comboString(a, b) {\n  return a.length < b.length ? a + b + a : b + a + b;\n}`,
        tests: [
          ['Hello', 'hi'],
          ['hi', 'Hello'],
          ['aaa', 'b'],
          ['', 'bb'],
        ],
      },
      {
        description: 'Move the first 2 characters to the end of the string.',
        solution: `function left2(str) {\n  return str.slice(2) + str.slice(0, 2);\n}`,
        tests: [['Hello'], ['java'], ['Hi'], ['code']],
      },
      {
        description: 'Return true if the string ends with "ly".',
        solution: `function endsLy(str) {\n  return str.endsWith('ly');\n}`,
        tests: [['oddly'], ['y'], ['oddy'], ['ly']],
      },
      {
        description:
          'Return the middle 3 characters of a string of odd length.',
        solution: `function middleThree(str) {\n  const mid = Math.floor(str.length / 2);\n  return str.slice(mid - 1, mid + 2);\n}`,
        tests: [['Candy'], ['and'], ['solving'], ['abcdefg']],
      },
    ],
  },
  {
    name: 'String-2',
    description: 'String problems with loops',
    difficulty: 'medium',
    group_name: 'Strings & Arrays',
    icon_name: 'text',
    problems: [
      {
        description: 'Return a string where every character is doubled.',
        solution: `function doubleChar(str) {\n  let result = '';\n  for (const ch of str) result += ch + ch;\n  return result;\n}`,
        tests: [['The'], ['AAbb'], ['Hi-There'], ['']],
      },
      {
        description: 'Count how many times "hi" appears in the string.',
        solution: `function countHi(str) {\n  return str.split('hi').length - 1;\n}`,
        tests: [['abc hi ho'], ['ABChi hi'], ['hihi'], ['h']],
      },
      {
        description:
          'For every "z?p" pattern (z, any letter, p), remove the middle letter, so "zipXzap" becomes "zpXzp".',
        solution: `function zipZap(str) {\n  return str.replace(/z.p/g, 'zp');\n}`,
        tests: [['zipXzap'], ['zopzop'], ['zzzopzop'], ['zp']],
      },
      {
        description:
          'Count "co_e" patterns, where _ can be any letter, like "code" or "cope".',
        solution: `function countCode(str) {\n  let count = 0;\n  for (let i = 0; i < str.length - 3; i++) {\n    if (str[i] === 'c' && str[i + 1] === 'o' && str[i + 3] === 'e') count++;\n  }\n  return count;\n}`,
        tests: [['aaacodebbb'], ['codexxcode'], ['cozexxcope'], ['cod']],
      },
      {
        description:
          'Return true if either string appears at the very end of the other, ignoring case.',
        solution: `function endOther(a, b) {\n  const x = a.toLowerCase();\n  const y = b.toLowerCase();\n  return x.endsWith(y) || y.endsWith(x);\n}`,
        tests: [
          ['Hiabc', 'abc'],
          ['AbC', 'HiaBc'],
          ['abc', 'abXabc'],
          ['Hiabc', 'abd'],
        ],
      },
      {
        description:
          'Return true if "xyz" appears in the string without a period right before it.',
        solution: `function xyzThere(str) {\n  for (let i = 0; i <= str.length - 3; i++) {\n    if (str.slice(i, i + 3) === 'xyz' && str[i - 1] !== '.') return true;\n  }\n  return false;\n}`,
        tests: [['abcxyz'], ['abc.xyz'], ['xyz.abc'], ['abc.xyzxyz']],
      },
      {
        description:
          'Return true if the string contains a "b", any character, then another "b", like "bob" or "b9b".',
        solution: `function bobThere(str) {\n  for (let i = 0; i < str.length - 2; i++) {\n    if (str[i] === 'b' && str[i + 2] === 'b') return true;\n  }\n  return false;\n}`,
        tests: [['abcbob'], ['b9b'], ['bac'], ['bbc']],
      },
      {
        description:
          'Return a new string with the characters of a and b alternated, then the rest of the longer one.',
        solution: `function mixString(a, b) {\n  let result = '';\n  const max = Math.max(a.length, b.length);\n  for (let i = 0; i < max; i++) result += (a[i] ?? '') + (b[i] ?? '');\n  return result;\n}`,
        tests: [
          ['abc', 'xyz'],
          ['Hi', 'There'],
          ['xxxx', 'There'],
          ['', 'ab'],
        ],
      },
      {
        description:
          'Return the last n characters of the string, repeated n times.',
        solution: `function repeatEnd(str, n) {\n  return str.slice(str.length - n).repeat(n);\n}`,
        tests: [
          ['Hello', 3],
          ['Hello', 2],
          ['Hello', 1],
          ['Hi', 0],
        ],
      },
      {
        description:
          'Return true if the string has the same number of "is" and "not".',
        solution: `function equalIsNot(str) {\n  return str.split('is').length === str.split('not').length;\n}`,
        tests: [
          ['This is not'],
          ['This is notnot'],
          ['noisxxnotyynotxisi'],
          [''],
        ],
      },
    ],
  },
  {
    name: 'Array-1',
    description: 'Basic array problems',
    difficulty: 'easy',
    group_name: 'Strings & Arrays',
    icon_name: 'list',
    problems: [
      {
        description:
          'Return true if the first or last number in the array is 6.',
        solution: `function firstLast6(nums) {\n  return nums[0] === 6 || nums[nums.length - 1] === 6;\n}`,
        tests: [[[1, 2, 6]], [[6, 1, 2, 3]], [[13, 6, 1, 2, 3]], [[3, 2, 1]]],
      },
      {
        description:
          'Return true if the array has at least one element and the first and last are equal.',
        solution: `function sameFirstLast(nums) {\n  return nums.length > 0 && nums[0] === nums[nums.length - 1];\n}`,
        tests: [[[1, 2, 3]], [[1, 2, 3, 1]], [[1, 2, 1]], [[]]],
      },
      {
        description: 'Return the sum of all the numbers in the array.',
        solution: `function sumArray(nums) {\n  return nums.reduce((sum, n) => sum + n, 0);\n}`,
        tests: [[[1, 2, 3]], [[5, 11, 2]], [[7, 0, 0]], [[]]],
      },
      {
        description:
          'Return the array rotated left by one, so [1, 2, 3] becomes [2, 3, 1].',
        solution: `function rotateLeft(nums) {\n  return [...nums.slice(1), nums[0]];\n}`,
        tests: [[[1, 2, 3]], [[5, 11, 9]], [[7, 0, 0]], [[1, 2]]],
      },
      {
        description: 'Return a new array with the elements in reverse order.',
        solution: `function reverseArray(nums) {\n  return [...nums].reverse();\n}`,
        tests: [[[1, 2, 3]], [[5, 11, 9]], [[7, 0, 0]], [[4]]],
      },
      {
        description:
          'Return a new array where every element is the largest of the first and last element.',
        solution: `function maxEnd3(nums) {\n  const max = Math.max(nums[0], nums[nums.length - 1]);\n  return nums.map(() => max);\n}`,
        tests: [[[1, 2, 3]], [[11, 5, 9]], [[2, 11, 3]], [[5]]],
      },
      {
        description: 'Return true if the array contains a 2 or a 3.',
        solution: `function has23(nums) {\n  return nums.includes(2) || nums.includes(3);\n}`,
        tests: [[[2, 5]], [[4, 3]], [[4, 5]], [[]]],
      },
      {
        description:
          'Return a new array with the middle elements of two arrays of length 3.',
        solution: `function middleWay(a, b) {\n  return [a[1], b[1]];\n}`,
        tests: [
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
          [
            [7, 7, 7],
            [3, 8, 0],
          ],
          [
            [5, 2, 9],
            [1, 4, 5],
          ],
          [
            [0, 0, 0],
            [1, 1, 1],
          ],
        ],
      },
      {
        description:
          'Return a new array with the first and last elements of the array.',
        solution: `function makeEnds(nums) {\n  return [nums[0], nums[nums.length - 1]];\n}`,
        tests: [[[1, 2, 3]], [[1, 2, 3, 4]], [[7, 4, 6, 2]], [[7]]],
      },
      {
        description: 'Return the number of even numbers in the array.',
        solution: `function countEvens(nums) {\n  return nums.filter((n) => n % 2 === 0).length;\n}`,
        tests: [[[2, 1, 2, 3, 4]], [[2, 2, 0]], [[1, 3, 5]], [[]]],
      },
    ],
  },
  {
    name: 'Array-2',
    description: 'Array problems with loops',
    difficulty: 'medium',
    group_name: 'Strings & Arrays',
    icon_name: 'list',
    problems: [
      {
        description:
          'Return the difference between the largest and smallest numbers in the array.',
        solution: `function bigDiff(nums) {\n  return Math.max(...nums) - Math.min(...nums);\n}`,
        tests: [[[10, 3, 5, 6]], [[7, 2, 10, 9]], [[2, 10, 7, 2]], [[5]]],
      },
      {
        description:
          'Return the average of the numbers, ignoring one copy of the largest and one of the smallest. Round down.',
        solution: `function centeredAverage(nums) {\n  const sum = nums.reduce((s, n) => s + n, 0) - Math.max(...nums) - Math.min(...nums);\n  return Math.floor(sum / (nums.length - 2));\n}`,
        tests: [
          [[1, 2, 3, 4, 100]],
          [[1, 1, 5, 5, 10, 8, 7]],
          [[-10, -4, -2, -4, -2, 0]],
          [[5, 3, 4, 6, 2]],
        ],
      },
      {
        description:
          'Return the sum of the numbers, but 13 and the number right after it do not count.',
        solution: `function sum13(nums) {\n  let sum = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === 13 || nums[i - 1] === 13) continue;\n    sum += nums[i];\n  }\n  return sum;\n}`,
        tests: [
          [[1, 2, 2, 1]],
          [[1, 1]],
          [[1, 2, 2, 1, 13]],
          [[13, 1, 2, 13, 2, 1, 13]],
        ],
      },
      {
        description: 'Return true if the array contains a 2 next to a 2.',
        solution: `function has22(nums) {\n  for (let i = 0; i < nums.length - 1; i++) {\n    if (nums[i] === 2 && nums[i + 1] === 2) return true;\n  }\n  return false;\n}`,
        tests: [[[1, 2, 2]], [[1, 2, 1, 2]], [[2, 1, 2]], [[2, 2, 1]]],
      },
      {
        description: 'Return true if the array has no 1 and no 3.',
        solution: `function lucky13(nums) {\n  return !nums.includes(1) && !nums.includes(3);\n}`,
        tests: [[[0, 2, 4]], [[1, 2, 3]], [[1, 2, 4]], [[]]],
      },
      {
        description:
          'Return true if the sum of all the 2s in the array is exactly 8.',
        solution: `function sum28(nums) {\n  return nums.filter((n) => n === 2).length * 2 === 8;\n}`,
        tests: [
          [[2, 3, 2, 2, 4, 2]],
          [[2, 3, 2, 2, 4, 2, 2]],
          [[1, 2, 3, 4]],
          [[2, 2, 2, 2]],
        ],
      },
      {
        description: 'Return true if the array has more 1s than 4s.',
        solution: `function more14(nums) {\n  const ones = nums.filter((n) => n === 1).length;\n  const fours = nums.filter((n) => n === 4).length;\n  return ones > fours;\n}`,
        tests: [[[1, 4, 1]], [[1, 4, 1, 4]], [[1, 1]], [[4]]],
      },
      {
        description: 'Return an array of length n containing 0, 1, 2 ... n-1.',
        solution: `function fizzArray(n) {\n  return Array.from({ length: n }, (_, i) => i);\n}`,
        tests: [[4], [1], [10], [0]],
      },
      {
        description: 'Return true if every element is a 1 or a 4.',
        solution: `function only14(nums) {\n  return nums.every((n) => n === 1 || n === 4);\n}`,
        tests: [[[1, 4, 1, 4]], [[1, 4, 2, 4]], [[1, 1]], [[]]],
      },
      {
        description:
          'Return true if the array contains three increasing adjacent numbers, like 4, 5, 6.',
        solution: `function tripleUp(nums) {\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (nums[i + 1] === nums[i] + 1 && nums[i + 2] === nums[i] + 2) return true;\n  }\n  return false;\n}`,
        tests: [
          [[1, 4, 5, 6, 2]],
          [[1, 2, 3]],
          [[1, 2, 4]],
          [[10, 9, 8, -100, -99, -98, 100]],
        ],
      },
    ],
  },
  {
    name: 'Recursion-1',
    description: 'Solve problems with recursion, no loops',
    difficulty: 'hard',
    group_name: 'Recursion',
    icon_name: 'repeat',
    problems: [
      {
        description: 'Return n factorial (1 * 2 * ... * n).',
        solution: `function factorial(n) {\n  return n <= 1 ? 1 : n * factorial(n - 1);\n}`,
        tests: [[1], [2], [3], [10]],
      },
      {
        description:
          'Return the nth Fibonacci number. fibonacci(0) is 0 and fibonacci(1) is 1.',
        solution: `function fibonacci(n) {\n  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);\n}`,
        tests: [[0], [1], [2], [10]],
      },
      {
        description:
          'Each bunny has 2 big floppy ears. Return the total number of ears for n bunnies.',
        solution: `function bunnyEars(bunnies) {\n  return bunnies === 0 ? 0 : 2 + bunnyEars(bunnies - 1);\n}`,
        tests: [[0], [1], [2], [12]],
      },
      {
        description:
          'Return the total number of blocks in a triangle with the given number of rows (1 block, then 2, then 3...).',
        solution: `function triangle(rows) {\n  return rows === 0 ? 0 : rows + triangle(rows - 1);\n}`,
        tests: [[0], [1], [2], [7]],
      },
      {
        description: 'Return the sum of the digits of a non-negative number.',
        solution: `function sumDigits(n) {\n  return n < 10 ? n : (n % 10) + sumDigits(Math.floor(n / 10));\n}`,
        tests: [[126], [49], [12], [10110]],
      },
      {
        description:
          'Return how many times the digit 7 appears in a non-negative number.',
        solution: `function count7(n) {\n  if (n === 0) return 0;\n  return (n % 10 === 7 ? 1 : 0) + count7(Math.floor(n / 10));\n}`,
        tests: [[717], [7], [123], [777576197]],
      },
      {
        description: 'Return base to the power n, for n of 0 or more.',
        solution: `function powerN(base, n) {\n  return n === 0 ? 1 : base * powerN(base, n - 1);\n}`,
        tests: [
          [3, 1],
          [3, 2],
          [2, 0],
          [10, 3],
        ],
      },
      {
        description:
          'Count how many lowercase "x" characters are in the string.',
        solution: `function countX(str) {\n  if (str.length === 0) return 0;\n  return (str[0] === 'x' ? 1 : 0) + countX(str.slice(1));\n}`,
        tests: [['xxhixx'], ['xhixhix'], ['hi'], ['']],
      },
      {
        description: 'Return the string with every "pi" replaced by "3.14".',
        solution: `function changePi(str) {\n  if (str.length < 2) return str;\n  if (str.startsWith('pi')) return '3.14' + changePi(str.slice(2));\n  return str[0] + changePi(str.slice(1));\n}`,
        tests: [['xpix'], ['pipi'], ['pip'], ['p']],
      },
      {
        description:
          'Return a string where identical adjacent characters are separated by a "*".',
        solution: `function pairStar(str) {\n  if (str.length < 2) return str;\n  const sep = str[0] === str[1] ? '*' : '';\n  return str[0] + sep + pairStar(str.slice(1));\n}`,
        tests: [['hello'], ['xxyy'], ['aaaa'], ['ab']],
      },
    ],
  },
  {
    name: 'Functional-1',
    description: 'Use map, filter and reduce',
    difficulty: 'easy',
    group_name: 'Functional',
    icon_name: 'function',
    problems: [
      {
        description: 'Return a new array where each number is doubled.',
        solution: `function doubling(nums) {\n  return nums.map((n) => n * 2);\n}`,
        tests: [[[1, 2, 3]], [[6, 8, 6, 8, -1]], [[]], [[5]]],
      },
      {
        description: 'Return a new array where each number is squared.',
        solution: `function square(nums) {\n  return nums.map((n) => n * n);\n}`,
        tests: [[[1, 2, 3]], [[6, 8, -6, -8, 1]], [[]], [[0]]],
      },
      {
        description:
          'Return a new array where "*" is added to the end of each string.',
        solution: `function addStar(strs) {\n  return strs.map((s) => s + '*');\n}`,
        tests: [[['a', 'bb', 'ccc']], [['hello', 'there']], [['*']], [[]]],
      },
      {
        description: 'Return a new array where each string is in uppercase.',
        solution: `function allUpper(strs) {\n  return strs.map((s) => s.toUpperCase());\n}`,
        tests: [[['a', 'b', 'c']], [['hello', 'there']], [['Hi']], [[]]],
      },
      {
        description:
          'Return a new array with the rightmost digit of each non-negative number.',
        solution: `function rightDigit(nums) {\n  return nums.map((n) => n % 10);\n}`,
        tests: [[[1, 22, 93]], [[16, 8, 886, 8, 1]], [[10, 0]], [[]]],
      },
      {
        description: 'Return a new array with only the non-negative numbers.',
        solution: `function noNeg(nums) {\n  return nums.filter((n) => n >= 0);\n}`,
        tests: [[[1, -2]], [[-3, -3, 3, 3]], [[-1, -1, -1]], [[]]],
      },
      {
        description:
          'Return a new array without any string that contains the letter "z".',
        solution: `function noZ(strs) {\n  return strs.filter((s) => !s.includes('z'));\n}`,
        tests: [
          [['aaa', 'bbb', 'aza']],
          [['hziz', 'hzz', 'hi']],
          [['hello', 'howz']],
          [[]],
        ],
      },
      {
        description:
          'Return a new array with only the strings shorter than 4 characters.',
        solution: `function noLong(strs) {\n  return strs.filter((s) => s.length < 4);\n}`,
        tests: [
          [['this', 'not', 'too', 'long']],
          [['a', 'bbb', 'cccc']],
          [['cccc', 'dddd']],
          [[]],
        ],
      },
      {
        description: 'Return the total length of all the strings in the array.',
        solution: `function totalLength(strs) {\n  return strs.reduce((sum, s) => sum + s.length, 0);\n}`,
        tests: [[['a', 'bb', 'ccc']], [['hello']], [['', '']], [[]]],
      },
      {
        description:
          'Return a new array with the duplicates removed, keeping the first copy of each.',
        solution: `function noDuplicates(nums) {\n  return [...new Set(nums)];\n}`,
        tests: [[[1, 2, 2, 3]], [[5, 5, 5]], [[3, 1, 3, 2, 1]], [[]]],
      },
    ],
  },
];
