export function optimizeImage(
  url: string,
  width: number = 1200,
  context: "thumb" | "full" = "full",
): string {
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

  const quality = context === "thumb" ? "q_auto:eco" : "q_auto:good";
  const transformations = `f_auto,${quality},c_limit,w_${width},dpr_auto`;
  return `${parts[0]}${uploadSegment}${transformations}/${parts[1]}`;
}

export function getCloudinaryBlurURL(url: string): string {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  const uploadSegment = "/upload/";
  const parts = url.split(uploadSegment);

  if (parts.length !== 2) {
    return url;
  }

  const publicId = parts[1].startsWith("f_auto")
    ? parts[1].replace(/^[^/]+\//, "")
    : parts[1];

  return `${parts[0]}${uploadSegment}e_blur:2000,q_1,w_20/${publicId}`;
}
