using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using communicator.Data;
using communicator.Data.Interfaces;
using communicator.Interfaces;
using communicator.Models;
using Microsoft.AspNetCore.Authorization;
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
        private IUserService _userService;
        private ILogger<UsersController> _logger;

        public UsersController(IRepositoryWrapper repository, ILogger<UsersController> logger, IUserService service)
        {
            _repository = repository;
            _logger = logger;
            _userService = service;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]User userParam)
        {
            var user = _userService.Authenticate(userParam.Nickname, userParam.Password).Result;

            if(user == null)
            {
                return BadRequest(new { message = "Username or password is incorrect " });
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("authenticatetoken")]
        public IActionResult AuthenticateToken([FromBody]User userParam)
        {
            var user = _userService.AuthenticateToken(userParam.Token);

            if (user == null)
            {
                return BadRequest(new { message = "Token is incorrect or has been expired " });
            }

            return Ok(user);
        }

        [HttpGet("getallwithoutpasswords")]
        public IActionResult GetAllWithoutPasswords()
        {
            var users = _userService.GetAllWithoutPasswords();
            return Ok(users);
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            try
            {
                var users = await _repository.User.GetAllUsersAsync();
                return users;
            }
            catch (Exception e)
            {
                _logger.LogError($"Error in GetUsers: {e}");
                return null;
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
