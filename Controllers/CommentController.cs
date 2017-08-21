using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit.Data;
using Reddit.Models;

namespace Reddit.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<ApplicationUser> _manager;
        
        public CommentController(ApplicationDbContext context, UserManager<ApplicationUser> manager)
        {
            _context = context;
            _manager = manager;
        }
        
        [HttpGet("{id:int}", Name = "GetComment")]
        [AllowAnonymous]
        public IActionResult Get(int id) 
        {
            var comment = _context.Comments.Include(c => c.Creator)
                .FirstOrDefault(c => c.CommentId == id);
        
            return comment != null ? (IActionResult)Ok(comment) : NotFound();
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(int id, [FromBody]Comment comment)
        {
            if (id != comment.CommentId)
                return BadRequest();

            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post(string txt, int? postId, int? parentId)
        {
            if (String.IsNullOrWhiteSpace(txt))
            {
                this.Response.StatusCode = 409;
                return this.Content("Text empty");
            }

            if (postId == null)
            {
                this.Response.StatusCode = 409;
                return this.Content("No postid given");
            }

            if (parentId.HasValue && _context.Comments.Find(parentId.Value).PostId != postId)
            {
                this.Response.StatusCode = 409;
                return this.Content("Can't attach comment to parent comment that's on another post");
            }

            var comment = new Comment()
            {
                Txt = txt,
                Created = DateTime.Now,
                CreatorId = (await _manager.GetUserAsync(HttpContext.User)).Id,
                PostId = postId.Value,
                ParentId = parentId
            };

            _context.Comments.Add(comment);
            _context.SaveChanges();
            
            return CreatedAtRoute("GetComment", new { id = comment.CommentId }, comment);
        }
    }
}