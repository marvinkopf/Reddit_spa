CREATE TABLE posts (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30),
    creatorId TEXT REFERENCES AspNetUsers(Id),
    created DATE,
    link TEXT NOT NULL,
    score UNSIGNED INTEGER(5),
    subreddit VARCHAR(30) REFERENCES subreddits(name),
    urlToImage VARCHAR(55)
);

CREATE TABLE subreddits (
    name VARCHAR(30) PRIMARY KEY,
    description TEXT,
    isPrivate BOOLEAN
);

CREATE TABLE comments (
    commentId INTEGER PRIMARY KEY AUTOINCREMENT,
    txt TEXT,
    creatorId TEXT REFERENCES AspNetUsers(Id),
    created DATE,
    postId INTEGER(5) REFERENCES posts,
    score UNSIGNED INTEGER(5),
    parentId INTEGER(5) REFERENCES comments(commentId)
);

CREATE TABLE user_x_post_upvoted (
    user_x_post_upvotedId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    postId INTEGER
);

CREATE TABLE user_x_post_downvoted (
    user_x_post_downvotedId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    postId INTEGER
);

CREATE TABLE user_x_comment_upvoted (
    user_x_comment_upvotedId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    commentId INTEGER
);

CREATE TABLE user_x_comment_downvoted (
    user_x_comment_downvotedId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    commentId INTEGER
);

CREATE TABLE user_x_subreddit_subscription (
    user_x_subreddit_subscriptionId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    subredditName VARCHAR(55)
);

CREATE TABLE user_x_subreddit_moderator (
    user_x_subreddit_moderatorId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    subredditName VARCHAR(55)
);

CREATE TABLE user_x_subreddit_canView (
    user_x_subreddit_canViewId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(55),
    subredditName VARCHAR(55)
);
