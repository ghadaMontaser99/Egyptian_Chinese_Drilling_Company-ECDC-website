using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class Accident : ISoftDeleteRepository
    {
        public int Id {  get; set; }
        
		[ForeignKey("Rig")]
        public int RigId { get; set; }
        
		public virtual Rig Rig { get; set; }
        
		public TimeSpan TimeOfEvent { get; set;}

        [Column(TypeName = "date")]
        public DateTime DateOfEvent { get; set;}
		
		[ForeignKey("TypeOfInjury")]
		public int TypeOfInjuryID { get; set; }
		
		public virtual TypeOfInjury TypeOfInjury { get; set; }
		[ForeignKey("ViolationCategory")]
		public int ViolationCategoryId { get; set; }
		
		public virtual ViolationCategory ViolationCategory  { get; set; }
		
		[ForeignKey("AccidentCauses")]
		public int AccidentCausesId { get; set; }
		
		public virtual AccidentCauses AccidentCauses { get; set; }
		
		[ForeignKey("PreventionCategory")]
		public int PreventionCategoryId { get; set; }
		
		public virtual PreventionCategory PreventionCategory { get; set; }
		
		[ForeignKey("ClassificationOfAccident")]
		public int ClassificationOfAccidentId { get; set; }
		
		public virtual ClassificationOfAccident ClassificationOfAccident { get; set; }
        
		public string AccidentLocation { get; set;}
		
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
		public string ImmediateActionType { get; set;}
        
		public string DirectCauses { get; set; }
        
		public string RootCauses { get; set;}
        
		public string Recommendations { get; set; }
        

		
		[ForeignKey("user")]
		public string userID { get; set; }
		
		public virtual IdentityUser user { get; set; }
        public virtual List<AccidentImages> Images { get; set; } = new List<AccidentImages>();


        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

    }
}
