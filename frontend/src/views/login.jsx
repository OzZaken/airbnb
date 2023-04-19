import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showSuccessMsg } from '../services/user-msg.service'
import { onLogin } from '../store/user.action'
import MUILink from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const themeProvider = createTheme()

const boxSxLogin = {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const btnSubmitSignIn = {
    type: 'submit',
    variant: 'contained',
    sx: { mt: 3, mb: 2 }
}

const signupLink = {
    href: '#/signup',
    color: 'primary',
    underline: 'always',
    variant: 'body1'
}

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [successLogin, setSuccessLogin] = useState()

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)

        const user = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        if (!user.username || !user.password) return setSuccessLogin(false)

        await dispatch(onLogin(user))

        showSuccessMsg('Login successful')

        setTimeout(() => navigate('/'), 800)
    }

    return <ThemeProvider theme={themeProvider}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={boxSxLogin}>

                <Avatar sx={{ bgcolor: 'primary.main' }}></Avatar>
                <Typography component="h1" variant="h5">Log in</Typography>

                {successLogin
                    ? showSuccessMsg('Logged in Successfully, you are being redirected...')
                    : <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {/* username */}
                        <TextField id="username"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />

                        {/* password */}
                        <TextField id="password"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />

                        {/* Sign In */}
                        <Button fullWidth {...btnSubmitSignIn}>Sign In</Button>

                        {/*Sign Up*/}
                        <MUILink {...signupLink}>Don't have an account? Sign Up</MUILink>
                    </Box>
                }
            </Box>
        </Container>
    </ThemeProvider>
}