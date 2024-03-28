using Grpc.Core;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Drawing.Drawing2D;
using TempProject.DTO;
using TempProject.DTO.ResponseDTO;
using TempProject.Helper;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	//[Authorize]
	public class QHSEDailyReportController : ControllerBase
	{
		public IRepository<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailyRepo { get; set; }
		public IRepository<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailyRepo { get; set; }
		public IRepository<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailyRepo { get; set; }

		public IRepository<QHSEDailyReport> QHSEDailyReportRepo { get; set; }
		public IQHSEDailyReportRepository QHSEDailyReportRepoistory { get; set; }
		public IRepository<StopCardRegister> StopCardRegisterRepo { get; set; }
		public IRepository<Drill> DrillRepo { get; set; }
		public IAccidentRepository AccidentRepoistory { get; set; }
		//public IRepository<Accident> AccidentRepo { get; set; }

		public IRepository<PTSM> PTSMRepo { get; set; }
		public IRepository<BOP> BOPRepo { get; set; }
		public IRepository<LTIPrevDateAndDays> LTIPrevDateAndDaysRepo { get; set; }
		public IRepository<DaysSinceNoLTI> DaysSinceNoLTIRepo { get; set; }
		public IRepository<Crew> CrewRepo { get; set; }
		public IRepository<LeadershipVisit> LeadershipVisitRepo { get; set; }
		public IRepository<Rig> RigRepo { get; set; }
		static DateTime[] StaticDateArray = new DateTime[100];
		static int i = 0;
		private  int DaysIncrement = 1;
		private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager;


		public QHSEDailyReportController(Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager,
			IRepository<QHSEDailyReport> _QHSEDailyReportRepo,
			IQHSEDailyReportRepository _QHSEDailyReportRepoistory,
			IRepository<StopCardRegister> _StopCardRegisterRepo,
			IRepository<Drill> _DrillRepo,
			IAccidentRepository _AccidentRepoistory,
			IRepository<PTSM> _PTSMRepo,
			IRepository<BOP> _BOPRepo,
			IRepository<CrewQuizAndQHSEDaily> _CrewQuizAndQHSEDailyRepo,
			IRepository<CrewSaftyAlertAndQHSEDaily> _CrewSaftyAlertAndQHSEDailyRepo,
			IRepository<LeaderShipVisitsAndQHSEDaily> _LeaderShipVisitsAndQHSEDailyRepo,
			IRepository<LTIPrevDateAndDays> _LTIPrevDateAndDaysRepo,
			IRepository<DaysSinceNoLTI> _DaysSinceNoLTIRepo,
			IRepository<Crew> _CrewRepo,
			IRepository<LeadershipVisit> _LeadershipVisitRepo,
			IRepository<Rig> _RigRepo
			)
		{
			this.RigRepo = _RigRepo;
			this.CrewRepo = _CrewRepo;
			this.LeadershipVisitRepo = _LeadershipVisitRepo;
			this.DaysSinceNoLTIRepo = _DaysSinceNoLTIRepo;
			this.LTIPrevDateAndDaysRepo = _LTIPrevDateAndDaysRepo;
			this.CrewQuizAndQHSEDailyRepo = _CrewQuizAndQHSEDailyRepo;
			this.CrewSaftyAlertAndQHSEDailyRepo=_CrewSaftyAlertAndQHSEDailyRepo;
			this.LeaderShipVisitsAndQHSEDailyRepo = _LeaderShipVisitsAndQHSEDailyRepo;
			this.QHSEDailyReportRepo = _QHSEDailyReportRepo;
			this.QHSEDailyReportRepoistory = _QHSEDailyReportRepoistory;
			this.userManager = _userManager;
			this.StopCardRegisterRepo = _StopCardRegisterRepo;
			this.DrillRepo = _DrillRepo;
			this.AccidentRepoistory = _AccidentRepoistory;
			this.PTSMRepo = _PTSMRepo;
			this.BOPRepo = _BOPRepo;
		}

		[HttpGet("GetData")]
		public async Task<ResultDTO> GetAllWithData(string UserID, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall();
					List<QHSEDailyReportResponseDTO> newTemp = new List<QHSEDailyReportResponseDTO>();
					foreach (QHSEDailyReport QHSEDailyReport in temp)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys =CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;
						newTemp.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}
					if (newTemp != null)
					{
						result.Message = "Success";
						result.Statescode = 200;
						result.Data = newTemp;

						return result;
					}
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
					List<QHSEDailyReportResponseDTO> newTemp = new List<QHSEDailyReportResponseDTO>();
					foreach (QHSEDailyReport QHSEDailyReport in temp)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;

						newTemp.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}
					//result.Data = prod;

					if (newTemp != null)
					{
						result.Message = "Success";
						result.Statescode = 200;
						result.Data = newTemp;

						return result;
					}
				}
			}
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}
			return result;
		}

		[HttpGet("GetDataForExcel")]
		public ActionResult<ResultDTO> GetDataForExcel(string UserID, string UserRole)
		{
			ResultDTO result = new ResultDTO();
			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall();
					List<QHSEDailyReportExelDTO> newTemp = new List<QHSEDailyReportExelDTO>();
					foreach (QHSEDailyReport QHSEDailyReport in temp)
					{
						QHSEDailyReportExelDTO QHSEDailyReportDTO = new QHSEDailyReportExelDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.LeaderShipVisits = 1;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

	



						newTemp.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}
					if (newTemp != null)
					{
						result.Message = "Success";
						result.Statescode = 200;
						result.Data = newTemp;

						return result;
					}
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
					List<QHSEDailyReportExelDTO> newTemp = new List<QHSEDailyReportExelDTO>();
					foreach (QHSEDailyReport QHSEDailyReport in temp)
					{
						QHSEDailyReportExelDTO QHSEDailyReportDTO = new QHSEDailyReportExelDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						//List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						//QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

						//List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						//QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

						//List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						//QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;
						newTemp.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}
					if (newTemp != null)
					{
						result.Message = "Success";
						result.Statescode = 200;
						result.Data = newTemp;

						return result;
					}

				}

			}
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}

			return result;
		}

		[HttpGet("ByPage/{page:int}")]
		public PageResult<QHSEDailyReportResponseDTO> GettAllQHSEDailyReportByPage(string UserId, string UserRole, int? page, int pagesize = 10)
		{

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall();
					List<QHSEDailyReportResponseDTO> newTemp = new List<QHSEDailyReportResponseDTO>();
					foreach (QHSEDailyReport QHSEDailyReport in temp)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;


						newTemp.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}

					float countDetails = QHSEDailyReportRepoistory.getall().Count();
					var result = new PageResult<QHSEDailyReportResponseDTO>
					{
						Count = (int)Math.Ceiling(countDetails / pagesize),
						PageIndex = page ?? 1,
						PageSize = pagesize,
						Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
					};

					return result;

				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall().Where(a => a.user.Id == UserId).ToList();
					List<QHSEDailyReportResponseDTO> newTemp = new List<QHSEDailyReportResponseDTO>();
					foreach (QHSEDailyReport QHSEDailyReport in temp)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;


						newTemp.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}

					float countDetails = QHSEDailyReportRepoistory.getall().Where(a => a.user.Id == UserId).Count();
					var result = new PageResult<QHSEDailyReportResponseDTO>
					{
						Count = (int)Math.Ceiling(countDetails / pagesize),
						PageIndex = page ?? 1,
						PageSize = pagesize,
						Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
					};
					return result;
				}
			}
			catch (Exception ex)
			{
				return new PageResult<QHSEDailyReportResponseDTO>();

			}
			return new PageResult<QHSEDailyReportResponseDTO>();
		}



		[HttpGet("GetForAnalysisByYear")]
		public ActionResult<ResultDTO> GetForAnalysisByYear(string UserID, int Year)
		{

			ResultDTO result = new ResultDTO();
			try
			{
				//if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				//{

				List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year 
				&& r.user.Id == UserID).ToList();

				QHSEYearChartDTO qHSEYearChart = new QHSEYearChartDTO();

				qHSEYearChart.CountTotalManPowerHoursYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year 
				&& r.user.Id == UserID).Sum(s => s.TotalManPowerHours);

				qHSEYearChart.CountStopCardsYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year				
				&& r.user.Id == UserID).Sum(s => s.StopCardsRecords);

				qHSEYearChart.CountPTSMYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year				
				&& r.user.Id == UserID).Sum(s => s.PTSMRecords);

				qHSEYearChart.CountDrillsYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year 				
				&& r.user.Id == UserID).Sum(s => s.DrillsRecords);

				qHSEYearChart.CountTotalPTWYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.TotalPTW);

				qHSEYearChart.CountLeadershipVisitsYear = QHSEDailyReportRepoistory.getall()
				.Count(r => r.Date.Year == Year
				&& r.user.Id == UserID);

				qHSEYearChart.CountQuizNumberCrewYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.QuizCrewNumber);

				qHSEYearChart.CountSafetyNumberCrewYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.SafetyAlertCrewNumber);

				qHSEYearChart.CountMonthlyInspectionYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.MonthlyInspection);

				qHSEYearChart.CountWeeklyInspectionYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.WeeklyInspection);


				qHSEYearChart.CountDaysSinceLastLTIYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.DaysSinceLastLTI);

				qHSEYearChart.CountRecordableAccidentYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year 
				&& r.user.Id == UserID).Sum(s => s.RecordableAccident);

				qHSEYearChart.CountNonRecordableAccidentYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.NonRecordableAccident);

				qHSEYearChart.CountSafetyInductionYear = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year
				&& r.user.Id == UserID).Sum(s => s.SafetyInduction);
			

				if (qHSEYearChart != null)
				{

					result.Message = "Success";
					result.Statescode = 200;
					result.Data = qHSEYearChart;

					return result;
				}
			}
			
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}
			return result;
		}

		[HttpGet("GetForAnalysisByYearAllRigs")]
		public ActionResult<ResultDTO> GetForAnalysisByYearAllRigs( int Year)
		{

			ResultDTO result = new ResultDTO();
			try
			{
				//if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				//{

				List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year).ToList();
				List<int> TotalManPowerHoursList = new List<int>();
				List<int> StopCardsRecordsList = new List<int>();
				List<int> PTSMRecordsList = new List<int>();
				List<int> DrillsRecordsList = new List<int>();
				List<int> TotalPTWList = new List<int>();
				List<int> LeadershipVisitsList = new List<int>();
				List<int> QuizCrewNumberList = new List<int>();
				List<int> SafetyAlertCrewNumberList = new List<int>();
				List<int> MonthlyInspectionList = new List<int>();

				List<Rig> AllRigs = RigRepo.getall().ToList();

				List<int> DaysSinceLastLTIList = new List<int>();

				foreach (var item in AllRigs)
				{
					var lastReport = QHSEDailyReportRepoistory.getall()
						.LastOrDefault(s => s.Date.Year == Year && s.Rig.Id == item.Id);

					if (lastReport != null)
					{
						int count = lastReport.DaysSinceLastLTI;
						DaysSinceLastLTIList.Add(count);
					}
					else
					{
						int count = 0;
						DaysSinceLastLTIList.Add(count);
					}

				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id==item.Id).Sum(s => s.TotalManPowerHours);
					TotalManPowerHoursList.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.StopCardsRecords);
					StopCardsRecordsList.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.PTSMRecords);
					PTSMRecordsList.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.DrillsRecords);
					DrillsRecordsList.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.TotalPTW);
					TotalPTWList.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
				    .Count(r => r.Date.Year == Year && r.Rig.Id==item.Id);
					LeadershipVisitsList.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.QuizCrewNumber);
					QuizCrewNumberList.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.SafetyAlertCrewNumber);
					SafetyAlertCrewNumberList.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = (int) QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.MonthlyInspection);
					MonthlyInspectionList.Add(Count);
				}
				List<int> WeeklyInspectionList = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = (int)QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.WeeklyInspection);
					WeeklyInspectionList.Add(Count);
				}

			

				List<int> RecordableAccidentList = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.RecordableAccident);
					RecordableAccidentList.Add(Count);
				}


				List<int> NonRecordableAccidentList = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.NonRecordableAccident);
					NonRecordableAccidentList.Add(Count);
				}

				List<int> SafetyInductionList = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && r.Rig.Id == item.Id).Sum(s => s.SafetyInduction);
					SafetyInductionList.Add(Count);
				}


				var AllLists = new { TotalManPowerHoursList = TotalManPowerHoursList,
					StopCardsRecordsList = StopCardsRecordsList ,
					PTSMRecordsList= PTSMRecordsList,
					DrillsRecordsList= DrillsRecordsList,
					TotalPTWList= TotalPTWList,
					LeadershipVisitsList= LeadershipVisitsList,
					QuizCrewNumberList= QuizCrewNumberList,
					SafetyAlertCrewNumberList= SafetyAlertCrewNumberList,
					MonthlyInspectionList= MonthlyInspectionList,
					WeeklyInspectionList= WeeklyInspectionList,
					DaysSinceLastLTIList= DaysSinceLastLTIList,
					RecordableAccidentList= RecordableAccidentList,
					NonRecordableAccidentList= NonRecordableAccidentList,
					SafetyInductionList= SafetyInductionList
				};

				if (AllLists != null)
				{

					result.Message = "Success";
					result.Statescode = 200;
					result.Data = AllLists;

					return result;
				}
			}

			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}
			return result;
		}




		[HttpGet("GetForAnalysisByMonth")]
		public ActionResult<ResultDTO> GetForAnalysisByMonth(string UserID, int Year,int Month1,int Month2)
		{

			ResultDTO result = new ResultDTO();
			try
			{
				//if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				//{

				List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year && (r.Date.Month == Month1|| r.Date.Month==Month2) 
				&& r.user.Id == UserID).ToList();

				QHSEMonthlyChartDTO qHSEMonthlyChart = new QHSEMonthlyChartDTO();

				qHSEMonthlyChart.CountTotalManPowerHoursMonth1 = QHSEDailyReportRepoistory.getall()
			    .Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1) 
				&& r.user.Id == UserID).Sum(s => s.TotalManPowerHours);

				qHSEMonthlyChart.CountStopCardsMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.StopCardsRecords); 

				qHSEMonthlyChart.CountPTSMMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.PTSMRecords);

				qHSEMonthlyChart.CountDrillsMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.DrillsRecords);

				qHSEMonthlyChart.CountTotalPTWMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.TotalPTW);

				qHSEMonthlyChart.CountLeadershipVisitsMonth1 = QHSEDailyReportRepoistory.getall()
			    .Count(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID);

				qHSEMonthlyChart.CountQuizNumberCrewMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.QuizCrewNumber);

				qHSEMonthlyChart.CountSafetyNumberCrewMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.SafetyAlertCrewNumber);

				qHSEMonthlyChart.CountMonthlyInspectionMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.MonthlyInspection);

				qHSEMonthlyChart.CountWeeklyInspectionMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.WeeklyInspection);

				qHSEMonthlyChart.CountDaysSinceLastLTIMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.DaysSinceLastLTI);

				qHSEMonthlyChart.CountRecordableAccidentMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.RecordableAccident);

				qHSEMonthlyChart.CountNonRecordableAccidentMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.NonRecordableAccident);

				qHSEMonthlyChart.CountSafetyInductionMonth1 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month1)
				&& r.user.Id == UserID).Sum(s => s.SafetyInduction);


				//for month2
				qHSEMonthlyChart.CountTotalManPowerHoursMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.TotalManPowerHours);

				qHSEMonthlyChart.CountStopCardsMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.StopCardsRecords);

				qHSEMonthlyChart.CountPTSMMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.PTSMRecords);

				qHSEMonthlyChart.CountDrillsMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.DrillsRecords);

				qHSEMonthlyChart.CountTotalPTWMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.TotalPTW);

				qHSEMonthlyChart.CountLeadershipVisitsMonth2 = QHSEDailyReportRepoistory.getall()
				.Count(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID);

				qHSEMonthlyChart.CountQuizNumberCrewMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.QuizCrewNumber);

				qHSEMonthlyChart.CountSafetyNumberCrewMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.SafetyAlertCrewNumber);

				qHSEMonthlyChart.CountMonthlyInspectionMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.MonthlyInspection);

				qHSEMonthlyChart.CountWeeklyInspectionMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.WeeklyInspection);

				qHSEMonthlyChart.CountDaysSinceLastLTIMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.DaysSinceLastLTI);

				qHSEMonthlyChart.CountRecordableAccidentMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.RecordableAccident);

				qHSEMonthlyChart.CountNonRecordableAccidentMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.NonRecordableAccident);

				qHSEMonthlyChart.CountSafetyInductionMonth2 = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year &&
				(r.Date.Month == Month2)
				&& r.user.Id == UserID).Sum(s => s.SafetyInduction);

				if (qHSEMonthlyChart != null)
				{

					result.Message = "Success";
					result.Statescode = 200;
					result.Data = qHSEMonthlyChart;

					return result;
				}
			}
			
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}
			return result;
		}





		[HttpGet("GetForAnalysisByMonthAllRigs")]
		public ActionResult<ResultDTO> GetForAnalysisByMonthAllRigs(int Year, int Month1, int Month2)
		{

			ResultDTO result = new ResultDTO();
			try
			{
				
				List<QHSEDailyReport> temp = QHSEDailyReportRepoistory.getall()
				.Where(r => r.Date.Year == Year && (r.Date.Month == Month1 || r.Date.Month == Month2)).ToList();

				List<int> TotalManPowerHoursListMonth1 = new List<int>();
				List<int> StopCardsRecordsListMonth1 = new List<int>();
				List<int> PTSMRecordsListMonth1 = new List<int>();
				List<int> DrillsRecordsListMonth1 = new List<int>();
				List<int> TotalPTWListMonth1 = new List<int>();
				List<int> LeadershipVisitsListMonth1 = new List<int>();
				List<int> QuizCrewNumberListMonth1 = new List<int>();
				List<int> SafetyAlertCrewNumberListMonth1 = new List<int>();
				List<int> MonthlyInspectionListMonth1 = new List<int>();

				List<Rig> AllRigs = RigRepo.getall().ToList();

				List<int> DaysSinceLastLTIListMonth1 = new List<int>();
				foreach (var item in AllRigs)
				{
					var lastReport = QHSEDailyReportRepoistory.getall()
						.LastOrDefault(s => s.Date.Year == Year && s.Rig.Id == item.Id && (s.Date.Month == Month1));

					if (lastReport != null)
					{
						int count = lastReport.DaysSinceLastLTI;
						DaysSinceLastLTIListMonth1.Add(count);
					}
					else
					{
						int count = 0;
						DaysSinceLastLTIListMonth1.Add(count);
					}
				}


		


				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year &&(r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.TotalManPowerHours);
					TotalManPowerHoursListMonth1.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year &&(r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.StopCardsRecords);
					StopCardsRecordsListMonth1.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.PTSMRecords);
					PTSMRecordsListMonth1.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.DrillsRecords);
					DrillsRecordsListMonth1.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.TotalPTW);
					TotalPTWListMonth1.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Count(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id);
					LeadershipVisitsListMonth1.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.QuizCrewNumber);
					QuizCrewNumberListMonth1.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.SafetyAlertCrewNumber);
					SafetyAlertCrewNumberListMonth1.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = (int)QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.MonthlyInspection);
					MonthlyInspectionListMonth1.Add(Count);
				}
				List<int> WeeklyInspectionListMonth1 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = (int) QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.WeeklyInspection);
					WeeklyInspectionListMonth1.Add(Count);
				}

			

				List<int> RecordableAccidentListMonth1 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.RecordableAccident);
					RecordableAccidentListMonth1.Add(Count);
				}


				List<int> NonRecordableAccidentListMonth1 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.NonRecordableAccident);
					NonRecordableAccidentListMonth1.Add(Count);
				}

				List<int> SafetyInductionListMonth1 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month1) && r.Rig.Id == item.Id).Sum(s => s.SafetyInduction);
					SafetyInductionListMonth1.Add(Count);
				}


				//for month2

				List<int> TotalManPowerHoursListMonth2 = new List<int>();
				List<int> StopCardsRecordsListMonth2 = new List<int>();
				List<int> PTSMRecordsListMonth2 = new List<int>();
				List<int> DrillsRecordsListMonth2 = new List<int>();
				List<int> TotalPTWListMonth2 = new List<int>();
				List<int> LeadershipVisitsListMonth2 = new List<int>();
				List<int> QuizCrewNumberListMonth2 = new List<int>();
				List<int> SafetyAlertCrewNumberListMonth2 = new List<int>();
				List<int> MonthlyInspectionListMonth2 = new List<int>();


				List<int> DaysSinceLastLTIListMonth2 = new List<int>();
				foreach (var item in AllRigs)
				{
					var lastReport = QHSEDailyReportRepoistory.getall()
						.LastOrDefault(s => s.Date.Year == Year && s.Rig.Id == item.Id && (s.Date.Month == Month2));

					if (lastReport != null)
					{
						int count = lastReport.DaysSinceLastLTI;
						DaysSinceLastLTIListMonth2.Add(count);
					}
					else
					{
						int count = 0;
						DaysSinceLastLTIListMonth2.Add(count);
					}
				}


				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.TotalManPowerHours);
					TotalManPowerHoursListMonth2.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.StopCardsRecords);
					StopCardsRecordsListMonth2.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.PTSMRecords);
					PTSMRecordsListMonth2.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.DrillsRecords);
					DrillsRecordsListMonth2.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.TotalPTW);
					TotalPTWListMonth2.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Count(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id);
					LeadershipVisitsListMonth2.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.QuizCrewNumber);
					QuizCrewNumberListMonth2.Add(Count);
				}

				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.SafetyAlertCrewNumber);
					SafetyAlertCrewNumberListMonth2.Add(Count);
				}
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = (int)QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.MonthlyInspection);
					MonthlyInspectionListMonth2.Add(Count);
				}
				List<int> WeeklyInspectionListMonth2 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = (int)QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.WeeklyInspection);
					WeeklyInspectionListMonth2.Add(Count);
				}

				List<int> RecordableAccidentListMonth2 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.RecordableAccident);
					RecordableAccidentListMonth2.Add(Count);
				}


				List<int> NonRecordableAccidentListMonth2 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.NonRecordableAccident);
					NonRecordableAccidentListMonth2.Add(Count);
				}

				List<int> SafetyInductionListMonth2 = new List<int>();
				foreach (var item in AllRigs)
				{
					//QHSEYearChartAllRigDTO obj = new QHSEYearChartAllRigDTO();

					int Count = QHSEDailyReportRepoistory.getall()
					.Where(r => r.Date.Year == Year && (r.Date.Month == Month2) && r.Rig.Id == item.Id).Sum(s => s.SafetyInduction);
					SafetyInductionListMonth2.Add(Count);
				}

				var AllLists = new
				{
					TotalManPowerHoursListMonth1 = TotalManPowerHoursListMonth1,
					StopCardsRecordsListMonth1 = StopCardsRecordsListMonth1,
					PTSMRecordsListMonth1 = PTSMRecordsListMonth1,
					DrillsRecordsListMonth1 = DrillsRecordsListMonth1,
					TotalPTWListMonth1 = TotalPTWListMonth1,
					LeadershipVisitsListMonth1 = LeadershipVisitsListMonth1,
					QuizCrewNumberListMonth1 = QuizCrewNumberListMonth1,
					SafetyAlertCrewNumberListMonth1 = SafetyAlertCrewNumberListMonth1,
					MonthlyInspectionListMonth1 = MonthlyInspectionListMonth1,
					WeeklyInspectionListMonth1 = WeeklyInspectionListMonth1,
					DaysSinceLastLTIListMonth1 = DaysSinceLastLTIListMonth1,
					RecordableAccidentListMonth1 = RecordableAccidentListMonth1,
					NonRecordableAccidentListMonth1 = NonRecordableAccidentListMonth1,
					SafetyInductionListMonth1 = SafetyInductionListMonth1,


					totalManPowerHoursListMonth2 = TotalManPowerHoursListMonth2,
					StopCardsRecordsListMonth2 = StopCardsRecordsListMonth2,
					PTSMRecordsListMonth2 = PTSMRecordsListMonth2,
					DrillsRecordsListMonth2 = DrillsRecordsListMonth2,
					TotalPTWListMonth2 = TotalPTWListMonth2,
					LeadershipVisitsListMonth2 = LeadershipVisitsListMonth2,
					QuizCrewNumberListMonth2 = QuizCrewNumberListMonth2,
					SafetyAlertCrewNumberListMonth2 = SafetyAlertCrewNumberListMonth2,
					MonthlyInspectionListMonth2 = MonthlyInspectionListMonth2,
					WeeklyInspectionListMonth2 = WeeklyInspectionListMonth2,
					DaysSinceLastLTIListMonth2 = DaysSinceLastLTIListMonth2,
					RecordableAccidentListMonth2 = RecordableAccidentListMonth2,
					NonRecordableAccidentListMonth2 = NonRecordableAccidentListMonth2,
					SafetyInductionListMonth2 = SafetyInductionListMonth2
				};


				if (AllLists != null)
				{

					result.Message = "Success";
					result.Statescode = 200;
					result.Data = AllLists;

					return result;
				}
			}
		
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}
			return result;
		}


		
		

		[HttpGet("GetDataById/{ID:int}")]
		public ActionResult<ResultDTO> GetAllWithDataByID(int ID, string UserId, string UserRole)
		{
			ResultDTO result = new ResultDTO();


			if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
			{
				QHSEDailyReport temp = QHSEDailyReportRepoistory.getall().FirstOrDefault(a => a.Id == ID);
				if (temp != null)
				{
					QHSEDailyReportDTO QHSEDailyReportDTO = new QHSEDailyReportDTO();
					QHSEDailyReportDTO.Id = temp.Id;
					QHSEDailyReportDTO.RigId = temp.Rig.Id;
					QHSEDailyReportDTO.Date = temp.Date;
					QHSEDailyReportDTO.ClientId = temp.Client.Id;
					QHSEDailyReportDTO.StopCardsRecords = temp.StopCardsRecords;
					QHSEDailyReportDTO.PTSMRecords = temp.PTSMRecords;
					QHSEDailyReportDTO.DrillsRecords = temp.DrillsRecords;
					QHSEDailyReportDTO.PTWCold = temp.PTWCold;
					QHSEDailyReportDTO.PTWHot = temp.PTWHot;
					QHSEDailyReportDTO.RecordableAccident = temp.RecordableAccident;
					QHSEDailyReportDTO.NonRecordableAccident = temp.NonRecordableAccident;
					QHSEDailyReportDTO.RigVehiclesKilometers = temp.RigVehiclesKilometers;
					QHSEDailyReportDTO.SafetyInduction = temp.SafetyInduction;
					QHSEDailyReportDTO.RigTrackingClosedPoints = temp.RigTrackingClosedPoints;
					QHSEDailyReportDTO.RigTrackingOpenPoints = temp.RigTrackingOpenPoints;
					QHSEDailyReportDTO.DaysSinceLastLTI = temp.DaysSinceLastLTI;
					QHSEDailyReportDTO.DaysSinceNoLTIId = temp.DaysSinceNoLTI.Id;

					QHSEDailyReportDTO.ManPowerNumber = temp.ManPowerNumber;
					QHSEDailyReportDTO.TotalManPowerHours = temp.TotalManPowerHours;
					QHSEDailyReportDTO.WeeklyInspection = temp.WeeklyInspection;
					QHSEDailyReportDTO.MonthlyInspection = temp.MonthlyInspection;
					QHSEDailyReportDTO.WallName = temp.WallName;
					QHSEDailyReportDTO.TotalPTW = temp.TotalPTW;
					QHSEDailyReportDTO.SafetyAlertCrewNumber = temp.SafetyAlertCrewNumber;
					QHSEDailyReportDTO.QuizCrewNumber = temp.QuizCrewNumber;

					List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == temp.Id).ToList();
					QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

					List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == temp.Id).ToList();
					QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

					List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == temp.Id).ToList();
					QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;

					QHSEDailyReportDTO.UserId = temp.user.Id;

					if (QHSEDailyReportDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = QHSEDailyReportDTO;

						return result;
					}
				}

			}
			else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
			{
				QHSEDailyReport temp = QHSEDailyReportRepoistory.getall().FirstOrDefault(a => a.Id == ID && a.user.Id == UserId);
				if (temp != null)
				{
					QHSEDailyReportDTO QHSEDailyReportDTO = new QHSEDailyReportDTO();
					QHSEDailyReportDTO.Id = temp.Id;
					QHSEDailyReportDTO.RigId = temp.Rig.Id;
					QHSEDailyReportDTO.Date = temp.Date;
					QHSEDailyReportDTO.ClientId = temp.Client.Id;
					QHSEDailyReportDTO.StopCardsRecords = temp.StopCardsRecords;
					QHSEDailyReportDTO.PTSMRecords = temp.PTSMRecords;
					QHSEDailyReportDTO.DrillsRecords = temp.DrillsRecords;
					QHSEDailyReportDTO.PTWCold = temp.PTWCold;
					QHSEDailyReportDTO.PTWHot = temp.PTWHot;
					QHSEDailyReportDTO.RecordableAccident = temp.RecordableAccident;
					QHSEDailyReportDTO.NonRecordableAccident = temp.NonRecordableAccident;
					QHSEDailyReportDTO.RigVehiclesKilometers = temp.RigVehiclesKilometers;
					QHSEDailyReportDTO.SafetyInduction = temp.SafetyInduction;
					QHSEDailyReportDTO.RigTrackingClosedPoints = temp.RigTrackingClosedPoints;
					QHSEDailyReportDTO.RigTrackingOpenPoints = temp.RigTrackingOpenPoints;
					QHSEDailyReportDTO.DaysSinceLastLTI = temp.DaysSinceLastLTI;
					QHSEDailyReportDTO.DaysSinceNoLTIId = temp.DaysSinceNoLTI.Id;

					QHSEDailyReportDTO.ManPowerNumber = temp.ManPowerNumber;
					QHSEDailyReportDTO.TotalManPowerHours = temp.TotalManPowerHours;
					QHSEDailyReportDTO.WeeklyInspection = temp.WeeklyInspection;
					QHSEDailyReportDTO.MonthlyInspection = temp.MonthlyInspection;
					QHSEDailyReportDTO.WallName = temp.WallName;
					QHSEDailyReportDTO.TotalPTW = temp.TotalPTW;
					QHSEDailyReportDTO.SafetyAlertCrewNumber = temp.SafetyAlertCrewNumber;
					QHSEDailyReportDTO.QuizCrewNumber = temp.QuizCrewNumber;

					List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == temp.Id).ToList();
					QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;

					List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == temp.Id).ToList();
					QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;

					List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == temp.Id).ToList();
					QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;

					QHSEDailyReportDTO.UserId = temp.user.Id;


					if (QHSEDailyReportDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = QHSEDailyReportDTO;

						return result;
					}
				}

			}

			result.Statescode = 404;
			result.Message = "data not found";
			return result;
		}

		//[HttpGet("GetAllRecordsOFToday")]
		//public  async ActionResult<ResultDTO>  GetAllRecordsOFToday(int RigId)
		//{
		//	ResultDTO result = new ResultDTO();
		//	DateTime currentDate = DateTime.Now;
		//	string date = currentDate.ToString("yyyy-MM-dd");
		//	DateTime dateObject = DateTime.Parse(date);
		//	//QHSEDailyReport temp = QHSEDailyReportRepoistory.getall().FirstOrDefault(a => a.Date == dateObject);

		//	QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
		//	if (RigId == -1)
		//	{
		//		result.Message = "Success";
		//		result.Statescode = 200;
		//		result.Data = QHSEDailyReportDTO;

		//		return result;

		//	}
		//	else
		//	{
		//		Rig selectedRig = RigRepo.getbyid(RigId);
		//		string selectRigName= string.Concat("Rig-", selectedRig.Number);
		//		IdentityUser user =await userManager.FindByNameAsync("a.zayed");
		//		var userId=(user.Id).ToString();

		//		QHSEDailyReportDTO.StopCardsRecords = StopCardRegisterRepo.getall().Where(s => s.Date == dateObject&&s.userID== userId).ToList().Count();
		//		QHSEDailyReportDTO.PTSMRecords = PTSMRepo.getall().Where(s => s.Date == dateObject && s.RigId == RigId).ToList().Count();
		//		QHSEDailyReportDTO.DrillsRecords = DrillRepo.getall().Where(s => s.Date == dateObject && s.RigId == RigId).ToList().Count();
		//		QHSEDailyReportDTO.ManPowerNumber = BOPRepo.getall().Where(s => s.Date == dateObject && s.RigId == RigId).Sum(s => s.ManPower);
		//		QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReportDTO.ManPowerNumber * 12;
		//		QHSEDailyReportDTO.RecordableAccident = AccidentRepoistory.getall().Count(s => ( s.DateOfEvent == dateObject && s.Rig.Id == RigId) &&
		//		(s.ClassificationOfAccident.Name == "Lost Time Incident (LTI)" ||
		//		 s.ClassificationOfAccident.Name == "Fatalities (FAT)" ||
		//		 s.ClassificationOfAccident.Name == "Restricted Work Days Case (RWDC)" ||
		//		 s.ClassificationOfAccident.Name == "Medical Treatment Case (MTC)"));

		//		//QHSEDailyReportDTO.RecordableAccident = AccidentRepoistory.getall().Where(s => (s.RigId == RigId && s.DateOfEvent == dateObject) && (s.ClassificationOfAccident.Name == "Lost Time Incident (LTI)" || s.ClassificationOfAccident.Name == "Fatalities (FAT)" || s.ClassificationOfAccident.Name == "Restricted Work Days Case (RWDC)" || s.ClassificationOfAccident.Name == "Medical Treatment Case (MTC)")).ToList().Count();
		//		QHSEDailyReportDTO.NonRecordableAccident = AccidentRepoistory.getall().Count(s => s.Rig.Id == RigId && s.DateOfEvent == dateObject && (s.ClassificationOfAccident.Name == "First Aid Case (FAC)" || s.ClassificationOfAccident.Name == "Fire Accident" || s.ClassificationOfAccident.Name == "Property Damage (PD))" || s.ClassificationOfAccident.Name == "Operational Accident"
		//		|| s.ClassificationOfAccident.Name == "Security Accident" || s.ClassificationOfAccident.Name == "Occupational Accident"
		//		|| s.ClassificationOfAccident.Name == "Road Traffic Accident (RTA)" || s.ClassificationOfAccident.Name == "Oil, Fuel, Chemicals Spill"
		//		|| s.ClassificationOfAccident.Name == "Near-Miss Event (NM)" || s.ClassificationOfAccident.Name == "HIPO Near miss"));

		//		if (QHSEDailyReportDTO != null)
		//		{

		//			result.Message = "Success";
		//			result.Statescode = 200;
		//			result.Data = QHSEDailyReportDTO;

		//			return result;
		//		}
		//		else
		//		{
		//			result.Message = "Empty data";
		//			result.Statescode = 200;
		//			result.Data = QHSEDailyReportDTO;

		//			return result;
		//		}

		//	}


		//}

		[HttpGet("GetAllRecordsOFToday")]
		public async Task<ActionResult<ResultDTO>> GetAllRecordsOFToday(int RigId,string dateAsString)
		{
			ResultDTO result = new ResultDTO();
			//DateTime currentDate = DateTime.UtcNow;
			//string date = currentDate.ToString("yyyy-MM-dd");
			//DateTime dateObject = DateTime.Parse(date);
			DateTime date = DateTime.Parse(dateAsString);

			QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();

			if (RigId == -1)
			{
				result.Message = "Success";
				result.Statescode = 200;
				result.Data = QHSEDailyReportDTO;

				return result;
			}
			else
			{
				Rig selectedRig = RigRepo.getbyid(RigId);
				string selectRigName = $"Rig{selectedRig.Number}";
				IdentityUser user = await userManager.FindByNameAsync(selectRigName);
				var userId = (user.Id).ToString();

				QHSEDailyReportDTO.StopCardsRecords = StopCardRegisterRepo.getall().ToList()
					.Count(s =>  s.userID == userId&&s.Date.Date== date);


				QHSEDailyReportDTO.PTSMRecords = PTSMRepo.getall().Where(s => s.Date.Date == date && s.RigId == RigId).ToList().Count();
				QHSEDailyReportDTO.DrillsRecords = DrillRepo.getall().Where(s => s.Date.Date == date && s.RigId == RigId).ToList().Count();
				QHSEDailyReportDTO.ManPowerNumber = BOPRepo.getall().Where(s => s.Date.Date == date && s.RigId == RigId).Sum(s => s.ManPower);
				QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReportDTO.ManPowerNumber * 12;
				QHSEDailyReportDTO.RecordableAccident = AccidentRepoistory.getall().Count(s => (s.DateOfEvent == date && s.Rig.Id == RigId) &&
				(s.ClassificationOfAccident.Name == "Lost Time Incident (LTI)" ||
				 s.ClassificationOfAccident.Name == "Fatalities (FAT)" ||
				 s.ClassificationOfAccident.Name == "Restricted Work Days Case (RWDC)" ||
				 s.ClassificationOfAccident.Name == "Medical Treatment Case (MTC)"));

				//QHSEDailyReportDTO.RecordableAccident = AccidentRepoistory.getall().Where(s => (s.RigId == RigId && s.DateOfEvent == dateObject) && (s.ClassificationOfAccident.Name == "Lost Time Incident (LTI)" || s.ClassificationOfAccident.Name == "Fatalities (FAT)" || s.ClassificationOfAccident.Name == "Restricted Work Days Case (RWDC)" || s.ClassificationOfAccident.Name == "Medical Treatment Case (MTC)")).ToList().Count();
				QHSEDailyReportDTO.NonRecordableAccident = AccidentRepoistory.getall().Count(s => s.Rig.Id == RigId && s.DateOfEvent.Date == date && (s.ClassificationOfAccident.Name == "First Aid Case (FAC)" || s.ClassificationOfAccident.Name == "Fire Accident" || s.ClassificationOfAccident.Name == "Property Damage (PD))" || s.ClassificationOfAccident.Name == "Operational Accident"
				|| s.ClassificationOfAccident.Name == "Security Accident" || s.ClassificationOfAccident.Name == "Occupational Accident"
				|| s.ClassificationOfAccident.Name == "Road Traffic Accident (RTA)" || s.ClassificationOfAccident.Name == "Oil, Fuel, Chemicals Spill"
				|| s.ClassificationOfAccident.Name == "Near-Miss Event (NM)" || s.ClassificationOfAccident.Name == "HIPO Near miss"));

				if (QHSEDailyReportDTO != null)
				{
					result.Message = "Success";
					result.Statescode = 200;
					result.Data = QHSEDailyReportDTO;

					return result;
				}
				else
				{
					result.Message = "Empty data";
					result.Statescode = 200;
					result.Data = QHSEDailyReportDTO;

					return result;
				}
			}
		}




		[HttpGet("GetDataByDate")]
		public ActionResult<ResultDTO> GetAllWithDataByDate(DateTime date, string UserId, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReportResponseDTO> QHSEDailyReportDTOs = new List<QHSEDailyReportResponseDTO>();
					List<QHSEDailyReport> QHSEDailyReports = QHSEDailyReportRepoistory.getall().Where(a => a.Date == date).ToList();
					foreach (QHSEDailyReport QHSEDailyReport in QHSEDailyReports)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;
						foreach(var item in QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily)
						{
							Crew SaftyObjCrew= CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDailys.Add(SaftyObjCrew.CrewName);

						}
						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewQuizAndQHSEDaily)
						{
							Crew QuizObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewQuizAndQHSEDailys.Add(QuizObjCrew.CrewName);

						}
						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily)
						{
							LeadershipVisit SaftyObjCrew = LeadershipVisitRepo.getbyid(item.LeadershipVisitId);
							QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDailys.Add(SaftyObjCrew.LeadershipType);

						}
						QHSEDailyReportDTOs.Add(QHSEDailyReportDTO);

					}
					result.Message = "Success";
					result.Data = QHSEDailyReportDTOs;
					result.Statescode = 200;
					return result;
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReportResponseDTO> QHSEDailyReportDTOs = new List<QHSEDailyReportResponseDTO>();
					List<QHSEDailyReport> QHSEDailyReports = QHSEDailyReportRepoistory.getall().Where(a => a.Date == date && a.user.Id == UserId).ToList();
					foreach (QHSEDailyReport QHSEDailyReport in QHSEDailyReports)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily)
						{
							Crew SaftyObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDailys.Add(SaftyObjCrew.CrewName);

						}
						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewQuizAndQHSEDaily)
						{
							Crew QuizObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewQuizAndQHSEDailys.Add(QuizObjCrew.CrewName);

						}
						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily)
						{
							LeadershipVisit SaftyObjCrew = LeadershipVisitRepo.getbyid(item.LeadershipVisitId);
							QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDailys.Add(SaftyObjCrew.LeadershipType);

						}

						QHSEDailyReportDTOs.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}
					result.Message = "Success";
					result.Data = QHSEDailyReportDTOs;
					result.Statescode = 200;
					return result;
				}

			}
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}

			return result;

		}


		[HttpGet("GetPrintDataById")]
		public ActionResult<ResultDTO> GetPrintDataById(int formId, string UserId, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReportResponseDTO> QHSEDailyReportDTOs = new List<QHSEDailyReportResponseDTO>();
					List<QHSEDailyReport> QHSEDailyReports = QHSEDailyReportRepoistory.getall().Where(a => a.Id == formId).ToList();
					foreach (QHSEDailyReport QHSEDailyReport in QHSEDailyReports)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily)
						{
							Crew SaftyObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDailys.Add(SaftyObjCrew.CrewName);

						}
						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewQuizAndQHSEDaily)
						{
							Crew QuizObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewQuizAndQHSEDailys.Add(QuizObjCrew.CrewName);

						}
						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily)
						{
							LeadershipVisit SaftyObjCrew = LeadershipVisitRepo.getbyid(item.LeadershipVisitId);
							QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDailys.Add(SaftyObjCrew.LeadershipType);

						}
						QHSEDailyReportDTOs.Add(QHSEDailyReportDTO);

					}
					result.Message = "Success";
					result.Data = QHSEDailyReportDTOs;
					result.Statescode = 200;
					return result;
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<QHSEDailyReportResponseDTO> QHSEDailyReportDTOs = new List<QHSEDailyReportResponseDTO>();
					List<QHSEDailyReport> QHSEDailyReports = QHSEDailyReportRepoistory.getall().Where(a => a.Id == formId && a.user.Id == UserId).ToList();
					foreach (QHSEDailyReport QHSEDailyReport in QHSEDailyReports)
					{
						QHSEDailyReportResponseDTO QHSEDailyReportDTO = new QHSEDailyReportResponseDTO();
						QHSEDailyReportDTO.Id = QHSEDailyReport.Id;
						QHSEDailyReportDTO.RigNumber = QHSEDailyReport.Rig.Number;
						QHSEDailyReportDTO.Date = QHSEDailyReport.Date;
						QHSEDailyReportDTO.ClientName = QHSEDailyReport.Client.ClientName;
						QHSEDailyReportDTO.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
						QHSEDailyReportDTO.PTSMRecords = QHSEDailyReport.PTSMRecords;
						QHSEDailyReportDTO.DrillsRecords = QHSEDailyReport.DrillsRecords;
						QHSEDailyReportDTO.PTWCold = QHSEDailyReport.PTWCold;
						QHSEDailyReportDTO.PTWHot = QHSEDailyReport.PTWHot;
						QHSEDailyReportDTO.RecordableAccident = QHSEDailyReport.RecordableAccident;
						QHSEDailyReportDTO.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
						QHSEDailyReportDTO.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
						QHSEDailyReportDTO.SafetyInduction = QHSEDailyReport.SafetyInduction;
						QHSEDailyReportDTO.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
						QHSEDailyReportDTO.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
						QHSEDailyReportDTO.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
						QHSEDailyReportDTO.DaysSinceNoLTI = QHSEDailyReport.DaysSinceNoLTI.Days;
						QHSEDailyReportDTO.UserName = QHSEDailyReport.user.UserName;

						QHSEDailyReportDTO.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
						QHSEDailyReportDTO.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
						QHSEDailyReportDTO.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
						QHSEDailyReportDTO.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
						QHSEDailyReportDTO.WallName = QHSEDailyReport.WallName;
						QHSEDailyReportDTO.TotalPTW = QHSEDailyReport.TotalPTW;
						QHSEDailyReportDTO.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
						QHSEDailyReportDTO.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

						List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily = CrewSaftyAlertAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDaily)
						{
							Crew SaftyObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewSaftyAlertAndQHSEDailys.Add(SaftyObjCrew.CrewName);

						}
						List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.CrewQuizAndQHSEDaily = CrewQuizAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.CrewQuizAndQHSEDaily)
						{
							Crew QuizObjCrew = CrewRepo.getbyid(item.CrewId);
							QHSEDailyReportDTO.CrewQuizAndQHSEDailys.Add(QuizObjCrew.CrewName);

						}
						List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == QHSEDailyReport.Id).ToList();
						QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily = LeaderShipVisitsAndQHSEDailys;
						foreach (var item in QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDaily)
						{
							LeadershipVisit SaftyObjCrew = LeadershipVisitRepo.getbyid(item.LeadershipVisitId);
							QHSEDailyReportDTO.LeaderShipVisitsAndQHSEDailys.Add(SaftyObjCrew.LeadershipType);

						}

						QHSEDailyReportDTOs.Add(QHSEDailyReportDTO);
						//result.Data = prod;
					}
					result.Message = "Success";
					result.Data = QHSEDailyReportDTOs;
					result.Statescode = 200;
					return result;
				}

			}
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}

			return result;

		}


		//[HttpGet("GetLastLTIOnFront")]
		//public ActionResult<ResultDTO> GetLastLTIOnFront(DateTime date, int LTIID)
		//{
		//	ResultDTO result = new ResultDTO();

		//	try
		//	{
		//		DaysSinceNoLTIDTO daysSinceNo = new DaysSinceNoLTIDTO();
		//		DaysSinceNoLTI daysSinceNoObj = DaysSinceNoLTIRepo.getbyid(LTIID);

		//		Check if the date exists in either repository
		//		if (LTIPrevDateAndDaysRepo.getall()
		//			.FirstOrDefault(e => e.PrevDate == date && e.DaysSinceNoLTIId == LTIID) != null ||
		//			StaticDateArray.Contains(date))
		//		{
		//			Date was found, decrease days by DaysIncrement
		//			daysSinceNo.Days = daysSinceNoObj.Days - DaysIncrement + 1;
		//			daysSinceNo.DaysAfterIncreasing = daysSinceNoObj.Days + DaysIncrement;
		//		}
		//		else
		//		{
		//			Date is new, update arrays and increase days by DaysIncrement
		//		   StaticDateArray[i] = date;
		//			daysSinceNo.Days = daysSinceNoObj.Days;
		//			daysSinceNo.DaysAfterIncreasing = daysSinceNoObj.Days + DaysIncrement;
		//			daysSinceNoObj.Days += DaysIncrement;
		//			i++;
		//			DaysIncrement++;
		//		}

		//		result.Message = "Success";
		//		result.Data = daysSinceNo;
		//		result.Statescode = 200;
		//		return result;
		//	}
		//	catch (Exception ex)
		//	{
		//		result.Statescode = 404;
		//		result.Message = "Data not found";
		//		Add a return statement to terminate the function in case of an exception
		//		return result;
		//	}
		//}




		[HttpGet("GetLastLTIOnBackend")]
		public ActionResult<ResultDTO> GetLastLTIOnBackend(DateTime date, int LTIID)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				DaysSinceNoLTIDTO daysSinceNo = new DaysSinceNoLTIDTO();
				DaysSinceNoLTI daysSinceNoObj = DaysSinceNoLTIRepo.getbyid(LTIID);
				LTIPrevDateAndDays prev = new LTIPrevDateAndDays();
				prev =LTIPrevDateAndDaysRepo.getall()
					.FirstOrDefault(e => e.PrevDate == date && e.DaysSinceNoLTIId == LTIID);
				//date was found
				if (prev !=null)
				{
					// Date was found, decrease days by DaysIncrement
					LTIPrevDateAndDays Lastprev = new LTIPrevDateAndDays();

					//Lastprev = LTIPrevDateAndDaysRepo.getall()
					//.Where(e => e.DaysSinceNoLTIId == LTIID)
					//.OrderBy(e => e.Id)
					//.LastOrDefault();
					daysSinceNo.Days = daysSinceNoObj.Days - 1; //Lastprev.PrevDays - 1;
					daysSinceNo.DaysAfterIncreasing = daysSinceNoObj.Days;  //Lastprev.PrevDays;
				}
				else
				{
					daysSinceNo.Days = daysSinceNoObj.Days ; //daysSinceNoObj.Days - 1;
					daysSinceNo.DaysAfterIncreasing = daysSinceNoObj.Days + 1;
					LTIPrevDateAndDays Newprev = new LTIPrevDateAndDays();
					Newprev.DaysSinceNoLTIId = LTIID;
					Newprev.PrevDays = daysSinceNo.DaysAfterIncreasing;
					Newprev.PrevDate = date;
					LTIPrevDateAndDaysRepo.create(Newprev);
					daysSinceNoObj.Days = daysSinceNo.DaysAfterIncreasing;
					DaysSinceNoLTIRepo.update(daysSinceNoObj);
				}

				result.Message = "Success";
				result.Data = daysSinceNo;
				result.Statescode = 200;
				return result;
			}
			catch (Exception ex)
			{
				result.Statescode = 404;
				result.Message = "Data not found";
				// Add a return statement to terminate the function in case of an exception
				return result;
			}
		}







		//public ActionResult<ResultDTO> GetLastLTIOnFront(DateTime date,int LTIID)
		//{
		//	ResultDTO result = new ResultDTO();

		//	try
		//	{
		//		DaysSinceNoLTIDTO daysSinceNo = new DaysSinceNoLTIDTO();
		//		DaysSinceNoLTI daysSinceNoObj = DaysSinceNoLTIRepo.getbyid(LTIID);

		//		//date was found
		//		if (LTIPrevDateAndDaysRepo.getall()
		//			.FirstOrDefault(e=>e.PrevDate==date && e.DaysSinceNoLTIId== LTIID) !=null||
		//			StaticDateArray.Contains(date))
		//		{
		//			daysSinceNo.Days = daysSinceNoObj.Days - 1;
		//			daysSinceNo.DaysAfterIncreasing = daysSinceNoObj.Days + 1;
		//		}
		//		else
		//		{
		//			StaticDateArray[i] = date;
		//			daysSinceNo.Days = daysSinceNoObj.Days;
		//			daysSinceNo.DaysAfterIncreasing = daysSinceNoObj.Days + 1;
		//			daysSinceNoObj.Days++;
		//			i++;
		//		}


		//			result.Message = "Success";
		//			result.Data = daysSinceNo;
		//			result.Statescode = 200;
		//			return result;


		//	}
		//	catch (Exception ex)
		//	{
		//		result.Statescode = 404;
		//		result.Message = "data not found";
		//	}

		//	return result;

		//}


		[HttpPost]
		public ActionResult<ResultDTO> AddQHSEDailyReport(AddQHSEDailyDTO QHSEDailyReport)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					QHSEDailyReport QHSEDailyReportObj = new QHSEDailyReport();
					QHSEDailyReportObj.Id = default;
					QHSEDailyReportObj.RigId = QHSEDailyReport.RigId;
					QHSEDailyReportObj.Date = QHSEDailyReport.Date;
					QHSEDailyReportObj.ClientId = QHSEDailyReport.ClientId;
					QHSEDailyReportObj.StopCardsRecords = QHSEDailyReport.StopCardsRecords;
					QHSEDailyReportObj.PTSMRecords = QHSEDailyReport.PTSMRecords;
					QHSEDailyReportObj.DrillsRecords = QHSEDailyReport.DrillsRecords;
					QHSEDailyReportObj.PTWCold = QHSEDailyReport.PTWCold;
					QHSEDailyReportObj.PTWHot = QHSEDailyReport.PTWHot;
					QHSEDailyReportObj.RecordableAccident = QHSEDailyReport.RecordableAccident;
					QHSEDailyReportObj.NonRecordableAccident = QHSEDailyReport.NonRecordableAccident;
					QHSEDailyReportObj.RigVehiclesKilometers = QHSEDailyReport.RigVehiclesKilometers;
					QHSEDailyReportObj.SafetyInduction = QHSEDailyReport.SafetyInduction;
					QHSEDailyReportObj.RigTrackingClosedPoints = QHSEDailyReport.RigTrackingClosedPoints;
					QHSEDailyReportObj.RigTrackingOpenPoints = QHSEDailyReport.RigTrackingOpenPoints;
					QHSEDailyReportObj.DaysSinceLastLTI = QHSEDailyReport.DaysSinceLastLTI;
					QHSEDailyReportObj.DaysSinceNoLTIId = QHSEDailyReport.DaysSinceNoLTIId;
					QHSEDailyReportObj.UserId = QHSEDailyReport.UserId;
					QHSEDailyReportObj.ManPowerNumber = QHSEDailyReport.ManPowerNumber;
					QHSEDailyReportObj.TotalManPowerHours = QHSEDailyReport.TotalManPowerHours;
					QHSEDailyReportObj.WeeklyInspection = QHSEDailyReport.WeeklyInspection;
					QHSEDailyReportObj.MonthlyInspection = QHSEDailyReport.MonthlyInspection;
					QHSEDailyReportObj.WallName = QHSEDailyReport.WallName;
					QHSEDailyReportObj.TotalPTW = QHSEDailyReport.TotalPTW;
					QHSEDailyReportObj.SafetyAlertCrewNumber = QHSEDailyReport.SafetyAlertCrewNumber;
					QHSEDailyReportObj.QuizCrewNumber = QHSEDailyReport.QuizCrewNumber;

					QHSEDailyReportRepo.create(QHSEDailyReportObj);
				
					foreach (var item in QHSEDailyReport.CrewQuizDTO)
					{
						CrewQuizAndQHSEDaily CrewQuizAndQHSEDaily = new CrewQuizAndQHSEDaily();

						CrewQuizAndQHSEDaily.QHSEDailyId = QHSEDailyReportObj.Id;
						CrewQuizAndQHSEDaily.CrewId = item;
						CrewQuizAndQHSEDailyRepo.create(CrewQuizAndQHSEDaily);
					}
					foreach (var item in QHSEDailyReport.CrewSaftyAlertDTO)
					{
						CrewSaftyAlertAndQHSEDaily CrewSaftyAlertAndQHSEDaily = new CrewSaftyAlertAndQHSEDaily();

						CrewSaftyAlertAndQHSEDaily.QHSEDailyId = QHSEDailyReportObj.Id;
						CrewSaftyAlertAndQHSEDaily.CrewId = item;
						CrewSaftyAlertAndQHSEDailyRepo.create(CrewSaftyAlertAndQHSEDaily);
					}
					foreach (var item in QHSEDailyReport.LeaderShipVisitsDTO)
					{
						LeaderShipVisitsAndQHSEDaily LeaderShipVisitsAndQHSEDaily = new LeaderShipVisitsAndQHSEDaily();

						LeaderShipVisitsAndQHSEDaily.QHSEDailyId = QHSEDailyReportObj.Id;
						LeaderShipVisitsAndQHSEDaily.LeadershipVisitId = item;
						LeaderShipVisitsAndQHSEDailyRepo.create(LeaderShipVisitsAndQHSEDaily);
					}
					result.Message = "Success";
					result.Data = QHSEDailyReportObj;
					result.Statescode = 200;
				}
				catch (Exception ex)
				{
					result.Message = "Error in inserting";
					result.Statescode = 400;
				}
			}
			return result;
		}


		[HttpPut("{id:int}")]
		public ActionResult<ResultDTO> Put(int id, AddQHSEDailyDTO newQHSEDailyReport) //[FromBody] string value)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					QHSEDailyReport orgQHSEDailyReport = QHSEDailyReportRepo.getbyid(id);
					newQHSEDailyReport.Id = orgQHSEDailyReport.Id;
					orgQHSEDailyReport.RigId = newQHSEDailyReport.RigId;
					orgQHSEDailyReport.Date = newQHSEDailyReport.Date;
					orgQHSEDailyReport.ClientId = newQHSEDailyReport.ClientId;
					orgQHSEDailyReport.StopCardsRecords = newQHSEDailyReport.StopCardsRecords;
					orgQHSEDailyReport.PTSMRecords = newQHSEDailyReport.PTSMRecords;
					orgQHSEDailyReport.DrillsRecords = newQHSEDailyReport.DrillsRecords;
					orgQHSEDailyReport.PTWCold = newQHSEDailyReport.PTWCold;
					orgQHSEDailyReport.PTWHot = newQHSEDailyReport.PTWHot;
					orgQHSEDailyReport.RecordableAccident = newQHSEDailyReport.RecordableAccident;
					orgQHSEDailyReport.NonRecordableAccident = newQHSEDailyReport.NonRecordableAccident;
					orgQHSEDailyReport.RigVehiclesKilometers = newQHSEDailyReport.RigVehiclesKilometers;
					orgQHSEDailyReport.SafetyInduction = newQHSEDailyReport.SafetyInduction;
					orgQHSEDailyReport.RigTrackingClosedPoints = newQHSEDailyReport.RigTrackingClosedPoints;
					orgQHSEDailyReport.RigTrackingOpenPoints = newQHSEDailyReport.RigTrackingOpenPoints;
					orgQHSEDailyReport.DaysSinceLastLTI = newQHSEDailyReport.DaysSinceLastLTI;
					orgQHSEDailyReport.DaysSinceNoLTIId = newQHSEDailyReport.DaysSinceNoLTIId;
					orgQHSEDailyReport.ManPowerNumber = newQHSEDailyReport.ManPowerNumber;
					orgQHSEDailyReport.TotalManPowerHours = newQHSEDailyReport.TotalManPowerHours;
					orgQHSEDailyReport.WeeklyInspection = newQHSEDailyReport.WeeklyInspection;
					orgQHSEDailyReport.MonthlyInspection = newQHSEDailyReport.MonthlyInspection;
					orgQHSEDailyReport.WallName = newQHSEDailyReport.WallName;
					orgQHSEDailyReport.TotalPTW = newQHSEDailyReport.TotalPTW;
					orgQHSEDailyReport.SafetyAlertCrewNumber = newQHSEDailyReport.SafetyAlertCrewNumber;
					orgQHSEDailyReport.QuizCrewNumber = newQHSEDailyReport.QuizCrewNumber;

					orgQHSEDailyReport.UserId = newQHSEDailyReport.UserId;
					//QHSEDailyReportRepo.update(orgQHSEDailyReport);

					List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(p => p.QHSEDailyId == orgQHSEDailyReport.Id).ToList();
				
						QHSEDailyReportRepo.update(orgQHSEDailyReport);
				
						foreach (var item in CrewSaftyAlertAndQHSEDailys)
						{
							item.IsDeleted = true;
							CrewSaftyAlertAndQHSEDailyRepo.update(item);
						}
						foreach (var item in newQHSEDailyReport.CrewSaftyAlertDTO)
						{
							CrewSaftyAlertAndQHSEDaily CrewSaftyAlertAndQHSEDailyy = new CrewSaftyAlertAndQHSEDaily();

							CrewSaftyAlertAndQHSEDailyy.QHSEDailyId = orgQHSEDailyReport.Id;
							CrewSaftyAlertAndQHSEDailyy.CrewId = item;
							CrewSaftyAlertAndQHSEDailyRepo.create(CrewSaftyAlertAndQHSEDailyy);
						}
					

					List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(p => p.QHSEDailyId == orgQHSEDailyReport.Id).ToList();
				
						QHSEDailyReportRepo.update(orgQHSEDailyReport);
						foreach (var item in CrewQuizAndQHSEDailys)
						{
							item.IsDeleted = true;
							CrewQuizAndQHSEDailyRepo.update(item);
						}
						foreach (var item in newQHSEDailyReport.CrewQuizDTO)
						{
							CrewQuizAndQHSEDaily CrewQuizAndQHSEDailyy = new CrewQuizAndQHSEDaily();

							CrewQuizAndQHSEDailyy.QHSEDailyId = orgQHSEDailyReport.Id;
							CrewQuizAndQHSEDailyy.CrewId = item;
							CrewQuizAndQHSEDailyRepo.create(CrewQuizAndQHSEDailyy);
						}
				
					List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(p => p.QHSEDailyId == orgQHSEDailyReport.Id).ToList();
				
						foreach (var item in LeaderShipVisitsAndQHSEDailys)
						{
							item.IsDeleted = true;
							LeaderShipVisitsAndQHSEDailyRepo.update(item);
						}
						foreach (var item in newQHSEDailyReport.LeaderShipVisitsDTO)
						{
							LeaderShipVisitsAndQHSEDaily LeaderShipVisitsAndQHSEDailyy = new LeaderShipVisitsAndQHSEDaily();
							LeaderShipVisitsAndQHSEDailyy.QHSEDailyId = orgQHSEDailyReport.Id;
							LeaderShipVisitsAndQHSEDailyy.LeadershipVisitId = item;
							LeaderShipVisitsAndQHSEDailyRepo.create(LeaderShipVisitsAndQHSEDailyy);
						}
				

					result.Data = orgQHSEDailyReport;
					result.Statescode = 200;
					return result;

				}
				catch (Exception ex)
				{
					result.Message = "Error in Updating";
					result.Statescode = 400;
					return result;
				}
			}
			return BadRequest(ModelState);
		}




		[HttpPut("Delete/{id:int}")]
		public ActionResult<ResultDTO> Delete(int id) //[FromBody] string value)
		{
			ResultDTO result = new ResultDTO();
			try
			{

				QHSEDailyReport QHSEDailyReport = QHSEDailyReportRepo.getbyid(id);
				List<QHSEDailyReport> returnedList= new List<QHSEDailyReport>();
				//If the date found only one then delete it and decraese by one else don't decrease
				returnedList = QHSEDailyReportRepo.getall().Where(e => e.RigId == QHSEDailyReport.RigId && e.Date == QHSEDailyReport.Date).ToList();
				if(returnedList.Count==1)
				{
					LTIPrevDateAndDays lTIPrev=new LTIPrevDateAndDays();
					lTIPrev=LTIPrevDateAndDaysRepo.getall().FirstOrDefault(e=>e.DaysSinceNoLTIId== QHSEDailyReport.DaysSinceNoLTIId && e.PrevDate== QHSEDailyReport.Date);
					LTIPrevDateAndDaysRepo.delete(lTIPrev);
					DaysSinceNoLTI daysSinceNoLTI = new DaysSinceNoLTI();
					daysSinceNoLTI =DaysSinceNoLTIRepo.getbyid(lTIPrev.DaysSinceNoLTIId);
					daysSinceNoLTI.Days = daysSinceNoLTI.Days - 1;
					DaysSinceNoLTIRepo.update(daysSinceNoLTI);

					QHSEDailyReport.IsDeleted = true;
					

				}
				else if(returnedList.Count>1)
				{
					//LTIPrevDateAndDays lTIPrev = new LTIPrevDateAndDays();
					//lTIPrev = LTIPrevDateAndDaysRepo.getbyid(QHSEDailyReport.DaysSinceNoLTIId);
					//LTIPrevDateAndDaysRepo.delete(lTIPrev);
					QHSEDailyReport.IsDeleted = true;
				}
				
				QHSEDailyReportRepo.update(QHSEDailyReport);
				List<CrewQuizAndQHSEDaily> CrewQuizAndQHSEDailys = CrewQuizAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == id).ToList();
				foreach (var item in CrewQuizAndQHSEDailys)
				{
					item.IsDeleted = true;
					CrewQuizAndQHSEDailyRepo.update(item);
				}

				List<CrewSaftyAlertAndQHSEDaily> CrewSaftyAlertAndQHSEDailys = CrewSaftyAlertAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == id).ToList();
				foreach (var item in CrewSaftyAlertAndQHSEDailys)
				{
					item.IsDeleted = true;
					CrewSaftyAlertAndQHSEDailyRepo.update(item);
				}

				List<LeaderShipVisitsAndQHSEDaily> LeaderShipVisitsAndQHSEDailys = LeaderShipVisitsAndQHSEDailyRepo.getall().Where(a => a.QHSEDailyId == id).ToList();
				foreach (var item in LeaderShipVisitsAndQHSEDailys)
				{
					item.IsDeleted = true;
					LeaderShipVisitsAndQHSEDailyRepo.update(item);
				}
				result.Data = QHSEDailyReport;
				result.Statescode = 200;
				result.Message = "Success";
			}
			catch (Exception ex)
			{
				result.Message = "Error in deleted";
				result.Statescode = 400;
			}

			return result;
		}
	}
}
