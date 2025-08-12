import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/resume/resume-data';
import { TemplateCustomization } from '@/lib/resume/template-types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FEFEFE',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    backgroundColor: '#F0F8FF',
    padding: 20,
    borderRadius: 15,
    border: '2px solid #E0F2FE',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#0EA5E9',
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 13,
    color: '#0284C7',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
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
    color: '#0EA5E9',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#F0F8FF',
    padding: 8,
    borderRadius: 10,
    textTransform: 'lowercase',
    letterSpacing: 0.5,
  },
  firstSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0EA5E9',
    marginTop: 0,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: '#F0F8FF',
    padding: 8,
    borderRadius: 10,
    textTransform: 'lowercase',
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 10,
    fontStyle: 'italic',
  },
});

interface ItsGivingProfessionalTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization
}

export const ItsGivingProfessionalTemplate: React.FC<ItsGivingProfessionalTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <Text style={styles.subtitle}>it's giving professional ✨</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>✦</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>✦</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {data.personalInfo.links && data.personalInfo.links.length > 0 && (
            <>
              <Text style={styles.contactItem}>✦</Text>
              <Text style={styles.contactItem}>{data.personalInfo.links[0].url}</Text>
            </>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <>
          <Text style={styles.firstSectionTitle}>about me fr</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </>
      )}

      {/* Experience */}
      <Text style={styles.sectionTitle}>work experience</Text>
      {/* Add experience section */}

      {/* Skills */}
      {data.skills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>skills that slap</Text>
          {/* Add skills section */}
        </>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>education era</Text>
          {/* Add education section */}
        </>
      )}
    </Page>
  </Document>
);
