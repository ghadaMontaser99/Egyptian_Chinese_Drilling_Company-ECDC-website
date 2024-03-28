using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempProject.DTO.ResponseDTO
{
    public class PotentialHazardExcelDTO
    {
        public int id { get; set; }
        public int Rig { get; set; }
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
		[Column(TypeName = "date")]
		public DateTime PR_IssueDate { get; set; }

		public int PR_No { get; set; }
		public int PO_No { get; set; }
		public string userName { get; set; }

		public string Responibility { get; set; }
		public string Status { get; set; }
		public string Description { get; set; }
		public string NeededAction { get; set; }
		public string Title { get; set; }
		public List<string> images { get; set; }=new List<string>();


	}
}
