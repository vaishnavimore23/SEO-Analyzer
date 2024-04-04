import {React, useEffect, useState} from 'react';
import Demo from './Demo';
import { Grid, Paper, Typography } from '@mui/material';
import TextSphere from './TextSphere';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const MainPage = () => {
  const [responseData, setResponseData] = useState(null);


  useEffect(() => {

    const storedData = localStorage.getItem("responseData");

    if (storedData) {
      const data = JSON.parse(storedData);
      setResponseData(data)
    } else {
      console.log("No response data found in localStorage");
    }
  }, []); 


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"60px", marginBottom:"30px" }}>
      <Grid container spacing={2}>
          <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <br></br>
            <Typography align='center' variant="h5" style={{ fontSize: '30px', fontWeight: 'bold' }}>
              Keywords Count
            </Typography>
            <Demo data={responseData?.data}/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/home">
                <Button variant="contained" size="small" style={{ backgroundColor: 'blue', margin: "10px" }}>
                  Back
                </Button>
              </Link>
              <Link to="/analyzer">
                <Button variant="contained" size="small" style={{ backgroundColor: 'red', margin: "10px" }}>
                  Analyzer
                </Button>
              </Link>
              <Link to="/recommender">
                <Button variant="contained" size="small" style={{ backgroundColor: 'green', margin: "10px" }}>
                  Recommender
                </Button>
              </Link>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: "30px", maxHeight: '920px', overflow: 'auto' }}>
          <br></br>
          <Typography align='center' variant="h5" style={{ fontSize: '30px', fontWeight: 'bold' }}>
            Word Cloud
          </Typography>
          <TextSphere data={responseData?.data} />
          <br></br>
        </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

export default MainPage;
