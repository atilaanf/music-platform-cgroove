document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const age = document.getElementById('age');
    const male = document.getElementById('male');
    const female = document.getElementById('female');
    
    let users = []


    form.addEventListener('submit', e => {
        e.preventDefault();
        const isValid = validateInputs();
        if (isValid) {
            const userData ={
                name: username.value.trim(),
                email: email.value.trim(),
                password: password1.value.trim(), // Note: storing raw passwords is insecure!
                age: parseInt(age.value.trim()),
                gender: male.checked ? "Male" : "Female"
            }
            console.log("New user registered:", userData);
            users.push(userData);
            // Redirect only if all inputs are valid
            window.location.href = '/index.html';
        }
    

        



    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = email => {
        return email.includes("@") && email.includes(".");
    }

    const validateInputs = () => {
        let isFormValid = true;

        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const password1Value = password1.value.trim();
        const password2Value = password2.value.trim();
        const ageValue = age.value.trim();

        if (usernameValue === '') {
            setError(username, 'Name is required');
            isFormValid = false;
        } else {
            setSuccess(username);
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
            isFormValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Invalid email address');
            isFormValid = false;
        } else {
            setSuccess(email);
        }

        if (password1Value === '') {
            setError(password1, 'Password is required');
            isFormValid = false;
        } else if (password1Value.length < 8) {
            setError(password1, 'Password must be at least 8 characters');
            isFormValid = false;
        } else {
            setSuccess(password1);
        }

        if (password2Value === '') {
            setError(password2, 'Password confirmation is required');
            isFormValid = false;
        } else if (password2Value !== password1Value) {
            setError(password2, 'Passwords do not match');
            isFormValid = false;
        } else {
            setSuccess(password2);
        }

        if (ageValue === '') {
            setError(age, 'Age is required');
            isFormValid = false;
        } else if (parseInt(ageValue) <= 0 || isNaN(parseInt(ageValue))) {
            setError(age, 'Please enter a valid age');
            isFormValid = false;
        } else {
            setSuccess(age);
        }

        if (!male.checked && !female.checked) {
            setError(male, 'Gender is required');
            isFormValid = false;
        } else {
            const genderControl = male.closest('.input-control');
            const errorDisplay = genderControl.querySelector('.error');
            errorDisplay.innerText = '';
            genderControl.classList.add('success');
            genderControl.classList.remove('error');
        }

        return isFormValid;
    };
});
