using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;

namespace TempProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        //private readonly string _fileDirectory = "ECDC\\TempProject\\wwwroot\\uploads\\ClincUploadFiles\\";
        private const int PageSize = 10;
        public UploadFilesController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }



		//[HttpPost("upload")]
		//public async Task<IActionResult> Upload(IFormFile file, string FolderName)
		//{
		//    if (file != null && file.Length > 0)
		//    {
		//        string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", FolderName);

		//        var filePath = Path.Combine(FolderPathe, file.FileName);

		//        using (var stream = new FileStream(filePath, FileMode.Create))
		//        {
		//            await file.CopyToAsync(stream);
		//        }

		//        return Ok("File uploaded successfully.");
		//    }

		//    return BadRequest("Invalid file.");
		//}
		[HttpPost("upload")]
		public async Task<IActionResult> Upload(IFormFile file, string FolderName)
		{
			try
			{
				string FolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", FolderName);

				// Handle null file separately
				if (file == null)
				{
					return Ok("No file provided. No upload performed.");
				}

				// Create the folder if it doesn't exist
				if (!Directory.Exists(FolderPath))
				{
					Directory.CreateDirectory(FolderPath);
				}

				var filePath = Path.Combine(FolderPath, file.FileName);

				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await file.CopyToAsync(stream);
				}

				return Ok("File uploaded successfully.");
			}
			catch (Exception ex)
			{
				// Handle any exceptions that may occur during the file upload
				return StatusCode(500, $"Internal Server Error: {ex.Message}");
			}
		}


		[HttpGet("GetAllUploadFiles")]
        public IActionResult GetAllUploadFiles(string FolderName)
        {
            string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", FolderName);

            var fileNames = Directory.GetFiles(FolderPathe)
                                       .Select(Path.GetFileName)
                                       .ToList();

            return Ok(fileNames);
        }



        [HttpDelete("{fileName}")]
        public IActionResult DeleteFile(string fileName,string FolderName)
        {
            try
            {
                string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", FolderName);
                var filePath = Path.Combine(FolderPathe, fileName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    return Ok("File deleted successfully.");
                }
                else
                {
                    return NotFound("File not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the file: {ex.Message}");
            }
        }


        [HttpGet]
        public IActionResult GetPaginatedFiles(string FolderName, int pageNumber = 1)
        {
            try
            {
                string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", FolderName);
                var allFiles = Directory.GetFiles(FolderPathe);
                var totalFiles = allFiles.Length;
                var totalPages = (int)Math.Ceiling((double)totalFiles / PageSize);
                var paginatedFiles = allFiles
                    .Skip((pageNumber - 1) * PageSize)
                    .Take(PageSize)
                    .Select(Path.GetFileName);

                var response = new
                {
                    TotalFiles = totalFiles,
                    TotalPages = totalPages,
                    CurrentPage = pageNumber,
                    PageSize = PageSize,
                    Files = paginatedFiles
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching paginated files: {ex.Message}");
            }


        }


        [HttpGet("DownloadFile")]
        public IActionResult DownloadFile(string fileName, string FolderName)
        {
            try
            {
                string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", FolderName);

                var filePath = Path.Combine(FolderPathe, fileName);
                if (System.IO.File.Exists(filePath))
                {
                    var fileBytes = System.IO.File.ReadAllBytes(filePath);
                    return File(fileBytes, "application/octet-stream", fileName);
                }
                else
                {
                    return NotFound("File not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while downloading the file: {ex.Message}");
            }
        }
    }


}



    
