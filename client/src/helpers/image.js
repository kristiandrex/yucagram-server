export function scaleImage(image) {
  const isLandscape = image.width > image.height;
  
  let width;
  let y;
  let x;

  if (isLandscape) {
    width = image.height;
    y = 0;
    x = (image.width - image.height) / 2;
  }

  else {
    width = image.width;
    x = 0;
    y = (image.height - image.width) / 2;
  }

  return { x, y, width };
}