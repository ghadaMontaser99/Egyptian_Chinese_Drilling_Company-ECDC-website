using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Drawing.Drawing2D;
using System.Text;
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
	public class AccidentController : ControllerBase
    {
        public IRepository<Accident> accidentRepo { get; set; }
        public IAccidentRepository accidentRepoistory { get; set; }

		private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager;
        public IRepository<AccidentImages> AccidentImagesRepo { get; set; }

        public AccidentController(Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager,IRepository<Accident> _accidentRepo, IAccidentRepository _accidentRepoistory, IRepository<AccidentImages> _AccidentImagesRepo)
        {
            this.accidentRepo = _accidentRepo;
            this.accidentRepoistory = _accidentRepoistory;
            this.userManager = _userManager;
            this.AccidentImagesRepo = _AccidentImagesRepo;
        }

        [HttpGet("GetData")]
        public async Task<ResultDTO> GetAllWithData(string UserID, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<Accident> temp = accidentRepoistory.getall();
					List<AccidentResponseDTO> newTemp = new List<AccidentResponseDTO>();
					foreach (Accident accident in temp)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }
                        newTemp.Add(accidentDTO);
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
					List<Accident> temp = accidentRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
					List<AccidentResponseDTO> newTemp = new List<AccidentResponseDTO>();
					foreach (Accident accident in temp)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;
						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }
                        newTemp.Add(accidentDTO);
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
			catch(Exception ex)
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
					List<Accident> temp = accidentRepoistory.getall();
					List<AccidentExcelDTO> newTemp = new List<AccidentExcelDTO>();
					foreach (Accident accident in temp)
					{
						AccidentExcelDTO accidentDTO = new AccidentExcelDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;
                        foreach (var item in accident.Images)
                        {
                            accidentDTO.images.Add(item.FileName);

                        }

                        newTemp.Add(accidentDTO);
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
					List<Accident> temp = accidentRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
					List<AccidentExcelDTO> newTemp = new List<AccidentExcelDTO>();
					foreach (Accident accident in temp)
					{
						AccidentExcelDTO accidentDTO = new AccidentExcelDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        foreach (var item in accident.Images)
                        {
                            accidentDTO.images.Add(item.FileName);

                        }
                        newTemp.Add(accidentDTO);
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
		public PageResult<AccidentResponseDTO> GettAllStoCardsByPage(string UserId,string UserRole,int? page, int pagesize = 10)
		{

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<Accident> temp = accidentRepoistory.getall();
					List<AccidentResponseDTO> newTemp = new List<AccidentResponseDTO>();
					foreach (Accident accident in temp)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;
                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }

                        newTemp.Add(accidentDTO);
						//result.Data = prod;
					}

					float countDetails = accidentRepoistory.getall().Count();
					var result = new PageResult<AccidentResponseDTO>
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
					List<Accident> temp = accidentRepoistory.getall().Where(a => a.user.Id == UserId).ToList();
					List<AccidentResponseDTO> newTemp = new List<AccidentResponseDTO>();
					foreach (Accident accident in temp)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }
                        newTemp.Add(accidentDTO);
						//result.Data = prod;
					}

					float countDetails = accidentRepoistory.getall().Where(a => a.user.Id == UserId).Count();
					var result = new PageResult<AccidentResponseDTO>
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
				return new PageResult<AccidentResponseDTO>();

			}
			return new PageResult<AccidentResponseDTO>();
		}


		[HttpGet("GetDataById/{ID:int}")]
        public ActionResult<ResultDTO> GetAllWithDataByID(int ID,string UserId,string UserRole)
        {
            ResultDTO result = new ResultDTO();


			if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
            {
				Accident temp = accidentRepoistory.getall().FirstOrDefault(a => a.Id == ID);
				if (temp != null)
				{
					AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
					accidentDTO.id = temp.Id;
					accidentDTO.Rig = temp.Rig.Number;
					accidentDTO.TimeOfEvent = temp.TimeOfEvent;
					accidentDTO.DateOfEvent = temp.DateOfEvent;
					accidentDTO.TypeOfInjury = temp.TypeOfInjury.Name;
					accidentDTO.ViolationCategory = temp.ViolationCategory.Name;
					accidentDTO.AccidentCauses = temp.AccidentCauses.Name;
					accidentDTO.PreventionCategory = temp.PreventionCategory.Name;
					accidentDTO.ClassificationOfAccident = temp.ClassificationOfAccident.Name;
					accidentDTO.AccidentLocation = temp.AccidentLocation;

					accidentDTO.QHSEEmpName = temp.QHSEEmpName;
					accidentDTO.QHSEEmpCode = temp.QHSEEmpCode;
					accidentDTO.QHSEPositionName = temp.QHSEPositionName;

					accidentDTO.DrillerCode = temp.DrillerCode;
					accidentDTO.DrillerName = temp.DrillerName;
					accidentDTO.DrillerPositionName = temp.DrillerPositionName;

					accidentDTO.PusherCode = temp.PusherCode;
					accidentDTO.PusherName = temp.PusherName;
					accidentDTO.PusherPositionName = temp.PusherPositionName;

					accidentDTO.InjuredPersonCode = temp.InjuredPersonCode;
					accidentDTO.InjuredPersonName = temp.InjuredPersonName;
					accidentDTO.InjuredPersonPositionName = temp.InjuredPersonPositionName;

					accidentDTO.DescriptionOfTheEvent = temp.DescriptionOfTheEvent;
					accidentDTO.ImmediateActionType = temp.ImmediateActionType;
					accidentDTO.DirectCauses = temp.DirectCauses;
					accidentDTO.RootCauses = temp.RootCauses;
					accidentDTO.userName = temp.user.UserName;
					accidentDTO.Recommendations = temp.Recommendations;
                    List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == temp.Id).ToList();
                    foreach (var item in accidentImages)
                    {
                        string FileName = item.FileName;
                        accidentDTO.Images.Add(FileName);

                    }

                    if (accidentDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = accidentDTO;

						return result;
					}
				}

			}
			else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
            {
				Accident temp = accidentRepoistory.getall().FirstOrDefault(a => a.Id == ID&&a.user.Id==UserId);
				if (temp != null)
				{
					AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
					accidentDTO.id = temp.Id;
					accidentDTO.Rig = temp.Rig.Number;
					accidentDTO.TimeOfEvent = temp.TimeOfEvent;
					accidentDTO.DateOfEvent = temp.DateOfEvent;
					accidentDTO.TypeOfInjury = temp.TypeOfInjury.Name;
					accidentDTO.ViolationCategory = temp.ViolationCategory.Name;
					accidentDTO.AccidentCauses = temp.AccidentCauses.Name;
					accidentDTO.PreventionCategory = temp.PreventionCategory.Name;
					accidentDTO.ClassificationOfAccident = temp.ClassificationOfAccident.Name;
					accidentDTO.AccidentLocation = temp.AccidentLocation;

					accidentDTO.QHSEEmpName = temp.QHSEEmpName;
					accidentDTO.QHSEEmpCode = temp.QHSEEmpCode;
					accidentDTO.QHSEPositionName = temp.QHSEPositionName;

					accidentDTO.DrillerCode = temp.DrillerCode;
					accidentDTO.DrillerName = temp.DrillerName;
					accidentDTO.DrillerPositionName = temp.DrillerPositionName;

					accidentDTO.PusherCode = temp.PusherCode;
					accidentDTO.PusherName = temp.PusherName;
					accidentDTO.PusherPositionName = temp.PusherPositionName;

					accidentDTO.InjuredPersonCode = temp.InjuredPersonCode;
					accidentDTO.InjuredPersonName = temp.InjuredPersonName;
					accidentDTO.InjuredPersonPositionName = temp.InjuredPersonPositionName;

					accidentDTO.DescriptionOfTheEvent = temp.DescriptionOfTheEvent;
					accidentDTO.ImmediateActionType = temp.ImmediateActionType;
					accidentDTO.DirectCauses = temp.DirectCauses;
					accidentDTO.RootCauses = temp.RootCauses;
					accidentDTO.userName = temp.user.UserName;
					accidentDTO.Recommendations = temp.Recommendations;

                    List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == temp.Id).ToList();
                    foreach (var item in accidentImages)
                    {
                        string FileName = item.FileName;
                        accidentDTO.Images.Add(FileName);

                    }
                    if (accidentDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = accidentDTO;

						return result;
					}
				}

			}

			result.Statescode = 404;
            result.Message = "data not found";
            return result;
        }


        [HttpGet("GetDataByDate/{date:DateTime}")]
        public ActionResult<ResultDTO> GetAllWithDataByDate(DateTime date,string UserId,string UserRole)
        {
            ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<AccidentResponseDTO> accidentDTOs = new List<AccidentResponseDTO>();
					List<Accident> accidents = accidentRepoistory.getall().Where(a => a.DateOfEvent == date).ToList();
					foreach (Accident accident in accidents)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }
                        accidentDTOs.Add(accidentDTO);

					}
					result.Message = "Success";
					result.Data = accidentDTOs;
					result.Statescode = 200;
					return result;
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<AccidentResponseDTO> accidentDTOs = new List<AccidentResponseDTO>();
					List<Accident> accidents = accidentRepoistory.getall().Where(a => a.DateOfEvent == date && a.user.Id == UserId).ToList();
					foreach (Accident accident in accidents)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }
                        accidentDTOs.Add(accidentDTO);

					}
					result.Message = "Success";
					result.Data = accidentDTOs;
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

        [HttpGet("GetDataByClass/{Class:int}")]
        public ActionResult<ResultDTO> GetAllWithDataByClassification(int Class,string UserId,string UserRole)
        {
            ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<AccidentResponseDTO> accidentDTOs = new List<AccidentResponseDTO>();
					List<Accident> accidents = accidentRepoistory.getall().Where(a => a.ClassificationOfAccidentId == Class).ToList();
					foreach (Accident accident in accidents)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;
                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }

                        accidentDTOs.Add(accidentDTO);

					}
					result.Message = "Success";
					result.Data = accidentDTOs;
					result.Statescode = 200;
					return result;
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<AccidentResponseDTO> accidentDTOs = new List<AccidentResponseDTO>();
					List<Accident> accidents = accidentRepoistory.getall().Where(a => a.ClassificationOfAccidentId == Class && a.user.Id == UserId).ToList();
					foreach (Accident accident in accidents)
					{
						AccidentResponseDTO accidentDTO = new AccidentResponseDTO();
						accidentDTO.id = accident.Id;
						accidentDTO.Rig = accident.Rig.Number;
						accidentDTO.TimeOfEvent = accident.TimeOfEvent;
						accidentDTO.DateOfEvent = accident.DateOfEvent;
						accidentDTO.TypeOfInjury = accident.TypeOfInjury.Name;
						accidentDTO.ViolationCategory = accident.ViolationCategory.Name;
						accidentDTO.AccidentCauses = accident.AccidentCauses.Name;
						accidentDTO.PreventionCategory = accident.PreventionCategory.Name;
						accidentDTO.ClassificationOfAccident = accident.ClassificationOfAccident.Name;
						accidentDTO.AccidentLocation = accident.AccidentLocation;

						accidentDTO.QHSEEmpName = accident.QHSEEmpName;
						accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
						accidentDTO.QHSEPositionName = accident.QHSEPositionName;

						accidentDTO.DrillerCode = accident.DrillerCode;
						accidentDTO.DrillerName = accident.DrillerName;
						accidentDTO.DrillerPositionName = accident.DrillerPositionName;

						accidentDTO.PusherCode = accident.PusherCode;
						accidentDTO.PusherName = accident.PusherName;
						accidentDTO.PusherPositionName = accident.PusherPositionName;

						accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
						accidentDTO.InjuredPersonName = accident.InjuredPersonName;
						accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;

						accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
						accidentDTO.ImmediateActionType = accident.ImmediateActionType;
						accidentDTO.DirectCauses = accident.DirectCauses;
						accidentDTO.RootCauses = accident.RootCauses;
						accidentDTO.userName = accident.user.UserName;
						accidentDTO.Recommendations = accident.Recommendations;

                        List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                        foreach (var item in accidentImages)
                        {
                            string FileName = item.FileName;
                            accidentDTO.Images.Add(FileName);

                        }
                        accidentDTOs.Add(accidentDTO);

					}
					result.Message = "Success";
					result.Data = accidentDTOs;
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




		[HttpGet("{ID:int}")]
		public ActionResult<ResultDTO> GetByID(int ID, string UserId, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					Accident accident = accidentRepo.getall().FirstOrDefault(a => a.Id == ID);
					AccidentDTO accidentDTO = new AccidentDTO();
					accidentDTO.id = accident.Id;
					accidentDTO.RigId = accident.RigId;
					accidentDTO.TimeOfEvent = accident.TimeOfEvent;
					accidentDTO.DateOfEvent = accident.DateOfEvent;
					accidentDTO.TypeOfInjuryID = accident.TypeOfInjuryID;
					accidentDTO.ViolationCategoryId = accident.ViolationCategoryId;
					accidentDTO.AccidentCausesId = accident.AccidentCausesId;
					accidentDTO.PreventionCategoryId = accident.PreventionCategoryId;
					accidentDTO.ClassificationOfAccidentId = accident.ClassificationOfAccidentId;
					accidentDTO.AccidentLocation = accident.AccidentLocation;
					accidentDTO.QHSEEmpName = accident.QHSEEmpName;
					accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
					accidentDTO.QHSEPositionName = accident.QHSEPositionName;

					accidentDTO.DrillerCode = accident.DrillerCode;
					accidentDTO.DrillerName = accident.DrillerName;
					accidentDTO.DrillerPositionName = accident.DrillerPositionName;

					accidentDTO.PusherCode = accident.PusherCode;
					accidentDTO.PusherName = accident.PusherName;
					accidentDTO.PusherPositionName = accident.PusherPositionName;

					accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
					accidentDTO.InjuredPersonName = accident.InjuredPersonName;
					accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;
					accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
					accidentDTO.ImmediateActionType = accident.ImmediateActionType;
					accidentDTO.DirectCauses = accident.DirectCauses;
					accidentDTO.RootCauses = accident.RootCauses;
					accidentDTO.userID = accident.userID;
					accidentDTO.Recommendations = accident.Recommendations;


                    List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                    foreach (var item in accidentImages)
                    {
                        string FileName = item.FileName;
                        accidentDTO.Imagess.Add(FileName);

                    }
                    result.Message = "Success";
					result.Data = accidentDTO;
					result.Statescode = 200;
					return result;

				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					Accident accident = accidentRepo.getall().FirstOrDefault(a => a.Id == ID && a.userID == UserId);
					AccidentDTO accidentDTO = new AccidentDTO();
					accidentDTO.id = accident.Id;
					accidentDTO.RigId = accident.RigId;
					accidentDTO.TimeOfEvent = accident.TimeOfEvent;
					accidentDTO.DateOfEvent = accident.DateOfEvent;
					accidentDTO.TypeOfInjuryID = accident.TypeOfInjuryID;
					accidentDTO.ViolationCategoryId = accident.ViolationCategoryId;
					accidentDTO.AccidentCausesId = accident.AccidentCausesId;
					accidentDTO.PreventionCategoryId = accident.PreventionCategoryId;
					accidentDTO.ClassificationOfAccidentId = accident.ClassificationOfAccidentId;
					accidentDTO.AccidentLocation = accident.AccidentLocation;
					accidentDTO.QHSEEmpName = accident.QHSEEmpName;
					accidentDTO.QHSEEmpCode = accident.QHSEEmpCode;
					accidentDTO.QHSEPositionName = accident.QHSEPositionName;

					accidentDTO.DrillerCode = accident.DrillerCode;
					accidentDTO.DrillerName = accident.DrillerName;
					accidentDTO.DrillerPositionName = accident.DrillerPositionName;

					accidentDTO.PusherCode = accident.PusherCode;
					accidentDTO.PusherName = accident.PusherName;
					accidentDTO.PusherPositionName = accident.PusherPositionName;

					accidentDTO.InjuredPersonCode = accident.InjuredPersonCode;
					accidentDTO.InjuredPersonName = accident.InjuredPersonName;
					accidentDTO.InjuredPersonPositionName = accident.InjuredPersonPositionName;
					accidentDTO.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
					accidentDTO.ImmediateActionType = accident.ImmediateActionType;
					accidentDTO.DirectCauses = accident.DirectCauses;
					accidentDTO.RootCauses = accident.RootCauses;
					accidentDTO.userID = accident.userID;
					accidentDTO.Recommendations = accident.Recommendations;


					  List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == accident.Id).ToList();
                    foreach (var item in accidentImages)
                    {
                        string FileName = item.FileName;
                        accidentDTO.Imagess.Add(FileName);

                    }
						result.Message = "Success";
						result.Data = accidentDTO;
						result.Statescode = 200;
						return result;
					}
				

			}
			catch (Exception Ex)
			{
				result.Statescode = 404;
				result.Message = "data not found";
			}

			return result;
		}

		[HttpPost]
        public ActionResult<ResultDTO> AddAccident([FromForm] AccidentDTO accident)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    Accident acci = new Accident();
                    acci.Id = default;
                    acci.RigId = accident.RigId;
                    acci.TimeOfEvent = accident.TimeOfEvent;
                    acci.DateOfEvent = accident.DateOfEvent;
                    acci.TypeOfInjuryID = accident.TypeOfInjuryID;
                    acci.ViolationCategoryId = accident.ViolationCategoryId;
                    acci.AccidentCausesId = accident.AccidentCausesId;
                    acci.PreventionCategoryId = accident.PreventionCategoryId;
                    acci.ClassificationOfAccidentId = accident.ClassificationOfAccidentId;
                    acci.AccidentLocation = accident.AccidentLocation;

					acci.QHSEEmpName = accident.QHSEEmpName;
					acci.QHSEEmpCode = accident.QHSEEmpCode;
					acci.QHSEPositionName = accident.QHSEPositionName;

					acci.DrillerCode = accident.DrillerCode;
					acci.DrillerName = accident.DrillerName;
					acci.DrillerPositionName = accident.DrillerPositionName;

					acci.PusherCode = accident.PusherCode;
					acci.PusherName = accident.PusherName;
					acci.PusherPositionName = accident.PusherPositionName;

					acci.InjuredPersonCode = accident.InjuredPersonCode;
					acci.InjuredPersonName = accident.InjuredPersonName;
					acci.InjuredPersonPositionName = accident.InjuredPersonPositionName;

					acci.DescriptionOfTheEvent = accident.DescriptionOfTheEvent;
                    acci.ImmediateActionType = accident.ImmediateActionType;
                    acci.DirectCauses = accident.DirectCauses;
                    acci.RootCauses = accident.RootCauses;
                    acci.userID = accident.userID;

                    acci.Recommendations = accident.Recommendations;
                  


                    accidentRepo.create(acci);
                    foreach (var item in accident.Images)
                    {
                        AccidentImages accidentImages = new AccidentImages();
                        accidentImages.FileName = ImagesHelper.uploadImg(item, "AccidentIMG");
                        accidentImages.AccidentId = acci.Id;
                        AccidentImagesRepo.create(accidentImages);
                    }
                    result.Message = "Success";
                    result.Data = acci;
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
        public ActionResult<ResultDTO> Put(int id, [FromForm] AccidentDTO newAccident) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
				try
				{
					Accident orgAccd = accidentRepo.getbyid(id);
					newAccident.id = orgAccd.Id;
					orgAccd.RigId = newAccident.RigId;
					orgAccd.TimeOfEvent = newAccident.TimeOfEvent;
					orgAccd.DateOfEvent = newAccident.DateOfEvent;
					orgAccd.TypeOfInjuryID = newAccident.TypeOfInjuryID;
					orgAccd.ViolationCategoryId = newAccident.ViolationCategoryId;
					orgAccd.AccidentCausesId = newAccident.AccidentCausesId;
					orgAccd.PreventionCategoryId = newAccident.PreventionCategoryId;
					orgAccd.ClassificationOfAccidentId = newAccident.ClassificationOfAccidentId;
					orgAccd.AccidentLocation = newAccident.AccidentLocation;

					orgAccd.QHSEEmpName = newAccident.QHSEEmpName;
					orgAccd.QHSEEmpCode = newAccident.QHSEEmpCode;
					orgAccd.QHSEPositionName = newAccident.QHSEPositionName;

					orgAccd.DrillerCode = newAccident.DrillerCode;
					orgAccd.DrillerName = newAccident.DrillerName;
					orgAccd.DrillerPositionName = newAccident.DrillerPositionName;

					orgAccd.PusherCode = newAccident.PusherCode;
					orgAccd.PusherName = newAccident.PusherName;
					orgAccd.PusherPositionName = newAccident.PusherPositionName;

					orgAccd.InjuredPersonCode = newAccident.InjuredPersonCode;
					orgAccd.InjuredPersonName = newAccident.InjuredPersonName;
					orgAccd.InjuredPersonPositionName = newAccident.InjuredPersonPositionName;

					orgAccd.DescriptionOfTheEvent = newAccident.DescriptionOfTheEvent;
					orgAccd.ImmediateActionType = newAccident.ImmediateActionType;
					orgAccd.DirectCauses = newAccident.DirectCauses;
					orgAccd.RootCauses = newAccident.RootCauses;
					//orgAccd.userID = newAccident.userID;

					orgAccd.Recommendations = newAccident.Recommendations;
					List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == newAccident.id).ToList();
					int p = 1;//Equal
					if (newAccident.Images.IsNullOrEmpty())
					{
						p = 1;//equal to the old
					}
					else if (accidentImages.Count == newAccident.Images.Count)
					{
						foreach (var image in accidentImages)
						{
							foreach (var image1 in newAccident.Images)
							{
								if (image.FileName != image1.FileName)
								{
									p = 0;//Not Equal
								}


							}
						}
					}
					else
					{
						p = 0;
					}
					if (p == 1)
					{
                        accidentRepo.update(orgAccd);
                        result.Data = orgAccd;
                        result.Statescode = 200;
                        return result;
                    }
					else
					{
						// Clear the existing images
						foreach (var image in accidentImages)
						{
							DeleteImagesHelper.DeleteImage(image.FileName, "AccidentIMG");
                            AccidentImagesRepo.delete(image);
						}

						// Add the new images to the list

						foreach (var item in newAccident.Images)
						{
							AccidentImages accidentImagess = new AccidentImages();
							accidentImagess.FileName = ImagesHelper.uploadImg(item, "AccidentIMG");
							accidentImagess.AccidentId = orgAccd.Id;
							AccidentImagesRepo.create(accidentImagess);
						}


						accidentRepo.update(orgAccd);
						result.Data = orgAccd;
						result.Statescode = 200;
						return result;
					}
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
                List<AccidentImages> accidentImages = AccidentImagesRepo.getall().Where(p => p.AccidentId == id).ToList();
                foreach (var item in accidentImages)
                {

                    AccidentImages accidentImage = AccidentImagesRepo.getbyid(item.Id);
                    DeleteImagesHelper.DeleteImage(accidentImage.FileName, "AccidentIMG");

                    accidentImage.IsDeleted = true;
                    //drillImage.Id = item.Id;

                    AccidentImagesRepo.update(accidentImage);

                }
                Accident accident = accidentRepo.getbyid(id);
                accident.IsDeleted = true;
                accidentRepo.update(accident);
                result.Data = accident;
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
