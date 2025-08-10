import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 20,
    textAlign: 'left',
    borderBottom: '1px solid #000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666666',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.4,
    marginBottom: 15,
  },
});

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
    location?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

interface NoCapTemplateProps {
  data: ResumeData;
}

export const NoCapTemplate: React.FC<NoCapTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && (
            <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
          )}
        </View>
      </View>

      {data.summary && (
        <>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </>
      )}

      <Text style={styles.sectionTitle}>Experience</Text>
      <Text style={styles.sectionTitle}>Skills</Text>
      <Text style={styles.sectionTitle}>Education</Text>
    </Page>
  </Document>
);
