using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
	public class QHSEPositionName: ISoftDeleteRepository
    {
		public int Id { get; set; }
		[ForeignKey("EmpCode")]
		public int EmpCodeId { get; set; }
		public virtual EmpCode EmpCode { get; set; }

		[ForeignKey("QHSEPosition")]
		public int PositionId { get; set; }
		public virtual QHSEPosition QHSEPosition { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
        public virtual List<Accident> Accidents { get; set; }

	}
}
