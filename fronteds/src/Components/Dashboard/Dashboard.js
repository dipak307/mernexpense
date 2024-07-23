import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import { useGlobalContext } from '../../context/globalContext';
import { dollar } from '../../utils/Icons';
import History from '../History/History';
const Dashboard = () => {

     const {incomes,expenses,totalExpenses,totalIncome,totalBalance,getIncomes,getExpenses}=useGlobalContext();

     useEffect(()=>{
            getIncomes()
            getExpenses()
     },[])


  return (
    <DashboardStyle>
     <InnerLayout>
    <h1>All Transactions</h1>
    <div className='stats-con'>
         <div className='chart-con'>
          <Chart/>
          <div className='amount-con'>
               <div className='income'>
                  <h3>Total Income</h3>
                  <p>{dollar} {totalIncome()}</p>
               </div>
               <div className='expense'>
                     <h3>Total Expense</h3>
                     <p>{dollar} {totalExpenses()}</p>
               </div>
               <div className='balance'>
                   <h3>Total Balance</h3>
                   <p>{dollar} {totalBalance()}</p>
               </div>
          </div>
      </div>
            <div className='history-con'>
                  <History/>
                  <h2 className='salary-title'>Min <span>Salary</span> Max </h2>
                  <div className='salary-item'>
                      <p>
                         {Math.min(...incomes.map((item)=> item.amount))}
                      </p>
                      <p>
                         {Math.max(...incomes.map((item)=> item.amount))}
                      </p>
                  </div>
                  <h2 className='salary-title'>Min <span>Expense</span> Max </h2>
                  <div className='salary-item'>
                      <p>
                         {Math.min(...expenses.map((item)=> item.amount))}
                      </p>
                      <p>
                         {Math.max(...expenses.map((item)=> item.amount))}
                      </p>
                  </div>
            </div>
    </div>
    </InnerLayout>
    </DashboardStyle>
  )
}

const DashboardStyle=styled.div`
            .stats-con{
              display:grid;
              grid-template-columns:repeat(5,1fr);
              gap:2rem;
              .chart-con{
                grid-column:1/4;
                height:400px;
               
                .amount-con{
                    display:grid;
                    grid-template-columns:repeat(4,1fr);
                    gap:2rem;
                    margin-top:2rem;
                    .income, .expense{
                      grid-column:span 2;
                    }
                    .income, .expense, .balance{
                      background:#FCF6F9;
                      border:2px solid #FFFFFF;
                      box-shadow:0px 1px 15px rgba(0,0,0,0.06);
                      border-radius:20px;
                      padding:1rem;
                       p{
                        font-size:2rem;
                        font-weight:400;
                       }
                    }
                    .balance{
                      grid-column:2/4;
                      display:flex;
                      flex-direction:column;
                      justify-content:center;
                      align-items:center;
                        p{
                          color:green;
                          opacity:0.6;
                          font-size:2rem;
                        }
                    }

                }
              }
              .history-con{
               grid-con:4/-1;
                h2{
                  margin:1rem 0;
                  display:flex;
                  align-items:center;
                  justify-content:space-between;
                }
               .salary-title{
                font-size:1.2rem;
                span{
                  font-size:1.8rem;
                }
               }
               .salary-item{
                     background:#FCF6F9;
                     border:2px solid #FFFFFF;
                      box-shadow:0px 1px 15px rgba(0,0,0,0.06);
                      border-radius:20px;
                      padding:1rem;
                      display:flex;
                      justify-content:space-between;
                      align-items:center;
                    p{
                      font-weight:600;
                      font-size:1.6rem;
                    }
               }

              }

            }
`

export default Dashboard;