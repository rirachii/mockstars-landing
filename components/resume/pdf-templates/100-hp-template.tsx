// 100 HP Template - Minimal, survival-focused
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/resume/resume-data';
import { TemplateCustomization } from '@/lib/resume/template-types';

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

interface OneHundredHPTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization
}

export const OneHundredHPTemplate: React.FC<OneHundredHPTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name} [100 HP]</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
      </View>
    </Page>
  </Document>
);
