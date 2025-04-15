let saldo = 10.0;
let entradas = 10.0;
let saidas = 0.0;

const updateUI = () => {
  document.getElementById("saldo").textContent = saldo.toFixed(2);
  document.getElementById("entradas").textContent = entradas.toFixed(2);
  document.getElementById("saidas").textContent = saidas.toFixed(2);
};

document.getElementById("btn-pagar").addEventListener("click", () => {
  alert("Sistema indisponível. Tente novamente mais tarde.");
});

document.getElementById("btn-investir").addEventListener("click", () => {
  alert("Sistema indisponível. Tente novamente mais tarde.");
});

document.getElementById("btn-pix").addEventListener("click", () => {
  document.getElementById("pix-modal").style.display = "block";
});

document.getElementById("close-pix-modal").addEventListener("click", () => {
  document.getElementById("pix-modal").style.display = "none";
});

document.getElementById("tab-receber").addEventListener("click", () => {
  document.getElementById("form-receber").classList.remove("hidden");
  document.getElementById("form-transferir").classList.add("hidden");
});

document.getElementById("tab-transferir").addEventListener("click", () => {
  document.getElementById("form-transferir").classList.remove("hidden");
  document.getElementById("form-receber").classList.add("hidden");
});

document.getElementById("btn-enviar-receber").addEventListener("click", () => {
  const cpf = document.getElementById("cpf-receber").value.trim();
  const valor = parseFloat(document.getElementById("valor-receber").value);
  if (!cpf || isNaN(valor)) {
    document.getElementById("receber-message").textContent = "Todos os campos devem ser preenchidos!";
    return;
  }
  saldo += valor;
  entradas += valor;
  addTransaction("entrada", valor, "Transferência recebida");
  updateUI();
  alert("Transação realizada com sucesso");
});

document.getElementById("btn-enviar-transferir").addEventListener("click", () => {
  const chave = document.getElementById("chave-pix").value.trim();
  const valor = parseFloat(document.getElementById("valor-transferir").value);
  if (!chave || isNaN(valor)) {
    document.getElementById("transferir-message").textContent = "Todos os campos devem ser preenchidos!";
    return;
  }
  if (valor > saldo) {
    alert("Saldo insuficiente!");
    return;
  }
  saldo -= valor;
  saidas += valor;
  addTransaction("saída", valor, "Transferência enviada");
  updateUI();
  alert("Transação realizada com sucesso");
});

const addTransaction = (type, valor, descricao) => {
  const date = new Date();
  const id = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  const transaction = `<li>
    <p><strong>${type === "entrada" ? "Entrada" : "Saída"}</strong></p>
    <p>Tipo: ${descricao}</p>
    <p>Valor: R$${valor.toFixed(2)}</p>
    <p>ID: ${id}</p>
  </li>`;
  document.getElementById("transaction-list").insertAdjacentHTML("beforeend", transaction);
};
