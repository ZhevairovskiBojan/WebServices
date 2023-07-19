    exports.functionBZ = async (req, res) => {
    try{
        res.status(200).json({
            status: "success",
            data: "Bojan Zhevairovski"
        });
    }
    catch(err){
        return console.log(err);
    }
}