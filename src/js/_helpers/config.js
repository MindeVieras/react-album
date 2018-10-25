
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
export function drawCanvasImage(canvas, imageSrc, orientation = 1, text = null) {

  const ctx = canvas.getContext('2d')
  let { width, height } = canvas
  let degrees = 0
  
  const img = new Image()
  img.src = imageSrc

  img.onerror = () => {
    img.src = `http://via.placeholder.com/${width}x${height}`
    ctx.drawImage(img, 0, 0, width, height)
  }
  img.onload = () => {
    // if (orientation === 6) {
    //   canvas.width = height
    //   canvas.height = width
    //   degrees = 90

    //   let rotatedWidth = height
    //   let rotatedHeigh = width

    //   drawRotatedImage(ctx, img, rotatedWidth, rotatedHeigh, degrees)
    // }
    // else {
    ctx.drawImage(img, 0, 0, width, height)
    // }

    // Draw rokognition text if any
    if (text) {
      // Draw words on image
      text.map(t => {
        if (t.type === 'WORD') {
          ctx.strokeStyle = 'green'
          ctx.beginPath()
          ctx.moveTo(width * t.p1_x, height * t.p1_y)
          ctx.lineTo(width * t.p2_x, height * t.p2_y)
          ctx.lineTo(width * t.p3_x, height * t.p3_y)
          ctx.lineTo(width * t.p4_x, height * t.p4_y)
          ctx.closePath()
          ctx.stroke()
        }

      })
    }
  }
}

function drawRotatedImage(ctx, image, width, height, degrees) {

  ctx.clearRect(0, 0, width, height)

  if (degrees == 90 || degrees == 270) {
    // ctx.translate(0, width / 2)
  }
  else {
    // ctx.translate(width / 2, height / 2)
  }
  ctx.rotate(degrees * Math.PI / 180)
  ctx.drawImage(image, 0, -width / 1, height, width)

}
