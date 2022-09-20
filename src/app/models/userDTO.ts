export class user {
    sharedKey:  string;
    bussinesId: string;
    email:      string;
    phone:      number;
    dataAdded:  Date;

    constructor() {
        this.sharedKey = '';
        this.bussinesId = '';
        this.email = '';
        this.phone = 0;
        this.dataAdded = new Date();
    }
}
