import { useState } from "react";
import style from "./Style-PostCard.module.css";

export function CriarPost() {
  const [conteudo, setConteudo] = useState("");
  const [midias, setMidias] = useState<File[]>([]);
  const [previewMidias, setPreviewMidias] = useState<string[]>([]);

  const handleMidiaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMidias(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewMidias(previews);
  };

  const handlePostar = () => {
    if (!conteudo.trim()) {
      alert("Escreva algo antes de postar!");
      return;
    }

    // Aqui você pode botar o back
    console.log("Post criado:", { conteudo, midias });

    alert("Post criado (simulado)!");
    setConteudo("");
    setMidias([]);
    setPreviewMidias([]);
  };

  const isVideo = (file: File) => file.type.startsWith("video");

  return (
    <div className={style.caixaCriarPost}>
      <textarea
        className={style.textarea}
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        placeholder="Compartilhe algo com a nossa comunidade..."
      />

        <label className={style.inputFileLabel}>
        Selecionar mídias
        <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleMidiaChange}
            className={style.inputFile}
        />
        </label>

      {previewMidias.length > 0 && (
        <div className={style.previewContainer}>
          {midias.map((file, index) => (
            isVideo(file) ? (
              <div key={index} className={style.previewVideoContainer}>
                <video
                  className={style.previewVideo}
                  src={previewMidias[index]}
                  muted
                  preload="metadata"
                  playsInline
                />
                <div className={style.videoOverlay}>
                </div>
              </div>
            ) : (
              <img
                key={index}
                src={previewMidias[index]}
                alt={`Preview ${index + 1}`}
                className={style.previewImagem}
              />
            )
          ))}
        </div>
      )}

      <button className={style.botao} onClick={handlePostar}>
        Postar
      </button>
    </div>
  );
}
