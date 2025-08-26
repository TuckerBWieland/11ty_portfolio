# Project Data Management

This directory contains data files for the portfolio components.

## Adding New Projects

To add a new project to the showcase, edit `projects.json` and add a new project object with the following structure:

```json
{
  "id": "company-year",
  "year": "2024",
  "company": "COMPANY_NAME",
  "title": "Project Title",
  "description": "Brief project description",
  "problem": "What problem did this project solve?",
  "solution": "How did you solve the problem?",
  "result": "What were the measurable results?",
  "role": "What was your role in the project?",
  "image": "URL to project image",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "duration": "X months",
  "teamSize": "X people"
}
```

### Required Fields:
- `id`: Unique identifier (format: company-year)
- `year`: Project year
- `company`: Client/company name
- `title`: Project title
- `description`: Brief description for the list view
- `problem`: Problem statement
- `solution`: Solution description
- `result`: Measurable results
- `role`: Your role and responsibilities

### Optional Fields:
- `image`: Project image URL
- `tags`: Array of project categories
- `technologies`: Array of technologies used
- `duration`: Project timeline
- `teamSize`: Team size

### Example:
```json
{
  "id": "microsoft-2024",
  "year": "2024",
  "company": "MICROSOFT",
  "title": "AI-Powered Office Assistant",
  "description": "Intelligent document processing and collaboration tool",
  "problem": "Users spent too much time formatting documents and searching for information.",
  "solution": "Built an AI assistant that automates document formatting and provides intelligent search.",
  "result": "Reduced document creation time by 40% and improved search accuracy by 60%.",
  "role": "Lead Frontend Developer, designed the user interface and implemented AI integration.",
  "image": "https://example.com/project-image.jpg",
  "tags": ["AI/ML", "Productivity", "Office Tools"],
  "technologies": ["React", "TypeScript", "Azure AI", "Office API"],
  "duration": "8 months",
  "teamSize": "12 people"
}
```

## Data File Structure

The component will automatically:
1. Load projects from `projects.json`
2. Sort them by year (newest first)
3. Display them in the showcase list
4. Show detailed information in the modal when clicked

## Fallback Data

If the external JSON file fails to load, the component will use embedded fallback data to ensure the showcase always works.
