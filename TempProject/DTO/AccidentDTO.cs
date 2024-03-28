using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class AccidentDTO
    {
		public int id { get; set; }
		
		public int RigId { get; set; }
	
		public TimeSpan TimeOfEvent { get; set; }

		[Column(TypeName = "date")]
		public DateTime DateOfEvent { get; set; }
	
		public int TypeOfInjuryID { get; set; }
		public int ViolationCategoryId { get; set; }
		
		public int AccidentCausesId { get; set; }
	
		public int PreventionCategoryId { get; set; }
		
		public int ClassificationOfAccidentId { get; set; }
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
		public string? Pictures { get; set; }
		public string userID { get; set; }
		public List<IFormFile>? Images { get; set; }
		public List<string> Imagess { get; set; } = new List<string>();
    }
}
