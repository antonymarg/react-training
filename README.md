# 🏗️ Lego Character Builder - React Training

A comprehensive training project that demonstrates the differences between **React** and **Vanilla JavaScript** approaches to building interactive web applications.

## 📋 Overview

This project features a **Lego Character Builder** application implemented in two different ways:

- **🚀 React Version** - Modern component-based architecture with TypeScript
- **⚡ Vanilla JS Version** - Traditional HTML/CSS/JavaScript approach

Both versions implement the exact same functionality, allowing for direct comparison of development approaches, code organization, and maintainability.

## ✨ Features

- **Character Creation**: Build custom Lego characters with names, avatars, and skills
- **Character Gallery**: View all created characters in a responsive grid
- **Delete Characters**: Remove characters from your collection
- **Persistent Storage**: Characters are saved to localStorage
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Modern UI**: Clean, modern interface using Tailwind CSS

## 🗂️ Project Structure

```
react-training/
├── react-version/          # React + TypeScript + Vite implementation
│   ├── src/
│   │   ├── components/     # Organized React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   ├── character/ # Character-specific components
│   │   │   └── layout/    # Layout components
│   │   ├── lib/           # Utilities and constants
│   │   └── ...
│   └── package.json
├── vanilla-js-version/     # Pure HTML/CSS/JavaScript implementation
│   ├── index.html         # Main HTML file
│   ├── script.js          # All JavaScript logic
│   └── styles.css         # Custom CSS styles
└── README.md
```

## 🚀 Getting Started

### React Version

1. **Navigate to the React directory:**
   ```bash
   cd react-version
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

### Vanilla JS Version

1. **Navigate to the Vanilla JS directory:**
   ```bash
   cd vanilla-js-version
   ```

2. **Start a local server:**
   ```bash
   # Using Python (if installed)
   python3 -m http.server 3000
   
   # Or using Node.js
   npx serve .
   
   # Or any other static file server
   ```

3. **Open your browser** and visit `http://localhost:3000`

## 🤝 Contributing

This is a training project, but suggestions and improvements are welcome! Feel free to:

- Add new features to demonstrate specific concepts
- Improve the documentation
- Enhance the styling or user experience
- Add more complex examples

## 📄 License

This project is intended for educational purposes. Feel free to use, modify, and distribute for learning and training.

---

**Happy Learning! 🎉**
