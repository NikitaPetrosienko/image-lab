import React, { useState, useRef, useEffect } from 'react';
import { Button, Box } from '@mui/material';

function ImageUpload() {
  const [imageUrl, setImageUrl] = useState(localStorage.getItem('image') || '');
  const [colorInfo, setColorInfo] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setIsLoaded(true);
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('image', reader.result);
      setImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!isLoaded) return; // Проверяем, загружено ли изображение
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `RGB: ${pixel[0]}, ${pixel[1]}, ${pixel[2]}`;
    setColorInfo(`Color: ${rgb} | Coordinates: (${x}, ${y})`);
  };

  const handleRemoveImage = () => {
    localStorage.removeItem('image');
    setImageUrl('');
    setIsLoaded(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#222',
        color: 'red', // Изменяем цвет текста на красный
        borderRadius: '8px',
      }}
    >
      <input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="raised-button-file"
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" sx={{ mb: 2 }}>
          Загрузить изображение
        </Button>
      </label>
      {imageUrl && (
        <>
          <canvas
            ref={canvasRef}
            style={{ border: '1px solid #444', cursor: 'crosshair' }}
            onMouseMove={handleCanvasMouseMove}
          ></canvas>
          <Button variant="outlined" onClick={handleRemoveImage} sx={{ mt: 2 }}>
            Удалить изображение
          </Button>
        </>
      )}
      {isLoaded && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <p>{colorInfo}</p>
        </Box>
      )}
    </Box>
  );
}

export default ImageUpload;
