using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TempProject.DTO;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PPEController : ControllerBase
    {
        public IRepository<PPE> PPERepo { get; set; }

        public PPEController(IRepository<PPE> _PPERepo)
        {
            this.PPERepo = _PPERepo;
        }
        [HttpGet]
        public ActionResult<ResultDTO> GetAll()
        {

            ResultDTO result = new ResultDTO();

            List<PPE> temp = PPERepo.getall();
            List<PPEDTO> newTemp = new List<PPEDTO>();
            foreach (PPE PPE in temp)
            {
                PPEDTO PPEDTO = new PPEDTO();
                PPEDTO.Id = PPE.Id;
                PPEDTO.Name = PPE.Name;
            
                PPEDTO.IsDeleted = PPE.IsDeleted;

                newTemp.Add(PPEDTO);
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
		public PageResult<PPEDTO> GettAllPPEByPage(int? page, int pagesize = 10)
		{
			List<PPE> temp = PPERepo.getall();
			List<PPEDTO> newTemp = new List<PPEDTO>();
            foreach (PPE PPE in temp)
            {
                PPEDTO PPEDTO = new PPEDTO();
                PPEDTO.Id = PPE.Id;
                PPEDTO.Name = PPE.Name;
              
                PPEDTO.IsDeleted = PPE.IsDeleted;

                newTemp.Add(PPEDTO);
            }

            float countDetails = PPERepo.getall().Count();
			var result = new PageResult<PPEDTO>
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
                PPEDTO PPEDTO = new PPEDTO();
                PPE PPE = PPERepo.getbyid(ID);
                PPEDTO.Id = PPE.Id;
                PPEDTO.Name = PPE.Name;
      
                PPEDTO.IsDeleted = PPE.IsDeleted;

                result.Message = "Success";
                result.Data = PPEDTO;
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
        public ActionResult<ResultDTO> Put(int id, PPEDTO newPPE) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    PPE orgPPE = PPERepo.getbyid(id);
                    newPPE.Id = orgPPE.Id;
                    orgPPE.Name = newPPE.Name;
          
                    orgPPE.IsDeleted = newPPE.IsDeleted;


                    PPERepo.update(orgPPE);
                    result.Message = "Success";
                    result.Data = newPPE;
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
        public ActionResult<ResultDTO> AddPPE(PPEDTO PPEDTO)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    PPE PPE = new PPE();

                    PPE.Name = PPEDTO.Name;
     
                    PPE.IsDeleted = PPEDTO.IsDeleted;

                    PPERepo.create(PPE);
                    result.Message = "Success";
                    result.Data = PPEDTO;
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
                PPE PPE = PPERepo.getbyid(id);
                PPE.IsDeleted = true;
                PPERepo.update(PPE);
                result.Data = PPE;
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
