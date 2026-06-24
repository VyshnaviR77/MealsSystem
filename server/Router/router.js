const express=require('express')
const router=express.Router()

const userController=require('../Controller/userController')
const mealController=require('../Controller/mealController')
const expenseController=require('../Controller/expenseController')
const reportController=require('../Controller/reportController')

router.get("/getuser", userController.getUsers);
router.post("/adduser", userController.addUser);
router.get('/getuser/:id',userController.getidUser)
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);


// meals
router.get("/getmeal", mealController.getMeals);
router.post("/addmeal", mealController.addMeal);

router.get("/monthly/:userId/:month/:year",mealController.getMonthlyMeals);


// expense
router.get("/expense", expenseController.getExpenses);
router.post("/addexpense", expenseController.addExpense);

router.get("/summary/:month/:year",expenseController.monthlyExpenseSummary);


// report
router.get("/report/:month/:year",reportController.monthlyReport);



module.exports=router