'use client'

import { useUser } from '@clerk/nextjs'
import {Link, Toolbar, Box, Container, Paper, DialogActions, DialogContentText, DialogContent, TextField, Typography, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, AppBar } from '@mui/material'
import { collection, writeBatch, setDoc, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { db } from '@/firebase'

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        document.querySelector("#loader-parent").style.display = "flex"
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data))
            .then(() => document.querySelector("#loader-parent").style.display = "none")
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcard = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.')
                return
            } else {
                collections.push({ name })
                batch.set(userDocRef, { flashcards: collections }, { merge: true })
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] })
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return (<Container maxWidth="100%" sx={{ backgroundColor: '#F5F5DC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="sticky" sx={{ backgroundColor: '#AFE1AF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                <Link href="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>
                FlipWise
                </Link>
            </Typography>
            </Toolbar>
        </AppBar>
        <Box sx={{
            mt: 4,
            mb: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',  // Ensures the box takes up most of the page
            textAlign: 'center'  // Centers the content
        }}>
            <Typography 
            variant="h5" 
            sx={{ 
                color: 'black',  // Set title color to black
                fontSize: '2rem', // Adjust the font size
                marginBottom: '2rem',  // Add spacing below the title
                fontWeight: 'bold',  // Set the font weight to bold
            }}
            >
            Create your Flashcards
            </Typography>
            <Paper sx={{ p: 3, width: '80%', maxWidth: '500px'}}>
                <TextField
                    fontFamily="Big Caslon"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label="Ready to Learn?"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                        mb: 2,
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ 
                    backgroundColor: '#AFE1AF', 
                    color: 'black',
                    fontWeight: 'bold',
                    ':hover': { backgroundColor: '#50C878' },  
                    }}
                    onClick={handleSubmit}
                    fullWidth
                >
                    Submit
                </Button>
            </Paper>
        </Box>
        <div id="loader-parent"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>

        {flashcards.length > 0 && (
            <Box sx={{ mt: 1 }}>
                <Typography textAlign="center" fontWeight={'bold'} fontSize={'2rem'} marginBottom={'2rem'} variant="h4">Flashcards Preview</Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => {
                                    handleCardClick(index)
                                }}
                                >
                                    <CardContent sx={{ '&':{background: '#50C878'}}}>
                                        <Box
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    background: '#AFE1AF',
                                                    color: 'black',
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '250px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index]
                                                        ? 'rotateY(180deg)'
                                                        : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}
                                        >
                                            <div>
                                                <div>
                                                    <Typography fontFamily="Big Caslon" variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography fontFamily="Big Caslon" variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button fontFamily="Big Caslon" variant='contained' onClick={handleOpen} sx={{ 
                    mt: 2, 
                    px: 4, 
                    py: 2, 
                    borderRadius: '25px', 
                    fontWeight: 'bold', 
                    color: 'black',
                    backgroundColor: '#AFE1AF', 
                    ":hover": { backgroundColor: '#50C878' },
                    marginBottom: '3rem', 
                  }}>
                        Save
                    </Button>
                </Box>
            </Box>
        )}

        <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: {
        backgroundColor: '#F5F5DC', // Set the background color of the entire Dialog
        }
  }}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText fontFamily="Big Caslon" >
                    Name your flashcards collection and press save
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Collection Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: '#AFE1AF', 
                    color: 'black',
                    ":hover": { backgroundColor: '#50C878' }
                  }} onClick={handleClose}>Cancel</Button>
                <Button sx={{ 
                    fontWeight: 'bold', 
                    backgroundColor: '#AFE1AF', 
                    color: 'black',
                    ":hover": { backgroundColor: '#50C878' }
                  }} onClick={saveFlashcard}>Save</Button>
            </DialogActions>
        </Dialog>
    </Container>
    )
}