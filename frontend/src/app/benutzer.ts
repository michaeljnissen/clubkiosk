export class Benutzer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_required: Boolean;
    balance: number;

    constructor (id: number, firstname: string, lastname: string, email: string, password_required: boolean)
    {
        this.id = id;
        this.firstname = name;
        this.lastname = lastname;
        this.email = email;
        this.password_required = password_required;
    }
}
