const { QuestionService } = require('../../services/QuestionService');
const { AnswerService } = require('../../services/AnswerService');
const { sequelize, Question, Answer } = require('../../models')
const fs = require('fs');
const xlsx = require('xlsx');
const excel = require('exceljs');
const httpStatus = require('../../utils/httpStatus');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


module.exports = {

    getAllQuestionsWithInfo: async (req, res) => {
        const questions = await QuestionService.getAllNormalWithInfo();
        res.status(questions.status).send({
            data: questions.data
        });
    },

    getAllAudienceQuestionsWithInfo: async (req, res) => {
        const questions = await QuestionService.getAllAudienceWithInfoManager();
        res.status(questions.status).send({
            data: questions.data
        });
    },

    dd: async (req, res) => {
        const questions = await QuestionService.d();
        res.status(questions.status).send({
            data: questions.data
        });
    },

    getAllQuestionsWithInfoForOneCategory: async (req, res) => {
        const questions = await QuestionService.getAllNormalWithInfoForOneCategory(req.params.category_id);
        res.status(questions.status).send({
            data: questions.data
        });
    },

    getAllTurboRoundQuestionsWithInfoForManager: async (req, res) => {
        const questions = await QuestionService.getAllWithInfoForManager();
        res.status(questions.status).send({
            data: questions.data
        });
    },

    getAllTurboRoundQuestionsWithInfo: async (req, res) => {
        const questions = await QuestionService.getAllWithInfo();
        res.status(questions.status).send({
            data: questions.data
        });
    },

    addQuestion: async (req, res) => {
        const data = req.body;
        const question = await new QuestionService(data).add();
        res.status(question.status).send({
            data: question.data
        });
    },

    addQuestionWithAnswers: async (req, res) => {
        const data = req.body;
        const question = await new QuestionService(data).add();
        if (question.status === 200) {
            for (let i = 0; i < data.answers.length; i++) {
                data.answers[i].question_id = question.data.id;
            }
            const answers = await AnswerService.addMany(data.answers);
        }
        res.status(question.status).send({
            data: question.data
        });
    },

    editQuestion: async (req, res) => {
        const data = req.body;
        data.id = req.params.id;
        const question = await QuestionService.edit(data);
        res.status(question.status).send({
            data: question.data
        });
    },

    deleteQuestion: async (req, res) => {
        const question = await QuestionService.delete(req.params.id);
        res.status(question.status).send({
            data: question.data
        });
    },

    deleteManyQuestion: async (req, res) => {
        const question = await QuestionService.deleteMany(req.body.ids);
        res.status(question.status).send({
            data: question.data
        });
    },

    addQuestionWithAnswersFromExcelFile: async (req, res) => {
        try {
            const { path } = req.file;
                
                const workbook = xlsx.readFile(path);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = xlsx.utils.sheet_to_json(sheet)
                    for (const record of jsonData) {
                    const existingQuestion = await Question.findOne({ where: { content: record["question"] } });

                    if (existingQuestion) {
                        continue;
                    }
                    const isCorrectArray = [
                        {
                            content: record["answer1"],
                            is_correct: true
                        },
                        {
                            content: record["answer2"],
                            is_correct: false
                        },
                        {
                            content: record["answer3"],
                            is_correct: false
                        },
                        {
                            content: record["answer4"],
                            is_correct: false
                        },
                    ];
                    
                    shuffleArray(isCorrectArray);
                    
                    const question = await Question.create({
                        content: record["question"],
                        category_id: record["categoryId"]
                    });

                    const answerPromises = isCorrectArray.map((answer, index) => { 
                        return Answer.create({
                            question_id: question.id,
                            content: answer.content,  
                            is_correct: answer.is_correct
                        });
                    });

                };

                fs.unlinkSync(path);
                res.status(200).json({ data: 'Excel data imported successfully' });
        } catch (error) {
            console.error('Error importing Excel data:', error);
            res.status(500).json({ data: 'Error importing Excel data' });
        }
    },

    addQuestionWithAnswersAudienceTypeFromExcelFile: async (req, res) => {
        // let transaction;
        try {
            const { path } = req.file;
                // transaction = await sequelize.transaction();
                // console.log(path);
                const workbook = xlsx.readFile(path);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = xlsx.utils.sheet_to_json(sheet)
                // .forEach(async (record) => {
                    for (const record of jsonData) {
                    const existingQuestion = await Question.findOne({ where: { content: record["question"] } });

                    if (existingQuestion) {
                        continue;
                    }
                    const isCorrectArray = [
                        {
                            content: record["answer1"],
                            is_correct: true
                        },
                        {
                            content: record["answer2"],
                            is_correct: false
                        },
                        {
                            content: record["answer3"],
                            is_correct: false
                        },
                        {
                            content: record["answer4"],
                            is_correct: false
                        },
                    ];
                    
                    shuffleArray(isCorrectArray);
                    
                    const question = await Question.create({
                        content: record["question"],
                        category_id: record["categoryId"],
                        type: "audience"
                        // category_id: + req.params.id
                    });

                    const answerPromises = isCorrectArray.map((answer, index) => { 
                        return Answer.create({
                            question_id: question.id,
                            content: answer.content,  
                            is_correct: answer.is_correct
                        });
                    });

                };

                fs.unlinkSync(path);
                res.status(200).json({ data: 'Excel data imported successfully' });
        } catch (error) {
            console.error('Error importing Excel data:', error);
            res.status(500).json({ data: 'Error importing Excel data' });
        }
    },

    exportAudienceQuestions: async (req, res) => {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.columns = [
            { header: 'question', key: 'content' },
            { header: 'answer1', key: 'answer1' },
            { header: 'answer2', key: 'answer2' },
            { header: 'answer3', key: 'answer3' },
            { header: 'answer4', key: 'answer4' },
            { header: 'categoryId', key: 'category_id' },
        ];
        
        const showedAudienceQuestions = await QuestionService.getAllShowedAudienceQuestions();
        worksheet.addRows(showedAudienceQuestions.data);
        console.log(showedAudienceQuestions.data);
        const filePath = 'output.xlsx';
        try {
            await workbook.xlsx.writeFile(filePath);
            res.download(filePath, 'output.xlsx', async (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                } else {
                    const deleteAllShowedAudienceQuestions = await QuestionService.deleteAllShowedAudienceQuestions();
                    fs.unlinkSync(filePath);
                }
            });
        } catch (err) {
            console.error('Error writing Excel file:', err);
            res.status(500).send('Error exporting Excel file');
        }
    },

    exportCategorizeAndTurboRoundQuestions: async (req, res) => {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.columns = [
            { header: 'question', key: 'content' },
            { header: 'answer1', key: 'answer1' },
            { header: 'answer2', key: 'answer2' },
            { header: 'answer3', key: 'answer3' },
            { header: 'answer4', key: 'answer4' },
            { header: 'categoryId', key: 'category_id' },
        ];
        
        const showedAudienceQuestions = await QuestionService.getAllShowedCategorizeAndFastRoundQuestions();
        worksheet.addRows(showedAudienceQuestions.data);
        const filePath = 'output.xlsx';
        try {
            await workbook.xlsx.writeFile(filePath);
            res.download(filePath, 'output.xlsx', async (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                } else {
                    const deleteAllShowedCategorizeQuestions = await QuestionService.deleteAllShowedCategorizeAndFastRoundQuestions();
                    fs.unlinkSync(filePath);
                }
            });
        } catch (err) {
            console.error('Error writing Excel file:', err);
            res.status(500).send('Error exporting Excel file');
        }
    },

    exportCategorizeQuestions: async (req, res) => {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.columns = [
            { header: 'question', key: 'content' },
            { header: 'answer1', key: 'answer1' },
            { header: 'answer2', key: 'answer2' },
            { header: 'answer3', key: 'answer3' },
            { header: 'answer4', key: 'answer4' },
            { header: 'categoryId', key: 'category_id' },
        ];
        
        const showedAudienceQuestions = await QuestionService.getAllShowedCategorizeQuestions();
        worksheet.addRows(showedAudienceQuestions.data);
        const filePath = 'output.xlsx';
        try {
            await workbook.xlsx.writeFile(filePath);
            res.download(filePath, 'output.xlsx', async (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                } else {
                    const deleteAllShowedCategorizeQuestions = await QuestionService.deleteAllShowedCategorizeQuestions();
                    fs.unlinkSync(filePath);
                }
            });
        } catch (err) {
            console.error('Error writing Excel file:', err);
            res.status(500).send('Error exporting Excel file');
        }
    },

    exportTurboQuestions: async (req, res) => {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        worksheet.columns = [
            { header: 'question', key: 'content' },
            { header: 'answer1', key: 'answer1' },
            { header: 'answer2', key: 'answer2' },
            { header: 'answer3', key: 'answer3' },
            { header: 'answer4', key: 'answer4' },
            { header: 'categoryId', key: 'category_id' },
        ];
        
        const showedAudienceQuestions = await QuestionService.getAllShowedFastRoundQuestions();
        worksheet.addRows(showedAudienceQuestions.data);
        const filePath = 'output.xlsx';
        try {
            await workbook.xlsx.writeFile(filePath);
            res.download(filePath, 'output.xlsx', async (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                } else {
                    const deleteAllShowedCategorizeQuestions = await QuestionService.deleteAllShowedFastRoundQuestions();
                    fs.unlinkSync(filePath);
                }
            });
        } catch (err) {
            console.error('Error writing Excel file:', err);
            res.status(500).send('Error exporting Excel file');
        }
    },

}