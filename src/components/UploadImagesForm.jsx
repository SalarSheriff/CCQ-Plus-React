import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { uploadImageInspectionComments } from '../backendAPICalls';
import { useMsal } from '@azure/msal-react';

function UploadImagesForm({companyName}) {
    // Account information
    const { instance, accounts } = useMsal();

    const [images, setImages] = useState([{}]);
    const [comment, setComment] = useState('');



    //Tracks whether loading circle for uploading images should be shown
    const[imagesUploading, setImagesUploading] = useState(false);


    /*
    
    Refs are used to connect to the input elements in the DOM. This is necessary to clear the input elements after submission.
    Even if the images state is reset, the input elements will still have the previous files selected.
    To actually clear the input elements, we need to access them directly in the DOM.
    
    */
    const inputRefs = useRef([]); // Array of refs for the input elements

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
        inputRefs.current.splice(index, 1); // Remove the corresponding ref
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

            //Toggle the loading circle to display
            setImagesUploading(true);

            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "uploadimages", {
                method: 'POST',
                body: formData,
            });
            await uploadImageInspectionComments(instance, accounts, companyName, comment);
                setImages([{}]);
                setComment('');
                setImagesUploading(false);
    // Clear all input elements
                inputRefs.current.forEach(ref => {
                    if (ref) {
                        ref.value = '';
                    }
                });

            // if (response.ok) {
            //     const result = await response.json();
            //     console.log('Upload successful:', result);

            //     // UPLOAD THE comments once the images are uploaded
            //     uploadImageInspectionComments(instance, accounts, companyName, comment);

            //     setImages([{}]);
            //     setComment('');
            //     setImagesUploading(false);


            //     // Clear all input elements
            //     inputRefs.current.forEach(ref => {
            //         if (ref) {
            //             ref.value = '';
            //         }
            //     });
            // } else {
            //     console.error('Upload failed:', response.statusText);
            // }
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, marginBottom: '3%' }}>
            <Typography variant="h5">Upload Inspection Images</Typography>

            {imagesUploading && <Box sx={{}}>
                <Typography variant="h6">Uploading Images. Do not refresh!</Typography>
                <CircularProgress />
            </Box>} 





            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={12} key={index}>
                        <Box display="flex" alignItems="center">
                            <input
                                ref={el => inputRefs.current[index] = el} // Assign ref to input element
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
