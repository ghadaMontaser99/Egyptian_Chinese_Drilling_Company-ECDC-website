using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TempProject.DTO;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysSinceNoLTIController : ControllerBase
    {
		static DateTime storedDate;
        static int LastDaysAfterIncreasing;
		public IRepository<DaysSinceNoLTI> DaysSinceNoLTIRepo { get; set; }
		public IRepository<LTIPrevDateAndDays> LTIPrevDateAndDaysRepo { get; set; }

		public IDaysSinceNoLTIRepossitory DaysSinceNoLTIRepossitory { get; set; }

		public DaysSinceNoLTIController(IRepository<DaysSinceNoLTI> _DaysSinceNoLTIRepo,
			 IDaysSinceNoLTIRepossitory _DaysSinceNoLTIRepossitory,
			 IRepository<LTIPrevDateAndDays> _LTIPrevDateAndDaysRepo
			 )
        {
            this.DaysSinceNoLTIRepossitory = _DaysSinceNoLTIRepossitory;
            this.LTIPrevDateAndDaysRepo = _LTIPrevDateAndDaysRepo;
			this.DaysSinceNoLTIRepo = _DaysSinceNoLTIRepo;
        }
        [HttpGet]
        public ActionResult<ResultDTO> GetAll()
        {

            ResultDTO result = new ResultDTO();

            List<DaysSinceNoLTI> temp = DaysSinceNoLTIRepossitory.getall();
            List<DaysSinceNoLTIDTO> newTemp = new List<DaysSinceNoLTIDTO>();
            foreach (DaysSinceNoLTI DaysSinceNoLTI in temp)
            {
                DaysSinceNoLTIDTO DaysSinceNoLTIDTO = new DaysSinceNoLTIDTO();
                DaysSinceNoLTIDTO.Id = DaysSinceNoLTI.Id;
				DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days;
				DaysSinceNoLTIDTO.RigId = DaysSinceNoLTI.Rig.Number;

				DaysSinceNoLTIDTO.IsDeleted = DaysSinceNoLTI.IsDeleted;

				newTemp.Add(DaysSinceNoLTIDTO);
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


		[HttpGet("GetToCheck")]
		public ActionResult<ResultDTO> GetAllToCheck()
		{

			ResultDTO result = new ResultDTO();

			List<DaysSinceNoLTI> temp = DaysSinceNoLTIRepossitory.getall();
			List<DaysSinceNoLTIDTO> newTemp = new List<DaysSinceNoLTIDTO>();
			foreach (DaysSinceNoLTI DaysSinceNoLTI in temp)
			{
				DaysSinceNoLTIDTO DaysSinceNoLTIDTO = new DaysSinceNoLTIDTO();
				DaysSinceNoLTIDTO.Id = DaysSinceNoLTI.Id;
				DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days;
				DaysSinceNoLTIDTO.RigId = DaysSinceNoLTI.Rig.Id; 

				DaysSinceNoLTIDTO.IsDeleted = DaysSinceNoLTI.IsDeleted;

				newTemp.Add(DaysSinceNoLTIDTO);
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





		[HttpGet("{ID:int}")]
        public ActionResult<ResultDTO> GetByID(int ID)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                DaysSinceNoLTIDTO DaysSinceNoLTIDTO = new DaysSinceNoLTIDTO();
                DaysSinceNoLTI DaysSinceNoLTI = DaysSinceNoLTIRepo.getbyid(ID);
                DaysSinceNoLTIDTO.Id = DaysSinceNoLTI.Id;
				DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days;
				DaysSinceNoLTIDTO.RigId = DaysSinceNoLTI.RigId;
				DaysSinceNoLTIDTO.IsDeleted = DaysSinceNoLTI.IsDeleted;

				result.Message = "Success";
                result.Data = DaysSinceNoLTIDTO;
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


		[HttpGet("ByRigNumber/{RigNumber:int}")]
		public ActionResult<ResultDTO> GetByRigNumber(int RigNumber,DateTime date)
		{
            int f = 0;
			ResultDTO result = new ResultDTO();
			try
			{
               
				DaysSinceNoLTIDTO DaysSinceNoLTIDTO = new DaysSinceNoLTIDTO();
				DaysSinceNoLTI DaysSinceNoLTI = DaysSinceNoLTIRepo.getall().FirstOrDefault(e=>e.RigId== RigNumber);
                DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days;
                DaysSinceNoLTIDTO.Id = DaysSinceNoLTI.Id;
                DaysSinceNoLTIDTO.RigId = RigNumber;
				//LTIPrevDateAndDays lTIPrevDateAndDaysStored = LTIPrevDateAndDaysRepo.getall().FirstOrDefault(r=>r.DaysSinceNoLTIId== DaysSinceNoLTI.Id);
				//DaysSinceNoLTIDTO.Id = DaysSinceNoLTI.Id;
				//DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days -1;
				//DaysSinceNoLTIDTO.RigId = DaysSinceNoLTI.RigId;
				//            DaysSinceNoLTIDTO.DaysSinceNoLTIId = DaysSinceNoLTI.Id;
				//DaysSinceNoLTIDTO.IsDeleted = DaysSinceNoLTI.IsDeleted;
				//            if(lTIPrevDateAndDaysStored==null)
				//            {
				//                lTIPrevDateAndDaysStored = new LTIPrevDateAndDays();
				//	lTIPrevDateAndDaysStored.PrevDate = new DateTime(1500, 11, 14).Date;
				//	lTIPrevDateAndDaysStored.PrevDays = DaysSinceNoLTI.Days+1;
				//	lTIPrevDateAndDaysStored.DaysSinceNoLTIId = DaysSinceNoLTI.Id;
				//	LTIPrevDateAndDaysRepo.create(lTIPrevDateAndDaysStored);
				//	DaysSinceNoLTIDTO.DaysAfterIncreasing = lTIPrevDateAndDaysStored.PrevDays;

				//}

				//if (lTIPrevDateAndDaysStored.PrevDate == date)
				//{
				//	f = 1;
				//}
				//if (f != 1)
				//{
				//                DaysSinceNoLTIDTO.DaysAfterIncreasing = DaysSinceNoLTI.Days + 1;
				//                DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days;

				//	DaysSinceNoLTI.Days = DaysSinceNoLTI.Days + 1;
				//	DaysSinceNoLTIRepo.update(DaysSinceNoLTI);
				//	LTIPrevDateAndDays lTIPrevDateAndDaysStoredupdate = LTIPrevDateAndDaysRepo.getall().FirstOrDefault(r => r.DaysSinceNoLTIId == DaysSinceNoLTI.Id);
				//                lTIPrevDateAndDaysStoredupdate.PrevDays = DaysSinceNoLTI.Days;
				//	lTIPrevDateAndDaysStoredupdate.PrevDate = date;
				//	LTIPrevDateAndDaysRepo.update(lTIPrevDateAndDaysStoredupdate);

				//}
				//else
				//            {
				//                DaysSinceNoLTIDTO.DaysAfterIncreasing = lTIPrevDateAndDaysStored.PrevDays;//DaysSinceNoLTI.Days + 1;

				//	DaysSinceNoLTI.Days = DaysSinceNoLTIDTO.DaysAfterIncreasing; //DaysSinceNoLTI.Days + 1;
				//	DaysSinceNoLTIRepo.update(DaysSinceNoLTI);


				//	lTIPrevDateAndDaysStored.PrevDays = DaysSinceNoLTIDTO.DaysAfterIncreasing;
				//	lTIPrevDateAndDaysStored.PrevDate = date;
				//	LTIPrevDateAndDaysRepo.update(lTIPrevDateAndDaysStored);
				//}




				result.Message = "Success";
				result.Data = DaysSinceNoLTIDTO;
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
        public ActionResult<ResultDTO> Put(int id, [FromForm] DaysSinceNoLTIDTO newDaysSinceNoLTI) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    DaysSinceNoLTI orgDaysSinceNoLTI = DaysSinceNoLTIRepo.getbyid(id);
                    newDaysSinceNoLTI.Id = orgDaysSinceNoLTI.Id;
					orgDaysSinceNoLTI.Days = newDaysSinceNoLTI.Days;
					orgDaysSinceNoLTI.RigId = newDaysSinceNoLTI.RigId;
					orgDaysSinceNoLTI.IsDeleted = newDaysSinceNoLTI.IsDeleted;


					DaysSinceNoLTIRepo.update(orgDaysSinceNoLTI);
                    result.Message = "Success";
                    result.Data = orgDaysSinceNoLTI;
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
        public ActionResult<ResultDTO> AddDaysSinceNoLTI(DaysSinceNoLTIDTO DaysSinceNoLTIDTO)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    DaysSinceNoLTI DaysSinceNoLTI = new DaysSinceNoLTI();
                    DaysSinceNoLTI.Id = default;
					DaysSinceNoLTI.Days = DaysSinceNoLTIDTO.Days;
					DaysSinceNoLTI.RigId = DaysSinceNoLTIDTO.RigId;
					DaysSinceNoLTI.IsDeleted = DaysSinceNoLTIDTO.IsDeleted;

					DaysSinceNoLTIRepo.create(DaysSinceNoLTI);
                  

                    result.Message = "Success";
                    result.Data = DaysSinceNoLTIDTO;
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


		[HttpGet("ByPage/{page:int}")]
		public PageResult<DaysSinceNoLTIDTO> GettAllCrewByPage(int? page, int pagesize = 10)
		{
			List<DaysSinceNoLTI> temp = DaysSinceNoLTIRepossitory.getall();
			List<DaysSinceNoLTIDTO> newTemp = new List<DaysSinceNoLTIDTO>();
			foreach (DaysSinceNoLTI DaysSinceNoLTI in temp)
			{
				DaysSinceNoLTIDTO DaysSinceNoLTIDTO = new DaysSinceNoLTIDTO();
				DaysSinceNoLTIDTO.Id = DaysSinceNoLTI.Id;
				DaysSinceNoLTIDTO.RigId = DaysSinceNoLTI.Rig.Number;
				DaysSinceNoLTIDTO.Days = DaysSinceNoLTI.Days;
				DaysSinceNoLTIDTO.IsDeleted = DaysSinceNoLTI.IsDeleted;
				newTemp.Add(DaysSinceNoLTIDTO);
			}

			float countDetails = DaysSinceNoLTIRepossitory.getall().Count();
			var result = new PageResult<DaysSinceNoLTIDTO>
			{
				Count = (int)Math.Ceiling(countDetails / pagesize),
				PageIndex = page ?? 1,
				PageSize = pagesize,
				Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
			};
			return result;
		}
		[HttpPut("Delete/{id:int}")]
        public ActionResult<ResultDTO> Delete(int id) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                DaysSinceNoLTI DaysSinceNoLTI = DaysSinceNoLTIRepo.getbyid(id);
                DaysSinceNoLTI.IsDeleted = true;
                List<LTIPrevDateAndDays> lTIPrevDateAndDays = new List<LTIPrevDateAndDays>();

				lTIPrevDateAndDays=LTIPrevDateAndDaysRepo.getall().Where(d => d.DaysSinceNoLTIId== id).ToList();
                foreach(var item in lTIPrevDateAndDays)
                {
					LTIPrevDateAndDaysRepo.delete(item);

				}
				DaysSinceNoLTIRepo.update(DaysSinceNoLTI);
                result.Data = DaysSinceNoLTI;
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
