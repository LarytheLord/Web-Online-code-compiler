const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/run', async (req, res) => {
    const { language_id, source_code, stdin } = req.body;

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'false', fields: '*' },
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Replace with your actual RapidAPI Key
        },
        data: {
            language_id: language_id,
            source_code: source_code,
            stdin: stdin
        }
    };

    try {
        const response = await axios.request(options);
        const token = response.data.token;

        // Poll for the submission result
        let submissionResult;
        do {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
            const resultOptions = {
                method: 'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
                params: { base64_encoded: 'false', fields: '*' },
                headers: {
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Replace with your actual RapidAPI Key
                }
            };
            const resultResponse = await axios.request(resultOptions);
            submissionResult = resultResponse.data;
        } while (submissionResult.status.id <= 2); // Status ID 1: In Queue, 2: Processing

        res.json(submissionResult);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});