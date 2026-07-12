const { GoogleGenAI } = require("@google/genai")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert technical interviewer and career coach.

Analyze the candidate profile against the job description and generate a detailed interview preparation report.

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

STRICT INSTRUCTIONS:
- Generate exactly 5 technical interview questions relevant to the job
- Generate exactly 3 behavioral questions
- Identify exactly 3 skill gaps
- Create a 7 day preparation plan
- Give an honest match score between 0 and 100
- Extract the exact job title from the job description

Return ONLY this exact JSON structure with real content. No markdown. No backticks. No extra text:
{
  "title": "exact job title from job description",
  "matchScore": 75,
  "technicalQuestions": [
    {
      "question": "write a real technical question here based on job requirements",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    },
    {
      "question": "write a real technical question here based on job requirements",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    },
    {
      "question": "write a real technical question here based on job requirements",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    },
    {
      "question": "write a real technical question here based on job requirements",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    },
    {
      "question": "write a real technical question here based on job requirements",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "write a real behavioral question here",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    },
    {
      "question": "write a real behavioral question here",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    },
    {
      "question": "write a real behavioral question here",
      "intention": "write why the interviewer asks this specific question",
      "answer": "write a detailed answer covering all important points"
    }
  ],
  "skillGaps": [
    {
      "skill": "write actual missing skill name",
      "severity": "high"
    },
    {
      "skill": "write actual missing skill name",
      "severity": "medium"
    },
    {
      "skill": "write actual missing skill name",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] },
    { "day": 2, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] },
    { "day": 3, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] },
    { "day": 4, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] },
    { "day": 5, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] },
    { "day": 6, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] },
    { "day": 7, "focus": "topic name", "tasks": ["specific task 1", "specific task 2", "specific task 3"] }
  ]
}

IMPORTANT: Replace every placeholder text with REAL content based on the candidate's resume and job description. Do NOT copy the placeholder text like "write a real technical question here" - replace it with actual questions and answers.
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    })

    // Clean response in case model adds backticks
    let text = response.text.trim()
    if (text.startsWith("```")) {
        text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    }

    return JSON.parse(text)
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    })

    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (req) => {
        const type = req.resourceType()
        if (type === 'font' || type === 'image' || type === 'stylesheet') {
            req.abort()
        } else {
            req.continue()
        }
    })

    await page.setContent(htmlContent, {
        waitUntil: "domcontentloaded",
        timeout: 10000
    })

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert resume writer.

Create a professional resume for this candidate tailored to the job description.

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

INSTRUCTIONS:
- Tailor the resume specifically for the given job description
- Highlight the most relevant skills and experience
- Make it ATS friendly with clean formatting
- Keep it 1-2 pages maximum
- Use professional HTML with inline CSS only
- Do not use external fonts or stylesheets
- Make it visually clean and professional

Return ONLY this JSON with no markdown and no backticks:
{
  "html": "complete HTML resume here with inline CSS styling"
}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    })

    // Clean response in case model adds backticks
    let text = response.text.trim()
    if (text.startsWith("```")) {
        text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
    }

    const jsonContent = JSON.parse(text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)
    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }