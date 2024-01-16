function toWords(number) {
    if (number === 0) {
        return 'zéro';
    }

    const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    const bigNumbers = ['', 'mille', 'million', 'milliard'];

    const convertLessThanThousand = (num) => {
        let result = '';
        if (num >= 100) {
            result += units[Math.floor(num / 100)] + ' cent ';
            num %= 100;
        }
        if (num >= 20) {
            result += tens[Math.floor(num / 10)];
            num %= 10;
            if (num > 0) {
                result += '-' + units[num];
            }
        } else if (num >= 10) {
            result += teens[num - 10];
        } else {
            result += units[num];
        }
        return result.trim();
    };

    let result = '';
    let i = 0;
    while (number > 0) {
        if (number % 1000 > 0) {
            result = convertLessThanThousand(number % 1000) + ' ' + bigNumbers[i] + ' ' + result;
        }
        number = Math.floor(number / 1000);
        i++;
    }
    return result.trim();
}

function formatCentsInWords(cents) {
    if (cents === 0) {
        return 'zéro';
    } else {
        // Convert cents to a number with a length equal to the number of digits after the comma
        const formattedCents = String(cents);
        return toWords(parseInt(formattedCents, 10));
    }
}

module.exports = { toWords, formatCentsInWords };