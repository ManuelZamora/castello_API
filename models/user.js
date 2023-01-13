class User {
    constructor(id, firstName, lastName, noHome, address, phone, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.noHome = noHome;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;