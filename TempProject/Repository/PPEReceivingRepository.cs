using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class PPEReceivingRepository: IPPEReceivingRepository
	{
        Context c;
        public PPEReceivingRepository(Context c)
        {
            this.c = c;
        }

        public List<PPEReceiving> getall()
        {
            return c.PPEReceivings
                


                .Include(a => a.Rig)
                .Include(a => a.User)
                .Include(a => a.PPEAndPPEReceiving).ThenInclude(a => a.PPE)
               
                .Where(a => a.IsDeleted == false)
                .Select(a => new PPEReceiving
				{
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number },
                    Date = a.Date,
                    EmployeeCode = a.EmployeeCode,
                    EmployeeName = a.EmployeeName,
                    EmployeePositionName =  a.EmployeePositionName,
                    QHSEEmpCode = a.QHSEEmpCode,
                    QHSEEmpName = a.QHSEPositionName,
                    QHSEPositionName = a.QHSEPositionName,
                    ThermalCoverallsSize=a.ThermalCoverallsSize,
                    NormalCoverallsSize=a.NormalCoverallsSize,
                    SafetyBootsSize=a.SafetyBootsSize,
                    PPEAndPPEReceiving = a.PPEAndPPEReceiving.Select(p => new PPEAndPPEReceiving
                    {
                        PPE = new PPE { Name = p.PPE.Name }
                    }).ToList(),
                   
                    RigId = a.RigId,
					User = new IdentityUser { UserName = a.User.UserName, Id = a.User.Id }
                }).ToList();
        }
    }
}
