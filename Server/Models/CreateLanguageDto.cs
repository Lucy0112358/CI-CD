using api.Entities;

namespace api.Models
{
    public class CreateLanguageDto
    {
        public int ResumeId { get; set; }
        public string Name { get; set; }
        public string SpokenLevel { get; set; }
        public string WrittenLevel { get; set; }
    }
}
