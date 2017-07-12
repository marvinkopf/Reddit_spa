import { ApplicationUser } from './applicationUser';
import { Subreddit } from "./subreddit";

export class Post {
    postId: number;
    created;
    creator: ApplicationUser;
    title: string;
    uri: string;
    uriToImage: string;
    subreddit: Subreddit;
    score: number;
}