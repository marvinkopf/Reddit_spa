using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using System;

namespace Reddit.Models
{
    public class Post
    {
        public int PostId { get; set; }

        public string Title { get; set; }

        public string CreatorId { get; set; }

        public DateTime Created { get; set; }

        public string Link { get; set; }

        public int Score { get; set; }

        public string Subreddit { get; set; }

        public string UrlToImage { get; set; }
    }
}
