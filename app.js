document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('resize').addEventListener('click', resizeImage);

let originalImage = null;

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = function() {
        document.getElementById('width').value = originalImage.width;
        document.getElementById('height').value = originalImage.height;
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload a valid image file.');
  }
}

function resizeImage() {
  if (!originalImage) {
    alert('Please upload an image first.');
    return;
  }

  const newWidth = parseInt(document.getElementById('width').value, 10);
  const newHeight = parseInt(document.getElementById('height').value, 10);

  if (isNaN(newWidth) || isNaN(newHeight)) {
    alert('Please enter valid dimensions.');
    return;
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas to new dimensions
  canvas.width = newWidth;
  canvas.height = newHeight;

  // Draw the resized image onto the canvas
  ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

  // Get the resized image data as a base64 string
  const resizedImageURL = canvas.toDataURL('image/jpeg');

  // Display the resized image
  document.getElementById('output').src = resizedImageURL;

  // Enable and update the download link
  const downloadLink = document.getElementById('download');
  downloadLink.style.display = 'inline';
  downloadLink.href = resizedImageURL;
  downloadLink.download = 'resized_image.jpg';
}
