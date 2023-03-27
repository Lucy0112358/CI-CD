using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace api.Entities
{
    public class Resume
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(20)]

        public string Name { get; set; }
        [StringLength(100)]
        public string About { get; set; }
        public string LinkedinUrl { get; set; }
        [StringLength(20)]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }
        [Required]
        public int UserId { get; set; }

        public string UrlId { get; set; }
        [Required]
        public string FullName { get; set; }

        public string JobTitle { get; set; }

        public string Location { get; set; }
        [Required(ErrorMessage = "Mobile Number is required.")]
        [RegularExpression("^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number.")]

        public string Phone { get; set; }

        public ICollection<Experience> Experiances { get; set; }

        public ICollection<Education> Educations { get; set; }

        public ICollection<Language> Languages { get; set; }


        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
