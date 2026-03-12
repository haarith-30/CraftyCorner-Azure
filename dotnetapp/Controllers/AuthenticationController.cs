using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var result = await _authService.Login(model);
            return result.Item1 == 1 ? StatusCode(201, new { Status = "Success", result.Item2 }) : BadRequest(result.Item2);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            var result = await _authService.Registration(model, model.UserRole);
            return result.Item1 == 1 ? StatusCode(201, result.Item2) : BadRequest(result.Item2);
        }
    }
}