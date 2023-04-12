import React, { useState, useEffect } from 'react';
import Income from './components/Income';
import IncomeList from './components/IncomeList'
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
// import data from './data';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

// const initialIncomes = [
//   {id: uuidv4(), description: "Web Development", income: 5000},
//   { id: uuidv4(), description: "UX/UI Designer", income: 3000 }, 
//   { id: uuidv4(), description: "Proofreading", income: 2000 },
// ]
// console.log(initialIncomes)

// const initialExpenses =[
//   { id: uuidv4(), charge: "rent", amount:1600},
//   { id: uuidv4(), charge: "car payment", amount:200},
//   { id: uuidv4(), charge: "Utility payment",amount:1000},
//   { id: uuidv4(), charge: "school fees", amount:2000},
// ]

const initialData = JSON.parse(localStorage.getItem('data')) || { expenses: [], incomes: [] };
const initialExpenses = initialData.expenses;
const initialIncomes = initialData.incomes;

// console.log(initialExpenses)
export default function App() {
  // statevalues for all my expense and income
  // console.log(useState());
  const [incomes,setIncome]= React.useState(initialIncomes);
  const [money, setMoney] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [message, setMessage]= React.useState({show:false});
  const [alter, setAlter] = React.useState(false);
  const [look, setLook]= React.useState(0);
  const [expenses, setExpense] = React.useState(initialExpenses);
  const [charge, setCharge] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [alert, setAlert] = React.useState({ show: false });
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState(0);


  useEffect(() => {
    localStorage.setItem('data', JSON.stringify({ expenses, incomes }));
  }, [expenses, incomes]);


  const handleIncomeChange = (e) => {
    // setIncome(event.target.value);
    let money = e.target.value;
    if (money === "") {
      setMoney(money);
    } else {
      setMoney(parseInt(money));
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const createAlert = ({ type, text }) => {
    setMessage({ show: true, type, text });
    setTimeout(() => {
      setMessage({ show: false });
    }, 4000);
  };

  const handleAddIncome = (e) => {
    // code to add income to state or database goes here
    // console.log(`Added income of ${income} for ${description}`);
    e.preventDefault();
    if (description !== " " && money > 0) {
      if (alter) {
        let tempIncomes = incomes.map(prop => {
          return prop.id === id ? { ...prop, description, money } : prop
        });
        setIncome(tempIncomes);
        setAlter(false);
        createAlert({ type: "success", text: "item edited" });
      } else {
        const oneIncome = { id: uuidv4(), description, money };
        setIncome([...incomes, oneIncome]);
        createAlert({ type: "success", text: "item added" });
      }
      setDescription("");
      setMoney("");
    } else {
      createAlert({
        type: "danger",
        text: `input cannot be empty`
      });
    }

  };

  const createDelete = id => {
    let tempIncomes = incomes.filter(prop => prop.id !== id);
    setIncome(tempIncomes);
    createAlert({ type: "danger", text: "item deleted" });
  };
  //clear all items
  const removeItems = () => {
    setIncome([]);
  };
  // handle edit
  const createEdit = id => {
    let income = incomes.find(prop => prop.id === id);
    let { description, money } = income;
    setDescription(description);
    setMoney(money);
    setAlter(true);
    setLook(id);
  };




  // The charge function
  const handleCharge = e => {
    // console.log(`Charge : ${e.target.value}`)
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    // console.log(`Amount : ${e.target.value}`)
    let amount = e.target.value;
    if (amount === "") {
      setAmount(amount);
    } else {
      setAmount(parseInt(amount));
    }
  }
  // The alert function
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4000);
  };

  // The Submit function
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== " " && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item
        });
        setExpense(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const oneExpense = { id: uuidv4(), charge, amount };
        setExpense([...expenses, oneExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `input cannot be empty`
      });
    }
  }

  // handle delete
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpense(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  //clear all items
  const clearItems = () => {
    setExpense([]);
  };
  // handle edit
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  const [showIncomeLeft, setShowIncomeLeft] = useState(false);

  const totalIncome = incomes.reduce((acc, curr) => acc + curr.money, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const incomeLeft = totalIncome - totalExpenses;


  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>My Budget Calculator</h1>
      <main className='container'>
      <div className='App1'>
        <Income
          income={money}
          description={description}
          handleIncomeChange={handleIncomeChange}
          handleDescriptionChange={handleDescriptionChange}
          handleAddIncome={handleAddIncome}
        />

         <IncomeList 
          incomes = {incomes} 
          createDelete={createDelete}
          createEdit={createEdit}
          removeItems={removeItems}
        /> 

          <button className='button' onClick={() => setShowIncomeLeft(!showIncomeLeft)}>
            <h1>
              {showIncomeLeft ? 'Income Left' : 'Total Income'} : {" "}
              <span className='total'>
                ${showIncomeLeft ? incomeLeft : incomes.reduce((total, current) => total += parseInt(current.money), 0)}
              </span>
            </h1>
          </button>
      </div>

        <div className='App1'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
        <button className='button'>
          <h1>
            Total Expenses : {" "}
            <span className='total'>
              ${""}{expenses.reduce((total, current) => {
                return (total += parseInt(current.amount));
              }, 0)}
            </span>
          </h1>
        </button>
      </div>
      </main>
    </div>

  )
}


