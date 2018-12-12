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
        private ILogger<UsersController> _logger;

        public UsersController(IRepositoryWrapper repository, ILogger<UsersController> logger)
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
                return NotFound();
            }
        }

        // GET: api/Users/5
        [HttpGet("id")]
        public async Task<ActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _repository.User.GetUserByIdAsync(id);
                return Ok(user);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetUserById: {e}");
                return NotFound();
            }
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] User user)
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

        [HttpPatch]
        public async Task<ActionResult> UpdateUser(int id)
        {
            try
            {
                var user = await _repository.User.GetUserByIdAsync(id);
                await _repository.User.UpdateUserAsync(user);
                return Ok(200);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in UpdateUser: {e}");
                return StatusCode(500);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _repository.User.GetUserByIdAsync(id);

                if(user != null)
                {
                    await _repository.User.DeleteUserAsync(user);
                }

                return Ok(user);
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in DeleteUser: {e}");
                return StatusCode(500);
            }
        }
    }
}
