import { numberToFrench } from './utils/frenchNumbers';

const testCases = [
    { n: 0, expected: 'zéro' },
    { n: 1, expected: 'un' },
    { n: 16, expected: 'seize' },
    { n: 21, expected: 'vingt et un' },
    { n: 70, expected: 'soixante-dix' },
    { n: 71, expected: 'soixante et onze' },
    { n: 75, expected: 'soixante-quinze' },
    { n: 80, expected: 'quatre-vingts' },
    { n: 81, expected: 'quatre-vingt-un' },
    { n: 91, expected: 'quatre-vingt-onze' },
    { n: 99, expected: 'quatre-vingt-dix-neuf' },
    { n: 100, expected: 'cent' },
    { n: 200, expected: 'deux cents' },
    { n: 201, expected: 'deux cent un' },
    { n: 1000, expected: 'mille' },
    { n: 2000, expected: 'deux mille' },
    { n: 1000000, expected: 'un million' },
    { n: 123456, expected: 'cent vingt-trois mille quatre cent cinquante-six' },
];

let failed = 0;
testCases.forEach(({ n, expected }) => {
    const result = numberToFrench(n);
    if (result !== expected) {
        console.error(`FAIL: ${n} -> expected "${expected}", got "${result}"`);
        failed++;
    } else {
        console.log(`PASS: ${n} -> ${result}`);
    }
});

if (failed === 0) {
    console.log('All tests passed!');
} else {
    console.error(`${failed} tests failed.`);
    process.exit(1);
}
