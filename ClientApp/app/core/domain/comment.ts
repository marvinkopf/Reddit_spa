import { ApplicationUser } from './applicationUser';

export class Comment {
    commentId: number;
    txt: string;
    creator: ApplicationUser;
    score: number;
    created: number;
    parentId?: number;
    parent: Comment;
    children: Comment[];
    postId: number;
}