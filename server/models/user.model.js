import uuid from 'uuid';

export class User {
  constructor(email, firstname, lastname, password) {
    this.userId = uuid();
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
  }
}
export const users = [
  new User('irakozeyves@gmail.com', 'irakoze', 'yves', '123456'),
];
