const { exec } = require("child_process");
const path = require("path");

const scriptPath = path.join(
    __dirname,
    "../../../ml/scripts/predict.py"
);

const predict = (type, name) => {

    return new Promise((resolve, reject) => {
        console.log(`Prediction request: ${type} - ${name}`);

        exec(
            `python "${scriptPath}" ${type} "${name}"`,
            (error, stdout, stderr) => {

                if (error) {
                    reject(error);
                    return;
                }

                if (stderr) {
                    reject(new Error(stderr));
                    return;
                }

                try {

                    const result = JSON.parse(stdout);

                    resolve(result);

                } catch (err) {

                    reject(err);

                }

            }
        );

    });

};

module.exports = {
    predict
};