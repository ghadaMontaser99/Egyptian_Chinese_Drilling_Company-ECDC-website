using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Drawing2D;
using TempProject.DTO;
using TempProject.DTO.ResponseDTO;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class SubjectListController : ControllerBase
    {
        public IRepository<SubjectList> SubjectListRepo { get; set; }

        public SubjectListController(IRepository<SubjectList> _SubjectListRepo)
        {
            this.SubjectListRepo = _SubjectListRepo;
        }

        [HttpGet]
        public ActionResult<ResultDTO> GetAll()
        {

            ResultDTO result = new ResultDTO();

            List<SubjectList> temp = SubjectListRepo.getall();
            List<SubjectListDTO> newTemp = new List<SubjectListDTO>();
            foreach (SubjectList subjectlists in temp)
            {
                SubjectListDTO subjectlisstDTO = new SubjectListDTO();
                subjectlisstDTO.Id = subjectlists.Id;
                subjectlisstDTO.Name = subjectlists.Name;
                subjectlisstDTO.IsDeleted = subjectlists.IsDeleted;

                newTemp.Add(subjectlisstDTO);
            }
            if (newTemp != null)
            {

                result.Statescode = 200;
                result.Data = newTemp;
                result.Message = "Success";

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

            List<SubjectList> temp = SubjectListRepo.getall();
            List<SubjectListExcelDTO> newTemp = new List<SubjectListExcelDTO>();
            foreach (SubjectList subjectlists in temp)
            {
                SubjectListExcelDTO subjectlistExcelDTO = new SubjectListExcelDTO();
                subjectlistExcelDTO.Id = subjectlists.Id;
                subjectlistExcelDTO.Name = subjectlists.Name;

                newTemp.Add(subjectlistExcelDTO);
            }
            if (newTemp != null)
            {

                result.Statescode = 200;
                result.Data = newTemp;
                result.Message = "Success";

                return result;
            }

            result.Statescode = 404;
            result.Message = "data not found";
            return result;

        }

        [HttpGet("ByPage/{page:int}")]
        public PageResult<SubjectListDTO> GettAllSubjectListByPage(int? page, int pagesize = 10)
        {
            List<SubjectList> temp = SubjectListRepo.getall();
            List<SubjectListDTO> newTemp = new List<SubjectListDTO>();
            foreach (SubjectList subjectlists in temp)
            {
                SubjectListDTO subjectlistDTO = new SubjectListDTO();
                subjectlistDTO.Id = subjectlists.Id;
                subjectlistDTO.Name = subjectlists.Name;
                subjectlistDTO.IsDeleted = subjectlists.IsDeleted;

                newTemp.Add(subjectlistDTO);
            }

            float countDetails = SubjectListRepo.getall().Count();
            var result = new PageResult<SubjectListDTO>
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
                SubjectListDTO subjectlistDTO = new SubjectListDTO();
                SubjectList subjectlist = SubjectListRepo.getbyid(ID);
                subjectlistDTO.Id = subjectlist.Id;
                subjectlistDTO.Name = subjectlist.Name;
                subjectlistDTO.IsDeleted = subjectlist.IsDeleted;

                result.Message = "Success";
                result.Data = subjectlistDTO;
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
        public ActionResult<ResultDTO> Put(int id, SubjectListDTO newSubjectList) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    SubjectList orgSubjectList = SubjectListRepo.getbyid(id);
                    newSubjectList.Id = orgSubjectList.Id;
                    orgSubjectList.Name = newSubjectList.Name;
                    orgSubjectList.IsDeleted = newSubjectList.IsDeleted;


                    SubjectListRepo.update(orgSubjectList);
                    result.Message = "Success";
                    result.Data = orgSubjectList;
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
        public ActionResult<ResultDTO> AddSubjectList(SubjectListDTO SubjectListDTO)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    SubjectList subjectlist = new SubjectList();
                    subjectlist.Id = SubjectListDTO.Id;
                    subjectlist.Name = SubjectListDTO.Name;
                    subjectlist.IsDeleted = SubjectListDTO.IsDeleted;

                    SubjectListRepo.create(subjectlist);
                    result.Data = SubjectListDTO;
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

        [HttpPut("Delete/{id:int}")]
        public ActionResult<ResultDTO> Delete(int id) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();
            try
            {
                SubjectList subjectlist = SubjectListRepo.getbyid(id);
                subjectlist.IsDeleted = true;
                SubjectListRepo.update(subjectlist);
                result.Data = subjectlist;
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
