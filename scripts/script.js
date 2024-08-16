const bill = document.getElementById('fbill')
const numPeople = document.getElementById('fnumpeople')
const resetBtn = document.getElementById('resetBtn')

const billError = document.getElementById('billAmount-error')
const numPeopleError = document.getElementById('numPeople-error')
const customTip = document.getElementById('fcustomtip')


// Tip Selection Percentage
const amountPerPerson = document.querySelector('span.amount-x-pers')
const totalPerPerson = document.querySelector('span.total-x-pers')
// Buttons
const tipBtns = document.querySelectorAll('.tip-perc button')


// Inputs
bill.addEventListener('input', function(){
    if (parseFloat(bill.value) <= 0) {
        billError.innerHTML = "Can't be equal or lower than zero!"
        bill.style.outlineColor = "red"
    }else{
        billError.innerHTML = ""
        bill.style.outlineColor = "hsl(172, 67%, 45%)"
    } 
});

numPeople.addEventListener('input', function(){
    if (parseInt(numPeople.value) <= 0) {
        numPeopleError.innerHTML = "Can't be equal or lower than zero!" 
        numPeople.style.outlineColor = "red"
    }else{
        numPeopleError.innerHTML = ""
        numPeople.style.outlineColor = "hsl(172, 67%, 45%)"
    }
});

// Tip Selection Buttons 
tipBtns.forEach(btn =>{
    btn.addEventListener('click', (e) => {
        console.log(e.target.innerHTML)
        // 
        try {
            let tipPercentage = parseFloat(e.target.innerHTML) / 100
            let tipAmountPerson = Math.floor(((parseFloat(bill.value) * tipPercentage) / parseInt(numPeople.value))* 100) / 100
            
            let totalPerson= (Math.round((parseFloat(bill.value)) / parseInt(numPeople.value)* 100) / 100) + tipAmountPerson

            if (isNaN(tipAmountPerson) || isNaN(totalPerson)) {
                throw "0.00"
            }
            amountPerPerson.innerHTML = tipAmountPerson 
            totalPerPerson.innerHTML = totalPerson.toFixed(2)  
        } catch (err) {
            amountPerPerson.innerHTML = err   
            totalPerPerson.innerHTML = err
        }    
    });
});

// Custom Tip
customTip.addEventListener('input', function(){
    try{
        customTip.style.outlineColor = "hsl(172, 67%, 45%)"
        let tipPercentage = parseFloat(customTip.value) / 100
        let tipAmountPerson = Math.floor(((parseFloat(bill.value) * tipPercentage) / parseInt(numPeople.value))* 100) / 100
                    
        let totalPerson = (Math.round((parseFloat(bill.value)) / parseInt(numPeople.value)* 100) / 100) + tipAmountPerson

        if (isNaN(tipAmountPerson) || isNaN(totalPerson) || parseFloat(customTip.value) < 0) {
            throw "0.00"
        }

        amountPerPerson.innerHTML = tipAmountPerson 
        totalPerPerson.innerHTML = totalPerson.toFixed(2)
    }catch (err){
        customTip.style.outlineColor = "red"
        amountPerPerson.innerHTML = err        
        totalPerPerson.innerHTML = err
    }
});

// Reset btn
resetBtn.addEventListener('click', function(){
    bill.value = ""
    numPeople.value = ""
    customTip.value = ""
    totalPerPerson.innerHTML = "0.00"
    amountPerPerson.innerHTML = "0.00"
});