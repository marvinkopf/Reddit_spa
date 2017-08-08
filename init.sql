CREATE TABLE "AspNetRoles" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_AspNetRoles" PRIMARY KEY,
    "ConcurrencyStamp" TEXT,
    "Name" TEXT,
    "NormalizedName" TEXT
);
CREATE TABLE "AspNetUserTokens" (
    "UserId" TEXT NOT NULL,
    "LoginProvider" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Value" TEXT,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name")
);
CREATE TABLE "AspNetUsers" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_AspNetUsers" PRIMARY KEY,
    "AccessFailedCount" INTEGER NOT NULL,
    "ConcurrencyStamp" TEXT,
    "Email" TEXT,
    "EmailConfirmed" INTEGER NOT NULL,
    "LockoutEnabled" INTEGER NOT NULL,
    "LockoutEnd" TEXT,
    "NormalizedEmail" TEXT,
    "NormalizedUserName" TEXT,
    "PasswordHash" TEXT,
    "PhoneNumber" TEXT,
    "PhoneNumberConfirmed" INTEGER NOT NULL,
    "SecurityStamp" TEXT,
    "TwoFactorEnabled" INTEGER NOT NULL,
    "UserName" TEXT
);
CREATE TABLE "AspNetRoleClaims" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY AUTOINCREMENT,
    "ClaimType" TEXT,
    "ClaimValue" TEXT,
    "RoleId" TEXT NOT NULL,
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE
);
CREATE TABLE "AspNetUserClaims" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY AUTOINCREMENT,
    "ClaimType" TEXT,
    "ClaimValue" TEXT,
    "UserId" TEXT NOT NULL,
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);
CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" TEXT NOT NULL,
    "ProviderKey" TEXT NOT NULL,
    "ProviderDisplayName" TEXT,
    "UserId" TEXT NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);
CREATE TABLE "AspNetUserRoles" (
    "UserId" TEXT NOT NULL,
    "RoleId" TEXT NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);
CREATE INDEX "RoleNameIndex" ON "AspNetRoles" ("NormalizedName");
CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" ("RoleId");
CREATE INDEX "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" ("UserId");
CREATE INDEX "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" ("UserId");
CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" ("RoleId");
CREATE INDEX "IX_AspNetUserRoles_UserId" ON "AspNetUserRoles" ("UserId");
CREATE INDEX "EmailIndex" ON "AspNetUsers" ("NormalizedEmail");
CREATE INDEX "UserNameIndex" ON "AspNetUsers" ("NormalizedUserName");
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
    sidebartext TEXT,
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
