import style from './Style-SobreNos.module.css'

interface SobreNosCardProps {
    title: string;
    description: string;
    lightedtext?: string; // Tornando lightedtext opcional
  }
  
  const SobreNosCard: React.FC<SobreNosCardProps> = ({ title, description, lightedtext }) => {
    // Se o texto destacado existir na descrição
    if (lightedtext && description.includes(lightedtext)) {
      const parts = description.split(lightedtext); // Dividindo o texto nas partes antes e depois
  
      return (
        <div className={style.component}>
          <div className={style.componentTitle}><h2>{title}</h2></div>
          <div className={style.componentDescription}>
            <p>
                {parts[0]} {/* Parte antes do texto destacado */}
                <span className={style.lightedtextclass}>{lightedtext}</span> {/* Texto destacado */}
                {parts.slice(1).join(lightedtext)} {/* Parte depois do texto destacado */}
            </p>
          </div>
        </div>
      );
    }
  
    // Se não houver texto para destacar, simplesmente exibe a descrição completa
    return (
      <div className={style.component}>
        <div className={style.componentTitle}><h2>{title}</h2></div>
        <div className={style.componentDescription}><p>{description}</p></div>
      </div>
    );
  };
  
  export default SobreNosCard;
  