using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TempProject.DTO;
using TempProject.Models;
using TempProject.Repository;

namespace TempProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        public IRepository<Client> ClientRepo { get; set; }

        public ClientController(IRepository<Client> _ClientRepo)
        {
            this.ClientRepo = _ClientRepo;
        }
        [HttpGet]
        public ActionResult<ResultDTO> GetAll()
        {

            ResultDTO result = new ResultDTO();

            List<Client> temp = ClientRepo.getall();
            List<ClientDTO> newTemp = new List<ClientDTO>();
            foreach (Client Client in temp)
            {
                ClientDTO ClientDTO = new ClientDTO();
                ClientDTO.id = Client.Id;
				ClientDTO.ClientName = Client.ClientName;
				ClientDTO.IsDeleted = Client.IsDeleted;

				newTemp.Add(ClientDTO);
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
                ClientDTO ClientDTO = new ClientDTO();
                Client Client = ClientRepo.getbyid(ID);
                ClientDTO.id = Client.Id;
				ClientDTO.ClientName = Client.ClientName;
				ClientDTO.IsDeleted = Client.IsDeleted;

				result.Message = "Success";
                result.Data = ClientDTO;
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

		[HttpGet("ByPage/{page:int}")]
		public PageResult<ClientDTO> GettAllClientByPage(int? page, int pagesize = 10)
		{
			List<Client> temp = ClientRepo.getall();
			List<ClientDTO> newTemp = new List<ClientDTO>();
			foreach (Client client in temp)
			{
				ClientDTO ClientDTO = new ClientDTO();
				ClientDTO.id = client.Id;
				ClientDTO.ClientName = client.ClientName;
				ClientDTO.IsDeleted = client.IsDeleted;

				newTemp.Add(ClientDTO);
			}

			float countDetails = ClientRepo.getall().Count();
			var result = new PageResult<ClientDTO>
			{
				Count = (int)Math.Ceiling(countDetails / pagesize),
				PageIndex = page ?? 1,
				PageSize = pagesize,
				Items = newTemp.Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
			};
			return result;
		}


		[HttpPut("{id:int}")]
        public ActionResult<ResultDTO> Put(int id, [FromForm] ClientDTO newClient) //[FromBody] string value)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    Client orgClient = ClientRepo.getbyid(id);
                    newClient.id = orgClient.Id;
					orgClient.ClientName = newClient.ClientName;
					orgClient.IsDeleted = newClient.IsDeleted;


					ClientRepo.update(orgClient);
                    result.Message = "Success";
                    result.Data = orgClient;
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
        public ActionResult<ResultDTO> AddClient(ClientDTO ClientDTO)
        {
            ResultDTO result = new ResultDTO();

            if (ModelState.IsValid)
            {
                try
                {
                    Client Client = new Client();
                    Client.Id = ClientDTO.id;
					Client.ClientName = ClientDTO.ClientName;
					Client.IsDeleted = ClientDTO.IsDeleted;

					ClientRepo.create(Client);
                    result.Message = "Success";
                    result.Data = ClientDTO;
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
                Client Client = ClientRepo.getbyid(id);
                Client.IsDeleted = true;
                ClientRepo.update(Client);
                result.Data = Client;
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
