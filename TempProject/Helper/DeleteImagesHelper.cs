
using Microsoft.AspNetCore.Mvc;
using System.Web.Http;

namespace TempProject.Helper
{
    public static class DeleteImagesHelper
    {
		//     public static List<string> uploadImg(IFormFileCollection files, string FolderName)
		//     {
		//         string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", FolderName);
		//

		//foreach (var file in files)
		//         {
		//	string FileName = $"{Guid.NewGuid()}{Path.GetFileName(file.FileName)}";

		//	string FilePath = Path.Combine(FolderPathe, FileName);


		//	using FileStream FS = new FileStream(FilePath, FileMode.Create);

		//	file.CopyTo(FS);
		//	FileNames.Add(FileName);
		//}



		//         return FileNames;

		//     }




		public static bool DeleteImage(string FileName, string FolderName)
		{
			string FolderPathe = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", FolderName);

			string filePath = Path.Combine(FolderPathe, FileName);

			if (File.Exists(filePath))
			{
				File.Delete(filePath);
				return true;
			}

			return false;
		}


	}
}
