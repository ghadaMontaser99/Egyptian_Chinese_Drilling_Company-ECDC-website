using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class DaysSinceNoLTIRepository : IDaysSinceNoLTIRepossitory
	{
        Context c;
        public DaysSinceNoLTIRepository(Context c)
        {
            this.c = c;
        }

        public List<DaysSinceNoLTI> getall()
        {
            return c.DaysSinceNoLTI
				.Include(a => a.Rig)
                .Where(a => a.IsDeleted == false)
                .Select(a => new DaysSinceNoLTI
				{
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number,Id=a.Rig.Id },
					Days=a.Days
				}).ToList();
        }
    }
}
