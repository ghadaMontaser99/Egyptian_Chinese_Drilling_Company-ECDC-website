using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using TempProject.Models;

namespace TempProject.DTO
{
    public class AddPPEReceivingDTO
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

        public int RigId { get; set; }

        public string userID { get; set; }

        public string ThermalCoverallsSize { get; set; }
        public string SafetyBootsSize { get; set; }
        public string NormalCoverallsSize { get; set; }
        public  List<PPEDTO> PPEDTO { get; set; }
       

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

    }
}
