import React from 'react';

import { Container, Typography, Box } from '@mui/material';


export default function Legal() {
    // const classes = useStyles();
    return (
        <Container sx={{ color: 'white', marginTop: '36px', marginBottom: '96px' }}>
            <Box>
                <Typography variant='h3'>Legal</Typography>
            </Box>
            <br />
            <Typography variant='h6'>
                The information on this website is provided for general informational purposes only. This website does not
                provide any medical advice, and it is in no way a substitute for professional medical diagnosis, advice, or
                treatment. Never ignore professional medical advice because of something you have read or seen in any way on
                this website. The author(s) are not any sort of medical professional, so no individuals should use any
                information on this site to self-diagnose or self-treat any health-related condition. Calm Path
                gives no assurance or warranty regarding the accuracy of any content on the website and is not curing,
                preventing, or mitigating any type of illness or medical condition. By using this site, you agree to use any
                tool at your own risk. If you are experiencing any sort of medical emergency, call 911 immediately. Nothing on
                this site has been certified in any way by any governmental agency or any sort of authority. Any use or
                application of content from this website is up to the user and the user's own responsibility.
            </Typography>
            <br />
        </Container>
    )
}