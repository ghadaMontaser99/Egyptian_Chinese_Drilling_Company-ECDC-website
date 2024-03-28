using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO.ResponseDTO
{
    public class PotentialHazardResponseDTO
	{
		public int Id { get; set; }
	
		public int RigId { get; set; }

		[Column(TypeName = "date")]
		public DateTime Date { get; set; }

		[Column(TypeName = "date")]
		public DateTime PR_IssueDate { get; set; }

		public int PR_No { get; set; }
		public int PO_No { get; set; }

		public string ResponibilityName { get; set; }
		public string Status { get; set; }
		public string Description { get; set; }
		public string NeededAction { get; set; }
		public string Title { get; set; }
		public int ResponsibilityId { get; set; }

		//public List<HazardImages> Images { get; set; } = new List<HazardImages>();
		public List<string> Images { get; set; }= new List<string>();

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
		public string userID { get; set; }
		public string userName { get; set; }


	}
}
