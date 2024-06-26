using System.ComponentModel.DataAnnotations;

namespace AspNetBackend.Models
{
    public class TaskModel
    {
        [Key]
        
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Content { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? TagId { get; set; }
        public int? StatusId { get; set; }
        public TagModel? Tag { get; set; }
        public StatusModel? Status { get; set; }
    }
    public class TagModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Theme { get; set; }
    }
    public class StatusModel
    {
        [Key]
        public int Id { get;set; }
        public string Name { get; set; }
        public int Theme { get; set; }
    }
}

