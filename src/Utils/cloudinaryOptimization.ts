export function optimizeImage(url: string, width: number = 1200): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url; // Retorna a URL original se não for do Cloudinary (ex: Unsplash nos mocks)
  }

  const uploadSegment = "/upload/";
  const parts = url.split(uploadSegment);

  // Se a URL não tiver o formato padrão do Cloudinary, retorna a original
  if (parts.length !== 2) {
    return url;
  }

  // Previne a adição de múltiplas transformações se a URL já as possuir
  if (parts[1].startsWith("f_auto") || parts[1].includes("q_auto")) {
    return url;
  }

  const transformations = `f_auto,q_auto:good,w_${width}`;
  return `${parts[0]}${uploadSegment}${transformations}/${parts[1]}`;
}
