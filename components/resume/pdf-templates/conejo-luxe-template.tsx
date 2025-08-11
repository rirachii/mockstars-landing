// conejo-luxe-template.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/resume/resume-data';
import { TemplateCustomization } from '@/lib/resume/template-types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    padding: 30,
  },
  rightColumn: {
    width: '65%',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#F59E0B',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 12,
    color: '#D1D5DB',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  contactInfo: {
    fontSize: 9,
    color: '#D1D5DB',
    lineHeight: 1.4,
  },
  contactItem: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#F59E0B',
    marginBottom: 12,
    marginTop: 25,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #F59E0B',
    paddingBottom: 5,
  },
  firstLeftSectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#F59E0B',
    marginBottom: 12,
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #F59E0B',
    paddingBottom: 5,
  },
  rightSectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 15,
    marginTop: 25,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '3px solid #F59E0B',
    paddingBottom: 8,
  },
  firstRightSectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 15,
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '3px solid #F59E0B',
    paddingBottom: 8,
  },
});

interface ConejoLuxeTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization
}

export const ConejoLuxeTemplate: React.FC<ConejoLuxeTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Text>{data.personalInfo.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text>{data.personalInfo.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text>{data.personalInfo.location}</Text>
          </View>
          {(data.personalInfo.links || []).map((l) => (
            <View key={l.id} style={styles.contactItem}>
              <Text>{l.label}: {l.url}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        {data.skills.length > 0 && (
          <>
            <Text style={styles.firstLeftSectionTitle}>Expertise</Text>
            {/* Add skills section */}
          </>
        )}
      </View>

      {/* Right Column */}
      <View style={styles.rightColumn}>
        {/* Summary */}
        {data.summary && (
          <>
            <Text style={styles.firstRightSectionTitle}>Executive Summary</Text>
            {/* Add summary section */}
          </>
        )}

        {/* Experience */}
        <Text style={styles.rightSectionTitle}>Professional Experience</Text>
        {/* Add experience section */}

        {/* Education */}
        {data.education.length > 0 && (
          <>
            <Text style={styles.rightSectionTitle}>Education</Text>
            {/* Add education section */}
          </>
        )}
      </View>
    </Page>
  </Document>
);
