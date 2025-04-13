import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export function constructMetadata({
  title= "AI short video generator",
  description = "Create short videoes and stories using AI",
  image = "logo.svg",
  icons = "logo.svg",
}={}) {  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL("https://casecobra-sa.vercel.app"),
  };
}