using System.Text.Json.Serialization;

namespace api.Entities
{
    public class Language
    {
        public int Id { get; set; }
        public int ResumeId { get; set; }
   
        public Resume Resume { get; set; }
        public string Name { get; set; }
        public string SpokenLevel { get; set; }
        public string WrittenLevel { get; set; }
    }
}