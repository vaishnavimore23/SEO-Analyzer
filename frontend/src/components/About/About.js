// Import React and required components
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import keshavImage from "../../image/keshav.jpg";
import veditaImage from "../../image/vedita.jpg";
import aakashImage from "../../image/aakash.png";
import vaishnaviImage from "../../image/vaishnavi.jpg";
import navyaImage from "../../image/navya.png";
import nikhilImage from "../../image/nikhil.jpg";
import preethamImage from "../../image/preetham.jpg";
import mouryaImage from "../../image/mourya.png";
import './About.css';

const teamMembers = [
  {
    name: "Keshav Daga",
    email: "kd81@csu.fullerton.edu",
    image: keshavImage,
  },
  {
    name: "Vedita Deshpande",
    email: "vedita@csu.fullerton.edu",
    image: veditaImage,
  },
  {
    name: "Akash Butala",
    email: "akbutala@csu.fullerton.edu",
    image: aakashImage,
  },
  {
    name: "Vaishnavi More",
    email: "vaishnavimore@csu.fullerton.edu",
    image: vaishnaviImage,
  },
  {
    name: "Sri Sai Navya Manchikalapudi",
    email: "srisainavya@csu.fullerton.edu",
    image: navyaImage,
  },
  {
    name: "Chathrapathi Nikhil Kandagatla",
    email: "chathrapathinikhil@csu.fullerton.edu",
    image: nikhilImage,
  },
  {
    name: "Hari Preetham Reddy Takuru",
    email: "haripreetham@csu.fullerton.edu",
    image: preethamImage,
  },
  {
    name: "Mourya Velampati",
    email: "mourya@csu.fullerton.edu",
    image: mouryaImage,
  },
];

const AboutContainer = styled(Container)(() => ({
  paddingTop: '3rem',
  paddingBottom: '3rem',
}));

const ProfileCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const CardMediaStyled = styled(CardMedia)(() => ({
  width: 160,
  height: 160,
  borderRadius: '50%',
  objectFit: 'cover',
}));

const CardContentStyled = styled(CardContent)(() => ({
  textAlign: 'center',
}));

const About = () => {
  return (
    <AboutContainer>
      <Typography variant="h4" gutterBottom>
        Meet Our Team
      </Typography>
      <Typography variant="body1" gutterBottom><b>
        Welcome to our SEO Analyzer!  Here are our dedicated team members info: 
     </b> </Typography>
      <Grid container spacing={2}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProfileCard>
              <CardMediaStyled
                component="img"
                alt={member.name}
                image={member.image}
              />
              <CardContentStyled>
                <Typography variant="h6" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {member.email}
                </Typography>
              </CardContentStyled>
            </ProfileCard>
          </Grid>
        ))}
      </Grid>
    </AboutContainer>
  );
};
export default About;
