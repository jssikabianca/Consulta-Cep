const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade");

const closeButton = document.querySelector("#close-message");

// Validate CEP Input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode); 
    // allow only numbers
    if (!onlyNumbers.test(key)) {
      e.preventDefault();
      return;
    }
  });

  // Event to get address
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
  
    //   Check if we have a CEP
    if (inputValue.length === 8) {
      getAddress(inputValue);
    }
  });

const getAddress = async (cep) => {
    toggleLoader();
    cepInput.blur();

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);

    const data = await response.json();

/* Show error and reset form */
    if (data.erro === true) {
        if (!addressInput.hasAttribute("disable")) {
            toggleDisabled();
          }

        addressForm.reset();
        toggleLoader();
        toggleMessage("CEP inválido");
        return;
      }

    if (addressInput.value === "") {
        toggleDisabled();
      }
      
      addressInput.value = data.logradouro;
      cityInput.value = data.localidade;
      neighborhoodInput.value = data.bairro;
      regionInput.value = data.uf;
      toggleLoader();
};

const toggleDisabled = () => {
    if (regionInput.hasAttribute("disabled")) {
      formInputs.forEach((input) => {
        input.removeAttribute("disabled");
      });
    } else {
      formInputs.forEach((input) => {
        input.setAttribute("disabled", "disabled");
      });
    }
  };

// Show or hide loader
const toggleLoader = () => {
const loaderElement = document.querySelector("#loader");

fadeElement.classList.toggle("hide");
loaderElement.classList.toggle("hide");
};

// Show or hide message
const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");
    const messageTextElement = document.querySelector("#message p");
  
    messageTextElement.innerText = msg;
  
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
  };

  closeButton.addEventListener("click", () => toggleMessage());

  