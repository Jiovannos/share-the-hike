export interface IPost {
  userName: String;
  _id: String;
  title: string;
  body: string;
  likes: string[];
  doesUserLike: boolean;
}

export interface IPostCard {
  userName: String;
  _id: String;
  title: string;
  body: string;
  nrOfLikes: number;
  doesUserLike: Boolean;
}
