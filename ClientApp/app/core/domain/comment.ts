import { ApplicationUser } from './applicationUser';

export class Comment {
    commentId: number;
    text: string;
    creator: ApplicationUser;
    score: number;
    created: number;
    parentId?: number;
    parent: Comment;
    children: Comment[];
    postId: number;
}