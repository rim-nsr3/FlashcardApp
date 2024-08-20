import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function SignUpPage() {
    return <Container maxWidth="100vh" style={{ backgroundColor: '#F5F5DC' }}>
        <AppBar position="sticky" sx={{ backgroundColor: '#AFE1AF', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Toolbar><Typography variant="h6"sx={{flexGrow:1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
          <Link href="/" style={{ color: '#2c3e50', textDecoration: 'none' }}>
            Flashcard SaaS
          </Link></Typography><SignedOut><Button sx={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#F5F5DC', color: '#2c3e50', borderRadius: '20px', padding: '8px 16px', minWidth: '120px', marginRight: '16px', '&:hover': { backgroundColor: '#50C878' } }} href="/sign-in">
              LOG IN
            </Button><Button sx={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'transparent', color: '#2c3e50', borderRadius: '20px', padding: '8px 16px', border: '2px solid #F5F5DC', minWidth: '120px', '&:hover': { backgroundColor: '#50C878' } }} href="/sign-up">
              SIGN UP
            </Button></SignedOut><SignedIn><UserButton /></SignedIn></Toolbar>
        </AppBar>

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginTop={1}
            height="100vh" 
        >
            
            <SignIn />
        </Box>
    </Container>
}