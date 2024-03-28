using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempProject.DTO.ResponseDTO
{
    public class AccidentResponseDTO
    {
        public int id { get; set; }
        public int Rig { get; set; }
        public TimeSpan TimeOfEvent { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateOfEvent { get; set; }
        public string TypeOfInjury { get; set; }
        public string ViolationCategory { get; set; }
        public string AccidentCauses { get; set; }
        public string PreventionCategory { get; set; }
        public string ClassificationOfAccident { get; set; }
        public string AccidentLocation { get; set; }
		public int QHSEEmpCode { get; set; }
		public string QHSEPositionName { get; set; }
		public string QHSEEmpName { get; set; }

		public int PusherCode { get; set; }
		public string PusherPositionName { get; set; }
		public string PusherName { get; set; }
		public int DrillerCode { get; set; }
		public string DrillerPositionName { get; set; }
		public string DrillerName { get; set; }

		public int InjuredPersonCode { get; set; }
		public string InjuredPersonPositionName { get; set; }
		public string InjuredPersonName { get; set; }

		public string DescriptionOfTheEvent { get; set; }
        public string ImmediateActionType { get; set; }
        public string DirectCauses { get; set; }
        public string RootCauses { get; set; }
        public string Recommendations { get; set; }
        public string userName { get; set; }
        public List<string> Images { get; set; } = new List<string>();

    }
}
