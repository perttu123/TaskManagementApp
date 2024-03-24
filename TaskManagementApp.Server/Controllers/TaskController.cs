using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AspNetBackend.Models;
using Microsoft.EntityFrameworkCore;


namespace AspNetBackend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {

        private readonly TaskDbContext _context; // Replace with your actual DbContext

        public TaskController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpGet("{pageIndex}")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks(int pageIndex = 0, string category = "")
        {
            List<TaskModel> tasks = new List<TaskModel>();
            if (category==""){
                tasks = await _context.Task.ToListAsync();
            }
            else if(category=="newest"){
                tasks = await _context.Task
                        .OrderByDescending(t => t.StartDate)
                        .ToListAsync();
            }
            else if(category=="oldest"){
                tasks = await _context.Task.ToListAsync();
            }
          
            
            List<TaskModel> sixItems = new List<TaskModel>();
            var startIndex = pageIndex * 6;
            int count = 0;
            
            for (int i = startIndex; i < tasks.Count; i++)
            {
               if(count<6){
                sixItems.Add(tasks[i]);
               }
                count++;
            }
            return Ok(new{ sixItems, tasks.Count});
        }

        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetTasks()
        {
          
            return Ok(new{data= "hello world"});
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<TaskModel>>> PostTask(TaskModel task)
        {
            try
            {
                _context.Task.Add(task);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                throw;
            }
        }
    }
}
