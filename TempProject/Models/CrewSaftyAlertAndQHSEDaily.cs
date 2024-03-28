using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class CrewSaftyAlertAndQHSEDaily : ISoftDeleteRepository
    {
        public int Id { get; set; }
    
       

        [ForeignKey("Crew")]
        public int CrewId { get; set; }
        public virtual Crew Crew { get; set; }

        [ForeignKey("QHSEDaily")]
        public int QHSEDailyId { get; set; }
        public virtual QHSEDailyReport QHSEDaily { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
