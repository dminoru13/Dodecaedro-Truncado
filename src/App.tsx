import DodecaedroTruncado from './paginas/3d/DodecaedroTruncado'
import './App.css'

function App() {
  return (
    <>
      <header className="header">
        <h1>✨ Trabalho de Matemática ✨</h1>
        <h2>Dodecaedro Truncado</h2>
      </header>

      <main className="main">
        <div id='conteudo'>
          <section id="canva" className="canvas-container">
            <DodecaedroTruncado />
          </section>

          <div id="canva" className="canvas-container">
             <img id='imagem' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Truncated_dodecahedron_flat.png/330px-Truncated_dodecahedron_flat.png" alt="" />
          </div>
        </div>
        

        <section className="info">
          <p>
            Este projeto apresenta o <strong>dodecaedro truncado</strong>, um
            sólido arquimediano com faces pentagonais e decagonais.
          </p>
          <p>
            Trabalho desenvolvido por <strong>Daniel Minoru</strong>, <strong>João Henrique</strong>, <strong>Ricardo Correa</strong> 
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>🧮 Trabalho de Matematica — 2025</p>
      </footer>
    </>
  )
}

export default App
