using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class EmployeeCompetencyEvaluation : ISoftDeleteRepository
    {
        public int Id {  get; set; }
        
		[ForeignKey("Rig")]
        public int RigId { get; set; }
        
		public virtual Rig Rig { get; set; }
        

        [Column(TypeName = "date")]
        public DateTime Date { get; set;}
	
		
		[ForeignKey("Subjectlist")]
		public int SubjectId { get; set; }
		
		public virtual SubjectList Subjectlist { get; set; }
				
		public int QHSEEmpCode { get; set; }
		public string QHSEPositionName { get; set; }
		public string QHSEEmpName { get; set; }

		public int EmployeeCode { get; set; }
		public string EmployeePositionName { get; set; }
		public string EmployeeName { get; set; }

		public string Description { get; set; }
		
		[ForeignKey("user")]
		public string userID { get; set; }
		
		public virtual IdentityUser user { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

    }
}
