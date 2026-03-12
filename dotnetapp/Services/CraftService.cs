using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class CraftService
    {
        private readonly ApplicationDbContext context;
        public CraftService(ApplicationDbContext icontext)
        {
            context=icontext;
        }

        public async Task<IEnumerable<Craft>> GetAllCrafts()
        {
            var exists=  await context.Crafts.ToListAsync();
            return exists;
        }

        public async Task<Craft> GetCraftById(int craftId){
            var item = await context.Crafts.FindAsync(craftId);
            return item;
        } 

        public async Task<bool> AddCraft(Craft craft)
        {
            if(context.Crafts.Any(c=> c.Name == craft.Name)){
                return false;
            }
            context.Crafts.Add(craft);
            await context.SaveChangesAsync();
            return true;
        }

       public async Task<bool> UpdateCraft(int craftId,Craft craft){
            var item = await context.Crafts.FindAsync(craftId);
            if(item==null){
                return false;
        }
        bool isDuplicate=await context.Crafts.AnyAsync(c=>c.CraftId != craftId && c.Category==craft.Category);
            if(isDuplicate){
                return false;
        }
        item.Name=craft.Name;
        item.Category=craft.Category;
        item.MaterialsRequired=craft.MaterialsRequired;
        item.Instructions=craft.Instructions;
        item.CraftImage=craft.CraftImage;
        await context.SaveChangesAsync();
        return true;
       }

       public async Task<bool> DeleteCraft(int craftId){
            var item = await context.Crafts.FindAsync(craftId);
            if(item==null){
                return false;
            }
            bool isDuplicate=await context.Crafts.AnyAsync(c=>c.CraftId != craftId && c.Category==item.Category);
            if(isDuplicate){
                return false;
            }
            context.Crafts.Remove(item);
            await context.SaveChangesAsync();
            return true;
       }
    }
}