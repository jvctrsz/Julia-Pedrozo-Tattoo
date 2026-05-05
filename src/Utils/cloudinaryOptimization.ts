export function optimizeImage(url: string, width: number = 1200): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const uploadSegment = "/upload/";
  const parts = url.split(uploadSegment);

  if (parts.length !== 2) {
    return url;
  }
  if (parts[1].startsWith("f_auto") || parts[1].includes("q_auto")) {
    return url;
  }

  const transformations = `f_auto,q_auto:good,w_${width}`;
  return `${parts[0]}${uploadSegment}${transformations}/${parts[1]}`;
}
