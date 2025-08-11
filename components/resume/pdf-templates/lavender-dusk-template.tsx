import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { ResumeData } from '@/lib/resume/resume-data'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAF8FF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#E6D9FF',
    borderRadius: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#6B46C1',
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: '#8B5FBF',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  contactInfo: {
    fontSize: 10,
    color: '#6B7280',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#6B46C1',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #E6D9FF',
    paddingBottom: 5,
  },
  firstSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#6B46C1',
    marginTop: 0,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #E6D9FF',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 15,
    backgroundColor: '#F8F5FF',
    padding: 15,
    borderRadius: 10,
    fontStyle: 'italic',
  },
})

interface LavenderDuskTemplateProps {
  data: ResumeData
}

export const LavenderDuskTemplate: React.FC<LavenderDuskTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {(data.personalInfo.links || []).map((l) => (
            <Text key={l.id} style={styles.contactItem}>{l.label}: {l.url}</Text>
          ))}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <>
          <Text style={styles.firstSectionTitle}>About Me</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </>
      )}

      {/* Experience */}
      <Text style={styles.sectionTitle}>Experience</Text>
      {/* Add experience section */}

      {/* Skills */}
      {data.skills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Skills</Text>
          {/* Add skills section */}
        </>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.educationTitle}>{edu.degree}</Text>
              <Text style={styles.educationDate}>{[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
              <Text style={styles.educationInstitution}>{edu.institution}</Text>
            </View>
          ))}
        </>
      )}
    </Page>
  </Document>
)