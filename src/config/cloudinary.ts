/**
 * Cloudinary configuration for image uploads and delivery
 * Public configuration only - no API secrets here
 */

export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dk2aonbwf',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio_images',
  // Upload constraints
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  // Folders for organization
  folders: {
    projectThumbnails: 'portfolio/projects/thumbnails',
    projectGallery: 'portfolio/projects/gallery',
    siteImages: 'portfolio/site',
  },
}

/**
 * Generate optimized Cloudinary delivery URL with transformations
 * @param publicId - Cloudinary public_id
 * @param options - Transformation options
 * @returns Optimized URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'auto'
    quality?: 'auto' | 'low' | 'good' | 'best'
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  } = {}
): string {
  const {
    width,
    height,
    crop = 'auto',
    quality = 'auto',
    format = 'auto',
  } = options

  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`

  // Build transformation string
  const transformations: string[] = []

  if (format) transformations.push(`f_${format}`)
  if (quality) transformations.push(`q_${quality}`)
  if (width || height) {
    const widthPart = width ? `w_${width}` : ''
    const heightPart = height ? `h_${height}` : ''
    const cropPart = crop ? `c_${crop}` : ''
    transformations.push([widthPart, heightPart, cropPart].filter(Boolean).join(','))
  }

  const transformationPath = transformations.length > 0 ? transformations.join('/') + '/' : ''

  return `${baseUrl}/${transformationPath}${publicId}`
}

/**
 * Generate thumbnail URL
 * Optimized for project cards (400x300)
 */
export function getThumbnailUrl(publicId: string): string {
  return getOptimizedImageUrl(publicId, {
    width: 800,
    height: 600,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  })
}

/**
 * Generate gallery image URL
 * Optimized for full-width display
 */
export function getGalleryImageUrl(publicId: string): string {
  return getOptimizedImageUrl(publicId, {
    width: 1200,
    height: 800,
    crop: 'fit',
    quality: 'auto',
    format: 'auto',
  })
}
