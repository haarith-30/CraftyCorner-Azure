using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/crafts")]
    public class CraftController : ControllerBase
    {
        private readonly CraftService _craftservice;
        public CraftController(CraftService craftservice){
            _craftservice = craftservice;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Craft>>> GetAllCrafts(){
            var items=await _craftservice.GetAllCrafts();
            return Ok(items);
        }

        [HttpGet("{craftId}")]
        [Authorize]
        public async Task<ActionResult<Craft>> GetCraftById(int craftId){
            var item=await _craftservice.GetCraftById(craftId);
            if(item==null)
            {
                return NotFound("Cannot find any craft");
            }
            return Ok(item);
        }

        [HttpPost]
        [Authorize(Roles = "CraftMaster")]
        public async Task<ActionResult> AddCraft([FromBody]Craft craft){
            try{
                if(craft==null)
                {
                    return BadRequest("Failed to add craft");
                }
                var addedcraft = await _craftservice.AddCraft(craft);
                if(addedcraft){
                    return Ok("Craft added successfully");
                }
                else{
                    throw new Exception("Failed to add craft");
                }
            }
            catch(Exception e)
            {
                return StatusCode(500,$"Internal Server Error:{e.Message}");
            }

        }

        [HttpPut("{craftId}")]
        [Authorize(Roles = "CraftMaster")]
        public async Task<ActionResult> UpdateCraft(int craftId, [FromBody] Craft craft)
        {
            try
            {
                var existingCrafts = await _craftservice.GetAllCrafts();
                var duplicate = existingCrafts.FirstOrDefault(c => c.Name == craft.Name && c.CraftId != craftId);

                if (duplicate != null)
                {
                    return StatusCode(500, "A craft with the same name already exists");
                }

                var item = await _craftservice.UpdateCraft(craftId, craft);
                if (!item)
                {
                    return NotFound("Cannot find any craft");
                }

                return Ok("Craft updated successfully");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Internal Server Error: {e.Message}");
            }
        }

        [HttpDelete("{craftId}")]
        [Authorize(Roles = "CraftMaster")]
        public async Task<ActionResult> DeleteCraft(int craftId){
            try{
                var item=await _craftservice.DeleteCraft(craftId);
                if(!item)
                {
                    return NotFound("Cannot find any craft");
                }
                return Ok("Craft deleted successfully");
            }
            catch(Exception e)
            {
                return StatusCode(500,$"Internal Server Error:{e.Message}");
            }
        }
    }
}