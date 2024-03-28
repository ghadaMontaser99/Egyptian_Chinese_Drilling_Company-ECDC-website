using System.ComponentModel;
using TempProject.Repository;

namespace TempProject.Models
{
    public class Client : ISoftDeleteRepository
    {
        public int Id { get; set; }

        public string ClientName { get; set; }
		public virtual List<QHSEDailyReport> QHSEDailyReport { get; set; }


		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
