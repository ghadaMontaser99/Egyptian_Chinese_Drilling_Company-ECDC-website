using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class LeaderShipVisitsAndQHSEDaily : ISoftDeleteRepository
    {
        public int Id { get; set; }

        [ForeignKey("LeadershipVisit")]
        public int LeadershipVisitId { get; set; }
        public virtual LeadershipVisit LeadershipVisit { get; set; }

        [ForeignKey("QHSEDaily")]
        public int QHSEDailyId { get; set; }
        public virtual QHSEDailyReport QHSEDaily { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
