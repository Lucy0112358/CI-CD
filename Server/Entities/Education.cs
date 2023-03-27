using System.Text.Json.Serialization;

namespace api.Entities
{
    public class Education
    {
        public int Id { get; set; }
        public int ResumeId { get; set; }
  
        public Resume Resume { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsStillStudiengHere { get; set; }
        public string FacilityName { get; set; }
        public string EducationTitle { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
    }
}