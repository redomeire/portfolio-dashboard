// material
import { Container, Stack, Typography, Skeleton, Box, CardHeader, Card, CardActions, Button, Avatar, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// firebase
import { getDocs } from 'firebase/firestore';
import { colRef } from '../sections/auth/firebase/firebase';
// components
import Page from '../components/Page';

ContactDetail.propTypes = {
    contactData: PropTypes.object,
}

export default function ContactDetail(props){
    const [contactDetail, setContactDetail] = React.useState({});
    React.useEffect(() => {
        setContactDetail(props.contactData);
    }, [])
    return(
        <Page title="Contacts">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Contact
                        
                    </Typography>
                </Stack>
                <Stack direction="column" alignItems="flex-start" justifyContent="center" />
                <Box display="flex" sx={{ justifyContent: { md: "start", xs: "space-between" } }} flexWrap="wrap">
                    Boxed
                </Box>
                <Button>Print</Button>
            </Container>
            {
                console.log(contactDetail)
            }
        </Page>
    );
}