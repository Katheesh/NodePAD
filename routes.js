const fs = require('fs')

var appRouter = function (app) {
    app.post("/", function(req, res) {
        
        const d = new Date();
        const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

        let today = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
        let month = months[d.getMonth()]; 
        let year = d.getFullYear();
        const path = './todos/'+ year +'/'+ month +'/'+ today +'.todo';
        const dir = './todos/'+ year +'/'+ month;

        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
       
            if (fs.existsSync(path)) {
                fs.readFile(path, 'utf8' , (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    let reqdata = '';

                    if (req.body.todo) {
                        reqdata = '\n' + req.body.todo;
                    }

                    let newcontent = data + reqdata;

                    fs.writeFile(path, newcontent, err => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        res.status(200).send(data);
                    });
                });
            }
            else {

                let reqdata = '';

                if (req.body.todo) {
                    reqdata = '\n' + req.body.todo;
                }

                let content = 'Katheesh ToDo... '+ today + reqdata;

                fs.writeFile(path, content, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    res.status(200).send(content);
                });
            }

        } catch(err) {
            console.error(err)
        }
    });
}

module.exports = appRouter;