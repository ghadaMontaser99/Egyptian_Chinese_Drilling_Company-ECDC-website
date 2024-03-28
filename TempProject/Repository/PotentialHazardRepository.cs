using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class PotentialHazardRepository: IPotentialHazardRepository
	{
        Context c;
        public PotentialHazardRepository(Context c)
        {
            this.c = c;
        }

        public List<PotentialHazard> getall()
        {
            return c.PotentialHazard
                .Include(a => a.Responsibility)
                .Include(a => a.Images)
                .Include(a => a.Rig)
                .Include(a => a.user)
                .Where(a => a.IsDeleted == false)
                .Select(a => new PotentialHazard
				{
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number,Id=a.Rig.Id },
                    Date = a.Date,
					PR_IssueDate = a.PR_IssueDate,
					PR_No = a.PR_No,
					PO_No =  a.PO_No,
					Responsibility = new Responsibility { Name = a.Responsibility.Name },
					Status = a.Status,
					Description = a.Description,
					NeededAction = a.NeededAction,   
                    Title=a.Title,
					Images = a.Images,
					ResponibilityId = a.ResponibilityId,

					user = new IdentityUser { UserName = a.user.UserName, Id = a.user.Id }
                }).ToList();
        }
    }
}
