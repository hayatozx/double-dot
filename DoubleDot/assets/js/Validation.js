class Validation {
  constructor(email, password, confirmPw) {
    this.email = email;
    this.password = password;
    this.confirmPw = confirmPw;
    this.error = {};
    this.isPassword();
    this.isEmail();
  }
  isEmail() {
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexEmail.test(this.email)) {
      this.error.email = "bạn vui lòng nhập email";
    }
  }
  isPassword() {
    // const regexPassword =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!regexPassword.test(tis.p h9)assword)) {
    //   this.error.password = "Vui lòng nhập mk";
    // }
    if (this.password.length < 1) {
      this.error.password = " bạn nhập đúng định dạng mk";
    }
  }
  isconfirmPw() {
    if (this.confirmPw === "") {
      this.error.confirm = "ban vui long xac thuc lai mk";
    }
    if (this.confirmPw !== this.password) {
      this.error.confirm = "Bạn nhập ko khớp password";
    }
  }

  showwErr(node, err) {
    console.log(node);
    node.textContent = err;
    node.style.visibility = err ? "visible" : "hidden";
    node.parentNode.className = err ? "form-control has-error" : "form-control";

    // node.parentNode.classList.add("has-error");
  }
  // hideErr(node, err) {
  //   node.textContent = err;
  //   node.style.visibility = "hidden";
  //   node.parentNode.classList.remove("has-error");
  // }
}

export default Validation;

// const lan1 = new validation("lan1@gmail.com", "123456Hh!", "hăuiwuuiwwiu");
// console.log(lan1.isEmail());
// console.log(lan1.isPassword());
// console.log(lan1.isconfirmPw());
// const lan2 = new validation("lan1@gmail.com", "abcxyz", "123456");
// console.log(lan2.isPassword());
