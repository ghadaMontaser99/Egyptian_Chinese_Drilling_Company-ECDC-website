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
	public class PotentialHazardController : ControllerBase
	{
		public IRepository<PotentialHazard> PotentialHazardRepo { get; set; }
		public IRepository<HazardImages> HazardImagesRepo { get; set; }

		public IPotentialHazardRepository PotentialHazardRepoistory { get; set; }

		private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager;


		public PotentialHazardController(Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager,
			IRepository<PotentialHazard> _PotentialHazardRepo,
			IPotentialHazardRepository _PotentialHazardRepoistory,
			IRepository<HazardImages> _HazardImagesRepo)
		{
			this.PotentialHazardRepo = _PotentialHazardRepo;
			this.PotentialHazardRepoistory = _PotentialHazardRepoistory;
			this.userManager = _userManager;
			this.HazardImagesRepo = _HazardImagesRepo;
		}

		[HttpGet("GetData")]
		public async Task<ResultDTO> GetAllWithData(string UserID, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<PotentialHazard> temp = PotentialHazardRepoistory.getall();
					List<PotentialHazardResponseDTO> newTemp = new List<PotentialHazardResponseDTO>();
					foreach (PotentialHazard potentialHazard in temp)
					{
						PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
						potentialHazardDTO.Id = potentialHazard.Id;
						potentialHazardDTO.RigId = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.Status = potentialHazard.Status;
						potentialHazardDTO.Title = potentialHazard.Title;

						potentialHazardDTO.userID = potentialHazard.user.Id;
						List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
						foreach (var item in hazardImages)
						{
							string FileName = item.FileName;
							potentialHazardDTO.Images.Add(FileName);

						}

						//potentialHazardDTO.Images = potentialHazard.Images;

						newTemp.Add(potentialHazardDTO);
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
					List<PotentialHazard> temp = PotentialHazardRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
					List<PotentialHazardResponseDTO> newTemp = new List<PotentialHazardResponseDTO>();
					foreach (PotentialHazard potentialHazard in temp)
					{
						PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
						potentialHazardDTO.Id = potentialHazard.Id;
						potentialHazardDTO.RigId = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.Status = potentialHazard.Status;

						potentialHazardDTO.userID = potentialHazard.user.Id;
						List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
						foreach (var item in hazardImages)
						{
							string FileName = item.FileName;
							potentialHazardDTO.Images.Add(FileName);

						}
						//potentialHazardDTO.Images = potentialHazard.Images;

						newTemp.Add(potentialHazardDTO);
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
					List<PotentialHazard> temp = PotentialHazardRepoistory.getall();
					List<PotentialHazardExcelDTO> newTemp = new List<PotentialHazardExcelDTO>();
					foreach (PotentialHazard potentialHazard in temp)
					{
						PotentialHazardExcelDTO potentialHazardDTO = new PotentialHazardExcelDTO();
						potentialHazardDTO.id = potentialHazard.Id;
						potentialHazardDTO.Rig = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Status = potentialHazard.Status;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.userName = potentialHazard.user.UserName;
						potentialHazardDTO.Responibility = potentialHazard.Responsibility.Name;
						foreach (var item in potentialHazard.Images)
						{
							potentialHazardDTO.images.Add(item.FileName);

						}
						newTemp.Add(potentialHazardDTO);
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
					List<PotentialHazard> temp = PotentialHazardRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
					List<PotentialHazardExcelDTO> newTemp = new List<PotentialHazardExcelDTO>();
					foreach (PotentialHazard potentialHazard in temp)
					{
						PotentialHazardExcelDTO potentialHazardDTO = new PotentialHazardExcelDTO();
						potentialHazardDTO.id = potentialHazard.Id;
						potentialHazardDTO.Rig = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Status = potentialHazard.Status;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.userName = potentialHazard.user.UserName;
						potentialHazardDTO.Responibility = potentialHazard.Responsibility.Name;
						foreach (var item in potentialHazard.Images)
						{
							potentialHazardDTO.images.Add(item.FileName);

						}
						newTemp.Add(potentialHazardDTO);
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
		public PageResult<PotentialHazardResponseDTO> GettAllPotentialHazardByPage(string UserId, string UserRole, int? page, int pagesize = 10)
		{

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<PotentialHazard> temp = PotentialHazardRepoistory.getall();
					List<PotentialHazardResponseDTO> newTemp = new List<PotentialHazardResponseDTO>();
					foreach (PotentialHazard potentialHazard in temp)
					{
						PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
						potentialHazardDTO.Id = potentialHazard.Id;
						potentialHazardDTO.RigId = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.Status = potentialHazard.Status;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.userName = potentialHazard.user.UserName;

						potentialHazardDTO.userID = potentialHazard.user.Id;
						List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
						foreach (var item in hazardImages)
						{
							string FileName = item.FileName;
							potentialHazardDTO.Images.Add(FileName);
						}


						newTemp.Add(potentialHazardDTO);
						//result.Data = prod;
					}

					float countDetails = PotentialHazardRepoistory.getall().Count();
					var result = new PageResult<PotentialHazardResponseDTO>
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
					List<PotentialHazard> temp = PotentialHazardRepoistory.getall().Where(a => a.user.Id == UserId).ToList();
					List<PotentialHazardResponseDTO> newTemp = new List<PotentialHazardResponseDTO>();
					foreach (PotentialHazard potentialHazard in temp)
					{
						PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
						potentialHazardDTO.Id = potentialHazard.Id;
						potentialHazardDTO.RigId = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.Status = potentialHazard.Status;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.userName = potentialHazard.user.UserName;

						potentialHazardDTO.userID = potentialHazard.user.Id;
						List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
						foreach (var item in hazardImages)
						{
							string FileName = item.FileName;
							potentialHazardDTO.Images.Add(FileName);

						}


						newTemp.Add(potentialHazardDTO);
						//result.Data = prod;
					}

					float countDetails = PotentialHazardRepoistory.getall().Where(a => a.user.Id == UserId).Count();
					var result = new PageResult<PotentialHazardResponseDTO>
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
				return new PageResult<PotentialHazardResponseDTO>();

			}
			return new PageResult<PotentialHazardResponseDTO>();
		}

		[HttpGet("GetDataById/{ID:int}")]
		public ActionResult<ResultDTO> GetAllWithDataByID(int ID, string UserId, string UserRole)
		{
			ResultDTO result = new ResultDTO();


			if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
			{
				PotentialHazard temp = PotentialHazardRepoistory.getall().FirstOrDefault(a => a.Id == ID);
				if (temp != null)
				{
					PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
					potentialHazardDTO.Id = temp.Id;
					potentialHazardDTO.RigId = temp.Rig.Id;
					potentialHazardDTO.Date = temp.Date;
					potentialHazardDTO.PO_No = temp.PO_No;
					potentialHazardDTO.PR_No = temp.PR_No;
					potentialHazardDTO.ResponibilityName = temp.Responsibility.Name;
					potentialHazardDTO.PR_IssueDate = temp.PR_IssueDate;
					potentialHazardDTO.Description = temp.Description;
					potentialHazardDTO.NeededAction = temp.NeededAction;
					potentialHazardDTO.Title = temp.Title;
					potentialHazardDTO.Status = temp.Status;
					potentialHazardDTO.ResponsibilityId = temp.ResponibilityId;

					potentialHazardDTO.userID = temp.user.Id;
					List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == temp.Id).ToList();
					foreach (var item in hazardImages)
					{
						string FileName = item.FileName;
						potentialHazardDTO.Images.Add(FileName);

					}

					if (potentialHazardDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = potentialHazardDTO;

						return result;
					}
				}

			}
			else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
			{
				PotentialHazard temp = PotentialHazardRepoistory.getall().FirstOrDefault(a => a.Id == ID && a.user.Id == UserId);
				if (temp != null)
				{
					PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
					potentialHazardDTO.Id = temp.Id;
					potentialHazardDTO.RigId = temp.Rig.Id;
					potentialHazardDTO.Date = temp.Date;
					potentialHazardDTO.PO_No = temp.PO_No;
					potentialHazardDTO.PR_No = temp.PR_No;
					potentialHazardDTO.ResponibilityName = temp.Responsibility.Name;
					potentialHazardDTO.PR_IssueDate = temp.PR_IssueDate;
					potentialHazardDTO.Description = temp.Description;
					potentialHazardDTO.NeededAction = temp.NeededAction;
					potentialHazardDTO.Title = temp.Title;
					potentialHazardDTO.Status = temp.Status;

					potentialHazardDTO.userID = temp.user.Id;
					List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == temp.Id).ToList();
					foreach (var item in hazardImages)
					{
						string FileName = item.FileName;
						potentialHazardDTO.Images.Add(FileName);

					}


					if (potentialHazardDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = potentialHazardDTO;

						return result;
					}
				}

			}

			result.Statescode = 404;
			result.Message = "data not found";
			return result;
		}
		[HttpGet("GetAllForAnalysis/{Year:int}")]
		public ActionResult<ResultDTO> GetAllForAnalysis(string UserID, string UserRole, int Year)
		{

			ResultDTO result = new ResultDTO();
			try
			{

				List<PotentialHazard> temp = PotentialHazardRepo.getall().Where(r => r.Date.Year == Year).ToList();


				List<PotentialHazardResponseDTO> newTemp = new List<PotentialHazardResponseDTO>();
				foreach (PotentialHazard potentialHazard in temp)
				{
					PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
					potentialHazardDTO.Id = potentialHazard.Id;
					potentialHazardDTO.RigId = potentialHazard.RigId;
					potentialHazardDTO.Date = potentialHazard.Date;
					potentialHazardDTO.PO_No = potentialHazard.PO_No;
					potentialHazardDTO.PR_No = potentialHazard.PR_No;
					potentialHazardDTO.ResponsibilityId = potentialHazard.ResponibilityId;
					potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
					potentialHazardDTO.Description = potentialHazard.Description;
					potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
					potentialHazardDTO.Status = potentialHazard.Status;
					potentialHazardDTO.Title = potentialHazard.Title;

					potentialHazardDTO.userID = potentialHazard.userID;
					List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
					foreach (var item in hazardImages)
					{
						string FileName = item.FileName;
						potentialHazardDTO.Images.Add(FileName);

					}


					newTemp.Add(potentialHazardDTO);

				}
				if (newTemp != null)
				{

					result.Message = "Success";
					result.Statescode = 200;
					result.Data = newTemp;

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
	




		[HttpGet("GetDataByRigNumber/{RigNumber:int}")]
		public ActionResult<ResultDTO> GetAllWithDataByRigNumber(int RigNumber, string UserId, string UserRole,string title)
		{
			ResultDTO result = new ResultDTO();

			try
			{
				if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
				{
					List<PotentialHazardResponseDTO> PotentialHazardDTOs = new List<PotentialHazardResponseDTO>();
					List<PotentialHazard> potentialHazards = PotentialHazardRepoistory.getall().Where(a => a.Rig.Number == RigNumber&&a.Status=="Open"&&a.Title==title).ToList();
					foreach (PotentialHazard potentialHazard in potentialHazards)
					{
						PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
						potentialHazardDTO.Id = potentialHazard.Id;
						potentialHazardDTO.RigId = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.Status = potentialHazard.Status;

						potentialHazardDTO.userID = potentialHazard.user.Id;
						List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
						foreach (var item in hazardImages)
						{
							string FileName = item.FileName;
							potentialHazardDTO.Images.Add(FileName);

						}
						//potentialHazardDTO.Images = potentialHazard.Images;

						PotentialHazardDTOs.Add(potentialHazardDTO);
						//result.Data = prod;
					}
					result.Message = "Success";
					result.Data = PotentialHazardDTOs;
					result.Statescode = 200;
					return result;
				}
				else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
				{
					List<PotentialHazardResponseDTO> PotentialHazardDTOs = new List<PotentialHazardResponseDTO>();
					List<PotentialHazard> potentialHazards = PotentialHazardRepoistory.getall().Where(a => a.Rig.Number == RigNumber && a.Status == "Open" && a.user.Id == UserId&&a.Title==title).ToList();
					foreach (PotentialHazard potentialHazard in potentialHazards)
					{
						PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
						potentialHazardDTO.Id = potentialHazard.Id;
						potentialHazardDTO.RigId = potentialHazard.Rig.Number;
						potentialHazardDTO.Date = potentialHazard.Date;
						potentialHazardDTO.PO_No = potentialHazard.PO_No;
						potentialHazardDTO.PR_No = potentialHazard.PR_No;
						potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
						potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
						potentialHazardDTO.Description = potentialHazard.Description;
						potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
						potentialHazardDTO.Title = potentialHazard.Title;
						potentialHazardDTO.Status = potentialHazard.Status;

						potentialHazardDTO.userID = potentialHazard.user.Id;
						List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
						foreach (var item in hazardImages)
						{
							string FileName = item.FileName;
							potentialHazardDTO.Images.Add(FileName);

						}
						//potentialHazardDTO.Images = potentialHazard.Images;

						PotentialHazardDTOs.Add(potentialHazardDTO);
						//result.Data = prod;
					}
					result.Message = "Success";
					result.Data = PotentialHazardDTOs;
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




        [HttpGet("PrintDataById")]
        public ActionResult<ResultDTO> PrintDataById(int ID,string UserId, string UserRole)
        {
            ResultDTO result = new ResultDTO();

            try
            {
                if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    List<PotentialHazardResponseDTO> PotentialHazardDTOs = new List<PotentialHazardResponseDTO>();
                    PotentialHazard potentialHazard = PotentialHazardRepoistory.getall().FirstOrDefault(a =>   a.Status == "Open" && a.Id == ID);
                  
                        PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
                        potentialHazardDTO.Id = potentialHazard.Id;
                        potentialHazardDTO.RigId = potentialHazard.Rig.Number;
                        potentialHazardDTO.Date = potentialHazard.Date;
                        potentialHazardDTO.PO_No = potentialHazard.PO_No;
                        potentialHazardDTO.PR_No = potentialHazard.PR_No;
                        potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
                        potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
                        potentialHazardDTO.Description = potentialHazard.Description;
                        potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
                        potentialHazardDTO.Title = potentialHazard.Title;
                        potentialHazardDTO.Status = potentialHazard.Status;

                        potentialHazardDTO.userID = potentialHazard.user.Id;
                        List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
                        foreach (var item in hazardImages)
                        {
                            string FileName = item.FileName;
                            potentialHazardDTO.Images.Add(FileName);

                        }
                        //potentialHazardDTO.Images = potentialHazard.Images;

                        PotentialHazardDTOs.Add(potentialHazardDTO);
                        //result.Data = prod;
                    
                    result.Message = "Success";
                    result.Data = PotentialHazardDTOs;
                    result.Statescode = 200;
                    return result;
                }
                else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
                {
                    List<PotentialHazardResponseDTO> PotentialHazardDTOs = new List<PotentialHazardResponseDTO>();
                    PotentialHazard potentialHazard = PotentialHazardRepoistory.getall().FirstOrDefault(a => a.Id == ID && a.Status == "Open" && a.user.Id == UserId);
                    
                        PotentialHazardResponseDTO potentialHazardDTO = new PotentialHazardResponseDTO();
                        potentialHazardDTO.Id = potentialHazard.Id;
                        potentialHazardDTO.RigId = potentialHazard.Rig.Number;
                        potentialHazardDTO.Date = potentialHazard.Date;
                        potentialHazardDTO.PO_No = potentialHazard.PO_No;
                        potentialHazardDTO.PR_No = potentialHazard.PR_No;
                        potentialHazardDTO.ResponibilityName = potentialHazard.Responsibility.Name;
                        potentialHazardDTO.PR_IssueDate = potentialHazard.PR_IssueDate;
                        potentialHazardDTO.Description = potentialHazard.Description;
                        potentialHazardDTO.NeededAction = potentialHazard.NeededAction;
                        potentialHazardDTO.Title = potentialHazard.Title;
                        potentialHazardDTO.Status = potentialHazard.Status;

                        potentialHazardDTO.userID = potentialHazard.user.Id;
                        List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == potentialHazard.Id).ToList();
                        foreach (var item in hazardImages)
                        {
                            string FileName = item.FileName;
                            potentialHazardDTO.Images.Add(FileName);

                        }
                        //potentialHazardDTO.Images = potentialHazard.Images;

                        PotentialHazardDTOs.Add(potentialHazardDTO);
                        //result.Data = prod;
                    
                    result.Message = "Success";
                    result.Data = PotentialHazardDTOs;
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


        [HttpPost]
        public ActionResult<ResultDTO> AddPotentialHazard([FromForm] PotentialHazardDTO potentialHazard)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
					PotentialHazard potentialHazardObj = new PotentialHazard();
					potentialHazardObj.Id = default;
					potentialHazardObj.RigId = potentialHazard.RigId;
					potentialHazardObj.Date = potentialHazard.Date;
					potentialHazardObj.PO_No = potentialHazard.PO_No;
					potentialHazardObj.PR_No = potentialHazard.PR_No;
					potentialHazardObj.ResponibilityId = potentialHazard.ResponibilityId;
					potentialHazardObj.PR_IssueDate = potentialHazard.PR_IssueDate;
					potentialHazardObj.Description = potentialHazard.Description;
					potentialHazardObj.NeededAction = potentialHazard.NeededAction;
					potentialHazardObj.Status = potentialHazard.Status;
					potentialHazardObj.Title = potentialHazard.Title;

					potentialHazardObj.userID = potentialHazard.userID;


					PotentialHazardRepo.create(potentialHazardObj);
					foreach(var item in potentialHazard.Images)
					{
						HazardImages hazardImages = new HazardImages();
						hazardImages.FileName= ImagesHelper.uploadImg(item, "HazardIMG");
						hazardImages.PotentialHazardId= potentialHazardObj.Id;
						HazardImagesRepo.create(hazardImages);
					}

					result.Message = "Success";
                    result.Data = potentialHazardObj;
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
		public ActionResult<ResultDTO> Put(int id, [FromForm] PotentialHazardDTO newPotentialHazard) //[FromBody] string value)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					PotentialHazard orgPotentialHazard = PotentialHazardRepo.getbyid(id);
					newPotentialHazard.Id = orgPotentialHazard.Id;
					orgPotentialHazard.RigId = newPotentialHazard.RigId;
					orgPotentialHazard.Date = newPotentialHazard.Date;
					orgPotentialHazard.PO_No = newPotentialHazard.PO_No;
					orgPotentialHazard.PR_No = newPotentialHazard.PR_No;
					orgPotentialHazard.ResponibilityId = newPotentialHazard.ResponibilityId;
					orgPotentialHazard.PR_IssueDate = newPotentialHazard.PR_IssueDate;
					orgPotentialHazard.Description = newPotentialHazard.Description;
					orgPotentialHazard.NeededAction = newPotentialHazard.NeededAction;
					orgPotentialHazard.Title = newPotentialHazard.Title;
					orgPotentialHazard.Status = newPotentialHazard.Status;

					orgPotentialHazard.userID = newPotentialHazard.userID;

					List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == newPotentialHazard.Id).ToList();
					int p = 1;//Equal
					if (newPotentialHazard.Images.IsNullOrEmpty())
					{
						p = 1;//equal to the old
					}
					else if(hazardImages.Count== newPotentialHazard.Images.Count)
					{
						foreach(var image in hazardImages)
						{
							foreach(var image1 in newPotentialHazard.Images)
							{
								if(image.FileName != image1.FileName)
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
					if(p==1)
					{
						PotentialHazardRepo.update(orgPotentialHazard);
						result.Data = orgPotentialHazard;
						result.Statescode = 200;
						return result;
					}
					else
					{
						 // Clear the existing images
						foreach(var image in hazardImages)
						{
							DeleteImagesHelper.DeleteImage(image.FileName, "HazardIMG");
							HazardImagesRepo.delete(image);
						}
						
						// Add the new images to the list
						
							foreach (var item in newPotentialHazard.Images)
							{
								HazardImages hazardImagess = new HazardImages();
								hazardImagess.FileName = ImagesHelper.uploadImg(item, "HazardIMG");
								hazardImagess.PotentialHazardId = orgPotentialHazard.Id;
								HazardImagesRepo.create(hazardImagess);
							}
						PotentialHazardRepo.update(orgPotentialHazard);
						result.Data = orgPotentialHazard;
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
				 List<HazardImages> hazardImages = HazardImagesRepo.getall().Where(p => p.PotentialHazardId == id).ToList();
                foreach (var item in hazardImages)
                {

					HazardImages hazardImage = HazardImagesRepo.getbyid(item.Id);
					DeleteImagesHelper.DeleteImage(hazardImage.FileName, "HazardIMG");

					hazardImage.IsDeleted = true;
					//drillImage.Id = item.Id;

					HazardImagesRepo.update(hazardImage);

                }

				PotentialHazard potentialHazard = PotentialHazardRepo.getbyid(id);
				potentialHazard.IsDeleted = true;
				PotentialHazardRepo.update(potentialHazard);
				result.Data = potentialHazard;
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
