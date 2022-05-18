import { ConversationModel } from "../models/ConversationModel.js";
export const  newConversation = async (req, res, next) =>{
    try {
        const conversation= await ConversationModel.create({members: [req.body.senderId, req.body.receiverId]})
        res.status(200).json({
            status: 'OK',
            data: conversation
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};
export const  getConversation = async (req, res, next) =>{
    try {
        const conversation = await ConversationModel.find({
            members : { $in: req.params.userId },
        })
        res.status(200).json({
            status: 'OK',
            data: conversation
        });
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
};


