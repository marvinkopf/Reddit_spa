using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Reddit.Models;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Reddit.Data;
using Microsoft.AspNetCore.Identity;

namespace Reddit.Controllers
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<ApplicationUser> _manager;

        public PostController(ApplicationDbContext context, UserManager<ApplicationUser> manager)
        {
            _context = context;
            _manager = manager;
        }

        [HttpGet("{id:int}", Name = "GetPost")]
        public IActionResult Get(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.PostId == id);
            return post != null ? (IActionResult)Ok(post) : NotFound();
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(int id, [FromBody]Post post)
        {
            if (id != post.PostId)
                return BadRequest();

            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Post post)
        {
            string title = post.Title;
            string link = post.Link;
            string subreddit = post.Subreddit;
            string urlToImage = post.UrlToImage;

            if (String.IsNullOrWhiteSpace(subreddit))
            {
                this.Response.StatusCode = 409;
                return this.Content("No subreddit given");
            }

            if (false /*!_context.Subreddits.Any(s => s.Name == subreddit)*/)
            {
                this.Response.StatusCode = 409;
                return this.Content("Subreddit doesn't exist");
            }

            if (String.IsNullOrWhiteSpace(title))
            {
                this.Response.StatusCode = 409;
                return this.Content("No title given");
            }

            // TODO Should be a valid link/domain, too
            if (String.IsNullOrWhiteSpace(link))
            {
                this.Response.StatusCode = 409;
                return this.Content("No valid link");
            }

            post = new Post() {
                Title = title,
                Link = link,
                Subreddit = subreddit,
                Created = DateTime.Now,
                UrlToImage = urlToImage,
                CreatorId = _manager.GetUserId(HttpContext.User)
            };

            _context.Posts.Add(post);
            _context.SaveChanges();

            return CreatedAtRoute("GetPost", new { id = post.PostId }, post);
        }
    }
}
