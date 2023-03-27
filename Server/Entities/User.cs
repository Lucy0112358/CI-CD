using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
       
        public string UserName { get; set; }
        
        public string Password { get; set; }
        public string? ImageName { get; set; }
    }
    
}
