'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField, Container, Button, Grid, Box, Typography, Card, CardActionArea, CardContent, AppBar, Toolbar } from '@mui/material'
import router from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) {
                return
            }
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container maxWidth="100%" style={{ backgroundColor: '#F5F5DC' }}>
            <Grid container spacing={3} >
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
                                                height: '200px',
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
                                                <Typography variant="h5" component="div">
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h5" component="div">
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
                    <Button fontFamily="Big Caslon" variant='contained' onClick={() => window.location.href = '/flashcards'} sx={{ 
                    mt: 2, 
                    px: 4, 
                    py: 2, 
                    borderRadius: '25px', 
                    fontWeight: 'bold', 
                    color: 'black',
                    backgroundColor: '#AFE1AF', 
                    ":hover": { backgroundColor: '#50C878' },
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: '-20px',
                    marginBottom: '30px',
                  }}>
                        Back
                    </Button>
                </Box>
        </Container>
    )
}