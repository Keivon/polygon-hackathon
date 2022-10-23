import AppBar from '../../components/App_bar';
import { useEffect } from 'react';
import { useState } from 'react';
import './Home.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '../../components/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '../../components/drawer';

function Home({ setIsConnected, setUserInfo, isConnected }) {

    useEffect(() => {
        function checkConnectedWallet() {
          const userData = JSON.parse(localStorage.getItem('userAccount'));
          if (userData != null) {
            setUserInfo(userData);
            setIsConnected(true);
          }
        }
        checkConnectedWallet();
      }, []);


    const [open, setOpen] = useState(false);
    const [Dopen, setDopen] = useState(false);

    return (
        <>
            <AppBar
                openSD={setDopen}
                setIsConnected={setIsConnected}
                setUserInfo={setUserInfo}
                isConnected={isConnected}
            />
            <br />
            <div className="main">
                <Box sx={{ flexGrow: 1 }}>
                    <Drawer DrawerB={Dopen} openSD={setDopen} />
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(Array(12)).map((_, index) => (
                            <Grid xs={2} sm={4} md={4} key={index}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image="https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div">
                                            Lizard
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary">
                                            Lizards are a widespread group of
                                            squamate reptiles, with over 6,000
                                            species, ranging across all
                                            continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            onClick={() => {
                                                setOpen(
                                                    (open) => (open = !open)
                                                );
                                            }}
                                            size="small">
                                            Buy
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Modal open={open} setOpen={setOpen} />
            </div>
        </>
    );
}

export default Home;
