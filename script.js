const listaTarefasPendentes = JSON.parse(localStorage.getItem("tarefasPendentes")) || [];
const indice = JSON.parse(localStorage.getItem("indice")) || 0;

const tarefas = {
    indice: indice,
    tarefa: null,
    adicionarTarefa: function(){
        const textoTarefa = document.getElementById("textoTarefa");
        const tarefasPendentes = document.getElementById("tarefasPendentes");
        if (textoTarefa.value !== "") {
        tarefasPendentes.innerHTML = "";
        listaTarefasPendentes.push({indice: this.indice, tarefa: textoTarefa.value});
        listaTarefasPendentes.forEach(element => {
            tarefasPendentes.innerHTML += `<div id="indice${element.indice}"><p>${element.tarefa}</p>
            <input type="button" id="${element.indice}" onclick="tarefas.removerTarefa()" value="X"></div>`;
        });
        textoTarefa.value = "";
        this.indice++
        localStorage.setItem("tarefasPendentes", JSON.stringify(listaTarefasPendentes));
        localStorage.setItem("indice", JSON.stringify(this.indice));
      }},
    removerTarefa: function(){
        const indexParaRemover = listaTarefasPendentes.findIndex(item => item.indice == event.target.id);
        if (indexParaRemover != -1) {
            listaTarefasPendentes.splice(indexParaRemover, 1);
          }
          const tarefasPendentes = document.getElementById("tarefasPendentes");
          tarefasPendentes.innerHTML = "";
          listaTarefasPendentes.forEach(element => {
            tarefasPendentes.innerHTML += `<div id="indice${element.indice}"><p>${element.tarefa}</p>
            <input type="button" id="${element.indice}" onclick="tarefas.removerTarefa()" value="X"></div>`;
        });
        localStorage.setItem("tarefasPendentes", JSON.stringify(listaTarefasPendentes));
        localStorage.setItem("indice", JSON.stringify(this.indice));
    },
    inicializarLista: function(){
        const tarefasPendentes = document.getElementById("tarefasPendentes");
        listaTarefasPendentes.forEach(element => {
            tarefasPendentes.innerHTML += `<div id="indice${element.indice}"><p>${element.tarefa}</p>
            <input type="button" id="${element.indice}" onclick="tarefas.removerTarefa()" value="X"></div>`;
        });
    },
}

tarefas.inicializarLista();