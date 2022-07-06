// material
import { Grid, Container, Stack, Typography, Skeleton, Box } from '@mui/material';
import React, { useEffect } from 'react';
// firebase
import { getDocs } from 'firebase/firestore';
import { colRef } from '../sections/auth/firebase/firebase';
// components
import { FormDialog } from '../sections/@dashboard/project/FormDialog';
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import ProjectPostCard from '../sections/@dashboard/project/ProjectPostCard';
import { projectData } from '../_mock/project';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function Project() {
  const [searchValue, setSearchValue] = React.useState('');
  const datas = [];
  const [projects, setProjects] = React.useState([]);

  useEffect(() => {
    getDocs(colRef)
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          datas.push({ ...doc.data(), id: doc.id });
        })
        setTimeout(() => {
          setProjects(datas);
        }, 1000)
        console.log(datas)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Project
          </Typography>
          <FormDialog />
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} setSearchValue={setSearchValue} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Stack direction="column" alignItems="flex-start" justifyContent="center" />

        {
          projects.length === 0 ?
            <Stack spacing={1}>
              <Skeleton variant="text" width={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={118} />
            </Stack>
            :
            <Box display="flex" sx={{justifyContent: {md: "start", xs: "center"}}} flexWrap="wrap">
              {projects.filter(item => {
                if (searchValue === '')
                  return item;
                return item.name.toUpperCase().includes(searchValue.toUpperCase());
              }).map((post, index) => (
                <ProjectPostCard key={post.id} createdAt={post.createdAt} index={index} name={post.name} description={post.description} techStack={post.techStack} url={post.url} />
              ))}
            </Box>
        }
      </Container>
    </Page>
  );
}