using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class PotentialHazardDTO
    {

		public int Id { get; set; }
	
		public int RigId { get; set; }

		[Column(TypeName = "date")]
		public DateTime Date { get; set; }

		[Column(TypeName = "date")]
		public DateTime PR_IssueDate { get; set; }

		public int PR_No { get; set; }
		public int PO_No { get; set; }

		public int ResponibilityId { get; set; }
		public string Status { get; set; }
		public string Description { get; set; }
		public string NeededAction { get; set; }
		public string Title { get; set; }

		//public List<string>? Images { get; set; }

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }
		public string userID { get; set; }
		//public IFormFileCollection? ImageOfHazard { get; set; }
		public List<IFormFile>? Images { get; set; }

	}
}
