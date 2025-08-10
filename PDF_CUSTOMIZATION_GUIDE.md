# How to Use Template Customization in PDF Generator

This guide shows you how to integrate the customization options (colors, fonts, spacing) into your PDF templates.

## 1. Template Component Structure

Each template component should accept a `customization` prop and use it to create dynamic styles:

```typescript
interface TemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization;
}

export const YourTemplate: React.FC<TemplateProps> = ({ 
  data, 
  customization = {
    // Default values
    color: '#397DC2',
    fontSize: 'default',
    fontFamily: 'Helvetica',
    sectionSpacing: 16,
    paragraphSpacing: 8,
    lineSpacing: 1.4
  }
}) => {
  // Your template logic here
}
```

## 2. Dynamic Font Size Function

Create a helper function to calculate font sizes based on the fontSize setting:

```typescript
const getFontSize = (baseSize: number) => {
  const multiplier = customization.fontSize === 'small' ? 0.9 : 
                   customization.fontSize === 'large' ? 1.1 : 1;
  return baseSize * multiplier;
};
```

## 3. Dynamic StyleSheet Creation

Instead of a static StyleSheet, create styles dynamically:

```typescript
const createStyles = () => StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: customization.fontFamily || 'Helvetica',
  },
  header: {
    marginBottom: customization.sectionSpacing,
    borderBottom: 2,
    borderBottomColor: customization.color,
    paddingBottom: 10,
  },
  name: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: customization.color,
    marginBottom: 5,
    lineHeight: customization.lineSpacing,
  },
  sectionTitle: {
    fontSize: getFontSize(14),
    fontWeight: 'bold',
    color: customization.color,
    marginBottom: customization.paragraphSpacing,
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: customization.color,
    paddingBottom: 2,
    lineHeight: customization.lineSpacing,
  },
  section: {
    marginTop: customization.sectionSpacing,
    marginBottom: customization.paragraphSpacing,
  },
  text: {
    fontSize: getFontSize(10),
    lineHeight: customization.lineSpacing,
    color: '#333333',
  },
  // ... other styles
});

const styles = createStyles();
```

## 4. Applying Customization Properties

### Colors
- Use `customization.color` for primary accent colors (headers, borders, names)
- Apply to section titles, name, borders, and other accent elements

```typescript
sectionTitle: {
  color: customization.color,
  borderBottomColor: customization.color,
}
```

### Font Sizes
- Use `getFontSize()` function for all font sizes
- Maintains proportional scaling across all text elements

```typescript
name: {
  fontSize: getFontSize(24), // Large heading
},
text: {
  fontSize: getFontSize(10), // Body text
},
```

### Font Family
- Apply `customization.fontFamily` to the page or individual elements
- Provide fallbacks for PDF compatibility

```typescript
page: {
  fontFamily: customization.fontFamily || 'Helvetica',
}
```

### Spacing
- **sectionSpacing**: Space between major sections (Experience, Education, etc.)
- **paragraphSpacing**: Space between paragraphs within sections
- **lineSpacing**: Line height for text readability

```typescript
section: {
  marginTop: customization.sectionSpacing,
  marginBottom: customization.paragraphSpacing,
},
text: {
  lineHeight: customization.lineSpacing,
}
```

## 5. Complete Example Implementation

See the updated `modern-template.tsx` for a complete example of how to:

1. Accept customization props with defaults
2. Create dynamic font size calculations
3. Build dynamic StyleSheet based on customization
4. Apply all customization properties consistently

## 6. Supporting Different Font Families

For custom fonts, you'll need to register them with react-pdf:

```typescript
import { Font } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Inter',
  src: '/fonts/Inter-Regular.ttf',
});

Font.register({
  family: 'Inter',
  src: '/fonts/Inter-Bold.ttf',
  fontWeight: 'bold',
});
```

## 7. Template-Specific Customizations

Different templates can interpret customization differently:

- **Modern Template**: Uses color for accents and modern styling
- **Classic Template**: Uses color more conservatively, focuses on traditional layout
- **Creative Template**: Could use color more boldly for artistic effects

## 8. Testing Customizations

Test your templates with different customization settings:

```typescript
// Test with different settings
const testCustomizations = [
  { color: '#dc2626', fontSize: 'small', fontFamily: 'Times-Roman' },
  { color: '#059669', fontSize: 'large', fontFamily: 'Arial' },
  { color: '#7c3aed', fontSize: 'default', fontFamily: 'Helvetica' },
];
```

## 9. Best Practices

1. **Provide sensible defaults** for all customization properties
2. **Maintain readability** - don't let customization compromise legibility
3. **Keep proportions** - use relative sizing where possible
4. **Test thoroughly** - ensure all combinations work well
5. **Document limitations** - some fonts may not be available in PDF generation

## 10. Integration with PDF Generator

The PDF Generator automatically passes customization to templates:

```typescript
<PDFGenerator 
  resumeData={resumeData}
  template={selectedTemplate}
  customization={customization}  // ← Automatically passed to template
  showPreview={true}
/>
```

This system allows users to completely customize their resume appearance while maintaining professional standards and ATS compatibility.
