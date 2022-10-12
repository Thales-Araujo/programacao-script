async function cadastrar(){
    let id = document.getElementById("id").value
    let nome = document.getElementById("nome").value
    let cargo = document.getElementById("cargo").value
    let salario = document.getElementById("salario").value
    let dado
    let metodo

    if (id){
        metodo = 'PUT'
       dado = {
            id, nome, cargo, salario
       }
    }else{
       metodo = 'POST'
       dado = {
             nome, cargo, salario
        }
    }

    await fetch(`http://localhost:3000/${id}`,{
        method: metodo,
        body: JSON.stringify(dado),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
    .then(resposta => {
        alert('Cadastro foi realizado com sucesso')
    })
    .catch(error => {
        alert(error)
    })
    document.getElementById("id").value = ''
    consultar()
}

async function consultar(){
    let dados = await fetch('http://localhost:3000')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        alert(error)
    })
    let resposta = ''
        dados.map (dado => {
        resposta += `<tr><td> ${dado.nome} </td><td> ${dado.cargo} </td><td> ${dado.salario} </td><td> <i onClick="remove(${dado.id})" class='bi bi-trash'></i> </td> <td> <i onClick="atualiza( '${dado.id}', '${dado.nome}', '${dado.cargo}', '${dado.salario}')" class='bi bi-pencil'></i></td> </tr>`
    })
    document.querySelector("#conteudoTabela").innerHTML = resposta 
}

async function remove(id){
    
    await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE'
    })
    .then (reponse => {
        alert(`O Funcionario foi removido com sucesso`)
         consultar()
    })
    .catch( error => {
       alert(`Problema ne remoção`)
    })
    
}

async function atualiza(id, nome, cargo, salario){
    document.getElementById("id").value = id
    document.getElementById("nome").value = nome
    document.getElementById("cargo").value = cargo
    document.getElementById("salario").value = salario

    
}