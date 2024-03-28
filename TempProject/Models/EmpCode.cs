using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
	public class EmpCode : ISoftDeleteRepository
	{
		public int Id { get; set; }
		public int Code { get; set; }
		public string Name { get; set; }
		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

		[ForeignKey("Positions")]
		public int PositionId { get; set; }
		public virtual Positions Positions { get; set; }

        [ForeignKey("Rig")]
        public int RigId { get; set; }

        public virtual Rig Rig { get; set; }


    }
}
