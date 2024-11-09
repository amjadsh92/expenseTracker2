const formButton = document.getElementById("form-button");
const transactionList = document.getElementById("transactions-table-body");
const budge = document.getElementById("budget");
const filterCategory = document.getElementById("apply-filters");
const clearFilterButton = document.getElementById("clear-filters");

let transactions = [];
let filtered = []; 
let totalBudget = 0;





formButton.addEventListener("click", async (e) => {
    
    e.preventDefault();
    //debugger;
    const name = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    
    const formdata = new FormData();
    formdata.append("description", name);
    formdata.append("amount", amount);
    formdata.append("type", category);
    formdata.append("date", date);
    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    
     response = await fetch("./server/addTransaction.php", requestOptions)
     

     loadTransactions()
    

});

transactionList.addEventListener("click", async (e) => {
    
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
       

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          await fetch("./server/deleteTransaction.php?id=" + id, requestOptions)

          loadTransactions()

            
        
       
        
        
    }

    
});



function showTransactions(transactions) {
    transactionList.innerHTML = "";
    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
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


        filteredTransactions = filteredTransactions.filter( transaction => transaction.type == filterType);
      
      }

    



   
    
    showTransactions(filteredTransactions)
    
    
       
    

    })


 clearFilterButton.addEventListener("click", () => {
  
  
  document.getElementById("min-amount").value = "";
  document.getElementById("max-amount").value = "";
  showTransactions(transactions)
  



 })   


function updateBudget(transaction){

        


            if(transaction.type === 'income'){

                totalBudget += transaction.amount
               
            }
            else if(transaction.type === 'expense'){
    
                totalBudget -= transaction.amount;
                
    
    
            }   
            
            budge.innerHTML = totalBudget
        }
    
   

        
         
       

        
        


 const loadTransactions = async () => {

     transactions  = await fetch("./server/getAllTransactions.php")
     transactions = await transactions.json()
     showTransactions(transactions)
     totalBudget=0
    
     budge.innerHTML = totalBudget
        
     
     for (let transaction of transactions){

        updateBudget(transaction)
     } 

 }       


 loadTransactions()









       
    
    


