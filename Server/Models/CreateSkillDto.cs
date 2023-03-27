namespace api.Models
{
    public class CreateSkillDto
    {
        public string Name { get; set; } 
        public int Level { get; set; } 
        public int? ExperianceId { get; set; } 
    }
}
