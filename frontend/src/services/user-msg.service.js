import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { eventBusService } from './event-bus.service'
const UserMsg = withReactContent(Swal)
const { emit } = eventBusService

// ---------------------------------  popUp massages using `withReactContent(Swal)`  ---------------------------------
export function popUserMsg({ type = 'info', title, txt, data = null }) {
    UserMsg.fire({
        icon: type,
        title: <p>{title}</p>,
        text: <p>{txt}</p>,

        ...(data && { data }),

        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' }
    })
}

// ---------------------------------   `error`    
export function popErrorMsg({ title, txt }) {
    const msg = {
        icon: 'error',
        title,
        txt,
    }
    popUserMsg(msg)
}

// ---------------------------------  timer auto close   
export function popTimerMsg({ pos = 'top-end', type = 'success', title, txt = null, time = 1500, isConfirmBtnShown = false }) {
    const msg = {
        icon: type,
        title,
        txt,
        data: {
            position: pos,
            showConfirmButton: isConfirmBtnShown,
            timer: time
        }
    }
    popUserMsg(msg)
}

// ---------------------------------  return Boolean from user    
export async function askUser({ type = 'question', title, txt, confirmBtnTxt, isCancelBtnShown, cancelBtnTxt }) {
    const msg = {
        title,
        type,
        txt,
        data: {
            showCancelButton: isCancelBtnShown,
            confirmButtonText: <p>{confirmBtnTxt}</p>,
            cancelButtonText: <p>{cancelBtnTxt}</p>,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }
    }
    try {
        const result = await popUserMsg(msg)
        return result.value === true
    } catch (error) {
        console.error('An error occurred while displaying the message:', error)
        return false
    }
}

// ---------------------------------  confirm before delete   
export async function confirmDelete() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}

// ---------------------------------  Terms and condition
export async function confirmTermsConditions() {
    const { value: accept } = await Swal.fire({
        title: 'Terms and conditions',
        input: 'checkbox',
        inputValue: 1,
        inputPlaceholder:
            'I agree with the terms and conditions',
        confirmButtonText:
            'Continue <i class="fa fa-arrow-right"></i>',
        inputValidator: (result) => {
            return !result && 'You need to agree with Airbnb'
        }
    })

    if (accept) Swal.fire('You agreed with Airbnb :)')
}

// ---------------------------------  update Exists User inputs  
export async function askUserImg() {
    const { value: file } = await Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
        }
    })

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            Swal.fire({
                title: 'Your uploaded picture',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture'
            })
        }
        reader.readAsDataURL(file)
    }
}

export async function askUserEmail() {
    const { value: email } = await Swal.fire({
        title: 'Input email address',
        input: 'email',
        inputLabel: 'Your email address',
        inputPlaceholder: 'Enter your email address'
    })

    if (email) Swal.fire(`Entered email: ${email}`)
}

export async function askUserAge() {
    Swal.fire({
        title: 'How old are you?',
        icon: 'question',
        input: 'range',
        inputLabel: 'Your age',
        inputAttributes: {
            min: 8,
            max: 120,
            step: 1
        },
        inputValue: 25
    })
}

export async function askUserPass() {
    const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (password) Swal.fire(`Entered password: ${password}`)
}

// ---------------------------------  on layout massage using eventBusService     ---------------------------------
export function showUserMsg(txt, type = 'info') {
    emit('show-user-msg', { txt, type })
}

// ---------------------------------  `success` 
export function showSuccessMsg(txt) {
    showUserMsg(txt, 'success')
}

// ---------------------------------  `error` 
export function showErrorMsg(txt) {
    showUserMsg(txt, 'danger')
}

// ---------------------------------  `warn` 
export function showWarnMsg(txt) {
    showUserMsg(txt, 'warn')
}

// ---------------------------------   Debug  ---------------------------------   
window.showSuccessMsg = showSuccessMsg
window.showUserMsg = showUserMsg
window.showErrorMsg = showErrorMsg
window.showWarnMsg = showWarnMsg

// ---------------------------------   Typescript ---------------------------------
// const iconsTypes = ['success', 'error', 'warning', 'info', 'question']
// const msgPosTypes = [
//     'top', 'top-start', 'top-end',
//     'center', 'center-start', 'center-end',
//     'bottom', 'bottom-start', 'bottom-end'
// ]