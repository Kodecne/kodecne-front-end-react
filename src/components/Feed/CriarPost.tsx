import { useState } from "react";
import style from "./Style-PostCard.module.css";
import api, { errorToastHandler } from "../../services/api";
import { toast } from "react-toastify";

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

  const handlePostar = async () => {
    if (!conteudo.trim()) {
      alert("Escreva algo antes de postar!");
      return;
    }

    const form = new FormData();
    form.append("texto", conteudo);
    midias.forEach((midia) => {
      form.append("midias", midia); // Removido o `index`, já que não é necessário
    });

    try {
      await api.post('/posts/', form, {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      });
      toast.success("Post criado com sucesso!");
      window.location.reload();
      setConteudo("");
      setMidias([]);
      setPreviewMidias([]);
    } catch (error) {
      errorToastHandler(error);
    }
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
                <div className={style.videoOverlay}></div>
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
