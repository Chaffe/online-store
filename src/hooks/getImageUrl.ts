const getImageUrl = (imageUrl: string) => {
  return process.env.NEXT_PUBLIC_API_URI + imageUrl;
}

export default getImageUrl;