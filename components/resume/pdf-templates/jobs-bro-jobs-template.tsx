import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/resume/resume-data';
import { TemplateCustomization } from '@/lib/resume/template-types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 50,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    textAlign: 'center',
    marginBottom: 25,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Times-Bold',
    color: '#000000',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 11,
    color: '#000000',
  },
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#000000',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#000000',
    marginHorizontal: 20,
    textAlign: 'center',
  },
  summary: {
    fontSize: 11,
    color: '#000000',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'baseline',
  },
  dateRange: {
    fontSize: 11,
    color: '#000000',
    minWidth: 120,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#000000',
    flex: 1,
    marginLeft: 20,
  },
  bulletPoints: {
    marginLeft: 140,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: '#000000',
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    color: '#000000',
    lineHeight: 1.4,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'baseline',
  },
  educationDate: {
    fontSize: 11,
    color: '#000000',
    minWidth: 80,
  },
  educationDetails: {
    fontSize: 11,
    color: '#000000',
    flex: 1,
    marginLeft: 20,
  },
  languagesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  languageItem: {
    fontSize: 11,
    color: '#000000',
  },
  languageProficiency: {
    fontSize: 11,
    color: '#000000',
  },
  referencesText: {
    fontSize: 11,
    color: '#000000',
    fontStyle: 'italic',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skillItem: {
    fontSize: 11,
    color: '#000000',
    marginRight: 20,
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'baseline',
  },
  projectDate: {
    fontSize: 11,
    color: '#000000',
    minWidth: 120,
  },
  projectTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
    color: '#000000',
    flex: 1,
    marginLeft: 20,
  },
  projectBullets: {
    marginLeft: 140,
  },
});

interface JobsBroJobsTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization
}

export const JobsBroJobsTemplate: React.FC<JobsBroJobsTemplateProps> = ({ data }) => {
  const formatContactInfo = () => {
    const parts = [];
    if (data.personalInfo.location) parts.push(data.personalInfo.location);
    if (data.personalInfo.phone) parts.push(data.personalInfo.phone);
    if (data.personalInfo.email) parts.push(data.personalInfo.email);
    if (data.personalInfo.links) parts.push(data.personalInfo.links.map((link) => link.url));
    return parts.join(', ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.contactInfo}>{formatContactInfo()}</Text>
        </View>

        {/* Summary Section */}
        {data.summary && (
          <>
            <View style={styles.sectionDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.sectionTitle}>Summary</Text>
              <View style={styles.dividerLine} />
            </View>
            <Text style={styles.summary}>{data.summary}</Text>
          </>
        )}

        {/* Work Experience Section */}
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.sectionTitle}>Work Experience</Text>
          <View style={styles.dividerLine} />
        </View>

        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.dateRange}>
                {job.startDate} - {job.endDate}
              </Text>
              <Text style={styles.jobTitle}>
                {job.title}, {job.company}, {job.location || 'Remote'}
              </Text>
            </View>
            
            <View style={styles.bulletPoints}>
              {(job.bullets || []).map((b, bulletIndex) => (
                <Text key={bulletIndex} style={styles.bullet}>• {b.text}</Text>
              ))}
            </View>
          </View>
        ))}

        {/* Education Section */}
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.dividerLine} />
        </View>

        {data.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.educationDate}>{[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
            <Text style={styles.educationDetails}>
              {edu.degree}, {edu.school}
              {edu.gpa && `, GPA: ${edu.gpa}`}
            </Text>
          </View>
        ))}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <>
            <View style={styles.sectionDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          </>
        )}

        {/* Projects Section (Repurposed as Languages) */}
        {data.projects && data.projects.length > 0 && (
          <>
            <View style={styles.sectionDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.dividerLine} />
            </View>
            
            {data.projects.map((project, index) => (
              <View key={index} style={styles.languagesSection}>
                <Text style={styles.languageItem}>{project.name}</Text>
                <Text style={styles.languageProficiency}>{project.description}</Text>
              </View>
            ))}
          </>
        )}

        {/* References Section */}
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.sectionTitle}>References</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <Text style={styles.referencesText}>References available upon request</Text>
      </Page>
    </Document>
  );
};
