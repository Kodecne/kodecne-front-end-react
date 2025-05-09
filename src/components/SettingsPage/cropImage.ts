export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
        image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Erro ao criar contexto do canvas");

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Erro ao gerar imagem croppada"));
        }, 'image/jpeg');
    });
}
