/**
 * Cloudinary upload service
 * Handles image uploads for portfolio projects
 * Used primarily by future admin dashboard
 */

import { cloudinaryConfig } from '@config/cloudinary'
import type { CloudinaryImage } from '@types'

export interface UploadProgressEvent {
  loaded: number
  total: number
  percent: number
}

export interface UploadResult {
  success: boolean
  image?: CloudinaryImage
  error?: string
}

/**
 * Validate file before upload
 */
export function validateImageFile(file: File): string | null {
  // Check file size
  if (file.size > cloudinaryConfig.maxFileSize) {
    return `File size exceeds ${cloudinaryConfig.maxFileSize / 1024 / 1024}MB limit`
  }

  // Check file type
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !cloudinaryConfig.allowedFormats.includes(extension)) {
    return `File type not allowed. Allowed types: ${cloudinaryConfig.allowedFormats.join(', ')}`
  }

  // Validate MIME type
  const mimeType = file.type
  const validMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ]
  if (!validMimeTypes.includes(mimeType)) {
    return 'Invalid image format'
  }

  return null
}

/**
 * Upload image to Cloudinary
 * Uses unsigned upload with restricted preset for public uploads
 *
 * @param file - Image file to upload
 * @param folder - Cloudinary folder path
 * @param onProgress - Progress callback
 * @returns Upload result with secure_url and public_id
 */
export async function uploadImageToCloudinary(
  file: File,
  folder: string,
  onProgress?: (event: UploadProgressEvent) => void
): Promise<UploadResult> {
  // Validate file
  const validationError = validateImageFile(file)
  if (validationError) {
    return {
      success: false,
      error: validationError,
    }
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', cloudinaryConfig.uploadPreset)
    formData.append('folder', folder)
    formData.append('resource_type', 'auto')

    // Create XMLHttpRequest for progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      // Progress event
      if (onProgress) {
        xhr.upload.addEventListener('progress', event => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100
            onProgress({
              loaded: event.loaded,
              total: event.total,
              percent,
            })
          }
        })
      }

      // Completion handlers
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          const image: CloudinaryImage = {
            publicId: response.public_id,
            secureUrl: response.secure_url,
            format: response.format,
            width: response.width,
            height: response.height,
          }
          resolve({
            success: true,
            image,
          })
        } else {
          const errorData = JSON.parse(xhr.responseText || '{}')
          reject(
            new Error(errorData.error?.message || 'Upload failed')
          )
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload was cancelled'))
      })

      // Send upload request
      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`
      )
      xhr.send(formData)
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return {
      success: false,
      error: message,
    }
  }
}

/**
 * Upload project thumbnail
 * Convenience wrapper for project thumbnails
 */
export async function uploadProjectThumbnail(
  file: File,
  onProgress?: (event: UploadProgressEvent) => void
): Promise<UploadResult> {
  return uploadImageToCloudinary(
    file,
    cloudinaryConfig.folders.projectThumbnails,
    onProgress
  )
}

/**
 * Upload project gallery image
 * Convenience wrapper for gallery images
 */
export async function uploadProjectGalleryImage(
  file: File,
  onProgress?: (event: UploadProgressEvent) => void
): Promise<UploadResult> {
  return uploadImageToCloudinary(
    file,
    cloudinaryConfig.folders.projectGallery,
    onProgress
  )
}

/**
 * Delete image from Cloudinary
 * Requires admin Cloud Function with proper authentication
 * Do not expose Cloudinary API secret to frontend
 *
 * @param publicId - Cloudinary public_id to delete
 * @returns Success status
 */
export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  try {
    // Call backend Cloud Function for deletion
    // Example: https://us-central1-{project-id}.cloudfunctions.net/deleteCloudinaryImage
    const functionUrl = import.meta.env.VITE_DELETE_IMAGE_FUNCTION_URL

    if (!functionUrl) {
      console.error('Delete image function URL not configured')
      return false
    }

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    })

    return response.ok
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}
