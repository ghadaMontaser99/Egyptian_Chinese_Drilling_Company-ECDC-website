using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class EmployeeCompetencyEvaluationtDTO
    {
		public int id { get; set; }
		
		public int RigId { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        public int SubjectId { get; set; }

        public string? SubjectName { get; set; }

        public int QHSEEmpCode { get; set; }
        public string QHSEPositionName { get; set; }
        public string QHSEEmpName { get; set; }

        public int EmployeeCode { get; set; }
        public string EmployeePositionName { get; set; }
        public string EmployeeName { get; set; }

        public string Description { get; set; }
  
        public string userID { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
