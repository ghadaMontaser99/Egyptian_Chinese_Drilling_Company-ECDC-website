using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO.ResponseDTO
{
    public class DrillExcelDTO
    {
        public int Id { get; set; }
        public int RigId { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }

        public string userName { get; set; }

        public string Duration { get; set; }

        public int DrillTypId { get; set; }

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


        public int TeamMemeberCode { get; set; }

        public string TeamMemeberName { get; set; }

        public string TeamMemeberPosition { get; set; }

        public int TeamMemeberCode1 { get; set; }

        public string TeamMemeberName1 { get; set; }

        public string TeamMemeberPosition1 { get; set; }

        public int TeamMemeberCode2 { get; set; }

        public string TeamMemeberName2 { get; set; }

        public string TeamMemeberPosition2 { get; set; }

        public int TeamMemeberCode3 { get; set; }

        public string TeamMemeberName3 { get; set; }

        public string TeamMemeberPosition3 { get; set; }

        public int? TeamMemeberCode4 { get; set; }

        public string? TeamMemeberName4 { get; set; }

        public string? TeamMemeberPosition4 { get; set; }
        public int? TeamMemeberCode5 { get; set; }

        public string? TeamMemeberName5 { get; set; }

        public string? TeamMemeberPosition5 { get; set; }


        public int? TeamMemeberCode6 { get; set; }

        public string? TeamMemeberName6 { get; set; }

        public string? TeamMemeberPosition6 { get; set; }

        public int? TeamMemeberCode7 { get; set; }

        public string? TeamMemeberName7 { get; set; }

        public string? TeamMemeberPosition7 { get; set; }

        public List<string> images { get; set; }=new List<string>();
        //public List<EmergencyResponseTeamMembersDTO> emergencyResponseTeamMembersDTO { get; set; }= new List<EmergencyResponseTeamMembersDTO>();


    }
}
