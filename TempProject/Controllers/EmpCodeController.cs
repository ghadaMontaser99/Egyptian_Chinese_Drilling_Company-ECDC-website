using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TempProject.DTO;
using TempProject.DTO.ResponseDTO;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmpCodeController : ControllerBase
	{
		public IRepository<EmpCode> EmpCodeRepo { get; set; }
		
		public IEmpCodeRepository empCodeRepository { get; set; }

		public EmpCodeController(IRepository<EmpCode> _EmpCodeRepo, IEmpCodeRepository _empCodeRepository)
		{
	
			this.EmpCodeRepo = _EmpCodeRepo;
			this.empCodeRepository= _empCodeRepository;
		}
		[HttpGet]
		public ActionResult<ResultDTO> GetAll()
		{

			ResultDTO result = new ResultDTO();

			List<EmpCode> temp = EmpCodeRepo.getall();
			List<EmpCodeDTO> newTemp = new List<EmpCodeDTO>();
			foreach (EmpCode EmpCode in temp)
			{
				EmpCodeDTO EmpCodeDTO = new EmpCodeDTO();
				EmpCodeDTO.Id = EmpCode.Id;
				EmpCodeDTO.Code = EmpCode.Code;
				EmpCodeDTO.PositionId = EmpCode.PositionId;
				EmpCodeDTO.Name = EmpCode.Name;
				EmpCodeDTO.IsDeleted = EmpCode.IsDeleted;
				EmpCodeDTO.RigId = EmpCode.RigId;

				newTemp.Add(EmpCodeDTO);
			}
			if (newTemp != null)
			{

				result.Message = "Success";
				result.Statescode = 200;
				result.Data = newTemp;

				return result;
			}

			result.Statescode = 404;
			result.Message = "data not found";
			return result;

		}

		[HttpGet("GetAllForExcel")]
		public ActionResult<ResultDTO> GetAllForExcel()
		{

			ResultDTO result = new ResultDTO();

			List<EmpCode> temp = empCodeRepository.getall();
			List<EmpCodeExcelDTO> newTemp = new List<EmpCodeExcelDTO>();
			foreach (EmpCode EmpCode in temp)
			{
				EmpCodeExcelDTO EmpCodeDTO = new EmpCodeExcelDTO();
				EmpCodeDTO.Id = EmpCode.Id;
				EmpCodeDTO.Name = EmpCode.Name;
				EmpCodeDTO.Code = EmpCode.Code;
				EmpCodeDTO.Position = EmpCode.Positions.Name;
				EmpCodeDTO.Rig = string.Concat("Rig- ", EmpCode.Rig.Number);


				newTemp.Add(EmpCodeDTO);
			}
			if (newTemp != null)
			{

				result.Message = "Success";
				result.Statescode = 200;
				result.Data = newTemp;

				return result;
			}

			result.Statescode = 404;
			result.Message = "data not found";
			return result;

		}

		[HttpGet("ByPage/{page:int}")]
		public PageResult<EmpCodeDTO> GettAllEmpCodeByPage(int? page, int pagesize = 10)
		{
			List<EmpCode> temp = EmpCodeRepo.getall();
			List<EmpCodeDTO> newTemp = new List<EmpCodeDTO>();
			foreach (EmpCode EmpCode in temp)
			{
				EmpCodeDTO EmpCodeDTO = new EmpCodeDTO();
				EmpCodeDTO.Id = EmpCode.Id;
				EmpCodeDTO.Code = EmpCode.Code;
				EmpCodeDTO.PositionId = EmpCode.PositionId;
				EmpCodeDTO.Name = EmpCode.Name;
				EmpCodeDTO.IsDeleted = EmpCode.IsDeleted;
				EmpCodeDTO.RigId = EmpCode.RigId;

				newTemp.Add(EmpCodeDTO);
			}

			float countDetails = EmpCodeRepo.getall().Count();
			var result = new PageResult<EmpCodeDTO>
			{
				Count = (int)Math.Ceiling(countDetails / pagesize),
				PageIndex = page ?? 1,
				PageSize = pagesize,
				Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
			};
			return result;
		}

		//[HttpGet("Name/{EmpCodeId:int}")]
		//public ActionResult<ResultDTO> GetByEmpCodeId(int EmpCodeId)
		//{

		//	ResultDTO result = new ResultDTO();

		//	List<EmpCode> temp = EmpCodeRepo.getall().Where(n => n.Id == EmpCodeId).ToList();
		//	List<EmpCodeDTO> newTemp = new List<EmpCodeDTO>();
		//	foreach (EmpCode EmpCode in temp)
		//	{
		//		EmpCodeDTO EmpCodeDTO = new EmpCodeDTO();
		//		EmpCodeDTO.Id = EmpCode.Id;
		//		EmpCodeDTO.Code = EmpCode.Code;
		//		EmpCodeDTO.IsDeleted = EmpCode.IsDeleted;

		//		newTemp.Add(EmpCodeDTO);
		//	}
		//	if (newTemp != null)
		//	{

		//		result.Message = "Success";
		//		result.Statescode = 200;
		//		result.Data = newTemp;

		//		return result;
		//	}

		//	result.Statescode = 404;
		//	result.Message = "data not found";
		//	return result;
		//}

		[HttpGet("Code/{empCode:int}")]
		public ActionResult<ResultDTO> GetByEmpCode(int empCode)
		{
			ResultDTO result = new ResultDTO();
			try
			{
				EmpCodeDTO EmpCodeDTO = new EmpCodeDTO();
				//////
				EmpCode EmpCodeNumber = EmpCodeRepo.getall().FirstOrDefault(c => c.Code == empCode);
				EmpCodeDTO.Id = EmpCodeNumber.Id;
				EmpCodeDTO.Code = EmpCodeNumber.Code;
				EmpCodeDTO.Name = EmpCodeNumber.Name;
				EmpCodeDTO.PositionId = EmpCodeNumber.PositionId;
				EmpCodeDTO.IsDeleted = EmpCodeNumber.IsDeleted;
				EmpCodeDTO.RigId = EmpCodeNumber.RigId;

				result.Data = EmpCodeDTO;
				result.Message = "Success";
				result.Statescode = 200;
				return result;
			}
			catch (Exception ex)
			{
				result.Message = "Error Not Find";
				result.Statescode = 404;
				return result;
			}
		}

		[HttpPut("{id:int}")]
		public ActionResult<ResultDTO> Put(int id, EmpCodeDTO newEmpCodeDTO) //[FromBody] string value)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					EmpCode orgEmpCode = EmpCodeRepo.getbyid(id);
					newEmpCodeDTO.Id = orgEmpCode.Id;
					orgEmpCode.Code = newEmpCodeDTO.Code;
					orgEmpCode.PositionId = newEmpCodeDTO.PositionId;
					orgEmpCode.Name = newEmpCodeDTO.Name;
					orgEmpCode.IsDeleted = newEmpCodeDTO.IsDeleted;
					orgEmpCode.RigId = newEmpCodeDTO.RigId;


					EmpCodeRepo.update(orgEmpCode);
					result.Message = "Success";
					result.Data = newEmpCodeDTO;
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

		[HttpGet("{ID:int}")]
		public ActionResult<ResultDTO> GetByID(int ID)
		{
			ResultDTO result = new ResultDTO();
			try
			{
				EmpCodeDTO EmpCodeDTO = new EmpCodeDTO();
				EmpCode EmpCode = EmpCodeRepo.getbyid(ID);
				EmpCodeDTO.Id = EmpCode.Id;
				EmpCodeDTO.Code = EmpCode.Code;
				EmpCodeDTO.PositionId = EmpCode.PositionId;
				EmpCodeDTO.Name = EmpCode.Name;
				EmpCodeDTO.IsDeleted = EmpCode.IsDeleted;
				EmpCodeDTO.RigId = EmpCode.RigId;

				result.Message = "Success";
				result.Data = EmpCodeDTO;
				result.Statescode = 200;
				return result;
			}
			catch (Exception ex)
			{
				result.Message = "Error Not Find";
				result.Statescode = 404;
				return result;
			}
		}

		[HttpPost]
		public ActionResult<ResultDTO> AddEmpCode(EmpCodeDTO EmpCodeDTO)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					EmpCode EmpCode = new EmpCode();
					EmpCode.Id = EmpCodeDTO.Id;
					EmpCode.Code = EmpCodeDTO.Code;
					EmpCode.PositionId = EmpCodeDTO.PositionId;
					EmpCode.Name = EmpCodeDTO.Name;
					EmpCode.IsDeleted = EmpCodeDTO.IsDeleted;
					EmpCode.RigId = EmpCodeDTO.RigId;

					EmpCodeRepo.create(EmpCode);
					result.Data = EmpCodeDTO;
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

		[HttpPut("Delete/{id:int}")]
		public ActionResult<ResultDTO> Delete(int id) //[FromBody] string value)
		{
			ResultDTO result = new ResultDTO();
			try
			{
				EmpCode EmpCode = EmpCodeRepo.getbyid(id);
				EmpCode.IsDeleted = true;
				EmpCodeRepo.update(EmpCode);
				result.Data = EmpCode;
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
