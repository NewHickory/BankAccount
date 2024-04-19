class BankAccount {
    constructor(accountNumber, owner){
      this.accountNumber = accountNumber;
      this.owner = owner;
      this.transactions = [];
    }
    balance() {
      return this.transactions.reduce((balance, current) => balance + current.amount, 0);
    }
    deposit(amt) {
      if (amt > 0) {
        let depositTransaction = new Transaction(amt, 'Deposit');
        this.transactions.push(depositTransaction);
      }
    }
    charge(amt, payee) {
      let currentBalance = this.balance();
      if (amt > 0 && amt <= currentBalance) {
        let chargeTransaction = new Transaction(-amt, payee);
        this.transactions.push(chargeTransaction);
      }
    }
  }
  
  class Transaction {
    constructor(amount, payee){
      this.date = new Date();
      this.amount = amount;
      this.payee = payee;
    }
  }
  
  
  class SavingsAccount extends BankAccount {
    constructor(accountNumber, owner, interestRate){
      super(accountNumber, owner);
      this.interestRate = interestRate;
    }
    accrueInterest(){
      let currentBalance = this.balance();
      let interest = currentBalance * this.interestRate;
      let interestTransaction = new Transaction(interest, 'Interest');
      this.transactions.push(interestTransaction);
    }
  }
  
  // console.log testing BankAccount
  
  const account = new BankAccount('123456789', 'John Doe');
  console.log('Bank Account number:', account.accountNumber)
  console.log('Owner:', account.owner);
  
  console.log('Original Balance:', account.balance());
  
  account.deposit(100)
  console.log('Balance after $100 deposit:', account.balance());
  
  account.deposit(30)
  console.log('Balance after $30 deposit:', account.balance());
  
  account.charge(50, 'Groceries');
  console.log('Balance after $50 charge:', account.balance());
  
  console.log('List of transactions:', account.transactions);
  
  // console.log testing SavingsAccount
  
  const savingsAccount = new SavingsAccount('987654321', 'Jane Doe', 0.05);
  console.log('Savings Account number' , savingsAccount.accountNumber);
  console.log('Owner:', savingsAccount.owner);
  console.log('Interst rate:', savingsAccount.interestRate);
  
  console.log('Original Balance:', savingsAccount.balance());
  
  savingsAccount.deposit(100)
  console.log('Balance after $100 deposit:', savingsAccount.balance());
  
  savingsAccount.deposit(30)
  console.log('Balance after $30 deposit:', savingsAccount.balance());
  
  savingsAccount.accrueInterest();
  console.log('Balance after interest accrued:', savingsAccount.balance());
  
  console.log('List of transactions:', savingsAccount.transactions);
  
  // tests
  if (typeof describe === 'function') {
    const assert = require('assert');
  
    describe('Testing Bank Account creation', () => {
      it('should create a bank account', () => {
        const account = new BankAccount('123', 'John Doe');
        assert.equal(account.accountNumber, '123');
        assert.equal(account.owner, 'John Doe');
        assert.equal(account.transactions.length, 0);
        assert.equal(account.balance(), 0);
      });
      
    });
  
    describe('#Test transaction creation', () => {
      it('should create a transaction for deposit', () => {
        let t1 = new Transaction(100, 'Deposit');
        assert.equal(t1.amount, 100);
        assert.equal(t1.payee, 'Deposit');
        assert.notEqual(t1.date, undefined);
        assert.notEqual(t1.date, null);
      });
      it('should create a transaction for a charge', () => {
        let t1 = new Transaction(-30.40, 'Target');
        assert.equal(t1.amount, -30.40);
        assert.equal(t1.payee, 'Target');
        assert.notEqual(t1.date, undefined);
        assert.notEqual(t1.date, null);
      });
    });
  
    describe('#Test account balance', () => {
      it('should calculate balance correctly', () => {
        let acct1 = new BankAccount('xyz123', 'David Doe');
        assert.equal(acct1.amount, 0);
        acct1.deposit(100);
        assert.equal(acct1.amount, 100);
        acct1.charge(10, 'Target');
        assert.equal(acct1.amount, 90);
      });
      it('should not allow negative deposit', () => {
        let acct1 = new BankAccount('xyz123', 'David Doe');
        assert.equal(acct1.amount, 0);
        acct1.deposit(100);
        assert.equal(acct1.amount, 100);
        acct1.deposit(-20);
        assert.equal(acct1.amount, 100);
      });
      it('should not allow charges that would result in negative account balance', () => {
        let acct1 = new BankAccount('xyz123', 'David Doe');
        assert.equal(acct1.amount, 0);
        acct1.charge(30, 'Target');
        assert.equal(acct1.amount, 0);
      });
    });
  }
  