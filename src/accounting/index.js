const readline = require('readline');

let accountData = { balance: 1000.00 };

function dataProgram(operation, data) {
    if (operation === 'READ') {
        data.balance = accountData.balance;
    } else if (operation === 'WRITE') {
        accountData.balance = data.balance;
    }
}

function operations(operationType, rl, callback) {
    if (operationType === 'TOTAL ') {
        let tempData = { balance: 0 };
        dataProgram('READ', tempData);
        console.log(`Current balance: ${tempData.balance.toFixed(2)}`);
        callback();
    } else if (operationType === 'CREDIT') {
        rl.question('Enter credit amount: ', (amount) => {
            let amt = parseFloat(amount);
            if (isNaN(amt) || amt < 0) {
                console.log('Invalid amount. Please enter a positive number.');
                callback();
                return;
            }
            let tempData = { balance: 0 };
            dataProgram('READ', tempData);
            tempData.balance += amt;
            dataProgram('WRITE', tempData);
            console.log(`Amount credited. New balance: ${tempData.balance.toFixed(2)}`);
            callback();
        });
    } else if (operationType === 'DEBIT ') {
        rl.question('Enter debit amount: ', (amount) => {
            let amt = parseFloat(amount);
            if (isNaN(amt) || amt < 0) {
                console.log('Invalid amount. Please enter a positive number.');
                callback();
                return;
            }
            let tempData = { balance: 0 };
            dataProgram('READ', tempData);
            if (tempData.balance >= amt) {
                tempData.balance -= amt;
                dataProgram('WRITE', tempData);
                console.log(`Amount debited. New balance: ${tempData.balance.toFixed(2)}`);
            } else {
                console.log('Insufficient funds for this debit.');
            }
            callback();
        });
    }
}

function mainMenu() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function showMenu() {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
        rl.question('Enter your choice (1-4): ', (choice) => {
            let userChoice = parseInt(choice);
            if (userChoice === 1) {
                operations('TOTAL ', rl, showMenu);
            } else if (userChoice === 2) {
                operations('CREDIT', rl, showMenu);
            } else if (userChoice === 3) {
                operations('DEBIT ', rl, showMenu);
            } else if (userChoice === 4) {
                console.log('Exiting the program. Goodbye!');
                rl.close();
            } else {
                console.log('Invalid choice, please select 1-4.');
                showMenu();
            }
        });
    }

    showMenu();
}

mainMenu();