using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class PPEAndPPEReceiving: ISoftDeleteRepository
    {
        public int Id { get; set; }
    
       

        [ForeignKey("PPE")]
        public int PPEId { get; set; }
        public virtual PPE PPE { get; set; }

        [ForeignKey("PPEReceiving")]
        public int PPEReceivingId { get; set; }
        public virtual PPEReceiving PPEReceiving { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
