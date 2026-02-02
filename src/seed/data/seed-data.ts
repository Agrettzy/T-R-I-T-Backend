import * as bcrypt from 'bcrypt';

interface SeedUser {
    email: string;
    fullName: string;
    password: string;
    accountKey: string;
    balance: string;
    roles: string[];
}


interface SeedData {
    users: SeedUser[];
}


export const initialData: SeedData = {

    users: [
        {
            email: 'osw@cobble.com',
            fullName: 'Oswald Cobblepot',
            password: bcrypt.hashSync('Abc123', 10),
            accountKey: '9872936215',
            balance: '1000000',
            roles: ['admin']
        },
        {
            email: 'harley@queen.com',
            fullName: 'Harley Queen',
            password: bcrypt.hashSync('Abc123', 10),
            accountKey: '8586476662',
            balance: '90000',
            roles: ['user']
        },
        {
            email: 'ras@ghul.com',
            fullName: 'Ras al Ghul',
            password: bcrypt.hashSync('Abc123', 10),
            accountKey: '6348987255',
            balance: '60000',
            roles: ['user']
        },
        {
            email: 'ive@poison.com',
            fullName: 'Poison Ivy',
            password: bcrypt.hashSync('Abc123', 10),
            accountKey: '5544722525',
            balance: '150000',
            roles: ['user']
        }
    ],
}