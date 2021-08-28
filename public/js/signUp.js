const signUpButton_El = document.getElementById("sign-up-btn");

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.getElementById("username-textarea").value.trim();
    const password = document.getElementById("password-textarea").value.trim();

    if (name && password) {
        const response = await fetch("/user/signUp", {
            method: "POST",
            body: JSON.stringify({ name, password }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) { document.location.replace("/dashboard"); }
        else { alert(response.statusText); }
    }
};

signUpButton_El.addEventListener("click", signupFormHandler);