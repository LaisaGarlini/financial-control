import axios from 'axios'

const apiInstancia = axios.create({
    baseURL: 'http://localhost:5000/api', // URL base da API
})

export const ApiControleFinanceiro = apiInstancia
