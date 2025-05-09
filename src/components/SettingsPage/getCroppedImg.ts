export default async function getCroppedImg(imageSrc: string, crop: any): Promise<Blob> {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((res) => (image.onload = res));

    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
        }, 'image/jpeg');
    });
}
