import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor: '#F3F4F6',
    padding: 30,
    borderRadius: 8,
    border: '2px solid #E5E7EB',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 15,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderTop: '3px solid #111827',
    borderBottom: '3px solid #111827',
    paddingVertical: 10,
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

interface MainCharacterEnergyTemplateProps {
  data: ResumeData;
}

export const MainCharacterEnergyTemplate: React.FC<MainCharacterEnergyTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <Text style={styles.subtitle}>the main character of my career story</Text>
      </View>

      <Text style={styles.sectionTitle}>Executive Summary</Text>
      <Text style={styles.sectionTitle}>Professional Experience</Text>
      <Text style={styles.sectionTitle}>Core Competencies</Text>
      <Text style={styles.sectionTitle}>Education & Credentials</Text>
    </Page>
  </Document>
);
