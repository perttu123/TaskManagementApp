using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AspNetBackend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace AspNetBackend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {

        private readonly TaskDbContext _context; // Replace with your actual DbContext
        // private readonly IMemoryCache _cache;

        public TaskController(TaskDbContext context)
        {
            _context = context;
            // _cache = memoryCache;
        }

        [HttpGet("{pageIndex}")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks(int pageIndex = 0, string category = "", string order = "")
        {
            // string cacheKey = $"Tasks_{pageIndex}_{category}";
            // if(!_cache.TryGetValue(cacheKey, out List<TaskModel> cachedTasks))
            // {
            IQueryable<TaskModel> query = _context.Task.Include(task => task.Tag).Include(task => task.Status);

            switch (category)
            {
                case "sport":
                    query = query.Where(t => t.TagId == 1);
                    break;
                case "course":
                    query = query.Where(t => t.TagId == 2);
                    break;
                // Handle other categories if needed
                default:
                    break;
            }
            switch(order){
                case "newest":
                     query = query.OrderBy(t => t.StartDate);
                break;
                case "oldest":
                    query = query.OrderByDescending(t => t.StartDate);
                break;
                default:
                break;
            }
    
            //switch (order)
            //{
            //    case "newest":
            //        tasks = await _context.Task
            //                .OrderByDescending(t => t.StartDate)
            //                .ToListAsync();
            //        break;
            //    case "oldest":

            //        tasks = await _context.Task.ToListAsync();
            //        break;
            //    default:
            //        break;
            //}
            List<TaskModel> tasks = await query.ToListAsync();
            List<TaskModel> sixItems = new List<TaskModel>();
                var startIndex = pageIndex * 6;
                int count = 0;

                for (int i = startIndex; i < tasks.Count; i++)
                {
                    if (count < 6)
                    {
                        sixItems.Add(tasks[i]);
                    }
                    count++;
                }
                //return Ok(new { sixItems, tasks.Count });
                // _cache.Set(cacheKey, sixItems, TimeSpan.FromMinutes(1));

                // cachedTasks = sixItems;
            // }
            return Ok(new { sixItems, tasks.Count });
        }

        // [HttpGet]
        // private async Task<List<TaskModel>> GetFreshTasksFromDataSource(int pageIndex, string category){

            
        // }

        [HttpGet("stats")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
        {
            List<TaskModel> tasks = new List<TaskModel>();
            tasks = await _context.Task.ToListAsync();

            return Ok(new { data = tasks });
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<TaskModel>>> PostTask(TaskModel task)
        {
            try
            {   
         
        task.Name = null;
        task.Content = null;
        task.StartDate = DateTime.UtcNow;
        task.EndDate = null;
        task.TagId = 1; // Assuming TagId is nullable
        task.StatusId = 1; // Assuming StatusId is nullable
        task.Tag = null;
        task.Status = null;

                _context.Task.Add(task);
                await _context.SaveChangesAsync();
                return Ok(new { id=task.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> UpdateTask(TaskModel task, int id)
        {
            try
            {
                var existingTask = await _context.Task.Where(item=>item.Id == id).FirstOrDefaultAsync();

                if (existingTask == null)
                {
                    return NotFound();
                }
                existingTask.Name = task.Name;
                existingTask.Content = task.Content;
                existingTask.StartDate = task.StartDate;
                existingTask.EndDate = task.EndDate;
                existingTask.TagId = task.TagId;
                existingTask.StatusId = task.StatusId;
                _context.Task.Update(existingTask);
                await _context.SaveChangesAsync();
                return Ok(existingTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> DeleteTask(int id){
            var taskFound = await _context.Task.FirstOrDefaultAsync(item => item.Id == id);

            if (taskFound == null)
            {
                return NotFound(); // Return 404 Not Found if task with given id is not found
            }

            _context.Task.Remove(taskFound);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("Status/{id}")]
        public async Task<ActionResult<IEnumerable<TaskModel>>> UpdateTask(int id, int status)
        {
            try
            {
                var existingTask = await _context.Task.Where(item=>item.Id == id).FirstOrDefaultAsync();

                if (existingTask == null)
                {
                    return NotFound();
                }
                
                existingTask.StatusId = status;
                _context.Task.Update(existingTask);
                await _context.SaveChangesAsync();
                return Ok(existingTask);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
                throw;
            }
        }
    }
}
