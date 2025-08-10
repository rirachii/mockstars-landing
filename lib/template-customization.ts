export interface TemplateCustomization {
  color: string
  fontSize: 'small' | 'default' | 'large'
  fontFamily: string
  sectionSpacing: number
  paragraphSpacing: number
  lineSpacing: number
}

export const DEFAULT_CUSTOMIZATION: TemplateCustomization = {
  color: '#397DC2',
  fontSize: 'default',
  fontFamily: 'Helvetica',
  sectionSpacing: 16,
  paragraphSpacing: 8,
  lineSpacing: 1.4
} 