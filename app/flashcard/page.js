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
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get('wrongParam')

    useEffect(() => {
        async function fetchFlashcard() {
            if (!search || !user) {
                return
            }
            const colRef = collection(db, 'wrongCollection', user.id, search)
            const docs = await getDocs(colRef)
            const flashcards = {}

            docs.forEach((doc) => {
                flashcards[doc.id] = doc.data()
            })
            setFlashcards(flashcards)
        }
        fetchFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            id: !prev.id,
        }))
    }

    if (!isLoaded && !isSignedIn) {
        return <p>Loading...</p>
    }

    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'blue' }}>
            <Grid container spacing={5}>
                {Object.keys(flashcards).map((flashcardId, index) => (
                    <Grid item xs={4} sm={8} md={3} key={index}>
                        <Card>
                            <CardActionArea onClick={() => {
                                handleCardClick(flashcardId)
                            }}>
                                <CardContent style={{ backgroundColor: '#123456' }}>
                                    <Box
                                        sx={{
                                            perspective: '2000px',
                                            '& > div': {
                                                background: '#FFFFFF',
                                                color: 'red',
                                                transition: 'transform 0.2s',
                                                transformStyle: 'flat',
                                                position: 'absolute',
                                                width: '50%',
                                                height: '100px',
                                                boxShadow: 'none',
                                                transform: flipped[flashcardId]
                                                    ? 'rotateX(180deg)'
                                                    : 'rotateX(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'relative',
                                                width: '200%',
                                                height: '50%',
                                                backfaceVisibility: 'visible',
                                                display: 'block',
                                                justifyContent: 'start',
                                                alignItems: 'end',
                                                padding: 5,
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateX(90deg)',
                                            },
                                        }}
                                    >
                                        <div>
                                            <div>
                                                <Typography variant="h6" component="div">
                                                    {flashcards[flashcardId]?.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h6" component="div">
                                                    {flashcards[flashcardId]?.back}
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
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='text' onClick={() => window.location.href = '/wrongURL'} style={{ 
                    mt: 1, 
                    px: 2, 
                    py: 1, 
                    fontWeight: 'normal', 
                    color: 'white',
                    backgroundColor: 'green', 
                    marginTop: '-10px',
                    marginBottom: '50px',
                  }}>
                    Go Back
                </Button>
            </Box>
        </Container>
    )
}
