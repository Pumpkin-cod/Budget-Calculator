import React, { useState } from 'react';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
// import data from './data';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const initialExpenses =[
  { id: uuidv4(), charge: "rent", amount:1600},
  { id: uuidv4(), charge: "car payment", amount:200},
  { id: uuidv4(), charge: "Utility payment",amount:1000},
  { id: uuidv4(), charge: "school fees", amount:2000},
]
// console.log(initialExpenses)
export default function App() {
  // statevalues for all my expense
// console.log(useState());
const [expenses, setExpense] = React.useState(initialExpenses);
const [charge, setCharge] = React.useState('')
const [amount, setAmount] = React.useState('')
const [alert,setAlert]= React.useState({show: false});
const [edit, setEdit]= React.useState(false);
const [id, setId] = React.useState(0);
  // The charge function
  const handleCharge = e =>{
    // console.log(`Charge : ${e.target.value}`)
    setCharge(e.target.value)
  }
  const handleAmount = e =>{
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
    if (charge !== " " && amount > 0){
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge,amount} : item
        });
        setExpense(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      }else{
        const oneExpense = { id: uuidv4(), charge, amount };
        setExpense([...expenses, oneExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      
      setCharge("");
      setAmount("");
    }else{
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


// console.log(expenses)
  return(
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
   
      <h1>My Budget Calculator</h1>

      <main className='App'>
        
      <ExpenseForm  
      charge = {charge} 
      amount = {amount} 
      handleAmount = {handleAmount} 
      handleCharge = {handleCharge} 
      handleSubmit = {handleSubmit}  
      edit = {edit}    
      />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
         <h1>
          Total Expenditure : {" "}
          <span className='total'>
            ${""}{expenses.reduce((total,current) => {
              return (total += parseInt(current.amount));
            },0)}
          </span>
         </h1>
    </div>

  )
}

 
