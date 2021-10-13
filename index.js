const selectCurrencie = document.querySelector('.select-currencie');
const inputValueCurrencie = document.querySelector('.input-value-currencie');
const buttonPrice = document.querySelector('#btn-price');
const buttonContact = document.querySelector('.button-contact');
const messageError = document.querySelector('.error-contact');

const codeCurrencie = ["ARS",
    "AUD",
    "BTC",
    "CAD",
    "CHF",
    "CNY",
    "DOGE",
    "ETH",
    "EUR",
    "GBP",
    "ILS",
    "JPY",
    "LTC",
    "USD",
    "USDT",
    "XRP",
]

const getAllCurrencie = async() => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all ');
    const responseJson = await response.json();
    return responseJson;
}

const convertCurrency = async(code) => {
    const dataCurrencie = await getAllCurrencie();
    const textResult = document.querySelector('.text-result');
    const textError = document.querySelector('.message-error');

    const message = 'Preencha este campo!';

    if (inputValueCurrencie.value === '') {
        textResult.innerHTML = '';
        textError.innerHTML = message;
    } else {
        textError.innerHTML = '';
        textResult.innerHTML =
            `R$ ${Number(dataCurrencie[code].ask * Number(inputValueCurrencie.value)).toFixed(2)}`
    }
}

buttonPrice.addEventListener('click', () => {
    let code = selectCurrencie.options[selectCurrencie.selectedIndex].value;
    convertCurrency(code);
})

const renderTable = async() => {
    const dataCurrencie = await getAllCurrencie();
    const table = document.querySelector('.table');
    const containerTable = document.querySelector('.container-table');

    codeCurrencie.forEach(currencie => {
        const trContent = document.createElement('tr');

        const tdContent = `
      <td>${dataCurrencie[currencie].name}</td>
      <td class="high">${dataCurrencie[currencie].high}</td>
      <td class="low">${dataCurrencie[currencie].low}</td>
      `
        trContent.innerHTML = tdContent;
        table.appendChild(trContent);
    })

    containerTable.appendChild(table);
}

const checkInputContact = (e) => {

    e.preventDefault();

    const error = {
        errorInputValue: "Preencha todos os campos!",
        errorEmail: "Digite um email válido!"
    }

    const valueName = document.querySelector('#name').value;
    const valueEmail = document.querySelector('#email').value;
    const valueDescription = document.querySelector('#description').value;
    const form = document.querySelector('.form');

    const emailIsValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

    if (!valueName || !valueEmail || !valueDescription) {
        return errorMessage(error.errorInputValue);
    } else if (!emailIsValid.test(valueEmail)) {
        errorMessage(error.errorEmail)
    } else {
        form.submit();
    }
}

const errorMessage = (error) => {
    return messageError.innerHTML = error;
}


buttonContact.addEventListener('click', checkInputContact);

renderTable();

window.onload = getAllCurrencie;