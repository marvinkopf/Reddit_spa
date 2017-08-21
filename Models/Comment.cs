using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using System;

namespace Reddit.Models
{
    public class Comment
    {
        public int CommentId { get; set; }

        public string Txt { get; set; }

        public string CreatorId { get; set; }

        public ApplicationUser Creator { get; set; }

        public DateTime Created { get; set; }

        public int PostId { get; set; }

        public Post Post { get; set; }

        public int Score { get; set; }

        public int? ParentId { get; set; }

        public Comment Parent { get; set; }
    }
}
