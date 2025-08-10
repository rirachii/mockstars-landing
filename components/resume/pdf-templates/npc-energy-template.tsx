// NPC Energy Template - Ironic minimalism
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.3,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#E5E5E5',
    padding: 15,
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#666666',
    marginBottom: 5,
  },
  title: {
    fontSize: 11,
    color: '#999999',
    marginBottom: 10,
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

export const NPCEnergyTemplate: React.FC<{data: ResumeData}> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
      </View>
    </Page>
  </Document>
);
