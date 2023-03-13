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
// console.log(useState());
const [expense, setExpense] = React.useState(initialExpenses);
// console.log(expense)
  return(
    <div>
      <Alert />
      <h1>My Budget Calculator</h1>

      <main>
      <ExpenseForm />
      <ExpenseList  expenses = {expense}/>
      </main>
         <h1>
          Total Spending : {" "}
          <span className='total'>
            ${""}{expense.reduce((total,current) => {
              return (total += current.amount);
            },0)}
          </span>
         </h1>
    </div>

  )
}

 
