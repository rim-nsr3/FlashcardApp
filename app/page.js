'use client'
import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import {Paper, AppBar, Box, Button, Container, Grid, Toolbar, Typography, Card, CardHeader, CardContent } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React from 'react';
import Link from'next/link';
import CheckIcon from '@mui/icons-material/Check';

export default function Home() {
  const router = useRouter()

  const handleSubmitPro = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://flashcards-phi-eight.vercel.app/',
        plan: "pro",
      },
      
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }


  const handleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
        plan: "basic",
      },
      
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }


  const getStarted = async () => {
    router.push('/generate')
  }

  return (
    <React.Fragment>
      <Container maxWidth="100vh" id="home-root" style={{ backgroundColor: '#F5F5DC' }}>
        <Head>
          <title fontFamily="Plantagenet Cherokee">Flashcard SaaS</title>
          <meta name="description" content="Create flashcard from your text" />
        </Head>
        <AppBar position="sticky" sx={{ backgroundColor: '#AFE1AF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Toolbar><Typography variant="h6"sx={{flexGrow:1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          <Link href="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>
            FlipWise
          </Link></Typography><SignedOut><Button sx={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#F5F5DC', color: '#2c3e50', borderRadius: '20px', padding: '8px 16px', minWidth: '120px', marginRight: '16px', '&:hover': { backgroundColor: '#50C878' } }} href="/sign-in">
              LOG IN
            </Button><Button sx={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'transparent', color: '#2c3e50', borderRadius: '20px', padding: '8px 16px', border: '2px solid #F5F5DC', minWidth: '120px', '&:hover': { backgroundColor: '#50C878' } }} href="/sign-up">
              SIGN UP
            </Button></SignedOut><SignedIn><UserButton /></SignedIn></Toolbar>
        </AppBar>


        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: 4,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ 
                  color: '#2c3e50', 
                  fontSize: { xs: '2.5rem', md: '3rem' }, 
                  textAlign: { xs: 'center', md: 'left' } 
                }}
              >
                Welcome to FlipWise!
              </Typography>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#2c3e50', 
                  textAlign: { xs: 'center', md: 'left' } 
                }}
              >
                The easiest way to make flashcards from your text!
              </Typography>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}> {/* Center button on small screens */}
                <Button 
                  onClick={getStarted} 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    mt: 2, 
                    px: 4, 
                    py: 2, 
                    borderRadius: '25px', 
                    fontWeight: 'bold', 
                    backgroundColor: '#AFE1AF', 
                    ":hover": { backgroundColor: '#50C878' }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
    
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/images/flashcardpic.png"
                width={300}
                height={300}
                alt="Flashcards Icon"
                style={{ marginLeft: '15rem' }}
              />
            </Grid>
          </Grid>
        </Box>



        <Box className="features-section" sx={{ py: 10 }}>
          <Typography variant="h4"sx={{color: '#2c3e50', fontFamily: 'Arial, sans-serif', textAlign: 'center', fontWeight: 'bold',mb:3}} gutterBottom>
            Key Features
          </Typography>
          <Typography sx={{color: '#4f4f4f', 
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif', 
            textAlign: 'center', 
            mb:6  
          }}
        >
          Transform your study sessions with our AI-driven flashcards—designed to 
          help you learn more efficiently and effectively. <br /> Tailor your flashcards to your 
          unique needs, monitor your progress, and achieve top results with ease.
        </Typography>
          
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12} sm={6} lg={4}>
              <Box 
                className="feature" 
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  '&:hover': { 
                    transform: 'scale(1.05)', 
                    boxShadow: '0px 8px 24px rgba(175, 225, 175, 1)' 
                  } 
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50', fontWeight: 'bold' }}>
                Easy Text Input
                </Typography>
                <Typography sx={{ fontFamily: 'Arial, sans-serif', color: '#4f4f4f', mt: 2 }}>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 2 */}
            <Grid item xs={12} sm={6} lg={4}>
              <Box 
                className="feature" 
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  '&:hover': { 
                    transform: 'scale(1.05)', 
                    boxShadow: '0px 8px 24px rgba(175, 225, 175, 1)' 
                  } 
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50', fontWeight: 'bold' }}>
                  Smart Flashcards
                </Typography>
                <Typography sx={{ fontFamily: 'Arial, sans-serif', color: '#4f4f4f', mt: 2 }}>
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 3 */}
            <Grid item xs={12} sm={6} lg={4}>
              <Box 
                className="feature" 
                sx={{ 
                  textAlign: 'center', 
                  p: 4, 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  '&:hover': { 
                    transform: 'scale(1.05)', 
                    boxShadow: '0px 8px 24px rgba(175, 225, 175, 1)' 
                  } 
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50', fontWeight: 'bold' }}>
                  Accessible Anywhere
                </Typography>
                <Typography sx={{ fontFamily: 'Arial, sans-serif', color: '#4f4f4f', mt: 2 }}>
                Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>


        <Box className="pricing-section">
        <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: '#2c3e50', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', mb:3, marginTop: '4rem' }} 
          >
            Pricing to Fit Your Needs
          </Typography><Grid container spacing={7}  justifyContent="center">
            <Grid item xs={12} md={5}>
            <Paper
                elevation={3}
                sx={{
                  padding: "2rem",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  marginBottom: '5rem',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  '&:hover': { 
                    transform: 'scale(1.05)', 
                    boxShadow: '0px 8px 24px rgba(175, 225, 175, 1)'
                }}}
              >
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ color: "#333" }} // Dark text color
                >
                  Basic Plan
                </Typography>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ color: "#333", fontSize: "3rem", fontWeight: "bold" }} // Large bold price text
                >
                  $5
                </Typography>
                <Typography
                  sx={{ fontFamily: 'Open Sans', color: '#4f4f4f', marginBottom: '1rem' }}
                >
                  per month
                </Typography>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, color: '#4f4f4f', marginBottom: '1rem' }}>
                  <li className="flex items-center" style={{ marginBottom: '0.5rem' }}>
                    <CheckIcon className="mr-2 h-4 w-4" style={{ marginRight: '0.5rem' }} />
                    Access to basic features
                  </li>
                  <li className="flex items-center" style={{ marginBottom: '0.5rem' }}>
                    <CheckIcon className="mr-2 h-4 w-4" style={{ marginRight: '0.5rem' }} />
                    Limited flashcard generation
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" style={{ marginRight: '0.5rem' }} />
                    Basic progress tracking
                  </li>
                </ul>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSubmitBasic}
                  sx={{ 
                    mt: 2, 
                    px: 4, 
                    py: 2, 
                    borderRadius: '25px', 
                    fontWeight: 'bold', 
                    backgroundColor: '#AFE1AF', 
                    ":hover": { backgroundColor: '#50C878' }
                  }}
                >
                  Choose Basic
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
            <Paper
                elevation={3}
                sx={{
                  padding: "2rem",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  '&:hover': { 
                    transform: 'scale(1.05)', 
                    boxShadow: '0px 8px 24px rgba(175, 225, 175, 1)'
                }}}
              >
                <Typography
                  variant="h6"
                  align="center"
                  gutterBottom
                  sx={{ color: "#333" }} // Dark text color
                >
                  Pro Plan
                </Typography>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ color: "#333", fontSize: "3rem", fontWeight: "bold" }} // Large bold price text
                >
                  $10
                </Typography>
                <Typography
                  sx={{ fontFamily: 'Open Sans', color: '#4f4f4f', marginBottom: '1rem' }}
                >
                  per month
                </Typography>
                <ul style={{ listStyleType: 'none', paddingLeft: 0, color: '#4f4f4f', marginBottom: '1rem' }}>
                  <li className="flex items-center" style={{ marginBottom: '0.5rem' }}>
                    <CheckIcon className="mr-2 h-4 w-4" style={{ marginRight: '0.5rem' }} />
                    Unlimited flashcards
                  </li>
                  <li className="flex items-center" style={{ marginBottom: '0.5rem' }}>
                    <CheckIcon className="mr-2 h-4 w-4" style={{ marginRight: '0.5rem' }} />
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" style={{ marginRight: '0.5rem' }} />
                    Exclusive updates and features
                  </li>
                </ul>
                <Button 
                  variant="contained" 
                  color="primary"  
                  sx={{ 
                    mt: 2, 
                    px: 4, 
                    py: 2, 
                    borderRadius: '25px', 
                    fontWeight: 'bold', 
                    backgroundColor: '#AFE1AF', 
                    ":hover": { backgroundColor: '#50C878' }
                  }}
                  onClick={handleSubmitPro}
                >
                  Choose Pro
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>


      </Container>
    </React.Fragment>
  )
}
