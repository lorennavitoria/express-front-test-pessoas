// src/services/api.ts
const API_URL = 'http://localhost:3001' // ajuste para a porta que seu backend está rodando

export interface Pessoa {
  id?: number
  nome: string
  cpf: string
  data_nascimento: string
  email: string
}

export async function listarPessoas(): Promise<Pessoa[]> {
  const res = await fetch(`${API_URL}/pessoas`)
  return res.json()
}

export async function criarPessoa(pessoa: Pessoa): Promise<Pessoa> {
  const res = await fetch(`${API_URL}/pessoas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pessoa)
  })
  if (!res.ok) throw new Error('Erro ao criar pessoa')
  return res.json()
}

export async function deletarPessoa(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/pessoas/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Erro ao deletar pessoa')
}
