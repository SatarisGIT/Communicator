using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using communicator.Data;
using communicator.Data.Interfaces;
using communicator.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace communicator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private ILogger _logger;

        public UsersController(IRepositoryWrapper repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
        }
        
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                var users = await _repository.User.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetUsers: {e}");
                return null;
            }
        }

        //// GET: api/Users/5
        //[HttpGet("{id}", Name = "GetUser")]
        //public ActionResult GetUserById([FromRoute]int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var user = _repository.GetUserById(id);

        //    if(user == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(user);
        //}

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            try
            {
                await _repository.User.CreateUserAsync(user);
                return Ok(user);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in CreateUser: {e}");
                return StatusCode(500);
            }
        }

        //// PUT: api/Users/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{

        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
