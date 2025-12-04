document.addEventListener(('DOMContentLoaded'),()=>{   
    let form=document.querySelector('form');
    let amountMortgage=document.querySelector('#amount');
    let paragrafAmount=document.querySelector('#amountError');
    let mortgageTerm=document.querySelector('#years');
    let interestRate=document.querySelector('#rate');
    let parent=amountMortgage.closest('.input-group'); 
    let spanContainer=parent.querySelector('.container-span');
    let text=spanContainer.querySelector('.input-span');
    let repaymentBtnRadio=document.querySelector('#repayment');
    let interestBtnRadio=document.querySelector('#Interests');
    let paragrafRadio=document.querySelector('.container-mortgage>p');
    let section2=document.querySelector('.section2');
    let alternateSection=document.querySelector('.main>section:nth-child(3)');
    let link=document.querySelector('.p-text');
    let repayParagraph=document.querySelector('.repay');
    let resultParagraph=document.querySelector('.result');
    let allParagraphs=document.querySelectorAll('.paragrafError');
    let spanContainers=document.querySelectorAll('.container-span');
    let spanTexts=document.querySelectorAll('.input-span');
    let allInputs=document.querySelectorAll('.input-group');
    let radioButtons=document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((btn)=>{
        btn.addEventListener(('keydown'),(e)=>{
            if(e.key==='Enter')
            {
                e.preventDefault();
                btn.click();
            }
        })
    })
    link.addEventListener(('click'),()=>{
        form.reset();
        allParagraphs.forEach((paragraf)=>{
            paragraf.innerHTML='';
        })
        spanContainers.forEach((container)=>{
            container.classList.remove('error');
        })
        spanTexts.forEach((text)=>{
            text.classList.remove('errorText');
        })
        allInputs.forEach((input)=>{
            input.style.border='1px solid hsl(200, 26%, 54%)';
        })
        section2.classList.remove('hidden');
        alternateSection.classList.add('hidden');
    })
    form.addEventListener(('submit'),(e)=>{
        e.preventDefault();
        let isValid=true;
        let isTermValid=checkValidity(mortgageTerm);
        let isInterestRateValid=checkValidity(interestRate);
        if(amountMortgage.value.trim()=='')
        {
            paragrafAmount.innerHTML='This field is required';
            parent.style.border='1px solid hsl(4, 69%, 50%)';
            spanContainer.classList.add('error');
            text.classList.add('errorText');
            isValid=false;
        }
        else if(amountMortgage.value<=0)
        {
            paragrafAmount.innerHTML='Value cannot be null or zero!';
            parent.style.border='1px solid hsl(4, 69%, 50%)';
            spanContainer.classList.add('error');
            text.classList.add('errorText');
            isValid=false;
        }
        else{
            paragrafAmount.innerHTML='';
            parent.style.border='1px solid hsl(200, 26%, 54%)';
            spanContainer.classList.remove('error');
            text.classList.remove('errorText');
        }
        if(repaymentBtnRadio.checked===false && interestBtnRadio.checked===false)
        {
            paragrafRadio.innerHTML='This field is required';
            isValid=false;
        }
        else{
            paragrafRadio.innerHTML='';
        }
        function checkValidity(input)
        {
            let parent=input.closest('.input-group');
            let containerSpan=parent.querySelector('.container-span');
            let spanText=containerSpan.querySelector('.input-span');
            let paragraf;
            if(input.id=='years')
            {
                paragraf = document.querySelector('.paragraf-container>p:nth-child(1)');
            }
            else{
                paragraf = document.querySelector('.paragraf-container>p:nth-child(2)');
            }
            if(input.value.trim()==='')
            {

                parent.style.border='1px solid hsl(4, 69%, 50%)';
                containerSpan.classList.add('error');
                spanText.classList.add('errorText');
                paragraf.innerHTML='This field is required';
                return false;
            }
            else if(input.value<=0)
            {
                parent.style.border='1px solid hsl(4, 69%, 50%)';
                containerSpan.classList.add('error');
                spanText.classList.add('errorText');
                paragraf.innerHTML='Value cannot be null or zero!';
                return false;
            }
            else{
                parent.style.border='1px solid hsl(200, 26%, 54%)';
                paragraf.innerHTML='';
                containerSpan.classList.remove('error');
                spanText.classList.remove('errorText');
                return true;
            }

        }
        if(isValid && isTermValid===true && isInterestRateValid===true)
        {
            section2.classList.add('hidden');
            alternateSection.classList.remove('hidden');
            let interestGiven= Number(interestRate.value);
            let yearsGiven = Number(mortgageTerm.value);   
            let amountGiven = Number(amountMortgage.value);
            if(repaymentBtnRadio.checked==true )
            {
                     
                let lunarInterest = (parseFloat(interestGiven/100)/12);
                let monthlyPayments = yearsGiven * 12;
                let lunarInterestCompouned = 1 + lunarInterest
                let compoundedInterest = Math.pow(lunarInterestCompouned, monthlyPayments);
                
                let result = amountGiven * ((lunarInterest * compoundedInterest)/(compoundedInterest-1));
                resultParagraph.innerHTML = `£${result.toFixed(2)}`;
                let total = result * monthlyPayments;
                repayParagraph.innerHTML = `£${total.toFixed(2)}`;
            }
            else{
                let lunarInterest = (parseFloat(interestGiven/100)/12);
                let monthlyPayments = yearsGiven *12;
                let result = lunarInterest * amountGiven;
                resultParagraph.innerHTML =`£${result.toFixed(2)}`;
                let total = (result * monthlyPayments) + amountGiven;
                repayParagraph.innerHTML = `£${total.toFixed(2)}`;
            }
        }    
    })
})