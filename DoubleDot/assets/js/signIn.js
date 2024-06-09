import Validation from "./Validation.js";

const email = document.querySelector("#email");
const loginButton = document.querySelector(".login-button");
const ps = document.querySelector("#password");
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
  const validation = new Validation(emailValue, psValue);
  const [nodeEmailErr, nodePsErr] = inputError;
  validation.showwErr(nodeEmailErr, validation.error.email);
  validation.showwErr(nodePsErr, validation.error.password);
  if (isEmpty(validation.error)) {
    let isSuccess = false;
    loginButton.style.pointerEvents = "none";
    loader.style.display = "block";
    loginButtontext.style.display = "none";

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(emailValue, psValue)
          .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            successMessage.style.display = "block";
            window.location.href = "../html/admin.html";
            setTimeout(() => {
              successMessage.style.display = "none";
            }, 5000);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage1 = error.message;
            errorMessage.textContent = errorMessage1;
            console.log(errorCode);
            if (errorCode === "auth/internal-error") {
              errorMessage.textContent = "thông tin sai";
            } else if (errorCode === "auth/too-many-request") {
              errorMessage.textContent = "xử lí nhiều yêu cầu";
            } else if (errorMessage1) {
              errorMessage.textContent = errorMessage1;
            }
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
      });
  }
});
