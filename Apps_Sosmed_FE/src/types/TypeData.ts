export interface ChatUserProps {
  id: number;
  content?: string;
  created_at: string;
  like: number;
  islike: boolean;
  replies: number;
  image?: string;
  author: {
    id: number;
    name: string;
    picture: string;
    username: string;
  };
}

export interface AuthorProps {
  id?: number;
  name: string;
  picture?: string;
  username: string;
  bio?: string;
  cover_photo?: string;
  following?: [];
  follower?: [];
}

export interface DetailProps {
  id: number;
}

export interface IFrom {
  thread?: string | undefined;
  content: string;
  image: File | null;
}

export type Thread = {
  id: number;
  content: string;
  image: string[] | null;
  like: number;
  isLike: boolean;
  replies: number;
  created_at: string;
  author: {
    id: number;
    name: string;
    username: string;
    picture: string | null;
  };
};

export type ThreadOne = {
  id: number;
  content: string;
  image?: any | string[];
  likes: any;
  isLike: boolean;
  replies?: [];
  created_at?: string;
  author: {
    id: number;
    name: string;
    username: string;
    picture: any;
  };
};
