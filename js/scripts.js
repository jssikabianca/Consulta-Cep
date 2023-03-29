const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const btnCep = document.querySelector("#btn-cep")
const addressInput = document.querySelector("#address");
const btnCadastrar = document.querySelector("#btn-cadastrar");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade");
const btnClient = document.querySelector("#btn-client")
const closeButton = document.querySelector("#close-message");
const emailuser = document.querySelector("#emailuser");
const id = document.querySelector("#id");
const nameuser = document.querySelector("#name");
const type = document.querySelector("#type");
const phone = document.querySelector("#phone");
const number = document.querySelector("#number");
const complement = document.querySelector("#complement");
const newUser = document.querySelector("#new-user");


  newUser.addEventListener("click", ()=> {
  emailuser.value = "";
  cepInput.value = "";
  addressInput.value = "";
  cityInput.value = "";
  neighborhoodInput.value = "";
  regionInput.value = "";
  nameuser.value = "";
  phone.value = "";
  number.value = "";
  complement.value = "";
  id.value = "";
  })

    function selecTipoUser(){
    const select = document.querySelector('#typeclient');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);

    if (data.lenght === 0) {
    alert("Não existe o usuário na base");
    }else{
    data.forEach(trazendotipo => {
              const tipocliente = trazendotipo.descricao;
              const idcliente = trazendotipo.id;
              select.innerHTML = select.innerHTML + '<option value="' + idcliente + '">' + tipocliente +'</option>'
            })
        }
      }
    }
    xhttp.open("GET", "http://localhost:3000/tipo_cliente/", true);
    xhttp.send();
    }
//Cadastro de usuário

btnCadastrar.addEventListener("click", () =>{
  cadastrarUsuario();
})

function cadastrarUsuario(){
    event.preventDefault()
    const formData = new FormData();
    if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    console.log(data);}
      const nome = document.querySelector("#name").value;
      const email = document.querySelector("#emailuser").value;     
      const telefone = document.querySelector("#phone").value;  
      const cep = document.querySelector("#cep").value;        
      const logradouro = document.querySelector("#address").value;
      const bairro = document.querySelector("#neighborhood").value;
      const cidade = document.querySelector("#city").value;
      const uf = document.querySelector("#region").value;          
      const numero = document.querySelector("#number").value;  
      const complemento = document.querySelector("#complement").value;          
      const tipo_cliente_id = document.querySelector("#typeclient").value;     

      formData.append("nome", nome);
      formData.append("telefone", telefone);
      formData.append("email", email);
      formData.append("cep", cep);
      formData.append("logradouro", logradouro);
      formData.append("bairro", bairro);
      formData.append("cidade", cidade);
      formData.append("uf", uf);
      formData.append("numero", numero);
      formData.append("complemento", complemento);
      formData.append("tipo_cliente_id", tipo_cliente_id);

  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/cliente/gravar");
  request.send(formData);
}

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

// Busca de usuários por ID
  btnClient.addEventListener("click", () => {
    const email = document.querySelector("#emailuser").value;
    const id = document.querySelector("#id").value;

  if(email === "" ){
    const valor = id;
    var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    toggleLoader();
    if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    const dado = data.find(dado => dado.id = id);

    if (dado.lenght === 0) {
    alert("Não existe o usuário na base");
    }else{
      nameuser.value = dado.nome;
      emailuser.value = dado.email;
      phone.value = dado.telefone;
      cepInput.value = dado.cep;
      addressInput.value = dado.logradouro;
      cityInput.value = dado.cidade;
      neighborhoodInput.value = dado.bairro;
      regionInput.value = dado.cidade;
      formInputs.value = dado.uf;
      complement.value = dado.complemento;
      number.value = dado.numero;
    }
  }
}
    xhttp.open("GET", "http://localhost:3000/cliente/id/"+valor, true);
    xhttp.send();  
    }else{ 
    //Buscar usuário por email
    const valor = email;
    var xhttp = new XMLHttpRequest();
  
    xhttp.onreadystatechange = function() {
    toggleLoader();
    if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    const dado = data.find(dado => dado.email = valor);
    console.log(dado);

    if (data.lenght === 0) {
    alert("Não existe o usuário na base");
    }else{
      nameuser.value = dado.nome;
      emailuser.value = dado.email;
      phone.value = dado.telefone;
      cepInput.value = dado.cep;
      addressInput.value = dado.logradouro;
      cityInput.value = dado.cidade;
      neighborhoodInput.value = dado.bairro;
      regionInput.value = dado.cidade;
      formInputs.value = dado.uf;
      complement.value = dado.complemento;
      number.value = dado.numero;
    }
  }
}
    xhttp.open("GET", "http://localhost:3000/cliente/email/"+valor, true);
    xhttp.send();  
   }
})
    //Busca por email
    btnCep.addEventListener("click", () => {
    const cepInput = document.querySelector("#cep").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    toggleLoader();
    if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    if (data.erro === true) {
    addressForm.reset();
    toggleMessage("CEP inválido");
    return;
    } else {
    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;
    toggleDisabled();
     }
   }
 }
    xhttp.open("GET", "https://viacep.com.br/ws/"+cepInput+"/json/", true);
    xhttp.send();
  });
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

// Mostra Loader
    const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
    };

// Mostra Mensagem
    const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");
    const messageTextElement = document.querySelector("#message p");
  
    messageTextElement.innerText = msg;
  
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
    };

    closeButton.addEventListener("click", () => toggleMessage());