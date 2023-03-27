using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace api.Entities
{
    public class Experience
    {
        public int Id { get; set; }
        public int? ResumeId { get; set; }

        public Resume Resume { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime EndDate { get; set; }
        public bool IsStillWorkingHere { get; set; }
        public string Role { get; set; }
        public string OrganisationName { get; set; }
        public string Description { get; set; }
        public string Responsibilities { get; set; }
        public ICollection<Skill> Skills { get; set; }

    }
}
