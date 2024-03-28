using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using TempProject.Repository;

namespace TempProject.Models
{
    public class Drill : ISoftDeleteRepository
    {
        public int Id { get; set; }

        [ForeignKey("Rig")]
        public int RigId { get; set; }
        public virtual Rig Rig { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }


        public string Duration { get; set; }

        [ForeignKey("DrillType")]
        public int DrillTypeId { get; set; }
        public virtual DrillType DrillType { get; set; }

        public TimeSpan TimeInitiated { get; set; }
        public TimeSpan TimeCompleted { get; set; }

        public string DrillScenario { get; set; }
        //public string EmergencyResponseTeamMembers { get; set; }


        public string EmergencyEquipmentUsed { get; set; }
        public string EffectivenessPoints { get; set; }
        public string DeficienciesPoints { get; set; }
        public string Recommendations { get; set; }

        public int STPCode { get; set; }
        public string STPPositionName { get; set; }
        public string STPName { get; set; }

        public int QHSEEmpCode { get; set; }
        public string QHSEPositionName { get; set; }
        public string QHSEEmpName { get; set; }

        public virtual List<DrillImages> Images { get; set; } = new List<DrillImages>();

        public virtual List<EmergencyResponseTeamMembers>? emergencyResponseTeamMembers { get; set; }

        [ForeignKey("user")]
        public string userID { get; set; }

        public virtual IdentityUser user { get; set; }
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }


    }
}
