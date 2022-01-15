import { RoleModel} from '../models/RoleModel.js';

export const createRole = async (req,res)=>{
    try {
        const data = req.body;
        const role = new RoleModel(data);
        await role.save();
        res.status(200).json(role);
    } catch (error) {
    res.status(500).json({ error: error });
    }
}