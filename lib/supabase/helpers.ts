export function getImageUrl(imagePath: string | null): string {
  if (!imagePath) return "/images/placeholder.png";
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imagePath}`;
}
