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
    public class ResponsibilityController : ControllerBase
    {
        public IRepository<Responsibility> ResponsibilityRepo { get; set; }

        public ResponsibilityController(IRepository<Responsibility> _ResponsibilityRepo)
        {
            this.ResponsibilityRepo = _ResponsibilityRepo;
        }
        [HttpGet]
        public ActionResult<ResultDTO> GetAll()
        {

            ResultDTO result = new ResultDTO();

            List<Responsibility> temp = ResponsibilityRepo.getall();
            List<ResponsibilityDTO> newTemp = new List<ResponsibilityDTO>();
            foreach (Responsibility responsibility in temp)
            {
				ResponsibilityDTO ResponsibilityDTO = new ResponsibilityDTO();
				ResponsibilityDTO.id = responsibility.Id;
				ResponsibilityDTO.Name = responsibility.Name;
				ResponsibilityDTO.IsDeleted = responsibility.IsDeleted;

				newTemp.Add(ResponsibilityDTO);
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
		public PageResult<ResponsibilityDTO> GettResponsibilityByPage( int? page, int pagesize = 10)
		{
			try
			{
				
					List<Responsibility> temp = ResponsibilityRepo.getall();//.Where(s => s.Status == "Open").ToList();
					List<ResponsibilityDTO> newTemp = new List<ResponsibilityDTO>();
					foreach (Responsibility Responsibility in temp)
					{
						ResponsibilityDTO ResponsibilityDTO = new ResponsibilityDTO();
						ResponsibilityDTO.id = Responsibility.Id;
						ResponsibilityDTO.Name = Responsibility.Name;
						ResponsibilityDTO.IsDeleted = Responsibility.IsDeleted;

						newTemp.Add(ResponsibilityDTO);
						//result.Data = prod;
					}

					float countDetails = ResponsibilityRepo.getall().Count();
					var result = new PageResult<ResponsibilityDTO>
					{
						Count = (int)Math.Ceiling(countDetails / pagesize),
						PageIndex = page ?? 1,
						PageSize = pagesize,
						Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
					};
					return result;
				}
				
			
			catch (Exception Ex)
			{
				return new PageResult<ResponsibilityDTO>();
			}
		}


		[HttpGet("{ID:int}")]
        public ActionResult<ResultDTO> GetByID(int ID)
        {
            ResultDTO result = new ResultDTO();
            try
            {
				ResponsibilityDTO ResponsibilityDTO = new ResponsibilityDTO();
				Responsibility Responsibility = ResponsibilityRepo.getbyid(ID);
				ResponsibilityDTO.id = Responsibility.Id;
				ResponsibilityDTO.Name = Responsibility.Name;
				ResponsibilityDTO.IsDeleted = Responsibility.IsDeleted;

				result.Message = "Success";
                result.Data = ResponsibilityDTO;
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
        public ActionResult<ResultDTO> Put(int id, [FromForm] ResponsibilityDTO newResponsibility) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
					Responsibility orgResponsibility = ResponsibilityRepo.getbyid(id);
					newResponsibility.id = orgResponsibility.Id;
					orgResponsibility.Name = newResponsibility.Name;
					orgResponsibility.IsDeleted = newResponsibility.IsDeleted;


					ResponsibilityRepo.update(orgResponsibility);
                    result.Message = "Success";
                    result.Data = newResponsibility;
                    result.Statescode = 200;
                    return result;
                }
                catch (Exception ex)
                {
                    result.Message = "Error in Updating";
                    result.Statescode = 40000;
                    return result;
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        public ActionResult<ResultDTO> AddCrew(ResponsibilityDTO ResponsibilityDTO)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
					Responsibility Responsibility = new Responsibility();
					Responsibility.Id = ResponsibilityDTO.id;
					Responsibility.Name = ResponsibilityDTO.Name;
					Responsibility.IsDeleted = ResponsibilityDTO.IsDeleted;

					ResponsibilityRepo.create(Responsibility);
                    result.Message = "Success";
                    result.Data = ResponsibilityDTO;
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
				Responsibility Responsibility = ResponsibilityRepo.getbyid(id);
				Responsibility.IsDeleted = true;
				ResponsibilityRepo.update(Responsibility);
                result.Data = Responsibility;
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
