using System.ComponentModel.DataAnnotations;
using api.Entities;



namespace api.Models
{
    public class CreateEducationDto
    {
        public int ResumeId { get; set; }
        public bool IsStillStudiengHere { get; set; }
        public string FacilityName { get; set; }
        public string EducationTitle { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]

        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime EndDate { get; set; }
    }
}
