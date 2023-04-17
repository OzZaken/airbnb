import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { onSignup } from '../store/user.action.js'
import { ImgUploader } from '../cmps/img-uploader.jsx'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link, Container, Typography, Box, Grid, TextField } from '@mui/material'

const theme = createTheme()

const boxMainStyle = {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const usernameTextField = {
    required: true,
    fullWidth: true,
    id: 'username',
    label: 'User Name',
    name: 'username',
    autoComplete: 'user-name'
}
const passwordTextField = {
    required: true,
    fullWidth: true,
    name: 'password',
    label: 'Password',
    type: 'password',
    id: 'password',
    autoComplete: 'new-password'
}
const lastNameTextField = {
    required: true,
    fullWidth: true,
    id: 'lastname',
    label: 'Last Name',
    name: 'lastname',
    autoComplete: 'family-name'
}
const firstNameTextField = {
    id: 'firstname',
    autoComplete: 'given-name',
    name: 'firstname',
    fullWidth: true,
    label: 'First Name',
    required: true,
    autoFocus: true
}

const btnSubmit = {
    type: 'submit',
    fullWidth: true,
    variant: 'contained',
    sx: { mt: 3, mb: 2 }
}

const loginLink = {
    to: '#/login',
    underline: 'always',
    color: 'primary',
    variant: 'body1'
}

export const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userImg = 'https://res.cloudinary.com/cajul22/image/upload/v1663832698/gmbjqd5t128qtdgimx3z.png'// debug

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const credentials = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            username: formData.get('username'),
            password: formData.get('password'),
            imgUrl: userImg
        }

        if (!credentials.username || !credentials.password
            || !credentials.firstname || !credentials.lastname) return

        await dispatch(onSignup(credentials))

        navigate('/')
    }

    const setImgUrl = userImgUrl => {
        userImg = userImgUrl
    }

    const boxContainsForm = {
        noValidate: true,
        component: 'form',
        onSubmit: () => handleSubmit(),
        sx: { mt: 3 }
    }

    return <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={boxMainStyle}>
                {/* Heading */}
                <Avatar sx={{ bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5">Sign up</Typography>

                {/* signup Form */}
                <Box {...boxContainsForm}>

                    {/* user inputs */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}><TextField {...firstNameTextField} /></Grid>

                        <Grid item xs={12} sm={6}><TextField {...lastNameTextField} /></Grid>

                        <Grid item xs={12}><TextField {...usernameTextField} /></Grid>

                        <Grid item xs={12}><TextField {...passwordTextField} /></Grid>

                        <Grid item xs={12}><ImgUploader setImgUrl={setImgUrl} /></Grid>
                    </Grid>

                    {/* Submit */}
                    <Button {...btnSubmit}>Sign Up</Button>

                    {/* Log in */}
                    <Link {...loginLink}>Already have an account? Sign in</Link>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
}