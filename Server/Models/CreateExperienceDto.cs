using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using api.Entities;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class CreateExperienceDto
    {

        public bool IsStillWorkingHere { get; set; } 
        public string Role { get; set; } 
        public string OrganisationName { get; set; } 
        public string Description { get; set; } 
        public string Responsibilities { get; set; } 
        public int? ResumeId { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]

        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime EndDate { get; set; }


    }
}
