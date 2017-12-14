export class shopModel {
    _id: String;
    name: String;
    name_eng: String;
    detail: String;
    address: Array<addressModel>;
    tel: String;
    email: String;
    facebook: String;
    line: String;
    promoteimage: Array<any>
    coverimage: String;
    isactiveshop: String;
    issendmail: String;
    importform: String;
    times: Array<timeModel>;

}
export class addressModel {
    addressdetail: String;
    address: String;
    subdistinct: String;
    distinct: String;
    province: String;
    postcode: Number;
    lat: String;
    lng: String;
}
export class itemsModel {
    cate: Array<cateModel>
    products: Array<productsModel>
}
export class cateModel {
    _id: String;
    name: String;
    image: String;
}

export class productsModel {
    _id: String;
    name: String;
    image: String;
    price: Number;
}
export class timeModel{
    description: String;
    timestart: String;
    timeend: String;
    days: Array<any>;
}