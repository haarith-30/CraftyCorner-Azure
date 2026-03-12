using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Craft
    {
        public int CraftId{get;set;}
        public string Name{get;set;}
        public string Category{get;set;}
        public string MaterialsRequired{get;set;}
        public string Instructions{get;set;}
        public string CraftImage{get;set;}
    }
}