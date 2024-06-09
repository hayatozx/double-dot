import Validation from "./Validation.js";

const email = document.querySelector("#email");
const loginButton = document.querySelector(".login-button");
const ps = document.querySelector("#password");
const cfPs = document.querySelector("#confirm-password");
const inputError = document.querySelectorAll(".input-error");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
const loginButtontext = document.querySelector(".login-button-text");

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const psValue = ps.value;
  const cfPsvalue = cfPs.value;

  const validation = new Validation(emailValue, psValue, cfPsvalue);
  validation.isconfirmPw();
  console.log(validation.error);
  const [nodeEmailErr, nodePsErr, nodecfPsErr] = inputError;
  validation.showwErr(nodeEmailErr, validation.error.email);
  validation.showwErr(nodePsErr, validation.error.password);
  validation.showwErr(nodecfPsErr, validation.error.confirm);

  if (isEmpty(validation.error)) {
    loginButton.style.pointerEvents = "none";
    loader.style.display = "block";
    loginButtontext.style.display = "none";

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailValue, psValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        successMessage.style.display = "block";
        window.location.href = "../html/signIn.html";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage1 = error.message;
        errorMessage.textContent = errorMessage1;
        console.log(errorCode);
        console.log(errorMessage1);
        errorMessage.style.display = "block";
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 3000);
      })
      .finally(() => {
        loginButton.style.pointerEvents = "auto";
        loader.style.display = "none";
        loginButtontext.style.display = "block";
      });
  }
});
