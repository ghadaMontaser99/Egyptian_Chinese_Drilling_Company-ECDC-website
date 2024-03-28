using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class AccidentRepository:IAccidentRepository
    {
        Context c;
        public AccidentRepository(Context c)
        {
            this.c = c;
        }

        public List<Accident> getall()
        {
            return c.Accidents
                .Include(a => a.AccidentCauses)
                .Include(a => a.ClassificationOfAccident)
                .Include(a => a.PreventionCategory)
                .Include(a => a.Rig)
                .Include(a => a.TypeOfInjury)
                .Include(a => a.user)
                .Include(a => a.ViolationCategory)
                .Include(a => a.Images)
                .Where(a => a.IsDeleted == false)
				.Select(a => new Accident
                {
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number,Id= a.Rig.Id },
                    TimeOfEvent = a.TimeOfEvent,
                    DateOfEvent = a.DateOfEvent,
                    ClassificationOfAccidentId = a.ClassificationOfAccidentId,
                    TypeOfInjury = new TypeOfInjury { Name = a.TypeOfInjury.Name },
                    ViolationCategory = new ViolationCategory { Name = a.ViolationCategory.Name },
                    AccidentCauses = new AccidentCauses { Name = a.AccidentCauses.Name },
                    PreventionCategory = new PreventionCategory { Name = a.PreventionCategory.Name },
                    ClassificationOfAccident = new ClassificationOfAccident { Name = a.ClassificationOfAccident.Name },

                    AccidentLocation = a.AccidentLocation,
                    QHSEEmpCode= a.QHSEEmpCode,
					QHSEPositionName = a.QHSEPositionName,
					QHSEEmpName = a.QHSEEmpName,
					PusherCode = a.PusherCode,
					PusherPositionName = a.PusherPositionName,
					PusherName = a.PusherName,
					DrillerName = a.DrillerName,
					DrillerCode = a.DrillerCode,
					DrillerPositionName = a.DrillerPositionName,
					InjuredPersonCode = a.InjuredPersonCode,
					InjuredPersonPositionName = a.InjuredPersonPositionName,
					InjuredPersonName = a.InjuredPersonName,
					DescriptionOfTheEvent = a.DescriptionOfTheEvent,
                    ImmediateActionType = a.ImmediateActionType,
                    DirectCauses = a.DirectCauses,
                    RootCauses = a.RootCauses,
                    Recommendations = a.Recommendations,
                    Images = a.Images,
                    user = new IdentityUser { UserName = a.user.UserName,Id=a.user.Id }
                }).ToList();
        }
    }
}
