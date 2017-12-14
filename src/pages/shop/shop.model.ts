export class shopModel {
    _id: string;
    name: string;
    name_eng: string;
    detail: string;
    address: Array<addressModel>;
    tel: string;
    email: string;
    facebook: string;
    line: string;
    promoteimage: Array<any>
    coverimage: string;
    isactiveshop: string;
    issendmail: string;
    importform: string;
    times: Array<timeModel>;

}
export class addressModel {
    addressdetail: string;
    address: string;
    subdistinct: string;
    distinct: string;
    province: string;
    postcode: Number;
    lat: string;
    lng: string;
}
export class itemsModel {
    cate: Array<cateModel>
    products: Array<productsModel>
}
export class cateModel {
    _id: string;
    name: string;
    image: string;
}

export class productsModel {
    _id: string;
    name: string;
    image: string;
    price: Number;
}
export class timeModel{
    description: string;
    timestart: string;
    timeend: string;
    days: Array<any>;
}