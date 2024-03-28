using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO.ResponseDTO
{
    public class PPEReceivingResponseDTO
    {
      
        public int Id { get; set; }

        public int RigId { get; set; }
        public DateTime Date { get; set; }
        public int EmployeeCode { get; set; }
        public string EmployeePositionName { get; set; }
        public string EmployeeName { get; set; }
        public int QHSEEmpCode { get; set; }
        public string QHSEPositionName { get; set; }
        public string QHSEEmpName { get; set; }

        public string UserName { get; set; }

        public string userID { get; set; }
        public string ThermalCoverallsSize { get; set; }
        public string SafetyBootsSize { get; set; }
        public string NormalCoverallsSize { get; set; }

        public  List<PPEAndPPEReceiving> PPE { get; set; }=new List<PPEAndPPEReceiving> { };


        public List<string> PPEs { get; set; }= new List<string>();

      


        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

    }
}
