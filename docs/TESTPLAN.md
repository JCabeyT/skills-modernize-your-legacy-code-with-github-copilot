# Test Plan for COBOL Account Management System

This test plan covers the business logic and implementation of the legacy COBOL account management system. It is designed to validate functionality with business stakeholders and will later be used to create unit and integration tests for the Node.js transformation.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|----------------------|----------------|------------|-----------------|----------------|-------------------|----------|
| TC001 | Verify initial account balance display | Application is started and menu is displayed | 1. Select option 1 (View Balance) | Current balance of $1000.00 is displayed |  |  | Initial balance requirement |
| TC002 | Verify credit operation with positive amount | Application is running, initial balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00<br>3. Select option 1 to view balance | Balance displays $1500.00 |  |  | Credit functionality |
| TC003 | Verify debit operation with sufficient funds | Application is running, balance is $1500.00 (after TC002) | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00<br>3. Select option 1 to view balance | Balance displays $1300.00 |  |  | Debit with sufficient funds |
| TC004 | Verify debit operation with insufficient funds | Application is running, balance is $1300.00 (after TC003) | 1. Select option 3 (Debit Account)<br>2. Enter amount: 2000.00 | Error message "Insufficient funds for this debit." is displayed, balance remains $1300.00 |  |  | Insufficient funds validation |
| TC005 | Verify multiple credit operations | Application is running, balance is $1300.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 100.00<br>3. Select option 2 again<br>4. Enter amount: 50.00<br>5. Select option 1 to view balance | Balance displays $1450.00 |  |  | Multiple credits accumulation |
| TC006 | Verify multiple debit operations | Application is running, balance is $1450.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 100.00<br>3. Select option 3 again<br>4. Enter amount: 50.00<br>5. Select option 1 to view balance | Balance displays $1300.00 |  |  | Multiple debits accumulation |
| TC007 | Verify balance persistence across operations | Application is running, perform TC002, TC003, TC004 | 1. Select option 1 (View Balance) after each operation | Balance correctly reflects all previous transactions |  |  | Data persistence |
| TC008 | Verify zero amount credit | Application is running, balance is $1300.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 0.00<br>3. Select option 1 to view balance | Balance remains $1300.00 (no change) |  |  | Edge case: zero credit |
| TC009 | Verify zero amount debit | Application is running, balance is $1300.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 0.00<br>3. Select option 1 to view balance | Balance remains $1300.00 (no change) |  |  | Edge case: zero debit |
| TC010 | Verify exact balance debit | Application is running, balance is $1300.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 1300.00<br>3. Select option 1 to view balance | Balance displays $0.00 |  |  | Edge case: exact balance debit |
| TC011 | Verify menu option validation | Application is running | 1. Enter invalid choice (e.g., 5)<br>2. Enter valid choice (1) | Error message "Invalid choice, please select 1-4." is displayed, then balance is shown |  |  | Input validation |
| TC012 | Verify program exit | Application is running | 1. Select option 4 (Exit) | Program displays "Exiting the program. Goodbye!" and terminates |  |  | Exit functionality |