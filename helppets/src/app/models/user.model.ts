export class User{
  constructor(
    public _id: String,
    public nameUser:String,
    public lastNameUser: String,
    public nickName: String,
    public ageUser: String,
    public email: String,
    public picture: String,
    public password: String,
    public password1: String,
    public password2: String,
    public type: String,

    public  nameOrg: String,
    public  pictureOrg: String,
    public  direction: String,

    ){}
}
