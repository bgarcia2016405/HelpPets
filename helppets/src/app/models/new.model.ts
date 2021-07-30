export class New{
  constructor(
    public _id: String,
    public newsDescription: String,
    public pictures: String,
    public stateNew: String,
    public newDate: String,
    public opinion: {
      si: Number,
      no: Number,
      ninguna: Number,
      usersComment: []
    },
    public commentsList: [{
      commentText: String,
      idUserComment: String
    }],
    public newCreator: String
  ){}
}
