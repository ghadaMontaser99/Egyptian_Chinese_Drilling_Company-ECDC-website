using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using TempProject.DTO;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PositionsController : ControllerBase
	{
		public IRepository<Positions> PositionRepo { get; set; }

		public PositionsController(IRepository<Positions> _PositionRepo)
		{
			this.PositionRepo = _PositionRepo;
		}

		[HttpGet]
		public ActionResult<ResultDTO> GetAll()
		{

			ResultDTO result = new ResultDTO();

			List<Positions> temp = PositionRepo.getall();
			List<PositionDTO> newTemp = new List<PositionDTO>();
			foreach (Positions Position in temp)
			{
				PositionDTO PositionDTO = new PositionDTO();
				PositionDTO.Id = Position.Id;
				PositionDTO.Name = Position.Name;
				PositionDTO.IsDeleted = Position.IsDeleted;

				newTemp.Add(PositionDTO);
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
		public PageResult<PositionDTO> GettAllQHSEPositionByPage(int? page, int pagesize = 10)
		{
			List<Positions> temp = PositionRepo.getall();
			List<PositionDTO> newTemp = new List<PositionDTO>();
			foreach (Positions Position in temp)
			{
				PositionDTO PositionDTO = new PositionDTO();
				PositionDTO.Id = Position.Id;
				PositionDTO.Name = Position.Name;
				PositionDTO.IsDeleted = Position.IsDeleted;

				newTemp.Add(PositionDTO);
			}

			float countDetails = PositionRepo.getall().Count();
			var result = new PageResult<PositionDTO>
			{
				Count = (int)Math.Ceiling(countDetails / pagesize),
				PageIndex = page ?? 1,
				PageSize = pagesize,
				Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
			};
			return result;
		}

		[HttpGet("{ID:int}")]
		public ActionResult<ResultDTO> GetByID(int ID)
		{
			ResultDTO result = new ResultDTO();
			try
			{
				PositionDTO PositionDTO = new PositionDTO();
				Positions Position = PositionRepo.getbyid(ID);
				PositionDTO.Id = Position.Id;
				PositionDTO.Name = Position.Name;
				PositionDTO.IsDeleted = Position.IsDeleted;

				result.Message = "Success";
				result.Data = PositionDTO;
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
		public ActionResult<ResultDTO> Put(int id, PositionDTO newPosition) //[FromBody] string value)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					Positions orgPosition = PositionRepo.getbyid(id);
					newPosition.Id = orgPosition.Id;
					orgPosition.Name = newPosition.Name;
					orgPosition.IsDeleted = newPosition.IsDeleted;


					PositionRepo.update(orgPosition);
					result.Message = "Success";
					result.Data = orgPosition;
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

		[HttpPost]
		public ActionResult<ResultDTO> AddQHSEPosition(PositionDTO PositionDTO)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					Positions Position = new Positions();
					Position.Id = PositionDTO.Id;
					Position.Name = PositionDTO.Name;
					Position.IsDeleted = PositionDTO.IsDeleted;

					PositionRepo.create(Position);
					result.Message = "Success";
					result.Data = PositionDTO;
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
				Positions qHSEPosition = PositionRepo.getbyid(id);
				qHSEPosition.IsDeleted = true;
				PositionRepo.update(qHSEPosition);
				result.Data = qHSEPosition;
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
