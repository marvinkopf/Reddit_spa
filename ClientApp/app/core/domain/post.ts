import { ApplicationUser } from './applicationUser';

export class Post {
    postId: number;
    created;
    creator: ApplicationUser;
    title: string;
    uri: string;
    uriToImage: string;
    subreddit;
    score: number;
}