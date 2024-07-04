const bcrypt = require("bcrypt");

const password = "abc";

const hashed = bcrypt.hashSync(password, "$2b$10$RCjbHuxTllXyrM4zKQqN6O");

console.log(hashed);

//$2b$12$cmz.M8IljqUSN/EAjheBh.UZy5aQQdfdbWa5vWiotIBBjMJW9O8dC
//$2b$12$XSEzmfHFYi6UsHOJ4ljin.pAc8fgR8pGIvKrpgwzVXRenKPlzhL/K

//random salt:
//$2b$10$RCjbHuxTllXyrM4zKQqN6O
//$2b$10$RCjbHuxTllXyrM4zKQqN6Olwfge8AklMYX.h7FBUrD97AzoTx07Ym
//$2b$10$RCjbHuxTllXyrM4zKQqN6Olwfge8AklMYX.h7FBUrD97AzoTx07Ym

//$2b$10$RCjbHuxTllXyrM4zKQqN6O
//$2b$12$aDjlZGirI.9IREuQaRKwquvdkIdvZoXE/WIVCd/j4klbOLYRRbqj2
//$2b$12$aDjlZGirI.9IREuQaRKwquvdkIdvZoXE/WIVCd/j4klbOLYRRbqj2
