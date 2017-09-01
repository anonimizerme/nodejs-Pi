'use strict';

const util = require('util');
const Big = require('big.js');

Big.DP = 50;

let i = 1;
let currentPi = new Big(0);

/**
 * Ряд Лейбница
 * @param members
 */
function piL(members) {
    let i = currentPi == 0 ? 0 : members - 1;
    for (; i < members; i++) {
        const increment = (new Big(4)).div(2*i + 1);
        currentPi = i % 2 == 0 ? currentPi.plus(increment) : currentPi.minus(increment);
    }
}

/**
 * Ряд Нилаканта
 * @param members
 */
function piN(members) {
    if (currentPi == 0) {
        currentPi = new Big(3);
    }

    let i = currentPi == 3 ? 0 : members - 1;
    for (; i < members; i++) {
        const min = 2*i + 2;
        const increment = (new Big(4)).div(min*(min+1)*(min+2));
        currentPi = i % 2 == 0 ? currentPi.plus(increment) : currentPi.minus(increment);
    }
}

const methods = {
    piL,
    piN
};

function pi(method, members) {
    methods[`pi${method}`](members);
}

let constLen = 1;
let constCount = 0;
let lastPi = '';

while (true) {
    lastPi = currentPi.toString();

    pi('N', i);

    if (lastPi.indexOf(currentPi.toString().substring(0, constLen)) == 0) {
        if (constCount == 10) {
            util.print('\n');
            console.log(i, currentPi.toString().substring(0, constLen));
            constCount = 0;
            constLen++;
        } else {
            constCount++;
        }
    } else {
        constCount = 0;
        if (i % (i > 1000000 ? 1000 : 100) == 0) {
            util.print(`Length of series ${i} \r`);
        }
    }


    i++;
}
