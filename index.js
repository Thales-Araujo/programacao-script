const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
let empregados = []

app.get('/', (request, response) => {
    return response.json(empregados)
})

app.post('/', (request,response) => {
    const {nome, cargo, salario} = request.body
    const id = (1 + empregados[empregados.length -1]?.id) || 1
    const novoFuncionario = {id, nome, cargo, salario}
    empregados.push(novoFuncionario)
    response.json({message: 'Funcionário Criado!'})
})

app.get('/:id',(request, response) => {
    const id = Number(request.params.id)
    const empregado = empregados.find(empregado => empregado.id === id)
    response.json(empregado)
})

app.put('/:id', (request, response) => {
    const {nome, cargo, salario} = request.body  
    const id = Number(request.params.id)  
    empregados = empregados.map(empregado => {
      if (empregado.id === id) {
        return {...empregado, nome, cargo, salario}
      }
        return empregado
    })  
    response.json(empregados)
  })

  app.delete('/:id', (request, response) => {
    const id = Number(request.params.id)  
    
    empregados = empregados.filter(empregado => empregado.id !== id)  
    response.json(empregados)
  })

app.listen(3333)