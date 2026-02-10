/**
 * Utility to convert numbers to French words.
 * Supports numbers from 0 to 1,000,000.
 * Ref: https://en.wikipedia.org/wiki/French_numbers
 */

const baseNumbers: { [key: number]: string } = {
    0: 'zéro',
    1: 'un',
    2: 'deux',
    3: 'trois',
    4: 'quatre',
    5: 'cinq',
    6: 'six',
    7: 'sept',
    8: 'huit',
    9: 'neuf',
    10: 'dix',
    11: 'onze',
    12: 'douze',
    13: 'treize',
    14: 'quatorze',
    15: 'quinze',
    16: 'seize',
    20: 'vingt',
    30: 'trente',
    40: 'quarante',
    50: 'cinquante',
    60: 'soixante',
    80: 'quatre-vingts',
};

export function numberToFrench(n: number): string {
    if (n === 0) return baseNumbers[0];
    if (n < 0) return 'moins ' + numberToFrench(Math.abs(n));

    let result = '';

    if (n >= 1000000) {
        const millions = Math.floor(n / 1000000);
        const remainder = n % 1000000;
        result += (millions === 1 ? 'un million' : numberToFrench(millions) + ' millions');
        if (remainder > 0) result += ' ' + numberToFrench(remainder);
        return result.trim();
    }

    if (n >= 1000) {
        const thousands = Math.floor(n / 1000);
        const remainder = n % 1000;
        if (thousands === 1) {
            result += 'mille';
        } else {
            result += numberToFrench(thousands) + ' mille';
        }
        if (remainder > 0) result += ' ' + numberToFrench(remainder);
        return result.trim();
    }

    if (n >= 100) {
        const hundreds = Math.floor(n / 100);
        const remainder = n % 100;
        if (hundreds === 1) {
            result += 'cent';
        } else {
            result += baseNumbers[hundreds] + ' cents';
            // If there's a remainder, 'cents' becomes 'cent'
            if (remainder > 0) result = result.replace('cents', 'cent');
        }
        if (remainder > 0) result += ' ' + numberToFrench(remainder);
        return result.trim();
    }

    if (n <= 16) return baseNumbers[n];

    if (n < 20) {
        return 'dix-' + baseNumbers[n - 10];
    }

    if (n < 70) {
        const tens = Math.floor(n / 10) * 10;
        const units = n % 10;
        if (units === 0) return baseNumbers[tens];
        if (units === 1) return baseNumbers[tens] + ' et un';
        return baseNumbers[tens] + '-' + baseNumbers[units];
    }

    if (n < 80) {
        const units = n % 10;
        if (units === 1) return 'soixante et onze';
        return 'soixante-' + numberToFrench(10 + units);
    }

    if (n < 90) {
        const units = n % 10;
        if (units === 0) return 'quatre-vingts';
        return 'quatre-vingt-' + baseNumbers[units];
    }

    if (n < 100) {
        const units = n % 10;
        return 'quatre-vingt-' + numberToFrench(10 + units);
    }

    return 'unknown';
}
