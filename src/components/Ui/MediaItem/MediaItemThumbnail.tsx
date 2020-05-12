import React, { FunctionComponent, useRef, useEffect } from 'react'

import { MediaItem, IMediaProps } from '../../../services'

interface IMediaItemThumbnailProps {
  width: number
  height: number
  mediaItem: MediaItem
}

export const MediaItemThumbnail: FunctionComponent<IMediaItemThumbnailProps> = ({
  width,
  height,
  mediaItem,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isUppy, id, urls } = mediaItem as IMediaProps

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      const scale = 0.1
      const img = new Image()

      if (isUppy) {
        // console.log(window.uploader.getFile(item.id))
        img.src = URL.createObjectURL(window.uploader.getFile(id).data)
      } else {
        img.src = urls.original.url
      }

      img.onload = () => {
        ctx.setTransform(scale, 0, 0, scale, ctx.canvas.width / 2, ctx.canvas.height / 2)
        ctx.drawImage(img, -img.width / 2, -img.height / 2) // draw the image offset by half
      }
    }
  }, [isUppy, id, urls])

  return <canvas width={width} height={height} ref={canvasRef} />
}
