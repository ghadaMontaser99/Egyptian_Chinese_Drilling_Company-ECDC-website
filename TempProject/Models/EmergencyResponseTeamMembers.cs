using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class EmergencyResponseTeamMembers : ISoftDeleteRepository
    {

        public int Id { get; set; }


        public int? TeamMemberCode { get; set; }
        public string TeamMemberPosition { get; set; } 
        public string TeamMemberName { get; set; } 


        [ForeignKey("Drill")]
        public int DrillId { get; set; }
        public virtual Drill Drill { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
