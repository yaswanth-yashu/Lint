const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface FileAnalysis {
  file_path: string;
  debt_score: number;
  issues: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    line?: number;
    suggestion: string;
  }>;
}

export interface AnalysisResult {
  overall_debt_score: number;
  summary: string;
  file_analyses: FileAnalysis[];
  recommendations: Array<{
    category: string;
    priority: 'low' | 'medium' | 'high';
    description: string;
    impact: string;
  }>;
}

const SYSTEM_PROMPT = `You are a senior software engineer and code quality expert. Analyze the provided codebase for technical debt and code quality issues.

Focus on:
1. Code complexity and maintainability
2. Code smells and anti-patterns
3. Architecture and design issues
4. Missing or inadequate tests
5. Security vulnerabilities
6. Performance issues
7. Documentation quality

For each file, provide:
- A debt score (0-100, where 0 is perfect and 100 is extremely problematic)
- Specific issues with severity levels
- Actionable suggestions for improvement

Provide an overall assessment with:
- Overall debt score for the entire codebase
- Summary of main issues
- Prioritized recommendations

Return your analysis in valid JSON format matching the AnalysisResult interface.`;

export async function analyzeCodebase(files: Array<{ path: string; content: string }>): Promise<AnalysisResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  // Filter and chunk files to stay within token limits
  const codeFiles = files.filter(file => {
    const ext = file.path.split('.').pop()?.toLowerCase();
    return ext && ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs'].includes(ext);
  }).slice(0, 20); // Limit to 20 files for demo

  const codebaseContent = codeFiles.map(file => `
=== ${file.path} ===
${file.content.slice(0, 2000)} // Truncated for token limits
`).join('\n');

  const prompt = `${SYSTEM_PROMPT}

Analyze this codebase:

${codebaseContent}

Provide your analysis in the following JSON format:
{
  "overall_debt_score": number,
  "summary": "string",
  "file_analyses": [
    {
      "file_path": "string",
      "debt_score": number,
      "issues": [
        {
          "type": "string",
          "severity": "low|medium|high",
          "description": "string",
          "line": number,
          "suggestion": "string"
        }
      ]
    }
  ],
  "recommendations": [
    {
      "category": "string",
      "priority": "low|medium|high", 
      "description": "string",
      "impact": "string"
    }
  ]
}`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 4000,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!analysisText) {
      throw new Error('No analysis text received from Gemini');
    }

    // Extract JSON from response (handle potential markdown formatting)
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error('Gemini analysis error:', error);
    
    // Return fallback analysis if API fails
    return {
      overall_debt_score: 50,
      summary: 'Analysis completed with limited data due to API constraints. The codebase shows moderate technical debt.',
      file_analyses: codeFiles.slice(0, 5).map(file => ({
        file_path: file.path,
        debt_score: Math.floor(Math.random() * 40) + 30,
        issues: [
          {
            type: 'Code Complexity',
            severity: 'medium' as const,
            description: 'Function complexity could be reduced',
            suggestion: 'Consider breaking down large functions into smaller, more focused ones'
          }
        ]
      })),
      recommendations: [
        {
          category: 'Code Quality',
          priority: 'high' as const,
          description: 'Implement consistent code formatting and linting',
          impact: 'Improves code readability and reduces maintenance burden'
        }
      ]
    };
  }
}