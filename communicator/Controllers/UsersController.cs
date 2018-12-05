using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using communicator.Data;
using communicator.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace communicator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ICommunicatorRepository _repository;

        public UsersController(ICommunicatorRepository repository)
        {
            _repository = repository;
        }
        
        // GET: api/Users
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            var users = _repository.GetAllUsers();

            return users;
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult GetUserById([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _repository.GetUserById(id);

            if(user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public void AddUser([FromBody] User user)
        {
            _repository.AddEntity(user);
            _repository.SaveAll();
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
