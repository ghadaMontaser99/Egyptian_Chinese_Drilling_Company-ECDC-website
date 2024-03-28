using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace TempProject.DTO
{
	public class DrillTypePrintDTO
    {
        public int Id { get; set; }
        public int RigId { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        public double Duration { get; set; }

        public int DrillTypeId { get; set; }
        public string DrillTypeName { get; set; }
        public TimeSpan TimeInitiated { get; set; }
        public TimeSpan TimeCompleted { get; set; }
        public string DrillScenario { get; set; }
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


        public List<EmergencyResponseTeamMembersDTO> emergencyResponseTeamMembersDTO { get; set; }

        public List<IFormFile>? Images { get; set; }

        public string userID { get; set; }

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
	}
}
