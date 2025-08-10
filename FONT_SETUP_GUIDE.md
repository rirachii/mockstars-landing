# Resume Font Management Guide

## 🎯 Current Font Status

### ✅ **Available Fonts (3)**
These fonts work immediately in your PDF templates:

1. **Helvetica** - Clean, professional, universally readable
2. **Times-Roman** - Traditional, academic, formal
3. **Helvetica-Bold** - Bold variant for emphasis

### 📋 **Recommended Additional Fonts (7)**
To reach your goal of 10 fonts, here are the best professional resume fonts to add:

1. **Inter** - Modern, designed for screens, excellent readability
2. **Roboto** - Google's system font, friendly yet professional
3. **Open Sans** - Humanist sans-serif, optimized for legibility
4. **Lato** - Friendly but serious, professional appearance
5. **Source Sans Pro** - Adobe's first open source font
6. **Calibri** - Microsoft's default, warm and soft
7. **Georgia** - Elegant serif, designed for screen reading

## 📁 **Font Storage Structure**

Create this directory structure:

```
/public/fonts/
├── Inter/
│   ├── Inter-Regular.ttf
│   ├── Inter-Bold.ttf
│   └── Inter-SemiBold.ttf
├── Roboto/
│   ├── Roboto-Regular.ttf
│   ├── Roboto-Bold.ttf
│   └── Roboto-Medium.ttf
├── OpenSans/
│   ├── OpenSans-Regular.ttf
│   ├── OpenSans-Bold.ttf
│   └── OpenSans-SemiBold.ttf
├── Lato/
│   ├── Lato-Regular.ttf
│   ├── Lato-Bold.ttf
│   └── Lato-Black.ttf
├── SourceSansPro/
│   ├── SourceSansPro-Regular.ttf
│   ├── SourceSansPro-Bold.ttf
│   └── SourceSansPro-SemiBold.ttf
├── Calibri/
│   ├── Calibri-Regular.ttf
│   └── Calibri-Bold.ttf
└── Georgia/
    ├── Georgia-Regular.ttf
    └── Georgia-Bold.ttf
```

## 🔧 **Implementation Steps**

### Step 1: Create Fonts Directory
```bash
mkdir -p public/fonts/{Inter,Roboto,OpenSans,Lato,SourceSansPro,Calibri,Georgia}
```

### Step 2: Download Font Files

**Option A: Google Fonts (Free)**
- Visit [Google Fonts](https://fonts.google.com)
- Download: Inter, Roboto, Open Sans, Lato, Source Sans Pro
- Extract TTF files to respective directories

**Option B: System Fonts**
- Calibri and Georgia are typically available on Windows/Mac
- Copy from system font directories if licensed

**Option C: Font CDN Services**
- Use services like FontSource for consistent downloads

### Step 3: Register Fonts in Code

Update `/lib/resume-fonts.ts`:

```typescript
import { Font } from '@react-pdf/renderer';

export const registerResumefonts = () => {
  // Inter
  Font.register({
    family: 'Inter',
    fonts: [
      { src: '/fonts/Inter/Inter-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/Inter/Inter-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Inter/Inter-SemiBold.ttf', fontWeight: 600 },
    ]
  });

  // Roboto
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto/Roboto-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 500 },
    ]
  });

  // Add other fonts similarly...
};
```

### Step 4: Update Available Fonts

Change `available: false` to `available: true` in the RESUME_FONTS array for each added font.

### Step 5: Initialize Fonts

Add to your app initialization:

```typescript
// In _app.tsx or layout.tsx
import { loadCustomFonts } from '@/lib/resume-fonts';

useEffect(() => {
  loadCustomFonts();
}, []);
```

## 🚀 **Quick Setup Script**

Create `scripts/setup-fonts.sh`:

```bash
#!/bin/bash
echo "Setting up resume fonts..."

# Create directories
mkdir -p public/fonts/{Inter,Roboto,OpenSans,Lato,SourceSansPro}

# Download Google Fonts (you'll need to implement the actual downloads)
echo "Please download fonts from Google Fonts:"
echo "1. https://fonts.google.com/specimen/Inter"
echo "2. https://fonts.google.com/specimen/Roboto"
echo "3. https://fonts.google.com/specimen/Open+Sans"
echo "4. https://fonts.google.com/specimen/Lato"
echo "5. https://fonts.google.com/specimen/Source+Sans+Pro"

echo "Extract TTF files to public/fonts/[FontName]/ directories"
echo "Then update available: true in lib/resume-fonts.ts"
```

## 📊 **Font Categories**

### **Sans-Serif (Modern, Clean)**
- Inter - Tech companies, startups
- Roboto - Modern, friendly
- Open Sans - Corporate, accessible
- Lato - Marketing, communications
- Source Sans Pro - Design, professional services
- Helvetica - Universal, reliable

### **Serif (Traditional, Formal)**
- Times-Roman - Academic, legal
- Georgia - Publishing, traditional

### **Special Purpose**
- Calibri - Microsoft environments, corporate

## 🎯 **Font Recommendations by Industry**

### **Tech/Startup**
1. Inter (primary)
2. Roboto
3. Source Sans Pro

### **Corporate/Business**
1. Calibri
2. Helvetica
3. Open Sans

### **Academic/Legal**
1. Times-Roman
2. Georgia
3. Helvetica

### **Creative/Design**
1. Source Sans Pro
2. Lato
3. Inter

## ⚠️ **Important Notes**

1. **Licensing**: Ensure you have proper licenses for all fonts
2. **File Size**: Each font family adds ~500KB-1MB to your bundle
3. **Loading**: Fonts load asynchronously, provide fallbacks
4. **Testing**: Test all fonts in PDF generation
5. **Fallbacks**: Always provide system font fallbacks

## 🔄 **Migration Path**

1. **Phase 1**: Add 3 most popular fonts (Inter, Roboto, Open Sans)
2. **Phase 2**: Add remaining 4 fonts
3. **Phase 3**: Optimize loading and add font preview features

This will give you a comprehensive, professional font selection for your resume builder!
