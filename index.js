const formButton = document.getElementById("form-button");
const transactionList = document.getElementById("transactions-table-body");
const budge = document.getElementById("budget");
const filterCategory = document.getElementById("apply-filters");
const clearFilterButton = document.getElementById("clear-filters");

let transactions = [];
let filtered = []; a
let totalBudget = 0;
var counter = 0;
let deleted = false;



formButton.addEventListener("click", (e) => {
    
    e.preventDefault();
    //debugger;
    const name = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    
    
    let transaction = {
        id: counter ++,
        name,
        amount: Number(amount),
        category,
        date
    };


    transactions.push(transaction);
    showTransactions(transactions)
    updateBudget(transaction)
    updateLocalStorage()

});

transactionList.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        let transaction = transactions.find(expense => expense.id === id);
        transactions = transactions.filter(expense => expense.id !== id);
        deleted = true
        showTransactions(transactions);
        updateBudget(transaction)
        updateLocalStorage()
        
    }

    
});



function showTransactions(transactions) {
    transactionList.innerHTML = "";
    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.name}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.category}</td>
            <td>
                
                <button class="delete-btn" data-id="${transaction.id}">Delete</button>
            </td>
        `;

        transactionList.appendChild(row);
    });
}



filterCategory.addEventListener("click",  (e) => {
    
    e.preventDefault();
    
    const minAmount = document.getElementById("min-amount").value;
    const maxAmount= document.getElementById("max-amount").value;
    const filterDate = document.getElementById("date-filter").value;
    const filterType  = document.getElementById("filter-type").value;
    

    let filteredTransactions = transactions
      
    

    if(minAmount){
        filteredTransactions = filteredTransactions.filter(transaction => parseFloat(transaction.amount) >= parseFloat(minAmount));
    }

    if(maxAmount){
        filteredTransactions = filteredTransactions.filter(transaction => parseFloat(transaction.amount) <= parseFloat(maxAmount));
    }

    if (filterDate){


      filteredTransactions = filteredTransactions.filter( transaction => transaction.date == filterDate );
    
    }

    
    if (filterType){


        filteredTransactions = filteredTransactions.filter( transaction => transaction.category == filterType);
      
      }

    



   
    
    showTransactions(filteredTransactions)
    
    
       
    

    })


 clearFilterButton.addEventListener("click", () => {
  
  
  document.getElementById("min-amount").value = "";
  document.getElementById("max-amount").value = "";
  showTransactions(transactions)
  



 })   


function updateBudget(transaction){

        if(deleted){

            if(transaction.category === 'income'){

                totalBudget -= transaction.amount
                deleted = false
            }
            else if(transaction.category === 'expense'){
    
                totalBudget += transaction.amount;
                deleted = false
    
    
            }    


        }

        else{


            if(transaction.category === 'income'){

                totalBudget += transaction.amount
                deleted = false
            }
            else if(transaction.category === 'expense'){
    
                totalBudget -= transaction.amount;
                deleted  = false
    
    
            }    
        }
    
   

        
         
        budge.innerHTML = totalBudget

        } 
        

function updateLocalStorage(){


    const data = {
        transaction: transactions,
        totalBudget,
        counter

    }

    localStorage.setItem("savedTransactions", JSON.stringify(data))
}        
        
    

    
function loadLocalStorage(){

    let data = localStorage.getItem("savedTransactions")

    if (!data){
        return
    }
    data = JSON.parse(data)
    transactions = data.transactions;
    totalBudget = data.totalBudget;
    counter = data.counter
    

};

loadLocalStorage()
showTransactions(transactions)

budge.innerHTML = totalBudget



       
    
    


