import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { onLogin } from '../store/actions/user.action.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SuccessAlert from '../cmps/user-msg.jsx'
import { useState } from 'react'

export function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [success, setSuccess] = useState()

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        const data = new FormData(ev.currentTarget)
        const user = {
            username: data.get('username'),
            password: data.get('password')
        }
        if (!user.username || !user.password) return setSuccess(false)

        await dispatch(onLogin(user))

        setSuccess(true)
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    const theme = createTheme()

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    {success && <SuccessAlert msg={'Logged in Successfully, you are being redirected...'} />}
                    {!success && <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>}
                </Box>
            </Container>
        </ThemeProvider>
    )
}