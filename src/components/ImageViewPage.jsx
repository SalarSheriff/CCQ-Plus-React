import React, { useState, useEffect } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { ImageList, ImageListItem, MenuItem, Select, FormControl, InputLabel, Box, Typography, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { fetchImages, getImageInspectionComments } from '../backendAPICalls';

function ImageViewPage() {
    const [date, setDate] = useState(dayjs());
    const [images, setImages] = useState([]);
    const [imageInspectionComments, setImageInspectionComments] = useState([]);

    const [company, setCompany] = useState("A1");



    const [dataLoadedFromAPI, setDataLoadedFromAPI] = useState(false);

    const [imagesLoaded, setImagesLoaded] = useState(false);
    useEffect(() => {


        //If the admin switches a date or company make sure re enable the loading spinner
        setImagesLoaded(false);
        setDataLoadedFromAPI(false);



        async function getData() {
            try {
                const data = await fetchImages(company, date.format("YYYYMMDD"));

                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        }

        async function getData2() {
            try {
                const data = await getImageInspectionComments(company, date.format("YYYYMMDD"));
                setImageInspectionComments(data);
                console.log(data)
            }
            catch (error) {
                console.error("Error fetching comments:", error);
            }
        }

        getData().then(() => setDataLoadedFromAPI(true));
        getData2();
    }, [date, company]); // Include dependencies here, such as 'company' if it might change




    return (
        <Box sx={{
            paddingLeft: '2%',
            paddingRight: '2%',
            paddingTop: '2%',
        }}>
            <Typography variant="h4">View Inspection Images</Typography>
            <Typography variant="h6">Select a company and date to view inspection images</Typography>
            <FormControl fullWidth>
                <InputLabel id="company-select-label">Company</InputLabel>
                <Select
                    labelId="company-select-label"
                    id="company-select"
                    label="Company"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                >
                    <MenuItem value="A1">A1</MenuItem>
                    <MenuItem value="B1">B1</MenuItem>
                    <MenuItem value="C1">C1</MenuItem>
                    <MenuItem value="D1">D1</MenuItem>
                    <MenuItem value="E1">E1</MenuItem>
                    <MenuItem value="F1">F1</MenuItem>
                    <MenuItem value="G1">G1</MenuItem>
                    <MenuItem value="H1">H1</MenuItem>
                    <MenuItem value="I1">I1</MenuItem>
                    <MenuItem value="A2">A2</MenuItem>
                    <MenuItem value="B2">B2</MenuItem>
                    <MenuItem value="C2">C2</MenuItem>
                    <MenuItem value="D2">D2</MenuItem>
                    <MenuItem value="E2">E2</MenuItem>
                    <MenuItem value="F2">F2</MenuItem>
                    <MenuItem value="G2">G2</MenuItem>
                    <MenuItem value="H2">H2</MenuItem>
                    <MenuItem value="I2">I2</MenuItem>
                    <MenuItem value="A3">A3</MenuItem>
                    <MenuItem value="B3">B3</MenuItem>
                    <MenuItem value="C3">C3</MenuItem>
                    <MenuItem value="D3">D3</MenuItem>
                    <MenuItem value="E3">E3</MenuItem>
                    <MenuItem value="F3">F3</MenuItem>
                    <MenuItem value="G3">G3</MenuItem>
                    <MenuItem value="H3">H3</MenuItem>
                    <MenuItem value="I3">I3</MenuItem>
                    <MenuItem value="A4">A4</MenuItem>
                    <MenuItem value="B4">B4</MenuItem>
                    <MenuItem value="C4">C4</MenuItem>
                    <MenuItem value="D4">D4</MenuItem>
                    <MenuItem value="E4">E4</MenuItem>
                    <MenuItem value="F4">F4</MenuItem>
                    <MenuItem value="G4">G4</MenuItem>
                    <MenuItem value="H4">H4</MenuItem>
                    <MenuItem value="I4">I4</MenuItem>
                </Select>
            </FormControl>
            <DatePicker value={date} onChange={(newDate) => setDate(newDate)} />


            {!imagesLoaded && <><Typography variant="h6"> Loading Images for {date.format("YYYY-MM-DD")}</Typography>
                <CircularProgress /></>}





            {dataLoadedFromAPI ? <>



                <ImageList
                    sx={{
                        width: "100%",
                        height: "auto",
                        '@media (min-width:600px)': {
                            width: "50%",
                            height: "50%"
                        }
                    }}
                    cols={1} // Default to 1 column for mobile
                    rowHeight={200}
                    gap={2}
                    variant="woven"
                >
                    {images.map((image, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={`data:image/jpeg;base64,${image.imageData}`}
                                alt={image.name}
                                loading="lazy"
                                style={{ objectFit: "cover", width: "100%", height: "100%" }} // Maintain aspect ratio
                                onLoad={() => setImagesLoaded(true)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

                {imageInspectionComments.map((comment, index) => (<>

                    <Typography variant="h6">{comment.cadet_name} at {comment.time}: {comment.comment}</Typography>
                </>))}

            </> : <h1></h1>}

        </Box>
    );
}

export default ImageViewPage;
