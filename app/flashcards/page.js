'use client'

import { useUser } from '@clerk/nextjs'
import { use, useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Container, Grid, Card, CardActionArea, Typography, CardContent, AppBar, Toolbar, Link, Button, Box } from '@mui/material'

export default function Flashcards() {

    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) {
                return
            }
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100%" style={{ backgroundColor: '#F5F5DC' }}>
            <AppBar position="sticky" sx={{ backgroundColor: '#AFE1AF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                <Link href="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>
                Flashcard SaaS
                </Link>
            </Typography>
            </Toolbar>
        </AppBar>
            <Grid
                container 
                spacing={3} 
                sx={{
                    mt: 4
                }}
                height="100vh" 
                padding={2}
            >
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea 
                                onClick={() => {
                                    handleCardClick(flashcard.name)
                            }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}