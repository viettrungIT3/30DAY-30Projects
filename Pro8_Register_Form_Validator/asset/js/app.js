const form = document.querySelector('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = '';
}

// Check email is valid
function checkEmail(input) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check password is valid
function checkPassword(input) {
    // Minimum eight characters, at least one letter and one number:
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regex.test(input.value)) {
        showSuccess(input);
        console.log(showSuccess(input));
    } else {
        showError(input, 'Password is not valid');
    }
}

// Check password match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError( input, `${getFieldName(input)} must be at least ${min} characters`
        )
    } else if (input.value.length > max) {
        showError( input, `${getFieldName(input)} must be less than ${max} characters`
        )
    } else {
        showSuccess(input)
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
            isRequired = true
        } else {
            showSuccess(input)
        }
    })

    return isRequired
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()

    if (!checkRequired([username, email, password, password2])) {
        checkLength(username, 3, 15)
        checkLength(password, 6, 25)
        checkEmail(email)
        checkPassword(password)
        checkPasswordsMatch(password, password2)
    }
})