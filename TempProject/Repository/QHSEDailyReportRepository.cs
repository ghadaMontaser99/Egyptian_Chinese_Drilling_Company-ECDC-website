using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class QHSEDailyReportRepository : IQHSEDailyReportRepository
	{
        Context c;
        public QHSEDailyReportRepository(Context c)
        {
            this.c = c;
        }

        public List<QHSEDailyReport> getall()
        {
            return c.QHSEDailyReport
				.Include(a => a.DaysSinceNoLTI)
				.Include(a => a.Client)
				.Include(a => a.Rig)
                .Include(a => a.user)
				.Include(a => a.CrewQuizAndQHSEDaily).ThenInclude(a => a.Crew)
				.Include(a => a.CrewSaftyAlertAndQHSEDaily).ThenInclude(a => a.Crew)
				.Include(a => a.LeaderShipVisitsAndQHSEDaily).ThenInclude(a => a.LeadershipVisit)
				.Where(a => a.IsDeleted == false)
                .Select(a => new QHSEDailyReport
				{
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number,Id=a.Rig.Id },
                    Date = a.Date,
					Client = new Client { Id = a.Client.Id, ClientName = a.Client.ClientName },
					StopCardsRecords = a.StopCardsRecords,
					PTSMRecords =  a.PTSMRecords,
					DrillsRecords = a.DrillsRecords,
					PTWCold = a.PTWCold,
					PTWHot = a.PTWHot,
				    ManPowerNumber=a.ManPowerNumber, 
					TotalManPowerHours=a.TotalManPowerHours,
					WeeklyInspection =a.WeeklyInspection,
					MonthlyInspection =a.MonthlyInspection,
					WallName =a.WallName,
					TotalPTW =a.TotalPTW,
					SafetyAlertCrewNumber=a.SafetyAlertCrewNumber,
					QuizCrewNumber =a.QuizCrewNumber,
					CrewSaftyAlertAndQHSEDaily = a.CrewSaftyAlertAndQHSEDaily.Select(p => new CrewSaftyAlertAndQHSEDaily
					{
						Crew = new Crew { Id = p.Crew.Id, CrewName = p.Crew.CrewName }
					}).ToList(),
					CrewQuizAndQHSEDaily = a.CrewQuizAndQHSEDaily.Select(p => new CrewQuizAndQHSEDaily
					{
						Crew = new Crew { Id= p.Crew.Id, CrewName = p.Crew.CrewName }
					}).ToList(),
					LeaderShipVisitsAndQHSEDaily = a.LeaderShipVisitsAndQHSEDaily.Select(p => new LeaderShipVisitsAndQHSEDaily
					{
						LeadershipVisit = new LeadershipVisit { LeadershipType = p.LeadershipVisit.LeadershipType,Id= p.LeadershipVisit.Id }
					}).ToList(),
					
					RecordableAccident = a.RecordableAccident,
					NonRecordableAccident = a.NonRecordableAccident,
					RigVehiclesKilometers = a.RigVehiclesKilometers,
					SafetyInduction = a.SafetyInduction,
					RigTrackingClosedPoints = a.RigTrackingClosedPoints,
					RigTrackingOpenPoints = a.RigTrackingOpenPoints,
					DaysSinceLastLTI = a.DaysSinceLastLTI,
					DaysSinceNoLTI = new DaysSinceNoLTI { Id = a.DaysSinceNoLTI.Id, Days = a.DaysSinceNoLTI.Days,RigId=a.Rig.Number },
					user = new IdentityUser { UserName = a.user.UserName, Id = a.user.Id }
                }).ToList();
        }
    }
}
