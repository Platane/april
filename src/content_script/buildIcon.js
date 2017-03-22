import type { Profile } from '../type/profile'


const canvas = document.createElement('canvas')

const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

const img = document.createElement('img')
img.crossOrigin = 'Anonymous'

const loadImage = ( url: string ) =>
    new Promise( (resolve, reject, onCancel) => {

        img.onload = () =>
            resolve( img )

        img.onerror = err =>
            reject( err )

        img.setAttribute('src', url)

        onCancel && onCancel( () => img.removeAttribute('src') )
    })

export const buildIcon = async ( profile: Profile, size: number = 16 ) : Promise<ImageData> => {

    canvas.width = canvas.height = size

    ctx.save()

    ctx.clearRect(0, 0, size, size)

    ctx.beginPath()
    ctx.arc(size/2, size/2, size/1.9, 0, Math.PI*2)
    ctx.clip()

    if ( profile.info.pic_url ){

        const img = await loadImage(profile.info.pic_url)

        ctx.drawImage(img, 0, 0, size, size)
    }

    ctx.restore()

    return ctx.getImageData(0, 0, size, size)
}