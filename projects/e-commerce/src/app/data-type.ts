export interface SignUp{
    fname:string,
    lname:string,
    username:string,
    email:string,
    mobile:number,
    password:string
}

export interface Login{
    email:String,
    password:String
}

export interface product{
    id:number,
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    imgurl:string,
    productId:undefined|number;
    quantity:undefined|number;
}

export interface userSignup{
    fname:string,
    lname:string,
    email:string,
    mobile:number,
    password:string
}

export interface ULogin{
    email:String,
    password:String
}

export interface priceSummary{
    price:number,
    discount:number,
    tex:number,
    delivery:number,
    total:number
}


export interface Cart{
    id:undefined|number,
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    imgurl:string,
    quantity:undefined|number;
    userId:number,
    productId:number
}

export interface Order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    pin:number,
    userId:number,
    id:undefined|number
}