using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using TempProject.Models;

namespace TempProject.DTO
{
    public class EmergencyResponseTeamMembersDTO
    {
        public int Id { get; set; }


        public int TeamMemberCode { get; set; } = 0;
        public string TeamMemberPosition { get; set; } 
        public string TeamMemberName { get; set; }

        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
    }
}
