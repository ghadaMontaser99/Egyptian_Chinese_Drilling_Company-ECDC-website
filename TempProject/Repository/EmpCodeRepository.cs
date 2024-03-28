using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class EmpCodeRepository : IEmpCodeRepository
	{
        Context c;
        public EmpCodeRepository(Context c)
        {
            this.c = c;
        }

        public List<EmpCode> getall()
        {
            return c.EmpCodes
				.Include(a => a.Rig)
				.Include(a => a.Positions)
				.Where(a => a.IsDeleted == false)
                .Select(a => new EmpCode
				{
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number,Id=a.Rig.Id },
					Code=a.Code,
					Name=a.Name,
					Positions= new Positions { Name = a.Positions.Name,Id=a.Positions.Id },
				}).ToList();
        }
    }
}
