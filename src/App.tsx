import React, { useEffect, useState } from 'react'
import { listarPessoas, deletarPessoa, Pessoa, criarPessoa } from './services/api'

export function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  // estados para o formulário
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    carregarPessoas()
  }, [])

  async function carregarPessoas() {
    setLoading(true)
    setErro(null)
    try {
      const lista = await listarPessoas()
      setPessoas(lista)
    } catch {
      setErro('Erro ao carregar pessoas')
    }
    setLoading(false)
  }

  async function handleCriarPessoa(e: React.FormEvent) {
    e.preventDefault()
    setErro(null)
    try {
      const novaPessoa = await criarPessoa({
        nome,
        cpf,
        data_nascimento: dataNascimento,
        email
      })
      setPessoas([...pessoas, novaPessoa])
      setNome('')
      setCpf('')
      setDataNascimento('')
      setEmail('')
    } catch {
      setErro('Erro ao criar pessoa')
    }
  }

  async function handleDeletarPessoa(id?: number) {
    if (!id) return
    setErro(null)
    try {
      await deletarPessoa(id)
      setPessoas(pessoas.filter(p => p.id !== id))
    } catch {
      setErro('Erro ao deletar pessoa')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD Pessoas</h1>

      <form onSubmit={handleCriarPessoa} style={{ marginBottom: 20 }}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          placeholder="CPF"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data de nascimento"
          value={dataNascimento}
          onChange={e => setDataNascimento(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Criar</button>
      </form>

      {loading && <p>Carregando pessoas...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <ul>
        {pessoas.map(p => (
          <li key={p.id}>
            {p.nome} — {p.cpf} — {p.data_nascimento} — {p.email}{' '}
            <button onClick={() => handleDeletarPessoa(p.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
