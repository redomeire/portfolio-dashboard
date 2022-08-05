// material
import { Container, Stack, Typography, Skeleton, Box, CardHeader, Card, CardActions, Button, Avatar, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// firebase
import { getDocs } from 'firebase/firestore';
import { colRef } from '../sections/auth/firebase/firebase';
// components
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock

const POST_TITLE = [
    {
        id: 1,
        name: "Shrimp and Chorizo Paella",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 2,
        name: "Shrimp and Chorizo Paella",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 3,
        name: "Shrimp and Chorizo Paella",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 4,
        name: "Shrimp and Chorizo Paella",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
]


export default function Contact(props) {
    const [searchValue, setSearchValue] = React.useState('');

    const getDetail = (item) => {
        props.setContactData(item);
    }

    React.useEffect(() => {
        getDetail();
    }, [])

    return (
        <Page title="Contacts">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Contact
                    </Typography>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BlogPostsSearch posts={POST_TITLE} setSearchValue={setSearchValue} />
                    {/* <BlogPostsSort options={SORT_OPTIONS} /> */}
                </Stack>

                <Stack direction="column" alignItems="flex-start" justifyContent="center" />
                <Box display="flex" sx={{ justifyContent: { md: "start", xs: "space-between" } }} flexWrap="wrap">
                    {
                        POST_TITLE.filter(item => {
                            if (searchValue === '')
                                return item;
                            return item.name.toUpperCase().includes(searchValue.toUpperCase());
                        }).map(item => (
                            <Card key={item.id} sx={{ width: { md: "47%", sm: "100%" }, margin: "10px" }}>
                                <CardHeader
                                    avatar={<Avatar>R</Avatar>}
                                    title={item.name}
                                    subheader="September 14, 2016"
                                />
                                <CardContent>
                                    <Typography sx={{ marginBottom: "40px" }}>{item.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Link 
                                    to="/dashboard/contact/detail"
                                    state={{from: 'the value'}}
                                    >
                                        <Button sx={{ position: "absolute", bottom: "10px", left: "10px" }} onClick={() => getDetail(item)}>Tombol</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        ))
                    }

                </Box>
            </Container>
        </Page>
    );
}