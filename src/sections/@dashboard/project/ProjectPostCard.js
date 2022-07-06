import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, CardActions, CardHeader, IconButton, CardMedia } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

ProjectPostCard.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  techStack: PropTypes.array,
  url: PropTypes.string
};

export default function ProjectPostCard({ index, name, description, techStack, createdAt, url }) {
//   const { cover } = post;

  return (
    <Card sx={{ maxWidth: 280, margin: "10px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings"/>
        }
        title={name}
        subheader={createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="paela"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
            techStack.map((item) => (
                <Typography key={item} variant="body2" sx={{marginLeft: "12px"}}>{item}</Typography>
            ))
        }
      </CardActions>
    </Card>
  );
}
