export interface IUser {
    _id : string;
    name: string;
    email: string;
    password: string;
    profilePicture : string;
    role: string;
    createdAt : string;
}

export interface Iproduct{
    _id : string,
    name: string,
    description : string, 
    productimage : string,
    price : number,
    stock : number,
    category : string,
    owner : string,
}

export interface Icategory {
    _id? : string,
    name: string,
    description : string,
}

export  interface IfilterProduct {
    minprice: string;
    maxprice: string;
    maxstock: string;
    minstock: string;
    category: string;
    search : string;
}