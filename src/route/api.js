import express from "express";
import APIcontroller from '../controller/APIcontroller'
let router = express.Router();
const initAPIRoute = (app) => {
    router.get("/users", APIcontroller.getAllUsers)//method get =>READ data
    router.post("/create-user", APIcontroller.createNewUser)//method post=>create data
    router.put("/update-user", APIcontroller.UpdateUser)//method put=>update data
    router.delete("/delete-user/:id", APIcontroller.DeleteUser)//method delete=>delete data
    return app.use('/api/v1/', router);
}
export default initAPIRoute;