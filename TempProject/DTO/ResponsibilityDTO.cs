using System.ComponentModel;

namespace TempProject.DTO
{
    public class ResponsibilityDTO
	{
        public int id { get; set; }

        public string Name { get; set; }

		[DefaultValue(false)]
		public bool IsDeleted { get; set; }

	}
}
