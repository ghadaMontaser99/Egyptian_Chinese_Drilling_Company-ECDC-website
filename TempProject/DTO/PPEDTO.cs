using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class PPEDTO
	{
        public int Id { get; set; }

        public string Name { get; set; }

 
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

    }
}
