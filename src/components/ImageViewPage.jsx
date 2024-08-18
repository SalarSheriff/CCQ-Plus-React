import React, { useState, useEffect } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { ImageList, ImageListItem, MenuItem, Select , FormControl, InputLabel} from '@mui/material';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { fetchImages } from '../backendAPICalls';

function ImageViewPage() {
    const [date, setDate] = useState(dayjs());
    const [images, setImages] = useState([]);

    const[company, setCompany] = useState("A1");
    


    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        async function getData() {
            try {
                const data = await fetchImages(company, date.format("YYYYMMDD"));
               
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        }
    
        getData().then(() => setDataLoaded(true));
    
    }, [date, company]); // Include dependencies here, such as 'company' if it might change
    



    return (
        <>
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


            {dataLoaded ? <>


                
                <ImageList sx={{ width: 1000, height: 1000 }} cols={3} rowHeight={164}>
                {images.map((image, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={`data:image/jpeg;base64,${image.imageData}`}
                                alt={image.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>


            </> : <h1>Loading</h1>}

        </>
    );
}

export default ImageViewPage;
