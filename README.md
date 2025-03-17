# Markdown Notes App

A modern web application for taking and managing markdown notes with live preview functionality. Create, edit, and organize your notes with real-time markdown rendering.

## Features

- ✨ Create and edit notes with markdown support
- 🔄 Real-time markdown preview
- 🔍 Full-text search functionality
- 💾 Auto-save changes
- 📱 Responsive design for all devices
- 🎨 Clean and intuitive interface
- ⚡ Fast in-memory storage

## Technology Stack

- **Frontend**:
  - React 18 with TypeScript
  - CodeMirror 6 for markdown editing
  - React Markdown for preview
  - shadcn/ui components for UI
  - TanStack Query for data fetching
  - Tailwind CSS for styling

- **Backend**:
  - Express.js with TypeScript
  - In-memory storage (can be extended to use PostgreSQL)
  - RESTful API architecture

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (v10 or later)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pedroliman/markdown-notes.git
cd markdown-notes
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

The application runs both the frontend and backend on port 5000, with the backend API available under the `/api` route.

## Development

### Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities and helpers
├── server/              # Backend Express application
│   ├── routes.ts        # API routes
│   └── storage.ts       # Storage implementation
└── shared/              # Shared TypeScript types
    └── schema.ts        # Data models and validation
```

### API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/search?q=query` - Search notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PATCH /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Usage

1. Click "New Note" to create a note
2. Write your markdown content in the editor on the left
3. See the live preview on the right
4. Use the search bar to find existing notes
5. Click on a note in the sidebar to edit it
6. Changes are automatically saved

### Markdown Support

The editor supports standard markdown syntax:

- Headers (`# H1`, `## H2`, etc.)
- Emphasis (`*italic*`, `**bold**`)
- Lists (ordered and unordered)
- Links (`[text](url)`)
- Code blocks (``` code ```)
- And more!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.