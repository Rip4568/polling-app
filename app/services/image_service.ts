import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import fs from 'node:fs/promises'
import path from 'node:path'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export class ImageService {
  public async store(file: MultipartFile): Promise<string> {
    if (!file) {
      throw new Error('No image file uploaded')
    }

    if (!file.isValid) {
      throw new Error('Invalid image file uploaded')
    }

    await file.move(app.makePath('storage/uploads'), { name: `${cuid()}.${file.extname}` })

    if (!file.filePath) {
      throw new Error('Failed to move image file')
    }

    return file.filePath
  }

  public async delete(imagePath: string) {
    const fullPath = path.join(app.makePath('storage/uploads'), imagePath)

    try {
      await fs.unlink(fullPath)
    } catch (error) {
      throw new Error(`Failed to delete image: ${error.message}`)
    }
  }
}
