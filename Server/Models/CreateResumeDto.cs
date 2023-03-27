using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class CreateResumeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string FullName { get; set; } 
        public string UrlId { get; set; } 
        public int UserId { get; set; } 
        public string JobTitle { get; set; } 
        public string Location { get; set; } 
        public string Phone { get; set; } 
        public string About { get; set; }
        public string LinkedinUrl { get; set; }
        public string EmailAddress { get; set; }

    }
}
