export class Contact {
    id: number = 0;
    name: string = '';
    username: string = '';
    email: string = '';
    address: Address = new Address();
    phone: string = '';
    website: string = '';
    company: Company = new Company();
    selected: boolean = false;
}

export class Address {
    street: string = '';
    suite: string = '';
    city: string = '';
    zipcode: string = '';
    geo: Geo = new Geo();
}

export class Geo {
    lat: number = 0;
    lng: number = 0;
}

export class Company {
    name: string = '';
    catchPhrase: string = '';
    bs: string = '';
}