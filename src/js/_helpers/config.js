
export const baseServerUrl = `http://localhost:3000` // no ending trailing slash
// export const baseServerUrl = `https://node-album.herokuapp.com` // no ending trailing slash

export const googleKey = `AIzaSyCzi2J0bixOL-SIvephD_qZbuTuuzIaJsc`

// makes media to fit in size by wrapper and media org size.
export function fitMediaToWrapper(wrapW, wrapH, mediaW, mediaH) {

  let wrapRatio = wrapW / wrapH
  let mediaRatio = mediaW / mediaH

  let mediaSize = {
    width: mediaW,
    height: mediaH
  }

  if (mediaW > wrapW || mediaH > wrapH) {

    mediaSize.width = wrapW
    mediaSize.height = wrapH

    let mH = wrapW / mediaRatio
    let mW = wrapH * mediaRatio

    if (mediaRatio > wrapRatio)
      mediaSize.height = mH
    else
      mediaSize.width = mW

  }

  return mediaSize
}

// draw image into canvas
export function drawCanvasImage(canvas, imageSrc) {

  const ctx = canvas.getContext('2d')

  const img = new Image()
  img.src = imageSrc

  img.onerror = () => {
    img.src = `http://via.placeholder.com/${canvas.width}x${canvas.height}`
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
}
