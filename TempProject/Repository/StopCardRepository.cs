using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class StopCardRepository : IStopCardRepository
    {
        Context c;
        public StopCardRepository(Context c)
        {
            this.c = c;
        }

        public List<StopCardRegister> getall()
        {
            return c.StopCardRegisters
                .Include(s => s.Classification)
                .Include(s => s.TypeOfObservationCategory)
				.Where(a => a.IsDeleted == false)
				.Select(s => new StopCardRegister
                {
                    Id = s.Id,
                    Date = s.Date,
                    Classification = new Classification { Name = s.Classification.Name },
                    ReportedByPosition = s.ReportedByPosition,
                    ReportedByName = s.ReportedByName,
                    TypeOfObservationCategory = new TypeOfObservationCategory { Name = s.TypeOfObservationCategory.Name },
                    Description = s.Description,
                    EmployeeCode = s.EmployeeCode,
                    ActionRequired = s.ActionRequired,
                    Status = s.Status,
                    StopWorkAuthorityApplied = s.StopWorkAuthorityApplied,
                    user = new IdentityUser { UserName = s.user.UserName,Id=s.user.Id }
                }).ToList();
        }
    }
}
