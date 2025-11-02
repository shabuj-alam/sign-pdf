# PDF Signer 📝

A modern, full-stack web application for digitally signing PDF documents. Built with React, Express.js, and pdf-lib, featuring a responsive UI that works seamlessly across desktop, tablet, and mobile devices.

## ✨ Features

- 📄 Upload and digitally sign PDF documents
- ✍️ Custom signature text input
- 📅 Automatic date stamping
- 👁️ Real-time PDF preview after signing
- 💾 Download signed PDFs
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern UI with Tailwind CSS
- 🚀 Fast and lightweight

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling framework
- **Mona Sans** - Typography

### Backend
- **Express.js 5** - Web server framework
- **pdf-lib** - PDF manipulation
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
sign-pdf/
├── public/              # Static assets
├── services/           
│   └── pdfsign.service.js  # PDF signing logic
├── src/
│   ├── assets/         # Images and icons
│   ├── components/
│   │   └── PdfSigner.jsx   # Main component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── server.js           # Express server
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sign-pdf
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory:
```env
SERVER_IP=YOUR_SERVER_IP
SERVER_PORT=YOUR_SERVER_PORT
```

Update the API endpoint in `src/components/PdfSigner.jsx` (line 44) to match your server configuration:
```javascript
const response = await fetch(
  "http://YOUR_SERVER_IP:YOUR_SERVER_PORT/api/upload-and-sign",
  // ...
);
```

### Running the Application

1. Start the backend server:
```bash
npm start
```

2. In a separate terminal, start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:

- **Mobile** (< 640px) - Single column, full-width buttons
- **Tablet** (640px - 1024px) - Optimized spacing and font sizes
- **Desktop** (> 1024px) - Full-featured layout with maximum width of 800px

## 🔧 Available Scripts

- `npm run dev` - Start development server with host access
- `npm run build` - Build for production
- `npm start` - Start backend server with nodemon
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Features in Detail

### PDF Signing Process

1. **Upload**: Select a PDF file from your device
2. **Sign**: Enter your name for the signature
3. **Preview**: View the signed PDF in the browser
4. **Download**: Save the signed PDF to your device

## 🙏 Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) - PDF manipulation library
- [React](https://react.dev/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

**Note:** Remember to update the server IP address in both `.env` and the frontend component to match your network configuration.
