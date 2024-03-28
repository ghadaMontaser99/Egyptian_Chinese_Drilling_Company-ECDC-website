using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempProject.DTO.ResponseDTO
{
    public class EmpCodeExcelDTO
	{
		public int Id { get; set; }
		public int Code { get; set; }
		public string Name { get; set; }
		public string Position { get; set; }
		public string Rig { get; set; }


	}
}
