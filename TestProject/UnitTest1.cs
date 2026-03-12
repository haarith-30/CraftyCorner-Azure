using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Linq;
using System.Reflection;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace dotnetapp.Tests
{
    [TestFixture]
    public class Tests
    {

 [Test, Order(1)]
public async Task Backend_Test_Method_GetCraftById_In_CraftService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CraftService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo getCraftByIdMethod = serviceType.GetMethod("GetCraftById");

            if (getCraftByIdMethod != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(2)]
public async Task Backend_Test_Method_GetAllCrafts_In_CraftService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CraftService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("GetAllCrafts");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(3)]
public async Task Backend_Test_Method_AddCraft_In_CraftService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CraftService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("AddCraft");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
 [Test, Order(4)]
public async Task Backend_Test_Method_UpdateCraft_In_CraftService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CraftService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("UpdateCraft");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}

 [Test, Order(5)]
public async Task Backend_Test_Method_DeleteCraft_In_CraftService_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Services.CraftService";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("DeleteCraft");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
 [Test, Order(6)]
public async Task Backend_Test_Method_GetAllCrafts_In_CraftController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CraftController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("GetAllCrafts");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(7)]
public async Task Backend_Test_Method_GetCraftById_In_CraftController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CraftController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("GetCraftById");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(8)]
public async Task Backend_Test_Method_AddCraft_In_CraftController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CraftController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("AddCraft");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(9)]
public async Task Backend_Test_Method_UpdateCraft_In_CraftController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CraftController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("UpdateCraft");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(10)]
public async Task Backend_Test_Method_DeleteCraft_In_CraftController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.CraftController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("DeleteCraft");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(11)]
public async Task Backend_Test_Method_Login_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("Login");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    

 [Test, Order(12)]
public async Task Backend_Test_Method_Register_In_AuthenticationController_Exists()
{
            // Load assembly and types
            string assemblyName = "dotnetapp";
            Assembly assembly = Assembly.Load(assemblyName);
            string serviceName = "dotnetapp.Controllers.AuthenticationController";

            Type serviceType = assembly.GetType(serviceName);

            // Get the GetCraftById method
            MethodInfo Method = serviceType.GetMethod("Register");

            if (Method != null)
            {
                Assert.Pass();

            }
            else
            {
                Assert.Fail();
            }
}
    
}
}

