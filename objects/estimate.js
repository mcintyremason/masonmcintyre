'use strict';

module.exports = class Estimate {
  constructor(key, firstName, lastName, email, phoneNumber, address, comments){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.comments = comments;
  }

  get JSON() {
    return JSON.stringify({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      address: this.address,
      comments: this.comments
    });
  }

  static fromJSON(json){
    var data = JSON.parse(json);
    var estimate = new Estimate(data.firstName, data.lastName, data.email, data.phoneNumber, data.address, data.comments);
    return estimate;
  }
};
