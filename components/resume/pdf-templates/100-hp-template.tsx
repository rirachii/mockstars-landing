// 100 HP Template - Minimal, survival-focused
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 9,
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 15,
    textAlign: 'left',
    borderBottom: '1px solid #000000',
    paddingBottom: 5,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 2,
  },
  title: {
    fontSize: 10,
    color: '#000000',
    marginBottom: 5,
  },
});

interface ResumeData {
  personalInfo: { name: string; title: string; email: string; phone: string; location: string; linkedin?: string; website?: string; };
  summary?: string;
  experience: Array<{ title: string; company: string; startDate: string; endDate: string; description: string[]; location?: string; }>;
  education: Array<{ degree: string; school: string; year: string; gpa?: string; }>;
  skills: string[];
  projects?: Array<{ name: string; description: string; technologies: string[]; }>;
}

export const OneHundredHPTemplate: React.FC<{data: ResumeData}> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name} [100 HP]</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
      </View>
    </Page>
  </Document>
);
