using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Repository;

namespace TempProject.Models
{
    public class PPE:ISoftDeleteRepository
    {

        public int Id { get; set; }

        public string Name { get; set; }

        

        public virtual List<PPEAndPPEReceiving> PPEAndPPEReceiving { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
