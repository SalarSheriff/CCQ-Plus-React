import React, { useState } from 'react';
import { TextField, Button, Grid, Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

function UploadImagesForm({companyName}) {
    const [images, setImages] = useState([{}]);
    const [comment, setComment] = useState('');

    const handleImageChange = (index, event) => {
        const newImages = [...images];
        newImages[index] = event.target.files[0];
        setImages(newImages);
    };

    const handleAddImage = () => {
        setImages([...images, {}]);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        // Append images to the form data
        images.forEach((image, index) => {
            if (image instanceof File) {
                formData.append('images', image); // 'images' is the key, you can change this according to your backend
                
            }
        });
    
        // Append comment to the form data
        formData.append('comment', comment);
        formData.append('company', companyName); // 'company' is the key, you can change this according to your backend
        try {
            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "uploadimages", {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Upload successful:', result);
                setImages([{}]);
                setComment('');
            } else {
                console.error('Upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };
    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6">Upload Images</Typography>
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={12} key={index}>
                        <Box display="flex" alignItems="center">
                            <input
                                accept="image/*"
                                type="file"
                                onChange={(event) => handleImageChange(index, event)}
                            />
                            <IconButton
                                aria-label="remove image"
                                color="error"
                                onClick={() => handleRemoveImage(index)}
                                disabled={images.length === 1}
                            >
                                <RemoveCircleOutline />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutline />}
                        onClick={handleAddImage}
                    >
                        Add Another Image
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Comment"
                        fullWidth
                        multiline
                        rows={4}
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UploadImagesForm;
