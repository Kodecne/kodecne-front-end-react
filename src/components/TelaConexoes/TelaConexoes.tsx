import { useState } from 'react';
import styles from './TelaConexoes.module.css';

const tecnologiasDisponiveis = ['Python', 'Java', 'C++', 'JavaScript', 'Go'];
const niveis = ['Qualquer experiência', 'Junior', 'Pleno', 'Senior'];

type ResultadoUsuario = {
  nome: string;
  tecnologias: string[];
  imagem?: string;
};

type TelaConexoesProps = {
  usuariosDisponiveis: ResultadoUsuario[];
};

export function TelaConexoes({ usuariosDisponiveis }: TelaConexoesProps) {
  const [filtros, setFiltros] = useState<{ tecnologia: string; nivel: string }[]>([]);
  const [exibindoResultados, setExibindoResultados] = useState(false);
  const [resultados, setResultados] = useState<ResultadoUsuario[]>([]);
  const [pagina, setPagina] = useState(0);

  const adicionarFiltro = () => {
    setFiltros([...filtros, { tecnologia: '', nivel: 'Qualquer experiência' }]);
  };

  const atualizarFiltro = (index: number, campo: string, valor: string) => {
    const novosFiltros = [...filtros];
    novosFiltros[index][campo as 'tecnologia' | 'nivel'] = valor;
    setFiltros(novosFiltros);
  };

  const pesquisar = () => {
    const resultadosFiltrados = usuariosDisponiveis.filter((usuario) =>
      filtros.every((filtro) => {
        if (!filtro.tecnologia) return true;
        return usuario.tecnologias.some((tec) => {
          const [nomeTec, nivelTec] = tec.split(' - ').map((s) => s.trim());
          if (filtro.nivel === 'Qualquer experiência') {
            return nomeTec === filtro.tecnologia;
          } else {
            return nomeTec === filtro.tecnologia && nivelTec === filtro.nivel;
          }
        });
      })
    );

    setResultados(resultadosFiltrados);
    setPagina(0);
    setExibindoResultados(true);
  };

  const voltar = () => {
    setExibindoResultados(false);
    setResultados([]);
    setFiltros([]);
    setPagina(0);
  };

  const usuariosPorPagina = 5;
  const inicio = pagina * usuariosPorPagina;
  const fim = inicio + usuariosPorPagina;
  const paginaAtual = resultados.slice(inicio, fim);

  const avancarPagina = () => setPagina((p) => p + 1);
  const voltarPagina = () => setPagina((p) => Math.max(p - 1, 0));

  const conectar = (nome: string) => {
    alert(`Solicitação de conexão enviada para ${nome}`);
  };

  return (
    <div className={styles.container}>
      {!exibindoResultados ? (
        <>
          <h2 className={styles.titulo}>Crie conexões diretas!</h2>
          <p className={styles.subtitulo}>Encontre pessoas mais experientes ou semelhantes a você.</p>

          {filtros.map((filtro, index) => (
            <div key={index} className={styles.filtroLinha}>
              <select
                className={styles.select}
                value={filtro.tecnologia}
                onChange={(e) => atualizarFiltro(index, 'tecnologia', e.target.value)}
              >
                <option value="">Escolha uma tecnologia</option>
                {tecnologiasDisponiveis.map((tec) => (
                  <option key={tec} value={tec}>{tec}</option>
                ))}
              </select>

              <select
                className={styles.select}
                value={filtro.nivel}
                onChange={(e) => atualizarFiltro(index, 'nivel', e.target.value)}
              >
                <option value="Qualquer experiência">Qualquer experiência</option>
                {niveis.filter(n => n !== 'Qualquer experiência').map((nivel) => (
                  <option key={nivel} value={nivel}>{nivel}</option>
                ))}
              </select>
            </div>
          ))}

          <div className={styles.botoes}>
            <button
                className={styles.btnAzul}
                onClick={adicionarFiltro}
                disabled={
                    filtros.length >= 3 || 
                    (filtros.length > 0 && !filtros[filtros.length - 1].tecnologia)
                }
                >
                Habilidades
            </button>
            <button className={styles.btnVerde} onClick={pesquisar}>Buscar</button>
          </div>
        </>
      ) : (
        <div className={styles.resultados}>
          <h3 className={styles.resultadoTitulo}>Resultados:</h3>
          {paginaAtual.length === 0 ? (
            <p>Nenhum resultado encontrado.</p>
          ) : (
            <ul className={styles.listaUsuarios}>
              {paginaAtual.map((usuario, i) => (
                <li key={i} className={styles.itemUsuario}>
                  <div className={styles.usuarioInfo}>
                    <img
                      src={usuario.imagem || 'https://via.placeholder.com/40'}
                      alt={`Foto de ${usuario.nome}`}
                      className={styles.imagemPerfil}
                    />
                    <div className={styles.infoUserText}>
                        <strong>{usuario.nome}</strong>
                        <span className={styles.tecnologias}>{usuario.tecnologias.join(', ')}</span>
                    </div>
                  </div>
                  <button className={styles.btnConectar} onClick={() => conectar(usuario.nome)}>
                    Conectar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.paginacao}>
            {pagina > 0 && (
              <button className={styles.btnPaginacao} onClick={voltarPagina}>Anterior</button>
            )}
            {fim < resultados.length && (
              <button className={styles.btnPaginacao} onClick={avancarPagina}>Próximo</button>
            )}
          </div>

          <button className={styles.btnVoltar} onClick={voltar}>Voltar</button>
        </div>
      )}
    </div>
  );
}
