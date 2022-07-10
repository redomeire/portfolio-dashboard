import PropTypes from 'prop-types';
import React from "react";
// material
import { Box, Card, Button, Avatar, Typography, CardContent, CardActions, CardHeader, IconButton, CardMedia } from '@mui/material';

import ProjectDetail from './ProjectDetail';

// ----------------------------------------------------------------------

ProjectPostCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  techStack: PropTypes.array,
  url: PropTypes.string,
  id: PropTypes.string
};

export default function ProjectPostCard({ id, name, description, techStack, url }) {
  //   const { cover } = post;
  const [open, setOpen] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 280, margin: "10px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" />
        }
        title={name}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="paela"
        sx={{marginTop: "10px"}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{marginBottom: "20px"}}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box>
          {/* <Box sx={{marginBottom: "20px"}}>
          {
            techStack.map((item) => (
              <Typography key={item} variant="body2" sx={{ marginLeft: "12px" }}>{item}</Typography>
            ))
          }
          </Box> */}
          <Button sx={{marginLeft: "12px", position: "absolute", bottom: "10px"}} onClick={() => setOpen(!open)} variant="contained">Edit Project</Button>
          <ProjectDetail id={id} open={open} setOpen={setOpen} name={name} description={description} techStack={techStack} url={url}/>
        </Box>
      </CardActions>
    </Card>
  );
}
