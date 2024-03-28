using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class DrillRepository : IDrillRepository
	{
        Context c;
        public DrillRepository(Context c)
        {
            this.c = c;
        }

        public List<Drill> getall()
        {
            return c.Drills
                .Include(a => a.DrillType)
                .Include(a => a.Images)
                .Include(a => a.Rig)
                .Include(a => a.user)
                .Where(a => a.IsDeleted == false)
                .Select(a => new Drill
				{
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number, Id=a.Rig.Id },
                    Date = a.Date,
                    Duration = a.Duration,
                    TimeCompleted=a.TimeCompleted,
                    TimeInitiated=a.TimeInitiated,
                    EffectivenessPoints = a.EffectivenessPoints,
                    DeficienciesPoints =  a.DeficienciesPoints,
					DrillType = new DrillType { Name = a.DrillType.Name },
                    DrillScenario = a.DrillScenario,
                    EmergencyEquipmentUsed = a.EmergencyEquipmentUsed,
                    Recommendations = a.Recommendations,

                    QHSEEmpCode = a.QHSEEmpCode,
                    QHSEPositionName = a.QHSEPositionName,
                    QHSEEmpName = a.QHSEEmpName,

                

                    STPCode = a.STPCode,
                    STPPositionName = a.STPPositionName,
                    STPName = a.STPName,

                    Images = a.Images,
					DrillTypeId = a.DrillTypeId,

					user = new IdentityUser { UserName = a.user.UserName, Id = a.user.Id }
                }).ToList();
        }
    }
}
