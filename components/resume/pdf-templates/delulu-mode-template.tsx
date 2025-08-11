import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { TemplateCustomization } from '@/lib/resume/template-types'
import { ResumeData } from '@/lib/resume/resume-data'


interface DeluluModeTemplateProps {
  data: ResumeData
  customization?: TemplateCustomization
}

export const DeluluModeTemplate: React.FC<DeluluModeTemplateProps> = ({
  data,
  customization = {
    color: '#FF4DA6',
    fontSize: 'default',
    fontFamily: 'Helvetica',
    sectionSpacing: 18,
    paragraphSpacing: 10,
    lineSpacing: 1.45,
  },
}) => {
  const getFontSize = (base: number) => {
    const mult = customization.fontSize === 'small' ? 0.92 : customization.fontSize === 'large' ? 1.12 : 1
    return base * mult
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff7fb',
      padding: 40,
      fontFamily: customization.fontFamily || 'Helvetica',
    },
    header: {
      marginBottom: customization.sectionSpacing,
      border: 2,
      borderColor: '#ffd6ea',
      backgroundColor: '#fff0f7',
      padding: 14,
      borderRadius: 8,
    },
    name: {
      fontSize: getFontSize(24),
      fontWeight: 'bold',
      color: customization.primaryColor,
      marginBottom: 4,
      lineHeight: customization.lineSpacing,
    },
    title: {
      fontSize: getFontSize(13),
      color: '#8a8a8a',
      marginBottom: 8,
      lineHeight: customization.lineSpacing,
    },
    contact: {
      fontSize: getFontSize(10),
      color: '#6b7280',
      flexDirection: 'row',
      justifyContent: 'space-between',
      lineHeight: customization.lineSpacing,
    },
    section: {
      marginTop: customization.sectionSpacing,
      marginBottom: customization.paragraphSpacing,
    },
    sectionTitle: {
      fontSize: getFontSize(13),
      fontWeight: 'bold',
      color: customization.primaryColor,
      marginBottom: customization.paragraphSpacing,
      textTransform: 'uppercase',
      borderBottom: 1,
      borderBottomColor: customization.primaryColor,
      paddingBottom: 3,
      lineHeight: customization.lineSpacing,
    },
    experienceItem: {
      marginBottom: customization.paragraphSpacing + 4,
    },
    jobTitle: {
      fontSize: getFontSize(12),
      fontWeight: 'bold',
      color: '#111827',
      lineHeight: customization.lineSpacing,
    },
    company: {
      fontSize: getFontSize(10.5),
      color: '#6b7280',
      marginBottom: 2,
      lineHeight: customization.lineSpacing,
    },
    dates: {
      fontSize: getFontSize(10),
      color: '#9ca3af',
      marginBottom: 4,
      lineHeight: customization.lineSpacing,
    },
    description: {
      fontSize: getFontSize(10),
      lineHeight: customization.lineSpacing,
      color: '#1f2937',
    },
    bulletPoint: {
      fontSize: getFontSize(10),
      marginBottom: 3,
      color: '#1f2937',
      paddingLeft: 10,
      lineHeight: customization.lineSpacing,
    },
    pillRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    pill: {
      fontSize: getFontSize(10),
      color: '#1f2937',
      backgroundColor: '#ffe6f2',
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 6,
      marginRight: 6,
      marginBottom: 6,
      border: 1,
      borderColor: '#ffd0e6',
      lineHeight: customization.lineSpacing,
    },
  })

  const contactLine = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
  ]
    .filter(Boolean)
    .join('  •  ')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name} ✨</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contact}>
            <Text>{contactLine}</Text>
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me ✨</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience 💼</Text>
          {data.experience.map((job, idx) => (
            <View key={idx} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.company}>
                {job.company}
                {job.location ? ` • ${job.location}` : ''}
              </Text>
              <Text style={styles.dates}>
                {job.startDate} - {job.endDate}
              </Text>
              {(job.bullets || []).map((b, j) => (
                <Text key={j} style={styles.bulletPoint}>
                  • {b.text}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education 🎓</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.dates}>{[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
              {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills ⚡</Text>
          <View style={styles.pillRow}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.pill}>{skill.name}</Text>
            ))}
          </View>
        </View>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects 🚀</Text>
            {data.projects.map((project, i) => (
              <View key={i} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                <Text style={styles.description}>{project.description}</Text>
                {project.technologies && (
                  <Text style={styles.company}>Tech: {project.technologies.join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
