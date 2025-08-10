import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export interface ModernCompactResumeData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin?: string
    website?: string
  }
  summary?: string
  experience: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string[]
    location?: string
  }>
  education: Array<{
    degree: string
    school: string
    year: string
    gpa?: string
  }>
  skills: string[]
  projects?: Array<{
    name: string
    description: string
    technologies: string[]
  }>
}

interface ModernCompactTemplateProps {
  data: ModernCompactResumeData
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 36,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1AA7A1', // teal similar to image
    marginBottom: 6
  },
  contactLine: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'left'
  },
  dot: {
    color: '#9CA3AF'
  },
  section: {
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 6,
    color: '#111827'
  },
  jobBlock: {
    marginBottom: 10
  },
  jobHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827'
  },
  jobMeta: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4
  },
  bullet: {
    fontSize: 9,
    color: '#111827',
    marginBottom: 2
  },
  eduBlock: {
    marginBottom: 8
  },
  skillLine: {
    fontSize: 9,
    color: '#111827'
  }
})

const joinContact = (data: ModernCompactResumeData['personalInfo']) => {
  const parts = [data.location, data.phone, data.email]
  if (data.linkedin) parts.push(data.linkedin)
  if (data.website) parts.push(data.website)
  return parts.filter(Boolean).join('  •  ')
}

export const ModernCompactTemplate: React.FC<ModernCompactTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        {data.summary && (
          <Text style={{ fontSize: 9, color: '#111827', marginBottom: 6 }}>{data.summary}</Text>
        )}
        <Text style={styles.contactLine}>{joinContact(data.personalInfo)}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {data.experience.map((job, i) => (
          <View key={i} style={styles.jobBlock}>
            <Text style={styles.jobHeader}>{job.title}</Text>
            <Text style={styles.jobMeta}>
              {job.company}
              {job.location ? ` • ${job.location}` : ''}
              {` • ${job.startDate} - ${job.endDate}`}
            </Text>
            {job.description.map((d, j) => (
              <Text key={j} style={styles.bullet}>• {d}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((e, i) => (
          <View key={i} style={styles.eduBlock}>
            <Text style={styles.jobHeader}>{e.degree}</Text>
            <Text style={styles.jobMeta}>{e.school} • {e.year}</Text>
            {e.gpa && <Text style={styles.jobMeta}>GPA: {e.gpa}</Text>}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skillLine}>{data.skills.join(' • ')}</Text>
      </View>
    </Page>
  </Document>
) 