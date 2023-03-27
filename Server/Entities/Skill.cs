using System.Text.Json.Serialization;

namespace api.Entities
{
    public class Skill
    {
        public int Id { get; set; }
        public int? ExperianceId { get; set; }

        public string Name { get; set; }
        public int Level { get; set; }
        public bool IsTopSkill { get; set; } = false;
        [JsonIgnore]
        public ICollection<Experience> Experience { get; set; }
    }
}
