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
    public class DrillTypeController : ControllerBase
    {
        public IRepository<DrillType> DrillTypeRepo { get; set; }

        public DrillTypeController(IRepository<DrillType> _DrillTypeRepo)
        {
            this.DrillTypeRepo = _DrillTypeRepo;
        }
        [HttpGet]
        public ActionResult<ResultDTO> GetAll()
        {

            ResultDTO result = new ResultDTO();

            List<DrillType> temp = DrillTypeRepo.getall();
            List<DrillTypeDTO> newTemp = new List<DrillTypeDTO>();
            foreach (DrillType drillType in temp)
            {
				DrillTypeDTO DrillTypeDTO = new DrillTypeDTO();
                DrillTypeDTO.Id = drillType.Id;
                DrillTypeDTO.Name = drillType.Name;
                DrillTypeDTO.IsDeleted = drillType.IsDeleted;

				newTemp.Add(DrillTypeDTO);
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
		public PageResult<DrillTypeDTO> GettDrillTypeByPage( int? page, int pagesize = 10)
		{
			try
			{
				
					List<DrillType> temp = DrillTypeRepo.getall();//.Where(s => s.Status == "Open").ToList();
					List<DrillTypeDTO> newTemp = new List<DrillTypeDTO>();
					foreach (DrillType DrillType in temp)
					{
						DrillTypeDTO DrillTypeDTO = new DrillTypeDTO();
                        DrillTypeDTO.Id = DrillType.Id;
                        DrillTypeDTO.Name = DrillType.Name;
                        DrillTypeDTO.IsDeleted = DrillType.IsDeleted;

						newTemp.Add(DrillTypeDTO);
						//result.Data = prod;
					}

					float countDetails = DrillTypeRepo.getall().Count();
					var result = new PageResult<DrillTypeDTO>
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
				return new PageResult<DrillTypeDTO>();
			}
		}


		[HttpGet("{ID:int}")]
        public ActionResult<ResultDTO> GetByID(int ID)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                DrillTypeDTO DrillTypeDTO = new DrillTypeDTO();
				DrillType DrillType = DrillTypeRepo.getbyid(ID);
                DrillTypeDTO.Id = DrillType.Id;
                DrillTypeDTO.Name = DrillType.Name;
                DrillTypeDTO.IsDeleted = DrillType.IsDeleted;

				result.Message = "Success";
                result.Data = DrillTypeDTO;
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
		[HttpPut("Edit/{id:int}")]
        public ActionResult<ResultDTO> Put(int id, [FromForm] DrillTypeDTO DrillTypeDTO) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    DrillType drillType = DrillTypeRepo.getbyid(id);

                    //drillType.Id = DrillTypeDTO.Id;
                    drillType.Name = DrillTypeDTO.Name;
                    drillType.IsDeleted = DrillTypeDTO.IsDeleted;

                    DrillTypeRepo.update(drillType);
                    result.Data = DrillTypeDTO;
                    result.Statescode = 200;
                    result.Message = "Success";

                }
                catch (Exception ex)
                {
                    result.Message = "Error in inserting";
                    result.Statescode = 400;
                }
            }
            return result;
        }

        [HttpPost]
        public ActionResult<ResultDTO> AddDrill(DrillTypeDTO DrillTypeDTO)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
					DrillType DrillType = new DrillType();
					//DrillType.Id = DrillTypeDTO.id;
					DrillType.Name = DrillTypeDTO.Name;
					DrillType.IsDeleted = DrillTypeDTO.IsDeleted;

					DrillTypeRepo.create(DrillType);
                    result.Message = "Success";
                    result.Data = DrillTypeDTO;
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
				DrillType DrillType = DrillTypeRepo.getbyid(id);
				DrillType.IsDeleted = true;
				DrillTypeRepo.update(DrillType);
                result.Data = DrillType;
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
