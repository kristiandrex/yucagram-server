export function scaleImage(image) {
	const landscape = image.width > image.height;
	const percent = landscape ? (image.height * 100) / image.width : (image.width * 100) / image.height;
	const width = landscape ? Math.round(percent) : 100;
	const x = landscape ? ((100 - percent) / 2) : 0;
	const y = landscape ? 0 : ((100 - percent) / 2);

	return { x, y, width };
}

export function cropImage(image, crop) {
	const canvas = document.createElement('canvas');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const percentWidth = (image.width * crop.width) / 100;
	const percentHeight = (image.height * crop.height) / 100;
	const percentX = (image.width * crop.x) / 100;
	const percentY = (image.height * crop.y) / 100;

	canvas.width = percentWidth;
	canvas.height = percentHeight;

	const ctx = canvas.getContext('2d');

	ctx.drawImage(
		image,
		percentX * scaleX,
		percentY * scaleY,
		percentWidth * scaleX,
		percentHeight * scaleY,
		0,
		0,
		percentWidth,
		percentHeight,
	);

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			resolve(blob);
		}, 'image/jpeg', 1);
	});
}
