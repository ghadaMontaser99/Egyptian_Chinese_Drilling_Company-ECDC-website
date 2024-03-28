using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TempProject.DTO;
using TempProject.DTO.ResponseDTO;
using TempProject.Helper;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrillController : ControllerBase
    {
        public IRepository<Drill> DrillRepo { get; set; }
        public IRepository<DrillImages> DrillImagesRepo { get; set; }
        public IRepository<EmergencyResponseTeamMembers> EmergencyResponseTeamMembersRepo { get; set; }

        public IDrillRepository DrillRepoistory { get; set; }

        private readonly Microsoft.AspNetCore.Identity.UserManager<IdentityUser> userManager;


        public DrillController(Microsoft.AspNetCore.Identity.UserManager<IdentityUser> _userManager,
            IRepository<Drill> _DrillRepo,
            IDrillRepository _DrillRepoistory,
            IRepository<DrillImages> _DrillImagesRepo,
            IRepository<EmergencyResponseTeamMembers> _EmergencyResponseTeamMembersRepo)

            
        {
            this.DrillRepo = _DrillRepo;
            this.DrillRepoistory = _DrillRepoistory;
            this.userManager = _userManager;
            this.DrillImagesRepo = _DrillImagesRepo;
            this.EmergencyResponseTeamMembersRepo = _EmergencyResponseTeamMembersRepo;

        }

        [HttpGet("GetData")]
        public async Task<ResultDTO> GetAllWithData(string UserID, string UserRole)
        {
            ResultDTO result = new ResultDTO();

            try
            {
                if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    List<Drill> temp = DrillRepoistory.getall();
                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {

                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypeId = drill.DrillTypeId;
                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;
                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;


                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;

                        drillDTO.userName = drill.user.UserName;
                        drillDTO.userID = drill.user.Id;

                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == drill.Id).ToList();

                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }

                        List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == drill.Id).ToList();
                        foreach (var item in drillImages)
                        {
                            string FileName = item.FileName;
                            drillDTO.Images.Add(FileName);

                        }
                        newTemp.Add(drillDTO);
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
                    List<Drill> temp = DrillRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypeId = drill.DrillTypeId;
                        drillDTO.userName = drill.user.UserName;
                        drillDTO.DrillTypeName = drill.DrillType.Name;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;
                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;
                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;
                        drillDTO.userID = drill.user.Id;

                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == drill.Id).ToList();

                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;



                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }

                        //if (emergencyResponseTeamMembers[4].TeamMemberCode.HasValue)
                        //{
                        //    drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        //    drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        //    drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        //}

                        //if (emergencyResponseTeamMembers[5].TeamMemberCode.HasValue)
                        //{
                        //    drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                        //    drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                        //    drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        //}

                        //if (emergencyResponseTeamMembers[6].TeamMemberCode.HasValue)
                        //{

                        //    drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                        //    drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                        //    drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        //}

                        //if (emergencyResponseTeamMembers[7].TeamMemberCode.HasValue)
                        //{
                        //    drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                        //    drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                        //    drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;

                        //}


                        List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == drill.Id).ToList();
                        foreach (var item in drillImages)
                        {
                            string FileName = item.FileName;
                            drillDTO.Images.Add(FileName);

                        }
                        newTemp.Add(drillDTO);
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
                    List<Drill> temp = DrillRepoistory.getall();
                    List<DrillExcelDTO> newTemp = new List<DrillExcelDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillExcelDTO drillDTO = new DrillExcelDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypId = drill.DrillTypeId;

                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.userName = drill.user.UserName;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;

                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;

                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;

                        drillDTO.userName = drill.user.UserName;

                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == drill.Id).ToList();


                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;
                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }

                        foreach (var item in drill.Images)
                        {
                            drillDTO.images.Add(item.FileName);

                        }
                        newTemp.Add(drillDTO);
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
                    List<Drill> temp = DrillRepoistory.getall().Where(a => a.user.Id == UserID).ToList();
                    List<DrillExcelDTO> newTemp = new List<DrillExcelDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillExcelDTO drillDTO = new DrillExcelDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypId = drill.DrillTypeId;
                        drillDTO.userName = drill.user.UserName;
                        drillDTO.DrillTypeName = drill.DrillType.Name;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;
                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;

                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;
                        drillDTO.userName = drill.user.UserName;

                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == drill.Id).ToList();

                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;


                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }



                        foreach (var item in drill.Images)
                        {
                            drillDTO.images.Add(item.FileName);

                        }
                        newTemp.Add(drillDTO);
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
        public PageResult<DrillResponseDTO> GettAllDrillByPage(string UserId, string UserRole, int? page, int pagesize = 10)
        {

            try
            {
                if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    List<Drill> temp = DrillRepoistory.getall();
                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall();

                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypeId = drill.DrillTypeId;
                        drillDTO.userName = drill.user.UserName;
                        drillDTO.DrillTypeName = drill.DrillType.Name;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;
                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;

                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;


                        drillDTO.userName = drill.user.UserName;
                        drillDTO.userID = drill.user.Id;


                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }


                        //foreach (EmergencyResponseTeamMembers item in drill.emergencyResponseTeamMembers)
                        //{
                        //    EmergencyResponseTeamMembersDTO emergencyResponseTeamMembersDTO = new EmergencyResponseTeamMembersDTO();
                        //    emergencyResponseTeamMembersDTO.TeamMemberCode = (int)item.TeamMemberCode;
                        //    emergencyResponseTeamMembersDTO.TeamMemberName = item.TeamMemberName;
                        //    emergencyResponseTeamMembersDTO.TeamMemberPosition = item.TeamMemberPosition;
                        //    emergencyResponseTeamMembersDTO.Id = item.Id;
                        //    emergencyResponseTeamMembersDTO.IsDeleted = item.IsDeleted;
                        //    drillDTO.emergencyResponseTeamMembersDTOs.Add(emergencyResponseTeamMembersDTO);

                        //}



                        List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == drill.Id).ToList();
                        foreach (var item in drillImages)
                        {
                            string FileName = item.FileName;
                            drillDTO.Images.Add(FileName);
                        }


                        newTemp.Add(drillDTO);
                        //result.Data = prod;
                    }

                    float countDetails = DrillRepoistory.getall().Count();
                    var result = new PageResult<DrillResponseDTO>
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
                    List<Drill> temp = DrillRepoistory.getall().Where(a => a.user.Id == UserId).ToList();
                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall();
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypeId = drill.DrillTypeId;
                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.userName = drill.user.UserName;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;


                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;

                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;

                        drillDTO.userName = drill.user.UserName;
                        drillDTO.userID = drill.user.Id;


                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;


                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }


                        List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == drill.Id).ToList();
                        foreach (var item in drillImages)
                        {
                            string FileName = item.FileName;
                            drillDTO.Images.Add(FileName);
                        }


                        newTemp.Add(drillDTO);
                    }

                    float countDetails = DrillRepoistory.getall().Where(a => a.user.Id == UserId).Count();
                    var result = new PageResult<DrillResponseDTO>
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
                return new PageResult<DrillResponseDTO>();

            }
            return new PageResult<DrillResponseDTO>();
        }

        [HttpGet("GetDataById/{ID:int}")]
        public ActionResult<ResultDTO> GetAllWithDataByID(int ID, string UserId, string UserRole)
        {
            ResultDTO result = new ResultDTO();


            if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
            {
                Drill temp = DrillRepoistory.getall().FirstOrDefault(a => a.Id == ID);
                if (temp != null)
                {
                    DrillResponseDTO drillDTO = new DrillResponseDTO();
                    List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == temp.Id).ToList();

                    drillDTO.Id = temp.Id;
                    drillDTO.RigId = temp.Rig.Id;
                    drillDTO.Date = temp.Date;
                    drillDTO.TimeInitiated = temp.TimeInitiated;
                    drillDTO.TimeCompleted = temp.TimeCompleted;
                    drillDTO.DrillTypeId = temp.DrillTypeId;

                    drillDTO.userName = temp.user.UserName;
                    drillDTO.DrillTypeName = temp.DrillType.Name;

                    drillDTO.Duration = temp.Duration;
                    drillDTO.DeficienciesPoints = temp.DeficienciesPoints;
                    drillDTO.DrillScenario = temp.DrillScenario;
                    drillDTO.Recommendations = temp.Recommendations;
                    drillDTO.EffectivenessPoints = temp.EffectivenessPoints;
                    drillDTO.EmergencyEquipmentUsed = temp.EmergencyEquipmentUsed;


                    drillDTO.STPCode = temp.STPCode;
                    drillDTO.STPName = temp.STPName;
                    drillDTO.STPPositionName = temp.STPPositionName;

                    drillDTO.QHSEEmpCode = temp.QHSEEmpCode;
                    drillDTO.QHSEEmpName = temp.QHSEEmpName;
                    drillDTO.QHSEPositionName = temp.QHSEPositionName;

                    drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                    drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                    drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                    drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                    drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                    drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                    drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                    drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                    drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                    drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                    drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                    drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                    drillDTO.userID = temp.user.Id;

                    if (emergencyResponseTeamMembers.Count == 1)
                    {
                        drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                    }

                    else if (emergencyResponseTeamMembers.Count == 2)
                    {
                        drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                        drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                        drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                    }

                    else if (emergencyResponseTeamMembers.Count == 3)
                    {
                        drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                        drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                        drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                        drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                        drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                        drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                    }

                   else if (emergencyResponseTeamMembers.Count >= 4)
                    {
                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                        if (emergencyResponseTeamMembers.Count >= 5)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }
                        if (emergencyResponseTeamMembers.Count >= 6)
                        {
                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                        }
                        if (emergencyResponseTeamMembers.Count >= 7)
                        {
                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }
                         if (emergencyResponseTeamMembers.Count >= 8)
                        {
                            drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                            drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                            drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                        }
                       
                    }

                    List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == temp.Id).ToList();
                    foreach (var item in drillImages)
                    {
                        string FileName = item.FileName;
                        drillDTO.Images.Add(FileName);

                    }

                    if (drillDTO != null)
                    {

                        result.Message = "Success";
                        result.Statescode = 200;
                        result.Data = drillDTO;

                        return result;
                    }
                }

            }
            else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
            {
                Drill temp = DrillRepoistory.getall().FirstOrDefault(a => a.Id == ID && a.user.Id == UserId);
                if (temp != null)
                {
                    List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == temp.Id).ToList();
                    DrillResponseDTO drillDTO = new DrillResponseDTO();
                    drillDTO.Id = temp.Id;
                    drillDTO.RigId = temp.Rig.Id;
                    drillDTO.Date = temp.Date;
                    drillDTO.TimeInitiated = temp.TimeInitiated;
                    drillDTO.TimeCompleted = temp.TimeCompleted;
                    drillDTO.DrillTypeId = temp.DrillTypeId;
                    drillDTO.userName = temp.user.UserName;
                    drillDTO.DrillTypeName = temp.DrillType.Name;

                    drillDTO.Duration = temp.Duration;
                    drillDTO.DeficienciesPoints = temp.DeficienciesPoints;
                    drillDTO.DrillScenario = temp.DrillScenario;
                    drillDTO.Recommendations = temp.Recommendations;
                    drillDTO.EffectivenessPoints = temp.EffectivenessPoints;
                    drillDTO.EmergencyEquipmentUsed = temp.EmergencyEquipmentUsed;

                    drillDTO.STPCode = temp.STPCode;
                    drillDTO.STPName = temp.STPName;
                    drillDTO.STPPositionName = temp.STPPositionName;

                    drillDTO.QHSEEmpCode = temp.QHSEEmpCode;
                    drillDTO.QHSEEmpName = temp.QHSEEmpName;
                    drillDTO.QHSEPositionName = temp.QHSEPositionName;

                    drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                    drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                    drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                    drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                    drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                    drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                    drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                    drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                    drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                    drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                    drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                    drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                    drillDTO.userID = temp.user.Id;

                    if (emergencyResponseTeamMembers.Count == 1)
                    {
                        drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                    }

                    else if (emergencyResponseTeamMembers.Count == 2)
                    {
                        drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                        drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                        drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                    }

                    else if (emergencyResponseTeamMembers.Count == 3)
                    {
                        drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                        drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                        drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                        drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                        drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                        drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                        drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                        drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                    }
                    else if (emergencyResponseTeamMembers.Count >= 4)
                    {
                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                        if (emergencyResponseTeamMembers.Count >= 5)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }
                        if (emergencyResponseTeamMembers.Count >= 6)
                        {
                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                        }
                        if (emergencyResponseTeamMembers.Count >= 7)
                        {
                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }
                        if (emergencyResponseTeamMembers.Count >= 8)
                        {
                            drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                            drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                            drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                        }
                    }



                    List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == temp.Id).ToList();
                    foreach (var item in drillImages)
                    {
                        string FileName = item.FileName;
                        drillDTO.Images.Add(FileName);

                    }


                    if (drillDTO != null)
                    {

                        result.Message = "Success";
                        result.Statescode = 200;
                        result.Data = drillDTO;

                        return result;
                    }
                }

            }

            result.Statescode = 404;
            result.Message = "data not found";
            return result;
        }

        //  ------------------filter by DrillType------------------------------------------

        [HttpGet("GetDataByDrillType/{DrillType}")]
        public ActionResult<ResultDTO> GetAllWithDataByDrillType(string DrillType, string UserId, string UserRole,string date, int RigNumber)
        {
            DateTime dateObject = DateTime.Parse(date);
            ResultDTO result = new ResultDTO();

            try
            {
                if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    List<DrillResponseDTO> DrillDTOs = new List<DrillResponseDTO>();
                    List<Drill> drills = DrillRepoistory.getall().Where(a => a.DrillType.Name == DrillType&&a.Rig.Number==RigNumber&&a.Date== dateObject).ToList();
                    foreach (Drill drill in drills)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        drillDTO.DrillTypeId = drill.DrillTypeId;
                        drillDTO.userName = drill.user.UserName;
                        drillDTO.DrillTypeName = drill.DrillType.Name;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;
                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;

                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;

                        drillDTO.userID = drill.user.Id;
                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == drill.Id).ToList();

                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;


                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }





                        List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == drill.Id).ToList();
                        foreach (var item in drillImages)
                        {
                            string FileName = item.FileName;
                            drillDTO.Images.Add(FileName);

                        }

                        DrillDTOs.Add(drillDTO);
                        //result.Data = prod;
                    }
                    result.Message = "Success";
                    result.Data = DrillDTOs;
                    result.Statescode = 200;
                    return result;
                }
                else if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
                {
                    List<DrillResponseDTO> DrillDTOs = new List<DrillResponseDTO>();
                    List<Drill> drills = DrillRepoistory.getall().Where(a => a.DrillType.Name == DrillType && a.Rig.Number == RigNumber && a.Date == dateObject&& a.user.Id == UserId).ToList();
                    foreach (Drill drill in drills)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Number;
                        drillDTO.Date = drill.Date;
                        drillDTO.TimeInitiated = drill.TimeInitiated;
                        drillDTO.TimeCompleted = drill.TimeCompleted;
                        //drillDTO.DrillTypId = drill.DrillTypId;
                        drillDTO.userName = drill.user.UserName;
                        drillDTO.DrillTypeName = drill.DrillType.Name;

                        drillDTO.Duration = drill.Duration;
                        drillDTO.DeficienciesPoints = drill.DeficienciesPoints;
                        drillDTO.DrillScenario = drill.DrillScenario;
                        drillDTO.Recommendations = drill.Recommendations;
                        drillDTO.EffectivenessPoints = drill.EffectivenessPoints;
                        drillDTO.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;

                        drillDTO.STPCode = drill.STPCode;
                        drillDTO.STPName = drill.STPName;
                        drillDTO.STPPositionName = drill.STPPositionName;

                        drillDTO.QHSEEmpCode = drill.QHSEEmpCode;
                        drillDTO.QHSEEmpName = drill.QHSEEmpName;
                        drillDTO.QHSEPositionName = drill.QHSEPositionName;


                        drillDTO.userID = drill.user.Id;
                        List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(emp => emp.DrillId == drill.Id).ToList();

                        drillDTO.TeamMemeberCode = (int)emergencyResponseTeamMembers[0].TeamMemberCode;
                        drillDTO.TeamMemeberName = emergencyResponseTeamMembers[0].TeamMemberName;
                        drillDTO.TeamMemeberPosition = emergencyResponseTeamMembers[0].TeamMemberPosition;

                        drillDTO.TeamMemeberCode1 = (int)emergencyResponseTeamMembers[1].TeamMemberCode;
                        drillDTO.TeamMemeberName1 = emergencyResponseTeamMembers[1].TeamMemberName;
                        drillDTO.TeamMemeberPosition1 = emergencyResponseTeamMembers[1].TeamMemberPosition;

                        drillDTO.TeamMemeberCode2 = (int)emergencyResponseTeamMembers[2].TeamMemberCode;
                        drillDTO.TeamMemeberName2 = emergencyResponseTeamMembers[2].TeamMemberName;
                        drillDTO.TeamMemeberPosition2 = emergencyResponseTeamMembers[2].TeamMemberPosition;

                        drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                        drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                        drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;


                        if (emergencyResponseTeamMembers.Count == 1)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                        }

                        else if (emergencyResponseTeamMembers.Count == 2)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count == 3)
                        {
                            drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                            drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                            drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                            drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                            drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                            drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                            drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                        }

                        else if (emergencyResponseTeamMembers.Count >= 4)
                        {
                            drillDTO.TeamMemeberCode3 = (int)emergencyResponseTeamMembers[3].TeamMemberCode;
                            drillDTO.TeamMemeberName3 = emergencyResponseTeamMembers[3].TeamMemberName;
                            drillDTO.TeamMemeberPosition3 = emergencyResponseTeamMembers[3].TeamMemberPosition;

                            if (emergencyResponseTeamMembers.Count >= 5)
                            {
                                drillDTO.TeamMemeberCode4 = (int)emergencyResponseTeamMembers[4].TeamMemberCode;
                                drillDTO.TeamMemeberName4 = emergencyResponseTeamMembers[4].TeamMemberName;
                                drillDTO.TeamMemeberPosition4 = emergencyResponseTeamMembers[4].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 6)
                            {
                                drillDTO.TeamMemeberCode5 = (int)emergencyResponseTeamMembers[5].TeamMemberCode;
                                drillDTO.TeamMemeberName5 = emergencyResponseTeamMembers[5].TeamMemberName;
                                drillDTO.TeamMemeberPosition5 = emergencyResponseTeamMembers[5].TeamMemberPosition;

                            }
                            if (emergencyResponseTeamMembers.Count >= 7)
                            {
                                drillDTO.TeamMemeberCode6 = (int)emergencyResponseTeamMembers[6].TeamMemberCode;
                                drillDTO.TeamMemeberName6 = emergencyResponseTeamMembers[6].TeamMemberName;
                                drillDTO.TeamMemeberPosition6 = emergencyResponseTeamMembers[6].TeamMemberPosition;
                            }
                            if (emergencyResponseTeamMembers.Count >= 8)
                            {
                                drillDTO.TeamMemeberCode7 = (int)emergencyResponseTeamMembers[7].TeamMemberCode;
                                drillDTO.TeamMemeberName7 = emergencyResponseTeamMembers[7].TeamMemberName;
                                drillDTO.TeamMemeberPosition7 = emergencyResponseTeamMembers[7].TeamMemberPosition;
                            }

                        }

                        List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == drill.Id).ToList();
                        foreach (var item in drillImages)
                        {
                            string FileName = item.FileName;
                            drillDTO.Images.Add(FileName);

                        }

                        DrillDTOs.Add(drillDTO);
                    }
                    result.Message = "Success";
                    result.Data = DrillDTOs;
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
        public ActionResult<ResultDTO> AddDrill ([FromForm] DrillDTO drill)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    Drill drillObj = new Drill();
                    drillObj.Id = default;
                    drillObj.RigId = drill.RigId;
                    drillObj.Date = drill.Date;
                    drillObj.TimeInitiated = drill.TimeInitiated;
                    drillObj.TimeCompleted = drill.TimeCompleted;
                    drillObj.DrillTypeId = drill.DrillTypeId;
                    drillObj.Duration = drill.Duration;
                       //Math.Floor(Math.Abs(drill.TimeCompleted - drill.TimeInitiated)) * 60 + (Math.Abs(drill.TimeCompleted - drill.TimeInitiated) % 1) * 100 ;

                    drillObj.DeficienciesPoints = drill.DeficienciesPoints;
                    drillObj.DrillScenario = drill.DrillScenario;
                    drillObj.Recommendations = drill.Recommendations;
                    drillObj.EffectivenessPoints = drill.EffectivenessPoints;
                    drillObj.EmergencyEquipmentUsed = drill.EmergencyEquipmentUsed;

                    drillObj.STPCode = drill.STPCode;
                    drillObj.STPName = drill.STPName;   
                    drillObj.STPPositionName = drill.STPPositionName;

                    drillObj.QHSEEmpCode = drill.QHSEEmpCode;
                    drillObj.QHSEEmpName = drill.QHSEEmpName;
                    drillObj.QHSEPositionName = drill.QHSEPositionName;

                    

                    drillObj.userID = drill.userID;
                    DrillRepo.create(drillObj);

                    EmergencyResponseTeamMembers emergencyResponseTeamMembers = new EmergencyResponseTeamMembers();
                    emergencyResponseTeamMembers.DrillId = drillObj.Id;
                    emergencyResponseTeamMembers.TeamMemberCode = drill.TeamMemeberCode;
                    emergencyResponseTeamMembers.TeamMemberName = drill.TeamMemeberName;
                    emergencyResponseTeamMembers.TeamMemberPosition = drill.TeamMemeberPosition;
                    EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers);

                    EmergencyResponseTeamMembers emergencyResponseTeamMembers1 = new EmergencyResponseTeamMembers();
                    emergencyResponseTeamMembers1.DrillId = drillObj.Id;
                    emergencyResponseTeamMembers1.TeamMemberCode = drill.TeamMemeberCode1;
                    emergencyResponseTeamMembers1.TeamMemberName = drill.TeamMemeberName1;
                    emergencyResponseTeamMembers1.TeamMemberPosition = drill.TeamMemeberPosition1;
                    EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers1);

                    EmergencyResponseTeamMembers emergencyResponseTeamMembers2 = new EmergencyResponseTeamMembers();
                    emergencyResponseTeamMembers2.DrillId = drillObj.Id;
                    emergencyResponseTeamMembers2.TeamMemberCode = drill.TeamMemeberCode1;
                    emergencyResponseTeamMembers2.TeamMemberName = drill.TeamMemeberName1;
                    emergencyResponseTeamMembers2.TeamMemberPosition = drill.TeamMemeberPosition1;
                    EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers2);

                    EmergencyResponseTeamMembers emergencyResponseTeamMembers3 = new EmergencyResponseTeamMembers();
                    emergencyResponseTeamMembers3.DrillId = drillObj.Id;
                    emergencyResponseTeamMembers3.TeamMemberCode = drill.TeamMemeberCode1;
                    emergencyResponseTeamMembers3.TeamMemberName = drill.TeamMemeberName1;
                    emergencyResponseTeamMembers3.TeamMemberPosition = drill.TeamMemeberPosition1;
                    EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers3);




                    if (drill.TeamMemeberCode4.HasValue)

                    {
                        EmergencyResponseTeamMembers emergencyResponseTeamMembers4 = new EmergencyResponseTeamMembers();
                        emergencyResponseTeamMembers4.DrillId = drillObj.Id;
                        emergencyResponseTeamMembers4.TeamMemberCode = drill.TeamMemeberCode4;
                        emergencyResponseTeamMembers4.TeamMemberName = drill.TeamMemeberName4;
                        emergencyResponseTeamMembers4.TeamMemberPosition =drill.TeamMemeberPosition4;
                        EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers4);

                    }


                    if (drill.TeamMemeberCode5.HasValue)

                    {
                        EmergencyResponseTeamMembers emergencyResponseTeamMembers5 = new EmergencyResponseTeamMembers();
                        emergencyResponseTeamMembers5.DrillId = drillObj.Id;
                        emergencyResponseTeamMembers5.TeamMemberCode = drill.TeamMemeberCode5;
                        emergencyResponseTeamMembers5.TeamMemberName = drill.TeamMemeberName5;
                        emergencyResponseTeamMembers5.TeamMemberPosition = drill.TeamMemeberPosition5;
                        EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers5);

                    }

                    if (drill.TeamMemeberCode6.HasValue)

                    {
                        EmergencyResponseTeamMembers emergencyResponseTeamMembers6 = new EmergencyResponseTeamMembers();
                        emergencyResponseTeamMembers6.DrillId = drillObj.Id;
                        emergencyResponseTeamMembers6.TeamMemberCode = drill.TeamMemeberCode6;
                        emergencyResponseTeamMembers6.TeamMemberName = drill.TeamMemeberName6;
                        emergencyResponseTeamMembers6.TeamMemberPosition = drill.TeamMemeberPosition6;
                        EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers6);

                    }

                    if (drill.TeamMemeberCode7.HasValue)

                    {
                        EmergencyResponseTeamMembers emergencyResponseTeamMembers7 = new EmergencyResponseTeamMembers();
                        emergencyResponseTeamMembers7.DrillId = drillObj.Id;
                        emergencyResponseTeamMembers7.TeamMemberCode = drill.TeamMemeberCode7;
                        emergencyResponseTeamMembers7.TeamMemberName = drill.TeamMemeberName7;
                        emergencyResponseTeamMembers7.TeamMemberPosition = drill.TeamMemeberPosition7;
                        EmergencyResponseTeamMembersRepo.create(emergencyResponseTeamMembers7);

                    }

                    foreach (var item in drill.Images)
                    {
                        DrillImages drillImages = new DrillImages();
                        drillImages.FileName = ImagesHelper.uploadImg(item, "DrillIMG");
                        drillImages.DrillId = drillObj.Id;
                        DrillImagesRepo.create(drillImages);
                    }

                    result.Message = "Success";
                    result.Data = drillObj;
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




        [HttpGet("GetDrillAnalysisByDrillTypeAndMonth")]
        public ActionResult<ResultDTO> GetDrillAnalysisWithCompareByMonth(int Month1, int Month2, string UserRole,string UserId)
        {

            ResultDTO result = new ResultDTO();

            try
            {
                if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
                {
                    List<Drill> temp = DrillRepoistory.getall().Where(r => (r.Date.Month == Month1 || r.Date.Month == Month2) && r.user.Id==UserId).ToList();

                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Id;
                        drillDTO.Date = drill.Date;
                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.userID = drill.user.Id;
                        newTemp.Add(drillDTO);
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




        [HttpGet("GetDrillAnalysisByDrillTypeAndYear")]
        public ActionResult<ResultDTO> GetDrillAnalysisByDrillTypeAndYear(int Year, string UserRole, string UserId)
        {

            ResultDTO result = new ResultDTO();

            try
            {
                if (string.Equals(UserRole, "User", StringComparison.OrdinalIgnoreCase))
                {
                    List<Drill> temp = DrillRepoistory.getall().Where(r =>  r.Date.Year == Year && r.user.Id == UserId) .ToList();

                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Id;
                        drillDTO.Date = drill.Date;
                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.userID = drill.user.Id;
                        newTemp.Add(drillDTO);
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

                   /// Admin
        [HttpGet("GetDrillAnalysisWithCompareByYear")]
        public ActionResult<ResultDTO> GetDrillAnalysisWithCompare([FromQuery] int Year, string UserRole)
        {

            ResultDTO result = new ResultDTO();

            try
            {
                 if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    List<Drill> temp = DrillRepoistory.getall().Where(r => (r.Date.Year == Year)).ToList();


                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Id;
                        drillDTO.Date = drill.Date;
                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.userID = drill.user.Id;

                        newTemp.Add(drillDTO);
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


        [HttpGet("GetDrillAnalysisWithCompareByMonth")]
        public ActionResult<ResultDTO> GetDrillAnalysisWithCompareByMonth(int Month1, int Month2, string UserRole)
        {

            ResultDTO result = new ResultDTO();

            try
            {
                
                if (string.Equals(UserRole, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    List<Drill> temp = DrillRepoistory.getall().Where(r =>(r.Date.Month == Month1 || r.Date.Month == Month2)).ToList();
                    List<DrillResponseDTO> newTemp = new List<DrillResponseDTO>();
                    foreach (Drill drill in temp)
                    {
                        DrillResponseDTO drillDTO = new DrillResponseDTO();
                        drillDTO.Id = drill.Id;
                        drillDTO.RigId = drill.Rig.Id;
                        drillDTO.Date = drill.Date;
                        drillDTO.DrillTypeName = drill.DrillType.Name;
                        drillDTO.userName = drill.user.UserName;

                        newTemp.Add(drillDTO);
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



        [HttpPut("{id:int}")]
        public ActionResult<ResultDTO> Put(int id, [FromForm] DrillDTO newDrill) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    Drill orgDrill = DrillRepo.getbyid(id);
                    List<EmergencyResponseTeamMembers> emergencyResponseTeams = EmergencyResponseTeamMembersRepo.getall().Where(p => p.DrillId == id).ToList();

                    newDrill.Id = orgDrill.Id;
                    orgDrill.RigId = newDrill.RigId;
                    orgDrill.Date = newDrill.Date;
                    orgDrill.TimeInitiated = newDrill.TimeInitiated;
                    orgDrill.TimeCompleted = newDrill.TimeCompleted;
                    orgDrill.DrillTypeId = newDrill.DrillTypeId;
                    orgDrill.Duration = newDrill.Duration;
                    orgDrill.DeficienciesPoints = newDrill.DeficienciesPoints;
                    orgDrill.DrillScenario = newDrill.DrillScenario;
                    orgDrill.Recommendations = newDrill.Recommendations;
                    orgDrill.EffectivenessPoints = newDrill.EffectivenessPoints;
                    orgDrill.EmergencyEquipmentUsed = newDrill.EmergencyEquipmentUsed;

                    orgDrill.STPCode = newDrill.STPCode;
                    orgDrill.STPName = newDrill.STPName;
                    orgDrill.STPPositionName = newDrill.STPPositionName;

                    orgDrill.QHSEEmpCode = newDrill.QHSEEmpCode;
                    orgDrill.QHSEEmpName = newDrill.QHSEEmpName;
                    orgDrill.QHSEPositionName = newDrill.QHSEPositionName;

                    emergencyResponseTeams[0].DrillId = newDrill.Id;
                    emergencyResponseTeams[0].TeamMemberCode = newDrill.TeamMemeberCode;
                    emergencyResponseTeams[0].TeamMemberName = newDrill.TeamMemeberName;
                    emergencyResponseTeams[0].TeamMemberPosition = newDrill.TeamMemeberPosition;

                    EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[0]);

                    emergencyResponseTeams[1].DrillId = newDrill.Id;
                    emergencyResponseTeams[1].TeamMemberCode = newDrill.TeamMemeberCode1;
                    emergencyResponseTeams[1].TeamMemberName = newDrill.TeamMemeberName1;
                    emergencyResponseTeams[1].TeamMemberPosition = newDrill.TeamMemeberPosition1;

                    EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[1]);

                    emergencyResponseTeams[2].DrillId = newDrill.Id;
                    emergencyResponseTeams[2].TeamMemberCode = newDrill.TeamMemeberCode2;
                    emergencyResponseTeams[2].TeamMemberName = newDrill.TeamMemeberName2;
                    emergencyResponseTeams[2].TeamMemberPosition = newDrill.TeamMemeberPosition2;

                    EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[2]);

                    emergencyResponseTeams[3].DrillId = newDrill.Id;
                    emergencyResponseTeams[3].TeamMemberCode = newDrill.TeamMemeberCode3;
                    emergencyResponseTeams[3].TeamMemberName = newDrill.TeamMemeberName3;
                    emergencyResponseTeams[3].TeamMemberPosition = newDrill.TeamMemeberPosition3;

                    EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[3]);

                    if (emergencyResponseTeams.Count == 5)
                    {
                        if  (!newDrill.TeamMemeberCode4.HasValue || newDrill.TeamMemeberCode4 == 0) 
                        {
                            emergencyResponseTeams[4].IsDeleted = true;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[4]);
                        }
                        else
                        {
                            emergencyResponseTeams[4].TeamMemberCode = newDrill.TeamMemeberCode4;
                            emergencyResponseTeams[4].TeamMemberName = newDrill.TeamMemeberName4;
                            emergencyResponseTeams[4].TeamMemberPosition = newDrill.TeamMemeberPosition4;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[4]);
                        }
                        if (newDrill.TeamMemeberCode5.HasValue && newDrill.TeamMemeberCode5 !=0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam5 = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam5.DrillId = newDrill.Id;
                            emergencyResponseTeam5.TeamMemberCode = newDrill.TeamMemeberCode5;
                            emergencyResponseTeam5.TeamMemberName = newDrill.TeamMemeberName5;
                            emergencyResponseTeam5.TeamMemberPosition = newDrill.TeamMemeberPosition5;

                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam5);

                        }
                        if (newDrill.TeamMemeberCode6.HasValue && newDrill.TeamMemeberCode6 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam6 = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam6.DrillId = newDrill.Id;
                            emergencyResponseTeam6.TeamMemberCode = newDrill.TeamMemeberCode6;
                            emergencyResponseTeam6.TeamMemberName = newDrill.TeamMemeberName6;
                            emergencyResponseTeam6.TeamMemberPosition = newDrill.TeamMemeberPosition6;

                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam6);

                        }
                        if (newDrill.TeamMemeberCode7.HasValue && newDrill.TeamMemeberCode7 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam7 = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam7.DrillId = newDrill.Id;
                            emergencyResponseTeam7.TeamMemberCode = newDrill.TeamMemeberCode7;
                            emergencyResponseTeam7.TeamMemberName = newDrill.TeamMemeberName7;
                            emergencyResponseTeam7.TeamMemberPosition = newDrill.TeamMemeberPosition7;

                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam7);

                        }
                    }

                    else if (emergencyResponseTeams.Count == 6)
                    {
                        if (!newDrill.TeamMemeberCode5.HasValue || newDrill.TeamMemeberCode5 ==0)
                        {
                            emergencyResponseTeams[5].IsDeleted = true;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[5]);
                        }
                        else
                        {
                            emergencyResponseTeams[4].TeamMemberCode = newDrill.TeamMemeberCode4;
                            emergencyResponseTeams[4].TeamMemberName = newDrill.TeamMemeberName4;
                            emergencyResponseTeams[4].TeamMemberPosition = newDrill.TeamMemeberPosition4;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[4]);

                            emergencyResponseTeams[5].TeamMemberCode = newDrill.TeamMemeberCode5;
                            emergencyResponseTeams[5].TeamMemberName = newDrill.TeamMemeberName5;
                            emergencyResponseTeams[5].TeamMemberPosition = newDrill.TeamMemeberPosition5;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[5]);
                        }
                        if (newDrill.TeamMemeberCode6.HasValue && newDrill.TeamMemeberCode6 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam6 = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam6.DrillId = newDrill.Id;
                            emergencyResponseTeam6.TeamMemberCode = newDrill.TeamMemeberCode5;
                            emergencyResponseTeam6.TeamMemberName = newDrill.TeamMemeberName5;
                            emergencyResponseTeam6.TeamMemberPosition = newDrill.TeamMemeberPosition5;

                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam6);

                        }
                        if (newDrill.TeamMemeberCode7.HasValue && newDrill.TeamMemeberCode7 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam7 = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam7.DrillId = newDrill.Id;
                            emergencyResponseTeam7.TeamMemberCode = newDrill.TeamMemeberCode6;
                            emergencyResponseTeam7.TeamMemberName = newDrill.TeamMemeberName6;
                            emergencyResponseTeam7.TeamMemberPosition = newDrill.TeamMemeberPosition6;

                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam7);

                        }
                        
                    }

                    else if (emergencyResponseTeams.Count == 7)
                    {
                        if (!newDrill.TeamMemeberCode6.HasValue || newDrill.TeamMemeberCode6 == 0)
                        {
                            emergencyResponseTeams[6].IsDeleted = true;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[6]);
                        }
                        else
                        {
                            emergencyResponseTeams[4].TeamMemberCode = newDrill.TeamMemeberCode4;
                            emergencyResponseTeams[4].TeamMemberName = newDrill.TeamMemeberName4;
                            emergencyResponseTeams[4].TeamMemberPosition = newDrill.TeamMemeberPosition4;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[4]);

                            emergencyResponseTeams[5].TeamMemberCode = newDrill.TeamMemeberCode5;
                            emergencyResponseTeams[5].TeamMemberName = newDrill.TeamMemeberName5;
                            emergencyResponseTeams[5].TeamMemberPosition = newDrill.TeamMemeberPosition5;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[5]);

                            emergencyResponseTeams[6].TeamMemberCode = newDrill.TeamMemeberCode6;
                            emergencyResponseTeams[6].TeamMemberName = newDrill.TeamMemeberName6;
                            emergencyResponseTeams[6].TeamMemberPosition = newDrill.TeamMemeberPosition6;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[6]);
                        }
                        if (newDrill.TeamMemeberCode7.HasValue && newDrill.TeamMemeberCode7 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam7 = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam7.DrillId = newDrill.Id;
                            emergencyResponseTeam7.TeamMemberCode = newDrill.TeamMemeberCode7;
                            emergencyResponseTeam7.TeamMemberName = newDrill.TeamMemeberName7;
                            emergencyResponseTeam7.TeamMemberPosition = newDrill.TeamMemeberPosition7;

                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam7);

                        }
                       
                    }


                    else if (emergencyResponseTeams.Count == 8)
                    {
                        if (!newDrill.TeamMemeberCode7.HasValue || newDrill.TeamMemeberCode7 == 0)
                        {
                            emergencyResponseTeams[7].IsDeleted = true;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[7]);
                        }
                        else
                        {
                            emergencyResponseTeams[4].TeamMemberCode = newDrill.TeamMemeberCode4;
                            emergencyResponseTeams[4].TeamMemberName = newDrill.TeamMemeberName4;
                            emergencyResponseTeams[4].TeamMemberPosition = newDrill.TeamMemeberPosition4;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[4]);

                            emergencyResponseTeams[5].TeamMemberCode = newDrill.TeamMemeberCode5;
                            emergencyResponseTeams[5].TeamMemberName = newDrill.TeamMemeberName5;
                            emergencyResponseTeams[5].TeamMemberPosition = newDrill.TeamMemeberPosition5;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[5]);

                            emergencyResponseTeams[6].TeamMemberCode = newDrill.TeamMemeberCode6;
                            emergencyResponseTeams[6].TeamMemberName = newDrill.TeamMemeberName6;
                            emergencyResponseTeams[6].TeamMemberPosition = newDrill.TeamMemeberPosition6;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[6]);

                            emergencyResponseTeams[7].TeamMemberCode = newDrill.TeamMemeberCode7;
                            emergencyResponseTeams[7].TeamMemberName = newDrill.TeamMemeberName7;
                            emergencyResponseTeams[7].TeamMemberPosition = newDrill.TeamMemeberPosition7;
                            EmergencyResponseTeamMembersRepo.update(emergencyResponseTeams[7]);
                        }
                    
                    }
                    
                    else if (emergencyResponseTeams.Count == 4)
                    {
                        if (newDrill.TeamMemeberCode4.HasValue && newDrill.TeamMemeberCode4 != 0) 

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam.DrillId = newDrill.Id;
                            emergencyResponseTeam.TeamMemberCode = newDrill.TeamMemeberCode4;
                            emergencyResponseTeam.TeamMemberName = newDrill.TeamMemeberName4;
                            emergencyResponseTeam.TeamMemberPosition =newDrill.TeamMemeberPosition4;
                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam);

                        }
                        if (newDrill.TeamMemeberCode5.HasValue && newDrill.TeamMemeberCode5 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam.DrillId = newDrill.Id;
                            emergencyResponseTeam.TeamMemberCode = newDrill.TeamMemeberCode5;
                            emergencyResponseTeam.TeamMemberName = newDrill.TeamMemeberName5;
                            emergencyResponseTeam.TeamMemberPosition = newDrill.TeamMemeberPosition5;
                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam);

                        }
                        if (newDrill.TeamMemeberCode6.HasValue && newDrill.TeamMemeberCode6 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam.DrillId = newDrill.Id;
                            emergencyResponseTeam.TeamMemberCode = newDrill.TeamMemeberCode6;
                            emergencyResponseTeam.TeamMemberName = newDrill.TeamMemeberName6;
                            emergencyResponseTeam.TeamMemberPosition = newDrill.TeamMemeberPosition6;
                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam);

                        }
                        if (newDrill.TeamMemeberCode7.HasValue && newDrill.TeamMemeberCode7 != 0)

                        {
                            EmergencyResponseTeamMembers emergencyResponseTeam = new EmergencyResponseTeamMembers();
                            emergencyResponseTeam.DrillId = newDrill.Id;
                            emergencyResponseTeam.TeamMemberCode = newDrill.TeamMemeberCode7;
                            emergencyResponseTeam.TeamMemberName = newDrill.TeamMemeberName7;
                            emergencyResponseTeam.TeamMemberPosition = newDrill.TeamMemeberPosition7;
                            EmergencyResponseTeamMembersRepo.create(emergencyResponseTeam);

                        }
                    }

                    orgDrill.userID = newDrill.userID;


                    List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == newDrill.Id).ToList();
                    int p = 1;//Equal
                    if (newDrill.Images.IsNullOrEmpty())
                    {
                        p = 1;//equal to the old
                    }
                    else if (drillImages.Count == newDrill.Images.Count)
                    {
                        foreach (var image in drillImages)
                        {
                            foreach (var image1 in newDrill.Images)
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
                        DrillRepo.update(orgDrill);
                        result.Data = orgDrill;
                        result.Statescode = 200;
                        return result;
                    }
                    else
                    {
                        // Clear the existing images
                        foreach (var image in drillImages)
                        {
                            DeleteImagesHelper.DeleteImage(image.FileName, "DrillIMG");
                            DrillImagesRepo.delete(image);
                        }

                        // Add the new images to the list

                        foreach (var item in newDrill.Images)
                        {
                            DrillImages drillImagess = new DrillImages();
                            drillImagess.FileName = ImagesHelper.uploadImg(item, "DrillIMG");
                            drillImagess.DrillId = orgDrill.Id;
                            DrillImagesRepo.create(drillImagess);
                        }
                        DrillRepo.update(orgDrill);
                        result.Data = orgDrill;
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
                List<EmergencyResponseTeamMembers> emergencyResponseTeamMembers = EmergencyResponseTeamMembersRepo.getall().Where(p => p.DrillId == id).ToList();
                foreach (var item in emergencyResponseTeamMembers)
                {
                    EmergencyResponseTeamMembers emergencyResponseTeam = EmergencyResponseTeamMembersRepo.getbyid(item.Id);
                    emergencyResponseTeam.IsDeleted = true;

                    EmergencyResponseTeamMembersRepo.update(emergencyResponseTeam);

                }


                List<DrillImages> drillImages = DrillImagesRepo.getall().Where(p => p.DrillId == id).ToList();
                foreach (var item in drillImages)
                {
                    DrillImages drillImage = DrillImagesRepo.getbyid(item.Id);
                    drillImage.IsDeleted = true;
					//drillImage.Id = item.Id;
					DeleteImagesHelper.DeleteImage(drillImage.FileName, "DrillIMG");

					DrillImagesRepo.update(drillImage);

                }

                Drill drill = DrillRepo.getbyid(id);
                drill.IsDeleted = true;
                DrillRepo.update(drill);
                result.Data = drill;
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

