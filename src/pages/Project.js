// material
import { Container, Stack, Typography, Skeleton, Box } from '@mui/material';
import React, { useEffect } from 'react';
// firebase
import { getDocs } from 'firebase/firestore';
import { colRef } from '../sections/auth/firebase/firebase';
// components
import { FormDialog } from '../sections/@dashboard/project/FormDialog';
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import ProjectPostCard from '../sections/@dashboard/project/ProjectPostCard';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

export default function Project() {
  const [searchValue, setSearchValue] = React.useState('');
  const [projects, setProjects] = React.useState([]);
  // const changeDatas = React.useMemo(() => addNewData(), [datas])


  const addNewData = () => {
    setProjects([]);
    getDocs(colRef)
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          // datas.push({ ...doc.data(), id: doc.id });
          setProjects((prev) => [...prev, {...doc.data(), id: doc.id}])
        })
        // setProjects(datas);
        console.log(projects)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getDocs(colRef)
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          // datas.push({ ...doc.data(), id: doc.id });
          setProjects((prev) => [...prev, {...doc.data(), id: doc.id}])
        })
        // setProjects(datas);
        // console.log(projects)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    
  }, [projects])

  return (
    <Page title="Project">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Project
          </Typography>
          <FormDialog addNewData={addNewData}/>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={projects} setSearchValue={setSearchValue} />
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
                <ProjectPostCard key={post.id} id={post.id} createdAt={post.createdAt} index={index} name={post.name} description={post.description} techStack={post.techStack} url={post.url} imageUrl={post.imageUrl} />
              ))}
            </Box>
        }
      </Container>
    </Page>
  );
}