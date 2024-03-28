using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class PPEAndPPEReceivingDTO
    {
        public int Id { get; set; }

        public int PPEId { get; set; }
   
        public int PPEReceivingId { get; set; }
      
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
