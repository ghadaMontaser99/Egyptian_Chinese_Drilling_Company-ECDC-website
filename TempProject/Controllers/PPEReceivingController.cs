using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;
using System.IO.Pipelines;
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
	public class PPEReceivingController : ControllerBase
    {
        public IRepository<PPEReceiving> PPEReceivingRepo { get; set; }
        public IRepository<PPEAndPPEReceiving> PPERepo { get; set; }


        public IPPEReceivingRepository PPEReceivingRepoistory { get; set; }

		private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager;


		public PPEReceivingController(Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager,IRepository<PPEReceiving> _PPEReceivingRepo, IPPEReceivingRepository _PPEReceivingRepoistory, IRepository<PPEAndPPEReceiving> _PPERepo)
        {
            this.PPEReceivingRepo = _PPEReceivingRepo;
            this.PPEReceivingRepoistory = _PPEReceivingRepoistory;
            this.PPERepo = _PPERepo;
      
            this.userManager = _userManager;
        }

        [HttpGet("GetData")]
        public async Task<ResultDTO> GetAllWithData(string UserID, string UserRole)
		{
			ResultDTO result = new ResultDTO();

			try
			{
			
					List<PPEReceiving> temp = PPEReceivingRepoistory.getall();
					List<PPEReceivingResponseDTO> newTemp = new List<PPEReceivingResponseDTO>();
					foreach (PPEReceiving PPEReceiving in temp)
					{
						PPEReceivingResponseDTO PPEReceivingDTO = new PPEReceivingResponseDTO();
						PPEReceivingDTO.Id = PPEReceiving.Id;
						PPEReceivingDTO.RigId = PPEReceiving.Rig.Number;
						PPEReceivingDTO.Date = PPEReceiving.Date;
						PPEReceivingDTO.QHSEEmpCode = PPEReceiving.QHSEEmpCode;
						PPEReceivingDTO.QHSEEmpName = PPEReceiving.QHSEEmpName;
                        PPEReceivingDTO.QHSEPositionName = PPEReceiving.QHSEPositionName;
                        PPEReceivingDTO.EmployeeCode = PPEReceiving.EmployeeCode;
                        PPEReceivingDTO.EmployeeName = PPEReceiving.EmployeeName;
                        PPEReceivingDTO.EmployeePositionName = PPEReceiving.EmployeePositionName;
						PPEReceivingDTO.UserName = PPEReceiving.User.UserName;
						PPEReceivingDTO.userID = PPEReceiving.User.Id;
                        PPEReceivingDTO.NormalCoverallsSize = PPEReceiving.NormalCoverallsSize;
                        PPEReceivingDTO.ThermalCoverallsSize = PPEReceiving.ThermalCoverallsSize;
                        PPEReceivingDTO.SafetyBootsSize = PPEReceiving.SafetyBootsSize;
                        List<PPEAndPPEReceiving> PPEs = PPERepo.getall().Where(a => a.PPEReceivingId == PPEReceiving.Id).ToList();
						PPEReceivingDTO.PPE = PPEs;
						
						newTemp.Add(PPEReceivingDTO);
						
					}
					
				
				
					if (newTemp != null)
					{
						result.Message = "Success";
						result.Statescode = 200;
						result.Data = newTemp;

						return result;
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
				
					List<PPEReceiving> temp = PPEReceivingRepoistory.getall();
					List<PPEReceivingExcelDTO> newTemp = new List<PPEReceivingExcelDTO>();
					foreach (PPEReceiving PPEReceiving in temp)
					{
						PPEReceivingExcelDTO PPEReceivingDTO = new PPEReceivingExcelDTO();
                        PPEReceivingDTO.Id = PPEReceiving.Id;
                        PPEReceivingDTO.RigNumber = PPEReceiving.Rig.Number;
                        PPEReceivingDTO.Date = PPEReceiving.Date;
                        PPEReceivingDTO.QHSEEmpCode = PPEReceiving.QHSEEmpCode;
                        PPEReceivingDTO.QHSEEmpName = PPEReceiving.QHSEEmpName;
                        PPEReceivingDTO.QHSEPositionName = PPEReceiving.QHSEPositionName;
                        PPEReceivingDTO.EmployeeCode = PPEReceiving.EmployeeCode;
                        PPEReceivingDTO.EmployeeName = PPEReceiving.EmployeeName;
                        PPEReceivingDTO.EmployeePositionName = PPEReceiving.EmployeePositionName;
                        PPEReceivingDTO.UserName = PPEReceiving.User.UserName;
						PPEReceivingDTO.userID = PPEReceiving.User.Id;
                        PPEReceivingDTO.NormalCoverallsSize = PPEReceiving.NormalCoverallsSize;
                        PPEReceivingDTO.ThermalCoverallsSize = PPEReceiving.ThermalCoverallsSize;
                        PPEReceivingDTO.SafetyBootsSize = PPEReceiving.SafetyBootsSize;
                        List<PPEAndPPEReceiving> PPEs = PPERepo.getall().Where(a => a.PPEReceivingId == PPEReceiving.Id).ToList();
                        PPEReceivingDTO.PPE = PPEs;
                        
						newTemp.Add(PPEReceivingDTO);
						
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

		[HttpGet("ByPage/{page:int}")]
		public PageResult<PPEReceivingResponseDTO> GettAllStoCardsByPage(string UserId, string UserRole, int? page, int pagesize = 10)
		{

			try
			{
				
					List<PPEReceiving> temp = PPEReceivingRepoistory.getall();
					List<PPEReceivingResponseDTO> newTemp = new List<PPEReceivingResponseDTO>();
					foreach (PPEReceiving PPEReceiving in temp)
					{
						PPEReceivingResponseDTO PPEReceivingDTO = new PPEReceivingResponseDTO();
                        PPEReceivingDTO.Id = PPEReceiving.Id;
                        PPEReceivingDTO.RigId = PPEReceiving.Rig.Number;
                        PPEReceivingDTO.Date = PPEReceiving.Date;
                        PPEReceivingDTO.QHSEEmpCode = PPEReceiving.QHSEEmpCode;
                        PPEReceivingDTO.QHSEEmpName = PPEReceiving.QHSEEmpName;
                        PPEReceivingDTO.QHSEPositionName = PPEReceiving.QHSEPositionName;
                        PPEReceivingDTO.EmployeeCode = PPEReceiving.EmployeeCode;
                        PPEReceivingDTO.EmployeeName = PPEReceiving.EmployeeName;
                        PPEReceivingDTO.EmployeePositionName = PPEReceiving.EmployeePositionName;
                        PPEReceivingDTO.UserName = PPEReceiving.User.UserName;
                        PPEReceivingDTO.userID = PPEReceiving.User.Id;
                        PPEReceivingDTO.NormalCoverallsSize = PPEReceiving.NormalCoverallsSize;
                        PPEReceivingDTO.ThermalCoverallsSize = PPEReceiving.ThermalCoverallsSize;
                        PPEReceivingDTO.SafetyBootsSize = PPEReceiving.SafetyBootsSize;
                        List<PPEAndPPEReceiving> PPEs = PPERepo.getall().Where(a => a.PPEReceivingId == PPEReceiving.Id).ToList();
                        PPEReceivingDTO.PPE = PPEs;
                   

                        newTemp.Add(PPEReceivingDTO);
					
					}

					float countDetails = PPEReceivingRepoistory.getall().Count();
					var result = new PageResult<PPEReceivingResponseDTO>
					{
						Count = (int)Math.Ceiling(countDetails / pagesize),
						PageIndex = page ?? 1,
						PageSize = pagesize,
						Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
					};

					return result;

				
				
			}
			catch (Exception ex)
			{
				return new PageResult<PPEReceivingResponseDTO>();

			}
			return new PageResult<PPEReceivingResponseDTO>();
		}


		[HttpGet("GetDataById/{ID:int}")]
		public ActionResult<ResultDTO> GetAllWithDataByID(int ID, string UserId, string UserRole)
		{
			ResultDTO result = new ResultDTO();


		
				PPEReceiving temp = PPEReceivingRepoistory.getall().FirstOrDefault(a => a.Id == ID);
				if (temp != null)
				{
					PPEReceivingResponseDTO PPEReceivingDTO = new PPEReceivingResponseDTO();
                    PPEReceivingDTO.Id = temp.Id;
                    PPEReceivingDTO.RigId = temp.Rig.Number;
                    PPEReceivingDTO.Date = temp.Date;
                    PPEReceivingDTO.QHSEEmpCode = temp.QHSEEmpCode;
                    PPEReceivingDTO.QHSEEmpName = temp.QHSEEmpName;
                    PPEReceivingDTO.QHSEPositionName = temp.QHSEPositionName;
                    PPEReceivingDTO.EmployeeCode = temp.EmployeeCode;
                    PPEReceivingDTO.EmployeeName = temp.EmployeeName;
                    PPEReceivingDTO.EmployeePositionName = temp.EmployeePositionName;
                    PPEReceivingDTO.UserName = temp.User.UserName;
                    PPEReceivingDTO.userID = temp.User.Id;
                    PPEReceivingDTO.NormalCoverallsSize = temp.NormalCoverallsSize;
                    PPEReceivingDTO.ThermalCoverallsSize = temp.ThermalCoverallsSize;
                    PPEReceivingDTO.SafetyBootsSize = temp.SafetyBootsSize;
                    List<PPEAndPPEReceiving> PPEs = PPERepo.getall().Where(a => a.PPEReceivingId == temp.Id).ToList();
                    PPEReceivingDTO.PPE = PPEs;
                  
                    if (PPEReceivingDTO != null)
					{

						result.Message = "Success";
						result.Statescode = 200;
						result.Data = PPEReceivingDTO;

						return result;
					}
				}

			
			

			

			result.Statescode = 404;
			result.Message = "data not found";
			return result;
		}

        [HttpGet("PrintDataById/{ID:int}")]
        public ActionResult<ResultDTO> PrintDataByID(int ID, string UserId, string UserRole)
			
        {
            ResultDTO result = new ResultDTO();



            PPEReceiving temp = PPEReceivingRepoistory.getall().FirstOrDefault(a => a.Id == ID);
            if (temp != null)
            {
                List<PPEReceivingResponseDTO> PPEReceivingResponseDTOs = new List<PPEReceivingResponseDTO>();

                PPEReceivingResponseDTO PPEReceivingDTO = new PPEReceivingResponseDTO();
                PPEReceivingDTO.Id = temp.Id;
                PPEReceivingDTO.RigId = temp.Rig.Number;
                PPEReceivingDTO.Date = temp.Date;
                PPEReceivingDTO.QHSEEmpCode = temp.QHSEEmpCode;
                PPEReceivingDTO.QHSEEmpName = temp.QHSEEmpName;
                PPEReceivingDTO.QHSEPositionName = temp.QHSEPositionName;
                PPEReceivingDTO.EmployeeCode = temp.EmployeeCode;
                PPEReceivingDTO.EmployeeName = temp.EmployeeName;
                PPEReceivingDTO.EmployeePositionName = temp.EmployeePositionName;
                PPEReceivingDTO.UserName = temp.User.UserName;
                PPEReceivingDTO.userID = temp.User.Id;
                PPEReceivingDTO.NormalCoverallsSize = temp.NormalCoverallsSize;
                PPEReceivingDTO.ThermalCoverallsSize = temp.ThermalCoverallsSize;
                PPEReceivingDTO.SafetyBootsSize = temp.SafetyBootsSize;
                foreach (var ppeAndPPEReceiving in temp.PPEAndPPEReceiving)
                {
                    string pPEDTO;
                    pPEDTO = ppeAndPPEReceiving.PPE.Name;
                    PPEReceivingDTO.PPEs.Add(pPEDTO);

                }


                PPEReceivingResponseDTOs.Add(PPEReceivingDTO);





                if (PPEReceivingDTO != null)
                {

                    result.Message = "Success";
                    result.Statescode = 200;
                    result.Data = PPEReceivingDTO;

                    return result;
                }
            }






            result.Statescode = 404;
            result.Message = "data not found";
            return result;
        }





        [HttpPost]
		public ActionResult<ResultDTO> AddPPEReceiving( AddPPEReceivingDTO PPEReceiving)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					PPEReceiving pPEReceiving = new PPEReceiving();
                    pPEReceiving.Id = default;
					pPEReceiving.RigId = PPEReceiving.RigId;
					pPEReceiving.Date = PPEReceiving.Date;
					pPEReceiving.QHSEEmpName = PPEReceiving.QHSEEmpName;
					pPEReceiving.QHSEEmpCode = PPEReceiving.QHSEEmpCode;
					pPEReceiving.QHSEPositionName = PPEReceiving.QHSEPositionName;
					pPEReceiving.EmployeeCode = PPEReceiving.EmployeeCode;
					pPEReceiving.EmployeeName = PPEReceiving.EmployeeName;
					pPEReceiving.EmployeePositionName = PPEReceiving.EmployeePositionName;
                    pPEReceiving.userID = PPEReceiving.userID;
                    pPEReceiving.NormalCoverallsSize = PPEReceiving.NormalCoverallsSize;
                    pPEReceiving.ThermalCoverallsSize = PPEReceiving.ThermalCoverallsSize;
                    pPEReceiving.SafetyBootsSize = PPEReceiving.SafetyBootsSize;
                    pPEReceiving.IsDeleted = PPEReceiving.IsDeleted;
                    PPEReceivingRepo.create(pPEReceiving);

					foreach (var item in PPEReceiving.PPEDTO)
					{
						PPEAndPPEReceiving pPE = new PPEAndPPEReceiving();

						pPE.PPEReceivingId = pPEReceiving.Id;
						pPE.PPEId = item.Id;
                       

                        PPERepo.create(pPE);
					}
				

					result.Message = "Success";
					result.Data = PPEReceiving;
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
		public ActionResult<ResultDTO> Put(int id, AddPPEReceivingDTO newPPEReceiving)
		{
			ResultDTO result = new ResultDTO();

			if (ModelState.IsValid)
			{
				try
				{
					PPEReceiving orgPPEReceiving = PPEReceivingRepo.getbyid(id);
					newPPEReceiving.Id = orgPPEReceiving.Id;
					orgPPEReceiving.RigId = newPPEReceiving.RigId;
					orgPPEReceiving.Date = newPPEReceiving.Date;
					orgPPEReceiving.QHSEEmpName = newPPEReceiving.QHSEEmpName;
					orgPPEReceiving.QHSEEmpCode = newPPEReceiving.QHSEEmpCode;
					orgPPEReceiving.QHSEPositionName = newPPEReceiving.QHSEPositionName;
					orgPPEReceiving.EmployeeCode = newPPEReceiving.EmployeeCode;
					orgPPEReceiving.EmployeeName = newPPEReceiving.EmployeeName;
					orgPPEReceiving.EmployeePositionName = newPPEReceiving.EmployeePositionName;
					orgPPEReceiving.userID = newPPEReceiving.userID;
                    orgPPEReceiving.NormalCoverallsSize = newPPEReceiving.NormalCoverallsSize;
                    orgPPEReceiving.ThermalCoverallsSize = newPPEReceiving.ThermalCoverallsSize;
                    orgPPEReceiving.SafetyBootsSize = newPPEReceiving.SafetyBootsSize;
                    orgPPEReceiving.IsDeleted = newPPEReceiving.IsDeleted;

					
					List<PPEAndPPEReceiving> pPEs = PPERepo.getall().Where(p => p.PPEReceivingId == orgPPEReceiving.Id).ToList();
					
				
					if (newPPEReceiving.PPEDTO.IsNullOrEmpty() )
					{
                        PPEReceivingRepo.update(orgPPEReceiving);
                    }

					

                    else if (!newPPEReceiving.PPEDTO.IsNullOrEmpty() )
                    {
                        foreach (var item in pPEs)
                        {
                            item.IsDeleted = true;
                            PPERepo.update(item);
                        }

                       
                       
                        foreach (var item in newPPEReceiving.PPEDTO)
                        {
                            PPEAndPPEReceiving pPE = new PPEAndPPEReceiving();

                            pPE.PPEReceivingId = orgPPEReceiving.Id;
                            pPE.PPEId = item.Id;
                            PPERepo.create(pPE);
                        }
                        
                    }
                   
                    
                   
					
						result.Data = newPPEReceiving;
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


		[HttpGet("GetDataByEmpCode/New/{EmpCodeNew:int}")]
		public ActionResult<ResultDTO> GetAllWithDataByEmpCodeNew(int EmpCodeNew, string UserId, string UserRole,string date)
		{
            
            DateTime dateObject = DateTime.Parse(date);

            ResultDTO result = new ResultDTO();

			try
			{
					List<PPEReceivingResponseDTO> PPEReceivingResponseDTOs = new List<PPEReceivingResponseDTO>();
					List<PPEReceiving> PPEReceivingts = PPEReceivingRepoistory.getall().Where(a => a.EmployeeCode == EmpCodeNew &&a.Date== dateObject).ToList();
					if (PPEReceivingts.Count > 0)
					{
						foreach (PPEReceiving PPEReceiving in PPEReceivingts)
						{

							PPEReceivingResponseDTO PPEReceivingResponseDTO = new PPEReceivingResponseDTO();
							PPEReceivingResponseDTO.Id = PPEReceiving.Id;
							PPEReceivingResponseDTO.RigId = PPEReceiving.Rig.Number;
							PPEReceivingResponseDTO.Date = PPEReceiving.Date;
							PPEReceivingResponseDTO.UserName = PPEReceiving.User.UserName;
							PPEReceivingResponseDTO.userID = PPEReceiving.userID;
							PPEReceivingResponseDTO.QHSEEmpName = PPEReceiving.QHSEEmpName;
							PPEReceivingResponseDTO.QHSEEmpCode = PPEReceiving.QHSEEmpCode;
							PPEReceivingResponseDTO.QHSEPositionName = PPEReceiving.QHSEPositionName;
							PPEReceivingResponseDTO.EmployeeCode = PPEReceiving.EmployeeCode;
							PPEReceivingResponseDTO.EmployeeName = PPEReceiving.EmployeeName;
							PPEReceivingResponseDTO.EmployeePositionName = PPEReceiving.EmployeePositionName;
							PPEReceivingResponseDTO.NormalCoverallsSize = PPEReceiving.NormalCoverallsSize;
							PPEReceivingResponseDTO.ThermalCoverallsSize = PPEReceiving.ThermalCoverallsSize;
							PPEReceivingResponseDTO.SafetyBootsSize = PPEReceiving.SafetyBootsSize;
							foreach (var ppeAndPPEReceiving in PPEReceiving.PPEAndPPEReceiving)
							{
								string pPEDTO;
								pPEDTO = ppeAndPPEReceiving.PPE.Name;
								PPEReceivingResponseDTO.PPEs.Add(pPEDTO);

							}


							PPEReceivingResponseDTOs.Add(PPEReceivingResponseDTO);


						}
						result.Message = "Success";
						result.Data = PPEReceivingResponseDTOs;
						result.Statescode = 200;
						return result;
					}
					else
					{
						result.Message = "Not found with this EmpCode";
						result.Data = PPEReceivingResponseDTOs;
						result.Statescode = 404;
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


        [HttpGet("GetDataByEmpCode/{EmpCode:int}")]
        public ActionResult<ResultDTO> GetAllWithDataSearchByEmpCode(int EmpCode, string UserId, string UserRole)
        {

           

            ResultDTO result = new ResultDTO();

            try
            {
                List<PPEReceivingResponseDTO> PPEReceivingResponseDTOs = new List<PPEReceivingResponseDTO>();
                List<PPEReceiving> PPEReceivingts = PPEReceivingRepoistory.getall().Where(a => a.EmployeeCode == EmpCode).ToList();
                if (PPEReceivingts.Count > 0)
                {
                    foreach (PPEReceiving PPEReceiving in PPEReceivingts)
                    {

                        PPEReceivingResponseDTO PPEReceivingResponseDTO = new PPEReceivingResponseDTO();
                        PPEReceivingResponseDTO.Id = PPEReceiving.Id;
                        PPEReceivingResponseDTO.RigId = PPEReceiving.Rig.Number;
                        PPEReceivingResponseDTO.Date = PPEReceiving.Date;
                        PPEReceivingResponseDTO.UserName = PPEReceiving.User.UserName;
                        PPEReceivingResponseDTO.userID = PPEReceiving.userID;
                        PPEReceivingResponseDTO.QHSEEmpName = PPEReceiving.QHSEEmpName;
                        PPEReceivingResponseDTO.QHSEEmpCode = PPEReceiving.QHSEEmpCode;
                        PPEReceivingResponseDTO.QHSEPositionName = PPEReceiving.QHSEPositionName;
                        PPEReceivingResponseDTO.EmployeeCode = PPEReceiving.EmployeeCode;
                        PPEReceivingResponseDTO.EmployeeName = PPEReceiving.EmployeeName;
                        PPEReceivingResponseDTO.EmployeePositionName = PPEReceiving.EmployeePositionName;
                        PPEReceivingResponseDTO.NormalCoverallsSize = PPEReceiving.NormalCoverallsSize;
                        PPEReceivingResponseDTO.ThermalCoverallsSize = PPEReceiving.ThermalCoverallsSize;
                        PPEReceivingResponseDTO.SafetyBootsSize = PPEReceiving.SafetyBootsSize;
                        foreach (var ppeAndPPEReceiving in PPEReceiving.PPEAndPPEReceiving)
                        {
                            string pPEDTO;
                            pPEDTO = ppeAndPPEReceiving.PPE.Name;
                            PPEReceivingResponseDTO.PPEs.Add(pPEDTO);

                        }


                        PPEReceivingResponseDTOs.Add(PPEReceivingResponseDTO);


                    }
                    result.Message = "Success";
                    result.Data = PPEReceivingResponseDTOs;
                    result.Statescode = 200;
                    return result;
                }
                else
                {
                    result.Message = "Not found with this EmpCode";
                    result.Data = PPEReceivingResponseDTOs;
                    result.Statescode = 404;
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

        [HttpPut("Delete/{id:int}")]
		public ActionResult<ResultDTO> Delete(int id) 
		{
			ResultDTO result = new ResultDTO();
			try
			{
				PPEReceiving PPEReceiving = PPEReceivingRepo.getbyid(id);
				PPEReceiving.IsDeleted = true;
                PPEReceivingRepo.update(PPEReceiving);
				List<PPEAndPPEReceiving> PPEs = PPERepo.getall().Where(a => a.PPEReceivingId == id).ToList();

				foreach (var item in PPEs)
				{
					item.IsDeleted = true;
					PPERepo.update(item);
				}
				

				result.Data = PPEReceiving;
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
