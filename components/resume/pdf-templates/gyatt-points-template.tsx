// Gyatt Points Template - Over-the-top emphasis
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/resume/resume-data';
import { TemplateCustomization } from '@/lib/resume/template-types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FF69B4',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    backgroundColor: '#FFD700',
    padding: 25,
    borderRadius: 25,
    border: '5px solid #FF1493',
  },
  name: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#FF1493',
    marginBottom: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    color: '#FF4500',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});


interface GyattPointsTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization
}

export const GyattPointsTemplate: React.FC<GyattPointsTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>⭐ {data.personalInfo.name} ⭐</Text>
        <Text style={styles.title}>🔥 {data.personalInfo.title} 🔥</Text>
      </View>
    </Page>
  </Document>
);
