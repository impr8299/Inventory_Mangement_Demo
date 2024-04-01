module.exports ={

    errorResponse: ({ res, code = 400, errMsg }) => {
        return res.status(400).send({ code: code, status: 'failure', errMsg: errMsg });
    },
}