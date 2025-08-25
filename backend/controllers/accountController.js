import { pool } from "../libs/database.js";

export const getAccounts = async(req,res)=>{
    try {
        const{userId} = req.body.user;
        
        const accounts = await pool.query({
        text: `SELECT * FROM tblaccount WHERE user_id = $1`,
        values: [userId],
      })

        res.status(200).json({
            status:"success",
            data: accounts.rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"failed", message:error.message});
    }
};
export const createAccount = async(req,res)=>{
    try {
        const {userId} = req.body.user;
        const {name, amount, account_number} = req.body;

        const accountExistQuery = {
            text: `SELECT * FROM tblaccount WHERE account_name = $1 AND user_id = $2`,
            values: [name,userId],
        }

        const accountExistResult = await pool.query(accountExistQuery);

        const accountExist = accountExistResult.rows[0];
        if(accountExist){
            return res.status(409).json({
                status:"failed",
                message:"Account with this name already exists",
            });
        }

        const createAccountResult = await pool.query(
            "INSERT INTO tblaccount (user_id,account_name,account_number,account_balance) VALUES ($1,$2,$3,$4) RETURNING *",
            [userId,name,account_number,amount]
        );
        const account = createAccountResult.rows[0];
        // This line ensures that userAccounts is always an array — even if just one name is passed.
        // If name = "Priyanshu", then userAccounts = ["Priyanshu"]
        // If name = ["Priyanshu", "Jay"], then it stays the same
        const userAccounts = Array.isArray(name) ? name : [name];

//array_cat(accounts, $1): This appends the new array ($1) to the existing accounts array in the DB.
//cat referes to concatinate
        const updateUserAccountQuery ={
            text:"UPDATE tbluser SET accounts = array_cat(accounts,$1), updatedat = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            values:[userAccounts,userId],
        }
        await pool.query(updateUserAccountQuery);

        // took the account details from the result of the createAccount query
        // so that we can return the newly created account details in the response

        //add initial deposit transaction
        const description = account.account_name + "(Initial Deposit)";

        const initialDepositQuery = {
            text:"INSERT INTO tbltransaction (user_id,description,type,status,amount,source) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            values:[userId,description,"income","Completed",amount,account.account_name],
        }

        await pool.query(initialDepositQuery);

        res.status(201).json({
            status:"success",
            message:account.account_name + "Account created successfully",
            data : account,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"failed", message:error.message});
        
    }
}
export const addMoneyToAccount = async(req,res)=>{
    try {
        const {userId} = req.body.user;
        const {id} = req.params; //account id
        const {amount} = req.body;

        const newAmount = Number(amount);

        const addMoneyResult = await pool.query({
            text: "UPDATE tblaccount SET account_balance = (account_balance + $1), updatedat = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            values: [newAmount, id],
        })

        const accountInformation = addMoneyResult.rows[0];

        const description = accountInformation.account_name + "(Deposit)";

        const transactionQuery = {
            text:"INSERT INTO tbltransaction(user_id,description,type,status,amount,source) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            values:[userId,description,"income","Completed",amount,accountInformation.account_name],
        }

        await pool.query(transactionQuery);

        res.status(200).json({
            status:"success",
            message:"Money added to account successfully",
            data: accountInformation,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"failed", message:error.message});
        
    }
};