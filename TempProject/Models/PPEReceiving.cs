using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class PPEReceiving : ISoftDeleteRepository
    {
        public int Id { get; set; }

        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        public int EmployeeCode { get; set; }
        public string EmployeePositionName { get; set; }
        public string EmployeeName { get; set; }
        public int QHSEEmpCode { get; set; }
        public string QHSEPositionName { get; set; }
        public string QHSEEmpName { get; set; }
        public string ThermalCoverallsSize { get; set; }
        public string SafetyBootsSize { get; set; }
        public string NormalCoverallsSize { get; set; }

        [ForeignKey("Rig")]
        public int RigId { get; set; }
        public virtual Rig Rig { get; set; }

        [ForeignKey("user")]
        public string userID { get; set; }

        public virtual IdentityUser User { get; set; }
         
        public virtual List<PPEAndPPEReceiving> PPEAndPPEReceiving { get; set; }
        


        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
