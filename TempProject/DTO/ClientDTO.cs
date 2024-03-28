using System.ComponentModel;

namespace TempProject.DTO
{
    public class ClientDTO
    {
        public int id { get; set; }

		public string ClientName { get; set; }

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }


	}
}
