using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit.Data;
using Reddit.Models;

namespace Reddit.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IEnumerable<Post> Top()
        {
            return _context.Posts.Include(p => p.Creator).Take(30);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
