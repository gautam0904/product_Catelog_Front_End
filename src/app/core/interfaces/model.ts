export interface IUser {
    _id : string;
    name: string;
    email: string;
    password: string;
    profilepic : string;
    role: string;
    createdAt : string;
}

export interface Iproduct{
    id? : string,
    name: string,
    description : string, 
    productimage : string,
    price : number,
    stock : number,
    category : string,
    owner : string,
}

export interface Icategory {
    id? : string,
    name: string,
    description : string,
}