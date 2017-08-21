import { ApplicationUser } from './applicationUser';
import { Subreddit } from "./subreddit";

export class Post {
    postId: number;
    created: number;
    creator: ApplicationUser;
    title: string;
    link: string;
    urlToImage: string;
    subreddit: Subreddit;
    score: number;
}