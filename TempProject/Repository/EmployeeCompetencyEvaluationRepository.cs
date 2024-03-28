using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Policy;
using TempProject.Models;

namespace TempProject.Repository
{
    public class EmployeeCompetencyEvaluationRepository : IEmployeeCompetencyEvaluationRepository
    {
        Context c;
        public EmployeeCompetencyEvaluationRepository(Context c)
        {
            this.c = c;
        }

        public List<EmployeeCompetencyEvaluation> getall()
        {
            return c.EmployeeCompetencyEvaluation
                .Include(a => a.Subjectlist)
                .Include(a => a.Rig)
                .Include(a => a.user)
                .Where(a => a.IsDeleted == false)
                .Select(a => new EmployeeCompetencyEvaluation
                {
                    Id = a.Id,
                    Rig = new Rig { Number = a.Rig.Number },
                    Date = a.Date,
                    SubjectId = a.SubjectId,
                    Subjectlist = new SubjectList { Name = a.Subjectlist.Name },

                    Description = a.Description,
                    QHSEEmpCode = a.QHSEEmpCode,
                    QHSEPositionName = a.QHSEPositionName,
                    QHSEEmpName = a.QHSEEmpName,
                    EmployeeCode = a.EmployeeCode,
                    EmployeePositionName = a.EmployeePositionName,
                    EmployeeName = a.EmployeeName,
                    userID = a.user.Id,

                    user = new IdentityUser { UserName = a.user.UserName, Id = a.user.Id }
                }).ToList();
        }
    }
}
